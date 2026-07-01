import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import Navbar from "@/components/navbar";
import TipCarousel from "@/components/tip-carousel";

const avatars = [
  { initials: "AK", color: "bg-primary text-secondary" },
  { initials: "MR", color: "bg-white text-secondary" },
  { initials: "JL", color: "bg-secondary text-white ring-1 ring-white/30" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-secondary">
      <Image
        src="/images/hero-runner.png"
        alt="Athlete running on a treadmill"
        fill
        priority
        sizes="(min-width: 1024px) 90rem, 100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/80 to-secondary/20" />

      <div className="relative z-10 flex flex-col px-5 py-5 sm:px-8 sm:py-6 md:px-10">
        <Navbar />

        <div className="mt-12 mb-10 max-w-xl md:mt-20 md:mb-16">
          <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Be healthier.
            <br />
            Be stronger.
            <br />
            Be confident.
          </h1>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="primary" size="lg" className="pr-2">
              Try for free
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                <ArrowUpRight size={20} />
              </span>
            </Button>
            <Button variant="secondary" size="lg">
              More about Titan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${a.color}`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">10,000+</p>
                <p className="text-sm text-secondary/60">satisfied clients</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-secondary/70">
              They arrive with different goals, yet they all find the support
              and motivation they need. Their success is the ultimate validation
              of our method.
            </p>
          </div>

          <TipCarousel />

          <div className="relative flex flex-col justify-end rounded-3xl bg-primary p-6">
            <a
              href="#contacts"
              aria-label="Get 14 days for free"
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-transform hover:scale-105"
            >
              <ArrowUpRight size={18} />
            </a>
            <h3 className="text-2xl font-bold text-secondary">
              Get 14 days for free
            </h3>
            <p className="mt-1 text-sm text-secondary/70">
              Just give us a call or message us in the chat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
