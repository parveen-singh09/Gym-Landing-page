import ImageWithFallback from "./ImageWithFallback";
import PillButton from "./PillButton";

/**
 * Hero (Server Component)
 *
 * Renders the hero headline and the two action buttons over the
 * `hero-runner.jpg` background inside the dark Hero_Block.
 *
 * - Headline uses the `text-heading` role in `text-neutral-50` (Req 5.1).
 * - The background image is rendered via `ImageWithFallback` with `fill` +
 *   `object-cover` so it covers the area without distortion (Req 5.2). On load
 *   failure the fallback surface is transparent so the dark Hero_Block shows
 *   through and the headline/buttons stay legible (Req 5.3).
 * - Per the modified Next.js image docs, the deprecated `priority` prop is
 *   replaced by `preload` to prioritize this above-the-fold LCP image.
 * - Actions: a lime `PillButton` "Try for free" with an arrow (Req 5.4) and a
 *   ghost `PillButton` "More about Titan" (Req 5.5).
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl">
      {/* Background image layer (decorative): covers the reserved box. */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero-runner.jpg"
          alt=""
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 96rem"
          className="object-cover"
          fallbackClassName="bg-transparent"
        />
      </div>

      {/* Content layer, raised above the background. */}
      <div className="relative z-10 flex min-h-96 flex-col justify-end gap-8 p-8 lg:min-h-128 lg:p-12">
        <h1 className="text-heading leading-tight tracking-tight text-neutral-50">
          Be helthier. Be stronger. Be confident.
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <PillButton
            variant="primary"
            href="#"
            showArrow
            ariaLabel="Try for free"
          >
            Try for free
          </PillButton>
          <PillButton
            variant="ghost"
            href="#welcome"
            ariaLabel="More about Titan"
          >
            More about Titan
          </PillButton>
        </div>
      </div>
    </section>
  );
}
