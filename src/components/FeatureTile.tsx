import type { LucideIcon } from "lucide-react";
import { isBlank } from "@/lib/isBlank";
import ImageWithFallback from "@/components/ImageWithFallback";

type FeatureTileVariant = "text" | "stat";

interface FeatureTileProps {
  /** "text" renders an icon/image + label; "stat" renders a big value + label. Default "text". */
  variant?: FeatureTileVariant;
  /** 1..200 chars. For the "stat" variant this is the small label below the value. */
  text: string;
  /** Required when variant="stat", e.g. "4", "500 M²". */
  statValue?: string;
  /** lucide-react icon for "text" tiles (takes precedence over imageSrc). */
  icon?: LucideIcon;
  /** Optional image alternative to an icon for "text" tiles. */
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * A single tile within the Features_Bento grid, sitting on a dark bento
 * background as a translucent dark-glass panel.
 *
 * Uses `isBlank` to guard required props: a blank `text` (and a blank
 * `statValue` on the "stat" variant) renders a visible placeholder instead of
 * failing to render the rest of the tile (Req 2.5).
 */
export default function FeatureTile({
  variant = "text",
  text,
  statValue,
  icon: Icon,
  imageSrc,
  imageAlt = "",
}: FeatureTileProps) {
  const textBlank = isBlank(text);

  const label = textBlank ? (
    <span className="text-normal text-neutral-400 italic">Label unavailable</span>
  ) : (
    <span className="text-normal text-neutral-50">{text}</span>
  );

  if (variant === "stat") {
    const statBlank = isBlank(statValue);

    return (
      <div className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-neutral-950/60 p-6">
        {statBlank ? (
          <span className="text-heading text-neutral-400 italic">—</span>
        ) : (
          <span className="text-heading text-primary">{statValue}</span>
        )}
        <span className="text-normal text-neutral-400">
          {textBlank ? "Label unavailable" : text}
        </span>
      </div>
    );
  }

  // "text" variant
  const visual = (() => {
    if (Icon) {
      return <Icon className="h-6 w-6 text-primary" strokeWidth={2.25} aria-hidden="true" />;
    }
    if (!isBlank(imageSrc)) {
      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-xl">
          <ImageWithFallback
            src={imageSrc as string}
            alt={imageAlt}
            fill
            sizes="48px"
            className="object-cover"
            fallbackClassName="bg-neutral-800"
          />
        </div>
      );
    }
    return null;
  })();

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl bg-neutral-950/60 p-6">
      {visual}
      {label}
    </div>
  );
}
