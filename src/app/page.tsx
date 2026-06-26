import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsRow from "@/components/StatsRow";
import WelcomeSection from "@/components/WelcomeSection";
import FeaturesBento from "@/components/FeaturesBento";
import SectionBoundary from "@/components/SectionBoundary";

/**
 * Landing_Page root composition (Server Component, Req 1.2).
 *
 * Renders the five sections exactly once in top-to-bottom document order:
 * Header, Hero, StatsRow (grouped inside the dark rounded Hero_Block), then
 * WelcomeSection, then FeaturesBento. Each section is wrapped in a
 * `SectionBoundary` so a single section's render failure omits only that
 * section while the rest stay intact (Req 1.4). A root `overflow-x-hidden`
 * safeguard plus each section's own `max-w-8xl mx-auto` cap and horizontal
 * padding keep the page free of horizontal scroll at >=320px (Reqs 3.4, 3.5, 9.5).
 */
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-100">
      {/* Hero_Block — dark rounded container grouping Header, Hero, StatsRow */}
      <div className="p-4">
        <section className="mx-auto w-full max-w-8xl rounded-3xl bg-neutral-950 px-6 py-6 lg:px-10 lg:py-8">
          <SectionBoundary name="Header">
            <Header />
          </SectionBoundary>
          <SectionBoundary name="Hero">
            <Hero />
          </SectionBoundary>
          <SectionBoundary name="StatsRow">
            <StatsRow />
          </SectionBoundary>
        </section>
      </div>

      <SectionBoundary name="WelcomeSection">
        <WelcomeSection />
      </SectionBoundary>

      <SectionBoundary name="FeaturesBento">
        <FeaturesBento />
      </SectionBoundary>
    </main>
  );
}
