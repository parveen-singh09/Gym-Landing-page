import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="-mt-1">
        <Hero />
      </div>
    </main>
  );
}
