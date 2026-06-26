"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LiveRunner3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse coords normalized for parallax
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0; // time variable for gait cycle

    // Handle canvas sizing
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 3D coordinates system constants
    const hipHeight = 12;
    const thighLen = 14;
    const shinLen = 13;
    const torsoHeight = 16;
    const shoulderWidth = 10;
    const bicepLen = 9;
    const forearmLen = 8;

    const render = () => {
      // Clear canvas with subtle trail effect for motion blur
      ctx.fillStyle = "rgba(10, 14, 13, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2 + 10;

      t += 0.095; // speed of running gait cycle

      // Camera settings based on mouse position
      const yaw = mouseRef.current.x * 0.95; // Orbit camera left-right
      const pitch = mouseRef.current.y * 0.45 - 0.15; // Orbit camera up-down (slight default tilt down)

      const cameraDistance = 140;
      const focalLength = 320;

      // Coordinate projection function with camera rotation
      const project = (x3d: number, y3d: number, z3d: number) => {
        // 1. Rotate around X-axis (pitch)
        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);
        const y1 = y3d * cosP - z3d * sinP;
        const z1 = y3d * sinP + z3d * cosP;

        // 2. Rotate around Y-axis (yaw)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const x2 = x3d * cosY + z1 * sinY;
        const z2 = -x3d * sinY + z1 * cosY;

        // 3. Project to 2D
        const scale = focalLength / (z2 + cameraDistance);
        return {
          x: centerX + x2 * scale,
          y: centerY - y1 * scale,
          depth: z2,
        };
      };

      // --- 1. RENDER RUNNING TRACK LANES UNDERNEATH ---
      const laneLinesX = [-40, -15, 15, 40];
      const zSpeed = 3.2;
      const dashSpacing = 28;
      const startDashOffset = (t * zSpeed) % dashSpacing;

      ctx.strokeStyle = "rgba(195, 255, 0, 0.08)";
      ctx.lineWidth = 1;

      // Draw longitudinal track lane lines
      laneLinesX.forEach((lx) => {
        ctx.beginPath();
        for (let lz = -30; lz <= 160; lz += 10) {
          const pt = project(lx, -16, lz);
          if (lz === -30) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      });

      // Draw lateral speed lines (dashes) moving towards the camera
      ctx.strokeStyle = "rgba(195, 255, 0, 0.14)";
      for (let lz = 160 - startDashOffset; lz >= -30; lz -= dashSpacing) {
        const ptLeft = project(-40, -16, lz);
        const ptRight = project(40, -16, lz);
        ctx.beginPath();
        ctx.moveTo(ptLeft.x, ptLeft.y);
        ctx.lineTo(ptRight.x, ptRight.y);
        ctx.stroke();
      }

      // --- 2. CALCULATE 3D JOINTS OF RUNNING GAIT ---
      // Hip oscillates up/down/forward based on stride cadence
      const hipOscillation = Math.cos(2 * t) * 1.8;
      const hipForwardOscillation = Math.sin(2 * t) * 0.8;
      const hipCenter = [0, hipHeight + hipOscillation, hipForwardOscillation];

      const hipL = [-6, hipCenter[1], hipCenter[2]];
      const hipR = [6, hipCenter[1], hipCenter[2]];

      // Torso leans slightly forward when running
      const spineLean = 0.15;
      const shoulderCenter = [
        0,
        hipCenter[1] + torsoHeight,
        hipCenter[2] - torsoHeight * spineLean,
      ];
      
      const shoulderL = [-8, shoulderCenter[1], shoulderCenter[2]];
      const shoulderR = [8, shoulderCenter[1], shoulderCenter[2]];
      const head = [0, shoulderCenter[1] + 5, shoulderCenter[2] - 0.5];

      // --- GAIT MATH FOR LIMBS ---
      // Phase differences
      const phaseL = t;
      const phaseR = t + Math.PI;

      // Thigh angles swing forward/back
      const swingRange = 0.55;
      const angleThighL = Math.sin(phaseL) * swingRange - 0.12; // offset forward
      const angleThighR = Math.sin(phaseR) * swingRange - 0.12;

      // Knee angles bend on recovery phase
      const angleKneeL = angleThighL - (Math.cos(phaseL) + 1.1) * 0.52;
      const angleKneeR = angleThighR - (Math.cos(phaseR) + 1.1) * 0.52;

      // Left Leg 3D Joints
      const kneeL = [
        hipL[0],
        hipL[1] - Math.cos(angleThighL) * thighLen,
        hipL[2] + Math.sin(angleThighL) * thighLen,
      ];
      const ankleL = [
        kneeL[0],
        kneeL[1] - Math.cos(angleKneeL) * shinLen,
        kneeL[2] + Math.sin(angleKneeL) * shinLen,
      ];
      const footL = [
        ankleL[0],
        ankleL[1] - 1.2,
        ankleL[2] + 4.5,
      ];

      // Right Leg 3D Joints
      const kneeR = [
        hipR[0],
        hipR[1] - Math.cos(angleThighR) * thighLen,
        hipR[2] + Math.sin(angleThighR) * thighLen,
      ];
      const ankleR = [
        kneeR[0],
        kneeR[1] - Math.cos(angleKneeR) * shinLen,
        kneeR[2] + Math.sin(angleKneeR) * shinLen,
      ];
      const footR = [
        ankleR[0],
        ankleR[1] - 1.2,
        ankleR[2] + 4.5,
      ];

      // Arm swing is opposite to leg swing
      const armSwingRange = 0.5;
      const angleShoulderL = -Math.sin(phaseL) * armSwingRange + 0.1;
      const angleShoulderR = -Math.sin(phaseR) * armSwingRange + 0.1;

      // Elbows bent at 80-90 degrees while running
      const angleElbowL = angleShoulderL + 1.1;
      const angleElbowR = angleShoulderR + 1.1;

      // Left Arm 3D Joints
      const elbowL = [
        shoulderL[0] - 1.5,
        shoulderL[1] - Math.cos(angleShoulderL) * bicepLen,
        shoulderL[2] + Math.sin(angleShoulderL) * bicepLen,
      ];
      const wristL = [
        elbowL[0] + 0.5,
        elbowL[1] - Math.sin(angleElbowL) * forearmLen,
        elbowL[2] - Math.cos(angleElbowL) * forearmLen,
      ];

      // Right Arm 3D Joints
      const elbowR = [
        shoulderR[0] + 1.5,
        shoulderR[1] - Math.cos(angleShoulderR) * bicepLen,
        shoulderR[2] + Math.sin(angleShoulderR) * bicepLen,
      ];
      const wristR = [
        elbowR[0] - 0.5,
        elbowR[1] - Math.sin(angleElbowR) * forearmLen,
        elbowR[2] - Math.cos(angleElbowR) * forearmLen,
      ];

      // --- 3. PROJECT JOINTS TO SCREEN ---
      const joints2D = {
        hipCenter: project(...(hipCenter as [number, number, number])),
        hipL: project(...(hipL as [number, number, number])),
        hipR: project(...(hipR as [number, number, number])),
        shoulderCenter: project(...(shoulderCenter as [number, number, number])),
        shoulderL: project(...(shoulderL as [number, number, number])),
        shoulderR: project(...(shoulderR as [number, number, number])),
        head: project(...(head as [number, number, number])),
        kneeL: project(...(kneeL as [number, number, number])),
        ankleL: project(...(ankleL as [number, number, number])),
        footL: project(...(footL as [number, number, number])),
        kneeR: project(...(kneeR as [number, number, number])),
        ankleR: project(...(ankleR as [number, number, number])),
        footR: project(...(footR as [number, number, number])),
        elbowL: project(...(elbowL as [number, number, number])),
        wristL: project(...(wristL as [number, number, number])),
        elbowR: project(...(elbowR as [number, number, number])),
        wristR: project(...(wristR as [number, number, number])),
      };

      // --- 4. DRAW 3D VOLUMETRIC HUMAN SILHOUETTE ---
      // Determine which side is far vs near
      const isLeftFar = joints2D.hipL.depth > joints2D.hipR.depth;

      // Volumetric colors with premium neon-lime style
      const colorFar = "rgba(195, 255, 0, 0.12)";
      const colorNear = "rgba(195, 255, 0, 0.65)";
      const colorTorsoFill = "rgba(195, 255, 0, 0.25)";
      const colorTorsoStroke = "rgba(195, 255, 0, 0.40)";
      const colorHeadFill = "rgba(195, 255, 0, 0.35)";
      const colorHeadStroke = "rgba(195, 255, 0, 0.50)";

      // Helper to draw volumetric limbs with perspective scaling
      const drawLimb = (
        p1: { x: number; y: number; depth: number },
        p2: { x: number; y: number; depth: number },
        baseWidth: number,
        color: string
      ) => {
        const avgDepth = (p1.depth + p2.depth) / 2;
        const scale = focalLength / (avgDepth + cameraDistance);
        ctx.lineWidth = baseWidth * scale;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      const drawTorso = (color: string, strokeColor?: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(joints2D.shoulderL.x, joints2D.shoulderL.y);
        ctx.lineTo(joints2D.shoulderR.x, joints2D.shoulderR.y);
        ctx.lineTo(joints2D.hipR.x, joints2D.hipR.y);
        ctx.lineTo(joints2D.hipL.x, joints2D.hipL.y);
        ctx.closePath();
        ctx.fill();
        if (strokeColor) {
          ctx.strokeStyle = strokeColor;
          const avgDepth = (joints2D.shoulderL.depth + joints2D.shoulderR.depth + joints2D.hipL.depth + joints2D.hipR.depth) / 4;
          const scale = focalLength / (avgDepth + cameraDistance);
          ctx.lineWidth = 2.5 * scale;
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      };

      const drawHead = (color: string, strokeColor?: string) => {
        const scale = focalLength / (joints2D.head.depth + cameraDistance);
        const radius = 5.5 * scale;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(joints2D.head.x, joints2D.head.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        if (strokeColor) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1.5 * scale;
          ctx.stroke();
        }
      };

      // 1. Draw Far Leg and Far Arm
      if (isLeftFar) {
        // Draw Left Leg (Far)
        drawLimb(joints2D.hipL, joints2D.kneeL, 8.0, colorFar);
        drawLimb(joints2D.kneeL, joints2D.ankleL, 5.5, colorFar);
        drawLimb(joints2D.ankleL, joints2D.footL, 4.0, colorFar);

        // Draw Left Arm (Far)
        drawLimb(joints2D.shoulderL, joints2D.elbowL, 4.5, colorFar);
        drawLimb(joints2D.elbowL, joints2D.wristL, 3.5, colorFar);
      } else {
        // Draw Right Leg (Far)
        drawLimb(joints2D.hipR, joints2D.kneeR, 8.0, colorFar);
        drawLimb(joints2D.kneeR, joints2D.ankleR, 5.5, colorFar);
        drawLimb(joints2D.ankleR, joints2D.footR, 4.0, colorFar);

        // Draw Right Arm (Far)
        drawLimb(joints2D.shoulderR, joints2D.elbowR, 4.5, colorFar);
        drawLimb(joints2D.elbowR, joints2D.wristR, 3.5, colorFar);
      }

      // 2. Draw Torso (connect shoulderL, shoulderR, hipR, hipL)
      drawTorso(colorTorsoFill, colorTorsoStroke);

      // 3. Draw Neck and Head
      drawLimb(joints2D.shoulderCenter, joints2D.head, 4.0, colorTorsoStroke);
      drawHead(colorHeadFill, colorHeadStroke);

      // 4. Draw Near Leg and Near Arm
      if (isLeftFar) {
        // Draw Right Leg (Near)
        drawLimb(joints2D.hipR, joints2D.kneeR, 8.0, colorNear);
        drawLimb(joints2D.kneeR, joints2D.ankleR, 5.5, colorNear);
        drawLimb(joints2D.ankleR, joints2D.footR, 4.0, colorNear);

        // Draw Right Arm (Near)
        drawLimb(joints2D.shoulderR, joints2D.elbowR, 4.5, colorNear);
        drawLimb(joints2D.elbowR, joints2D.wristR, 3.5, colorNear);
      } else {
        // Draw Left Leg (Near)
        drawLimb(joints2D.hipL, joints2D.kneeL, 8.0, colorNear);
        drawLimb(joints2D.kneeL, joints2D.ankleL, 5.5, colorNear);
        drawLimb(joints2D.ankleL, joints2D.footL, 4.0, colorNear);

        // Draw Left Arm (Near)
        drawLimb(joints2D.shoulderL, joints2D.elbowL, 4.5, colorNear);
        drawLimb(joints2D.elbowL, joints2D.wristL, 3.5, colorNear);
      }

      // Loop animation
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-65 group-hover:opacity-85 transition-opacity duration-700"
      />
    </div>
  );
}
