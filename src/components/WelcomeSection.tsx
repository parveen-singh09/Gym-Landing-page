import PillButton from "./PillButton";
import ZoneCarousel from "./ZoneCarousel";
import type { ZoneCardProps } from "./ZoneCard";

// Ordered zone cards rendered by the carousel — [Power zone, Cardio zone].
const ZONE_CARDS: ZoneCardProps[] = [
  {
    imageSrc: "/images/power-zone.jpg",
    imageAlt: "Free-weights power zone",
    tag: "Power zone",
    caption: "Space for working with free weights",
  },
  {
    imageSrc: "/images/cardio-zone.jpg",
    imageAlt: "Cardio training zone",
    tag: "Cardio zone",
    caption: "Space for working with free weights",
  },
];

/**
 * Welcome_Section — server component on the light page background, below the
 * Hero_Block. A two-column layout on large screens: a text block (pill tag,
 * heading, "More" pill button) on the left and the zone `ZoneCarousel` on the
 * right. Stacks vertically on mobile. Uses design-system tokens only.
 */
export default function WelcomeSection() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-8xl px-4 py-16"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Left column — text block */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-neutral-200 px-4 py-2 text-normal text-neutral-950">
            Sport center
          </span>
          <h2 className="text-heading text-foreground">
            Welcome to the Titan Fitness Center, where people work on
            strengthening both body and mind.
          </h2>
          <div className="w-fit">
            <PillButton variant="dark" href="#gallery" showArrow ariaLabel="More">
              More
            </PillButton>
          </div>
        </div>

        {/* Right column — zone carousel */}
        <div className="w-full">
          <ZoneCarousel cards={ZONE_CARDS} />
        </div>
      </div>
    </section>
  );
}
