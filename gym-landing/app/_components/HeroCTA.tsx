"use client";

import { motion } from "framer-motion";

export default function HeroCTA() {
    return (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
                href="#pricing"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_40px_rgba(250,204,21,0.25)] transition"
            >
                Start Your Program
                <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-black/70" />
            </motion.a>

            <motion.a
                href="#classes"
                whileHover={{ x: 6 }}
                whileTap={{ x: 0 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl transition hover:bg-white/10"
            >
                View Classes
                <span aria-hidden className="text-amber-200">→</span>
            </motion.a>
        </div>
    );
}

