"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const stats = [
  { label: "Workouts", value: "120+" },
  { label: "Coaches", value: "30" },
  { label: "Members", value: "8K" },
  { label: "Programs", value: "16" },
];

export default function MarqueeStats() {
  const items = useMemo(() => [...stats, ...stats], []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <motion.div
        className="flex w-max gap-10 px-6 py-4"
        animate={{ x: [0, -380] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, idx) => (
          <div key={idx} className="flex min-w-[170px] flex-col">
            <div className="text-2xl font-semibold text-white">{s.value}</div>
            <div className="text-xs tracking-widest text-white/60">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1),transparent_12%,transparent_88%,rgba(0,0,0,1))]" />
    </div>
  );
}

