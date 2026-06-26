import { ArrowUpRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import CircleIconButton from "./CircleIconButton";
import { isBlank } from "../lib/isBlank";

export interface ZoneCardProps {
  imageSrc: string;
  imageAlt: string;
  tag: string; // 1..40 chars — "Power zone" / "Cardio zone"
  caption: string; // 1..200 chars
  href?: string;
}

/**
 * A rounded image zone card: a background image fills the card via
 * `ImageWithFallback` (fill + object-cover), a subtle dark overlay keeps text
 * legible, a tag pill sits top-left, a caption bottom-left, and exactly one
 * in-bounds circular arrow control sits bottom-right.
 *
 * Uses `isBlank` for graceful degradation: any blank required prop renders a
 * visible neutral placeholder instead of failing to render the rest of the
 * card (Reqs 2.2, 2.5, 7.4–7.7, 10.2).
 */
export default function ZoneCard({
  imageSrc,
  imageAlt,
  tag,
  caption,
  href,
}: ZoneCardProps) {
  const tagLabel = isBlank(tag) ? "—" : tag;
  const arrowLabel = isBlank(tag) ? "Zone details" : `${tag} details`;

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-neutral-800 sm:h-80 lg:h-96">
      {/* Background image (informative alt) or neutral placeholder surface */}
      {isBlank(imageSrc) ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full bg-neutral-800"
        />
      ) : (
        <ImageWithFallback
          src={imageSrc}
          alt={imageAlt}
          fill
          fallbackClassName="bg-neutral-800"
          className="object-cover"
        />
      )}

      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-neutral-950/10"
      />

      {/* Tag pill — top-left */}
      <div className="absolute left-4 top-4">
        <span
          className={`inline-flex items-center rounded-full bg-neutral-950/70 px-4 py-2 text-normal text-neutral-50 ${
            isBlank(tag) ? "text-neutral-400" : ""
          }`}
        >
          {tagLabel}
        </span>
      </div>

      {/* Caption — bottom-left */}
      <div className="absolute bottom-4 left-4 right-20">
        {isBlank(caption) ? (
          <span className="inline-flex items-center rounded-md bg-neutral-950/50 px-3 py-1 text-normal text-neutral-400">
            —
          </span>
        ) : (
          <p className="text-body text-neutral-50">{caption}</p>
        )}
      </div>

      {/* Exactly one circular arrow control — bottom-right, within bounds */}
      <div className="absolute bottom-4 right-4">
        <CircleIconButton
          icon={ArrowUpRight}
          ariaLabel={arrowLabel}
          variant="lime"
          size="md"
          href={href}
        />
      </div>
    </div>
  );
}
