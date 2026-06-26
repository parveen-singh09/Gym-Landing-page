"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import LiveRunner3D from "./LiveRunner3D";

function clamp(n: number, a: number, b: number) {
    return Math.max(a, Math.min(b, n));
}

export default function BackgroundTitan() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const heroFloat = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const glowShift = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -90]);

    const points = useMemo(() => {
        const count = 30; // Reduced count for performance and cleaner layout
        return Array.from({ length: count }).map((_, i) => {
            const x = (i * 173) % 100;
            const y = (i * 97) % 100;
            const s = 0.6 + ((i * 37) % 100) / 100;
            const o = 0.12 + (((i * 53) % 100) / 100) * 0.45;
            const d = ((i * 29) % 600) / 100;
            return { x, y, s, o, d };
        });
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(195,255,0,0.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02),transparent_60%),linear-gradient(to_bottom,rgba(10,14,13,0.4),rgba(10,14,13,0.98))]" />

            {/* Custom 3D Workout Background Image with Parallax */}
            <motion.div
                style={{ y: imageParallax }}
                className="absolute inset-0 z-0 opacity-[0.14] w-full h-[120%] flex items-center justify-center"
            >
                <img 
                    src="/workout_3d_bg.png" 
                    alt="3D Workout Background" 
                    className="w-full h-full object-cover object-center select-none"
                    draggable="false"
                />
            </motion.div>

            {/* Live 3D motion-capture running man */}
            <LiveRunner3D />

            {/* Animated grid */}
            <motion.div
                aria-hidden
                className="absolute left-1/2 top-[-30%] h-[160%] w-[140%] -translate-x-1/2 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
                style={{ y: heroFloat }}
                animate={{
                    rotate: [-1, 1, -1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glowing orbs */}
            <motion.div
                aria-hidden
                className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(195,255,0,0.12),transparent_60%)] blur-3xl"
                style={{ transform: "translate3d(-50%,0,0)" }}
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                aria-hidden
                className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_60%)] blur-3xl"
                style={{ y: glowShift }}
                animate={{ x: [0, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating points */}
            <div className="absolute inset-0">
                {points.map((p, idx) => {
                    const size = clamp(5 * p.s, 3, 8);
                    return (
                        <motion.span
                            key={idx}
                            aria-hidden
                            className="absolute rounded-full bg-white"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: size,
                                height: size,
                                opacity: p.o,
                                filter: "drop-shadow(0 0 6px rgba(195,255,0,0.15))",
                            }}
                            animate={{
                                y: [0, -12, 0],
                                x: [0, (idx % 2 === 0 ? 1 : -1) * 6, 0],
                                opacity: [p.o * 0.6, p.o, p.o * 0.6],
                            }}
                            transition={{
                                duration: 4.5 + (idx % 7) * 0.35,
                                repeat: Infinity,
                                delay: p.d,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,14,13,0.4)_70%,rgba(10,14,13,0.9)_100%)]" />
        </div>
    );
}


