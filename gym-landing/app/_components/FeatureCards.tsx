
"use client";

import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "Titan-Level Training",
        desc: "Explosive programs designed to build strength, stamina, and athletic movement.",
    },
    {
        icon: HeartPulse,
        title: "Recovery First",
        desc: "Warmups, mobility, and progressive overload with smarter recovery routines.",
    },
    {
        icon: ShieldCheck,
        title: "Coaching That Scales",
        desc: "Real feedback loops—form checks, intensity guidance, and measurable progress.",
    },
    {
        icon: Dumbbell,
        title: "Modern Equipment",
        desc: "Premium machines and free weights with safe setups and training zones.",
    },
];

export default function FeatureCards() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: idx * 0.06 }}
                        whileHover={{ y: -6, borderColor: "rgba(195,255,0,0.25)" }}
                        className="group rounded-3xl border border-white/10 bg-[#111413]/70 p-6 backdrop-blur-xl transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#C3FF00]/20 to-[#C3FF00]/5 ring-1 ring-[#C3FF00]/20">
                                    <Icon className="h-5 w-5 text-[#C3FF00]" />
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">{f.title}</h3>
                            </div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/60">{f.desc}</p>

                        <motion.div
                            aria-hidden
                            className="mt-5 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(195,255,0,0.4),transparent)] opacity-0 transition-opacity group-hover:opacity-100"
                            animate={{
                                x: [0, 10, 0],
                            }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}


