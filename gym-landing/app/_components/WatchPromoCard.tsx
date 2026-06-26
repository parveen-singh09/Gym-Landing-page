"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltContainer from "./TiltContainer";

export default function WatchPromoCard() {
  return (
    <TiltContainer className="w-full h-full rounded-[28px]" maxTilt={10}>
      <div className="relative overflow-hidden rounded-[28px] bg-[#C3FF00] p-8 text-black shadow-[0_20px_40px_rgba(195,255,0,0.15)] flex flex-col justify-between min-h-[220px] h-full group cursor-pointer border border-transparent hover:border-black/10 transition-colors duration-300">
        {/* Top right icon */}
        <div className="absolute top-6 right-6" style={{ transform: "translateZ(20px)" }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#C3FF00] transition-transform duration-300 group-hover:rotate-45 shadow-md">
            <ArrowUpRight className="h-6 w-6 stroke-[2.5]" />
          </div>
        </div>

        {/* Spacer to push content down */}
        <div className="h-10" />

        {/* Text content */}
        <div className="max-w-[85%] flex flex-col justify-end h-full" style={{ transform: "translateZ(15px)" }}>
          <h3 className="text-3xl font-extrabold tracking-tight leading-none text-black">
            Get 14 days for free
          </h3>
          <p className="mt-3 text-sm font-semibold text-black/80 leading-relaxed">
            Just give us a call or message us in the chat to activate your pass.
          </p>
        </div>

        {/* Decorative track lines matching the runner image */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 flex justify-between opacity-15 pointer-events-none px-12 z-0">
          <div className="w-[1px] h-full bg-black" />
          <div className="w-[1px] h-full bg-black" />
          <div className="w-[1px] h-full bg-black" />
        </div>
      </div>
    </TiltContainer>
  );
}

