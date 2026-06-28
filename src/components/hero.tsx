import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import TipCarousel from "@/components/tip-carousel";

const avatars = [
  { initials: "AK", color: "bg-primary text-secondary" },
  { initials: "MR", color: "bg-white text-secondary" },
  { initials: "JL", color: "bg-secondary text-white ring-1 ring-white/30" },
];

const Hero = () => {
  return (
    <section className="relative min-h-150 w-full overflow-hidden rounded-b-3xl lg:min-h-[calc(100vh-80px)]">
      <Image
        src="/images/hero-runner.png"
        alt="Athlete running on a treadmill"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/70 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 md:px-10">
        <div className="my-5 flex flex-1 flex-col justify-center">
          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Be healthier.
            <br />
            Be stronger.
            <br />
            Be confident.
          </h1>

          <div className=" mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="primary" size="lg" className="pr-2">
              Try for free
              <span className=" flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
                <ArrowUpRight size={20} />
              </span>
            </Button>
            <Button variant="secondary" size="lg">
              More about Titan
            </Button>
          </div>
        </div>

        <div className="my-11 grid grid-cols-1 gap-8 md:grid-cols-3">
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
