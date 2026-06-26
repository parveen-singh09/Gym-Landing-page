"use client";

import { motion } from "framer-motion";
import { Clock, Flame, ShieldAlert, Award } from "lucide-react";

import TiltContainer from "./TiltContainer";

interface WorkoutCardProps {
  title: string;
  trainer: string;
  duration: string;
  calories: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  index: number;
}

export default function WorkoutCard({
  title,
  trainer,
  duration,
  calories,
  level,
  category,
  index,
}: WorkoutCardProps) {
  // Level badge colors
  const levelColors = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Intermediate: "text-[#C3FF00] bg-[#C3FF00]/10 border-[#C3FF00]/20",
    Advanced: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  // Modern abstract geometric gradients for card header representing the workout type
  const headerGradients = [
    "from-zinc-900 to-zinc-950 border-white/5",
    "from-neutral-900 to-neutral-950 border-white/5",
    "from-slate-900 to-slate-950 border-white/5",
  ];
  
  const selectedGradient = headerGradients[index % headerGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-[360px]"
    >
      <TiltContainer className="w-full h-full rounded-3xl" maxTilt={10}>
        <div className="group rounded-3xl border border-white/10 bg-[#111413]/70 overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between h-full hover:border-[#C3FF00]/25 shadow-lg hover:shadow-2xl">
          {/* Decorative workout graphic header */}
          <div className={`h-[160px] w-full bg-gradient-to-br ${selectedGradient} relative p-6 flex flex-col justify-between border-b overflow-hidden`}>
            {/* Abstract design elements */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C3FF00_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Neon light stripe */}
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#C3FF00]/10 rounded-full blur-3xl pointer-events-none transform translate-x-12 -translate-y-12 transition-all duration-300 group-hover:bg-[#C3FF00]/15" />
            
            {/* Category tag & level badge */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] font-bold tracking-widest text-[#C3FF00] uppercase bg-[#C3FF00]/10 px-2.5 py-1 rounded-full border border-[#C3FF00]/25">
                {category}
              </span>
              <span className={`text-[10px] font-bold tracking-wide border px-2.5 py-1 rounded-full ${levelColors[level]}`}>
                {level}
              </span>
            </div>

            {/* Visual micro-element inside header representing strength lanes */}
            <div className="flex gap-1.5 h-16 items-end opacity-20 group-hover:opacity-40 transition-opacity z-10">
              <div className="w-[3px] h-10 bg-white rounded-full" />
              <div className="w-[3px] h-14 bg-[#C3FF00] rounded-full" />
              <div className="w-[3px] h-8 bg-white rounded-full" />
              <div className="w-[3px] h-12 bg-[#C3FF00] rounded-full" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(15px)" }}>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-[#C3FF00] transition-colors duration-200">
                {title}
              </h4>
              <p className="mt-1 text-xs text-white/50 font-medium">
                with Coach <span className="text-white/80">{trainer}</span>
              </p>
            </div>

            {/* Stats footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#C3FF00]/80" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-[#C3FF00]/80" />
                <span>{calories}</span>
              </div>
            </div>
          </div>
        </div>
      </TiltContainer>
    </motion.div>
  );
}
