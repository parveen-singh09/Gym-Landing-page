"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

function clamp(n: number, a: number, b: number) {
    return Math.max(a, Math.min(b, n));
}

export default function BackgroundTitan() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const heroFloat = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const glowShift = useTransform(scrollYProgress, [0, 1], [0, 80]);

    const points = useMemo(() => {
        const count = 44;
        return Array.from({ length: count }).map((_, i) => {
            const x = (i * 173) % 100;
            const y = (i * 97) % 100;
            const s = 0.6 + ((i * 37) % 100) / 100;
            const o = 0.18 + (((i * 53) % 100) / 100) * 0.65;
            const d = ((i * 29) % 600) / 100;
            return { x, y, s, o, d };
        });
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            {/* Base gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.20),transparent_55%),linear-gradient(to_bottom,rgba(3,7,18,0.35),rgba(3,7,18,0.95))]" />

            {/* Animated grid */}
            <motion.div
                aria-hidden
                className="absolute left-1/2 top-[-30%] h-[160%] w-[140%] -translate-x-1/2 opacity-50 [background-image:linear-gradient(rgba(99,102,241,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.35)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_70%)]"
                style={{ y: heroFloat }}
                animate={{
                    rotate: [-2, 2, -2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glowing orbs */}
            <motion.div
                aria-hidden
                className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.55),transparent_60%)] blur-2xl"
                style={{ transform: "translate3d(-50%,0,0)" }}
                animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                aria-hidden
                className="absolute -bottom-32 right-1/6 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45),transparent_62%)] blur-2xl"
                style={{ y: glowShift }}
                animate={{ x: [0, -70, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating points */}
            <div className="absolute inset-0">
                {points.map((p, idx) => {
                    const size = clamp(6 * p.s, 4, 12);
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
                                filter: "drop-shadow(0 0 10px rgba(99,102,241,0.35))",
                            }}
                            animate={{
                                y: [0, -16, 0],
                                x: [0, (idx % 2 === 0 ? 1 : -1) * 10, 0],
                                opacity: [p.o * 0.6, p.o, p.o * 0.6],
                            }}
                            transition={{
                                duration: 3.5 + (idx % 7) * 0.25,
                                repeat: Infinity,
                                delay: p.d,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.70)_100%)]" />
        </div>
    );
}

