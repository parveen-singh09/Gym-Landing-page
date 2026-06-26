import { ChevronLeft, ChevronRight } from "lucide-react";
import CircleIconButton from "./CircleIconButton";

interface SleepTipCardProps {
  /** The sleep-tip quote shown in the body. */
  quote?: string;
  /** Footer location label (bottom-left). */
  location?: string;
  /** Footer date label (bottom-right). */
  date?: string;
}

const DEFAULT_QUOTE =
  "Your muscles grow while you sleep. Make 7-9 hours your secret weapon for maximum progress.";

/**
 * Dark stats card carrying a sleep-tip quote (Req 6.3).
 *
 * Top row holds a left/right control pair, the middle holds the exact quote,
 * and the footer shows the location and date. Uses only neutral tokens.
 */
export default function SleepTipCard({
  quote = DEFAULT_QUOTE,
  location = "Moscow, Russia",
  date = "Nov.20",
}: SleepTipCardProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-neutral-800 p-6 text-neutral-50">
      <div className="flex gap-3">
        <CircleIconButton
          icon={ChevronLeft}
          ariaLabel="Previous"
          variant="outline"
          size="sm"
        />
        <CircleIconButton
          icon={ChevronRight}
          ariaLabel="Next"
          variant="outline"
          size="sm"
        />
      </div>

      <p className="text-body text-neutral-50">{quote}</p>

      <div className="flex items-center justify-between text-normal text-neutral-400">
        <span>{location}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
