"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const stats = [
  { label: "ACTIVE MEMBERS", value: "10K+" },
  { label: "EXPERIENCED COACHES", value: "35+" },
  { label: "SUCCESS STORIES", value: "98%" },
  { label: "WEEKLY PROGRAMS", value: "150+" },
  { label: "ATHLETIC CLUBS", value: "24/7" },
];

export default function MarqueeStats() {
  const items = useMemo(() => [...stats, ...stats, ...stats], []);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#111413]/40 py-6 backdrop-blur-md">
      <motion.div
        className="flex w-max gap-12 px-6"
        animate={{ x: [0, -780] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, idx) => (
          <div key={idx} className="flex items-center gap-6 min-w-[240px]">
            <div className="text-3xl font-extrabold text-[#C3FF00] tracking-tight">{s.value}</div>
            <div className="text-xs font-bold tracking-widest text-white/50 whitespace-nowrap">{s.label}</div>
            <span className="text-white/20 font-bold">•</span>
          </div>
        ))}
      </motion.div>

      {/* Fade effects on the edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0A0E0D] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0A0E0D] to-transparent" />
    </div>
  );
}


