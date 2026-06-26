"use client";

import { useReducer } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ZoneCard, { type ZoneCardProps } from "./ZoneCard";
import CircleIconButton from "./CircleIconButton";
import {
  carouselReducer,
  leftDisabled,
  rightDisabled,
  type CarouselState,
} from "../lib/carousel";

interface ZoneCarouselProps {
  /** Ordered zone cards — [Power zone, Cardio zone]. */
  cards: ZoneCardProps[];
}

/**
 * Client carousel for the Welcome_Section zone cards.
 *
 * Holds the active index in the pure `carouselReducer` (initialised to
 * `{ currentIndex: 0, count: cards.length }`) and renders the cards in a single
 * horizontal track. The track translates by one full slide per index step with
 * a `transition-transform duration-500` so a next/prev transition completes
 * within 500ms (Reqs 7.9, 7.10).
 *
 * One left + one right `CircleIconButton` are anchored to the bottom-right of
 * the section. "prev"/"next" dispatch the matching action; at a boundary the
 * reducer leaves the index unchanged and the actioned control is shown disabled
 * via `leftDisabled`/`rightDisabled` (Reqs 7.8, 7.11). Each `ZoneCard` still
 * renders its own single in-bounds arrow control (Req 7.7).
 */
export default function ZoneCarousel({ cards }: ZoneCarouselProps) {
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
    count: cards.length,
  } satisfies CarouselState);

  const atStart = leftDisabled(state);
  const atEnd = rightDisabled(state);

  return (
    <div className="relative w-full">
      {/* Sliding viewport */}
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${state.currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={`${card.tag}-${index}`} className="w-full shrink-0">
              <ZoneCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / next controls — bottom-right of the section */}
      <div className="mt-6 flex justify-end gap-4">
        <CircleIconButton
          icon={ArrowLeft}
          ariaLabel="Previous zone"
          variant="light"
          size="md"
          onClick={() => dispatch("prev")}
          disabled={atStart}
        />
        <CircleIconButton
          icon={ArrowRight}
          ariaLabel="Next zone"
          variant="dark"
          size="md"
          onClick={() => dispatch("next")}
          disabled={atEnd}
        />
      </div>
    </div>
  );
}
