"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Tip = {
  text: string;
  location: string;
  date: string;
};

const tips: Tip[] = [
  {
    text: "Your muscles grow while you sleep. Make 7-9 hours your secret weapon for maximum progress.",
    location: "Moscow, Russia",
    date: "Nov.20",
  },
  {
    text: "Protein within 30 minutes post-workout helps repair and rebuild. Don't skip your recovery window.",
    location: "Berlin, Germany",
    date: "Dec.04",
  },
  {
    text: "Progressive overload beats intensity. Add a little weight each week and let consistency do the work.",
    location: "Tokyo, Japan",
    date: "Jan.12",
  },
];

const TipCarousel = () => {
  const [index, setIndex] = useState(0);
  const tip = tips[index];

  const prev = () => setIndex((i) => (i - 1 + tips.length) % tips.length);
  const next = () => setIndex((i) => (i + 1) % tips.length);

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-white/1 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous tip"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ArrowLeft size={16} />
        </button>

        <p className="text-center text-sm font-medium leading-snug text-white sm:text-base">
          {tip.text}
        </p>

        <button
          type="button"
          onClick={next}
          aria-label="Next tip"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-white/70">
        <span>{tip.location}</span>
        <span>{tip.date}</span>
      </div>
    </div>
  );
};

export default TipCarousel;
