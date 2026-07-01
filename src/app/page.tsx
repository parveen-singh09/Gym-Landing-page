import Hero from "@/components/hero";
import SportCenter from "@/components/sport-center";
import Features from "@/components/features";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-8xl px-4 py-4 sm:px-6 sm:py-6">
        <Hero />
        <SportCenter />
        <Features />
      </div>
    </main>
  );
}
