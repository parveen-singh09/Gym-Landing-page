"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
  chartType?: "pulse" | "bar" | "ring";
  percent?: number; // for ring
}

import TiltContainer from "./TiltContainer";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
  chartType?: "pulse" | "bar" | "ring";
  percent?: number; // for ring
}

export default function MetricCard({
  title,
  value,
  unit = "",
  change = "",
  icon: Icon,
  iconColor = "text-[#C3FF00]",
  chartType = "pulse",
  percent = 70,
}: MetricCardProps) {
  return (
    <TiltContainer className="w-full h-[180px] rounded-3xl" maxTilt={15}>
      <div className="rounded-3xl border border-white/10 bg-[#111413]/70 p-6 backdrop-blur-xl flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#C3FF00]/25 transition-colors duration-300 shadow-md hover:shadow-xl">
        {/* Subtle background glow on hover */}
        <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#C3FF00]/5 rounded-full blur-2xl group-hover:bg-[#C3FF00]/10 transition-colors" />

        {/* Header */}
        <div className="flex items-center justify-between" style={{ transform: "translateZ(15px)" }}>
          <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
            {title}
          </span>
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 ${iconColor} group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5" />
          </span>
        </div>

        {/* Value */}
        <div className="mt-4 flex items-baseline gap-1" style={{ transform: "translateZ(20px)" }}>
          <span className="text-3.5xl font-black tracking-tight text-white group-hover:text-[#C3FF00] transition-colors duration-200">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-semibold text-white/50">{unit}</span>
          )}
          {change && (
            <span className="ml-2 text-xs font-medium text-[#C3FF00]/95 bg-[#C3FF00]/10 px-2 py-0.5 rounded border border-[#C3FF00]/20">
              {change}
            </span>
          )}
        </div>

        {/* Micro-chart / Graphics */}
        <div className="mt-4 h-8 flex items-end justify-between w-full" style={{ transform: "translateZ(10px)" }}>
          {chartType === "pulse" && (
            <div className="flex items-end gap-[3px] h-full w-full">
              {Array.from({ length: 18 }).map((_, i) => {
                // Create a pulse pattern
                const heights = [20, 35, 15, 45, 60, 25, 10, 30, 75, 40, 15, 50, 30, 10, 25, 45, 20, 15];
                const h = heights[i % heights.length];
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-[#C3FF00]"
                    initial={{ height: 2 }}
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          )}

          {chartType === "bar" && (
            <div className="flex items-end gap-1.5 h-full w-full">
              {Array.from({ length: 8 }).map((_, i) => {
                const heights = [30, 50, 75, 40, 90, 60, 45, 70];
                const h = heights[i];
                return (
                  <div key={i} className="flex-1 bg-white/10 rounded-t h-full relative overflow-hidden">
                    <motion.div
                      className="absolute bottom-0 inset-x-0 bg-[#C3FF00]/90 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {chartType === "ring" && (
            <div className="flex items-center justify-between w-full h-full">
              <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">Activity score</span>
              <div className="relative w-8 h-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-[#C3FF00]"
                    strokeWidth="3.5"
                    strokeDasharray={`${percent}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${percent}, 100` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </TiltContainer>
  );
}
