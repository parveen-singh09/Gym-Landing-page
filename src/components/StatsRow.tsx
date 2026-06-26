import SatisfiedClientsCard from "./SatisfiedClientsCard";
import SleepTipCard from "./SleepTipCard";
import FreeTrialCard from "./FreeTrialCard";

/**
 * Composes the three stats cards into a responsive grid (Reqs 6.1, 6.6, 9.1-9.3).
 *
 * Layout behaviour:
 * - ≤767px: `grid-cols-1` — cards stack in order white → dark → lime.
 * - 768-1023px: `md:grid-cols-2` — a non-overlapping two-column arrangement.
 * - ≥1024px: `lg:grid-cols-3` — a single row of three equal-height columns.
 *
 * `items-stretch` keeps the cards equal height in the single-row layout (each
 * card already uses `h-full`). Sits below the Hero inside the Hero block, so a
 * small top margin (`mt-8`) separates it; width is full of its container with
 * no `max-w` cap (the parent handles overall width).
 */
export default function StatsRow() {
  return (
    <div className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SatisfiedClientsCard />
      <SleepTipCard />
      <FreeTrialCard />
    </div>
  );
}
