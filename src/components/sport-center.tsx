"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import ZoneCard, { type Zone } from "@/components/zone-card";

const zones: Zone[] = [
  {
    label: "Power zone",
    description: "Space for working with free weights",
    image: "/images/power-zone.jpg",
  },
  {
    label: "Cardio zone",
    description: "Space for working with free weights",
    image: "/images/cardio-zone.jpg",
  },
];

const SportCenter = () => {
  const [power, cardio] = zones;

  return (
    <section
      id="services"
      className="grid grid-cols-1 gap-8 py-14 sm:py-16 md:py-20 lg:grid-cols-[minmax(0,20rem)_1fr_1fr] lg:items-stretch lg:gap-6 lg:py-24"
    >
      {/* Left: heading */}
      <div className="flex flex-col items-start">
        <span className="rounded-full border-2 border-secondary px-4 py-1.5 text-sm font-medium text-secondary lg:mt-4">
          Sport center
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-5xl">
          Welcome to the Titan Fitness Center, where people work on
          strengthening both body and mind.
        </h2>

        <Button variant="dark" size="md" className="mt-12 pr-2 lg:mt-16">
          More
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-secondary">
            <ArrowRight size={16} />
          </span>
        </Button>
      </div>

      {/* Middle: Power zone (tall) */}
      <ZoneCard {...power} />

      {/* Right: Cardio zone + slider nav below it */}
      <div className="flex flex-col gap-6">
        <ZoneCard
          {...cardio}
          className="aspect-5/4 lg:aspect-auto lg:min-h-0 lg:flex-1"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous zone"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/15 bg-white text-secondary transition-colors hover:bg-secondary/5"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next zone"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white transition-transform hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SportCenter;
