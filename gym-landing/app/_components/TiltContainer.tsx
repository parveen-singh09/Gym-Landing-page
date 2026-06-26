"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (e.g. 10 or 15)
  perspective?: number; // 3D perspective depth (e.g. 800)
}

export default function TiltContainer({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
}: TiltContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Motion values for normalized mouse positions (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt values
  const springConfig = { stiffness: 180, damping: 25, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Motion values for glare highlight position
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareOpacity = useSpring(0, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the card center, normalized between -0.5 and 0.5
    const normalizedX = (event.clientX - rect.left) / width - 0.5;
    const normalizedY = (event.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    glareOpacity.set(0.15); // Show glare on hover
  };

  const handleMouseLeave = () => {
    glareOpacity.set(0); // Hide glare
    x.set(0); // Reset tilt
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: perspective,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      className={`relative select-none ${className}`}
    >
      {/* 3D Content Container */}
      <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>

      {/* Glossy Reflective Glare Overlay */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
        style={{
          opacity: glareOpacity,
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
}
