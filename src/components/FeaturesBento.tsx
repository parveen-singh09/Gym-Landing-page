import {
  Asterisk,
  Plus,
  CupSoda,
  Wifi,
  Sun,
  Watch,
  Hand,
} from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import FeatureTile from "@/components/FeatureTile";

/**
 * Features_Bento (Server).
 *
 * A `bg-neutral-950` rounded panel layering, from back to front:
 *   1. an `ImageWithFallback` gym background (`fill`, `object-cover`, decorative
 *      `alt=""`, neutral `bg-neutral-800` fallback so the tiles + mark survive a
 *      load failure — Req 8.5),
 *   2. the centered, decorative lime ".T" logomark (`aria-hidden`), sized via the
 *      `text-heading` role plus a transform `scale` utility rather than a raw
 *      font size, layered above the background and behind the tiles (Req 8.4),
 *   3. a grid of all nine `FeatureTile`s split into a left group of 4 and a right
 *      group of 5 flanking the centered mark (Reqs 8.1–8.3).
 *
 * The gym background reuses `/images/hero-runner.jpg` (no dedicated features
 * background asset ships in `public/images/`), so a real photo renders; on a
 * failure the neutral fallback keeps the section legible.
 */
export default function FeaturesBento() {
  return (
    <section className="mx-auto w-full max-w-8xl px-4 pb-8">
      <div className="relative isolate min-h-[40rem] overflow-hidden rounded-3xl bg-neutral-950 p-4 lg:p-8">
        {/* 1. Gym background */}
        <ImageWithFallback
          src="/images/hero-runner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          fallbackClassName="bg-neutral-800"
        />

        {/* 2. Decorative lime ".T" logomark — text-heading role scaled up */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-heading font-black text-primary scale-[6] sm:scale-[8] lg:scale-[10]"
        >
          .T
        </span>

        {/* 3. Nine feature tiles flanking the centered mark */}
        <div className="relative z-20 grid h-full grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left group of 4 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <FeatureTile
              icon={Asterisk}
              text="Professional coaches each with at least 5 years of experience"
            />
            <FeatureTile
              icon={Plus}
              text="The medical professional's office"
            />
            <FeatureTile variant="stat" statValue="4" text="sports zones" />
            <FeatureTile
              icon={CupSoda}
              text="A bar serving wholesome drinks"
            />
          </div>

          {/* Center spacer reveals the ".T" mark behind the tiles */}
          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />

          {/* Right group of 5 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <FeatureTile icon={Wifi} text="Wi-Fi Free" />
            <FeatureTile icon={Sun} text="Tanning bed" />
            <FeatureTile
              icon={Watch}
              text="Fitness trackers and smart analysis"
            />
            <FeatureTile icon={Hand} text="Various kinds of massage" />
            <FeatureTile variant="stat" statValue="500 M²" text="total area" />
          </div>
        </div>
      </div>
    </section>
  );
}
