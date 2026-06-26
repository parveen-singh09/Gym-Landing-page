"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function HeroCTA() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <motion.a
        href="#pricing"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-between rounded-full bg-[#C3FF00] pl-7 pr-3 py-3 text-base font-extrabold text-black transition-colors duration-200 hover:bg-[#b0e600] group shadow-[0_15px_30px_rgba(195,255,0,0.15)]"
      >
        <span>Try for free</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#C3FF00] ml-4 transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
        </div>
      </motion.a>

      <motion.a
        href="#about"
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-[18px] text-base font-bold text-white backdrop-blur-xl transition duration-200"
      >
        More about Titan
      </motion.a>
    </div>
  );
}


