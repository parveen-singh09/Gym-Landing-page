import Image from "next/image";
import { Asterisk, Plus, Wifi, Watch } from "lucide-react";

const cardBase = "rounded-2xl bg-white/[0.08] p-5";

const Features = () => {
  return (
    <section className="rounded-3xl bg-secondary p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-3">
        {/* Coaches */}
        <div
          className={`${cardBase} flex items-center gap-4 lg:col-span-2 lg:col-start-1 lg:row-start-1`}
        >
          <Asterisk className="shrink-0 text-white" size={72} strokeWidth={1.5} />
          <p className="text-xl font-medium leading-snug text-white">
            Professional coaches each with at least 5 years of experience.
          </p>
        </div>

        {/* Medical office */}
        <div
          className={`${cardBase} flex items-center gap-4 lg:col-span-2 lg:col-start-1 lg:row-start-2`}
        >
          <Plus className="shrink-0 text-white" size={72} strokeWidth={2} />
          <p className="text-xl font-medium leading-snug text-white">
            The medical professional&apos;s office.
          </p>
        </div>

        {/* Sports zones */}
        <div
          className={`${cardBase} flex items-center gap-3 lg:col-start-1 lg:row-start-3`}
        >
          <span className="text-6xl font-bold leading-none text-white">4</span>
          <p className="text-xl font-medium leading-snug text-white/80">
            sports zones
          </p>
        </div>

        {/* Bar */}
        <div
          className={`${cardBase} flex items-center lg:col-start-2 lg:row-start-3`}
        >
          <p className="text-xl font-medium leading-snug text-white/80">
            A bar serving wholesome drinks.
          </p>
        </div>

        {/* Center image */}
        <div className="relative min-h-72 overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:min-h-0">
          <Image
            src="/images/power-zone.jpg"
            alt="Inside the Titan gym"
            fill
            sizes="(min-width: 1024px) 30rem, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-secondary/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative leading-none">
              <span className="text-8xl font-bold text-primary drop-shadow-lg sm:text-9xl">
                T
              </span>
              <span className="absolute bottom-2 -left-5 h-5 w-5 rounded-full bg-primary drop-shadow-lg sm:bottom-3 sm:h-6 sm:w-6" />
            </div>
          </div>
        </div>

        {/* Wi-Fi */}
        <div
          className={`${cardBase} flex flex-col items-center justify-center gap-3 text-center lg:col-start-5 lg:row-start-1`}
        >
          <Wifi className="text-white" size={60} strokeWidth={1.5} />
          <p className="text-xl font-medium leading-snug text-white/80">
            Wi-Fi free
          </p>
        </div>

        {/* Tanning bed */}
        <div
          className={`${cardBase} flex items-center justify-center text-center lg:col-start-6 lg:row-start-1`}
        >
          <p className="text-xl font-medium leading-snug text-white/80">
            Tanning bed
          </p>
        </div>

        {/* Fitness trackers */}
        <div
          className={`${cardBase} flex items-center gap-4 lg:col-span-2 lg:col-start-5 lg:row-start-2`}
        >
          <Watch className="shrink-0 text-white" size={64} strokeWidth={1.5} />
          <p className="text-xl font-medium leading-snug text-white">
            Fitness trackers and smart analysis.
          </p>
        </div>

        {/* Massage */}
        <div
          className={`${cardBase} flex items-center lg:col-start-5 lg:row-start-3`}
        >
          <p className="text-xl font-medium leading-snug text-white/80">
            Various kinds of massage
          </p>
        </div>

        {/* Area */}
        <div
          className={`${cardBase} flex items-center justify-center lg:col-start-6 lg:row-start-3`}
        >
          <p className="text-5xl font-bold text-white">
            500 M<span className="align-super text-2xl">2</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
