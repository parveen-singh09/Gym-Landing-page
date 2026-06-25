"use client";

import { motion } from "framer-motion";

import BackgroundTitan from "./_components/BackgroundTitan";
import FeatureCards from "./_components/FeatureCards";
import HeroCTA from "./_components/HeroCTA";
import MarqueeStats from "./_components/MarqueeStats";
import NavBar from "./_components/NavBar";
import { SectionHeading } from "./_components/SectionHeading";
import { Check } from "lucide-react";




const pricing = [
  {
    name: "Starter",
    price: "$39",
    desc: "Perfect for building momentum.",
    perks: ["6-week plan", "1 training zone", "Coach check-ins"],
    accent: "from-amber-300/30 to-amber-300/5",
  },
  {
    name: "Titan",
    price: "$79",
    desc: "Strength + performance programs.",
    perks: ["12-week progression", "All training zones", "Form reviews", "Nutrition guide"],
    accent: "from-sky-400/30 to-sky-400/5",
    featured: true,
  },
  {
    name: "Elite",
    price: "$129",
    desc: "High-touch coaching & recovery.",
    perks: ["Personalized schedule", "Recovery sessions", "Monthly performance reports"],
    accent: "from-fuchsia-400/25 to-fuchsia-400/5",
  },
];

const testimonials = [
  { name: "Ayesha", role: "Athlete", text: "The sessions feel intense—but smart. My strength and posture changed fast." },
  { name: "Rohan", role: "Runner", text: "Best gym vibe I’ve had. The program structure keeps me consistent." },
  { name: "Mira", role: "Trainer", text: "Clean design, great coaching. Every workout has a purpose." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.10),transparent_52%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.18),transparent_55%),linear-gradient(to_bottom,#030712,#020617)] text-white">
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-20">
        <BackgroundTitan />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-amber-300 blur-[6px]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
                </span>
                <span className="text-xs tracking-widest text-white/70">
                  TRAIN LIKE A TITAN • PERFORMANCE • RECOVERY
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Build strength.
                <span className="block bg-gradient-to-r from-amber-200 via-white to-sky-200 bg-clip-text text-transparent">
                  Train with power.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Premium coaching and high-energy programs for athletes, fitness lovers, and anyone ready to level up.
                Precision form. Intense sessions. Real results.
              </p>

              <HeroCTA />

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Live Coaching", v: "Weekly" },
                  { k: "Progress Tracking", v: "Real" },
                  { k: "Workout Zones", v: "All" },
                ].map((x, idx) => (
                  <motion.div
                    key={x.k}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="text-xs tracking-widest text-white/60">{x.k}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{x.v}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Today’s Session</div>
                    <div className="text-xs text-white/60">Titan Strength Flow</div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <span className="text-xs tracking-widest text-amber-200">LEVEL 03</span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["Warmup + Mobility", "Main Lift", "Accessory Blocks", "Finisher + Cooldown"].map((t, i) => (
                    <motion.div
                      key={t}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10">
                          <span className="text-sm font-semibold text-white/80">{i + 1}</span>
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white">{t}</div>
                          <div className="text-xs text-white/60">{["15m", "25m", "20m", "12m"][i]}</div>
                        </div>
                      </div>
                      <div className="mt-3 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(250,204,21,0.5),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <MarqueeStats />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="classes" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          kicker="PROGRAMS"
          title="Classes engineered for results"
          desc="Neon-energy training with real progress. Every session is built around structure, intensity, and recovery."
        />

        <div className="mt-10">
          <FeatureCards />
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-semibold">Choose your Titan track</h3>
            <p className="mt-2 text-white/70">Pick a focus. We’ll handle the plan.</p>

            <div className="mt-6 grid gap-4">
              {[
                { t: "Strength", d: "Progressive overload + form precision." },
                { t: "Athletic", d: "Explosive movement for faster performance." },
                { t: "Recovery", d: "Mobility, breathwork, and smarter recovery." },
              ].map((x, idx) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{x.t}</div>
                      <div className="text-xs text-white/60">{x.d}</div>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10 flex items-center justify-center">
                      <span className="text-amber-200">★</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-semibold">What you’ll feel</h3>
            <p className="mt-2 text-white/70">A professional system that keeps you consistent.</p>

            <div className="mt-6 grid gap-4">
              {[
                { t: "Better form", d: "Form cues and checkpoints." },
                { t: "Higher intensity", d: "Safely progressive effort." },
                { t: "Faster recovery", d: "Mobility + rest strategy." },
              ].map((x, idx) => (
                <motion.div
                  key={x.t}
                  whileHover={{ scale: 1.01 }}
                  className="group rounded-2xl border border-white/10 bg-black/20 p-5"
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/15 ring-1 ring-amber-300/30">
                      <Check className="h-5 w-5 text-amber-200" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{x.t}</div>
                      <div className="mt-1 text-xs text-white/60">{x.d}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(56,189,248,0.55),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <SectionHeading
          kicker="PRICING"
          title="Pick a plan that fits your goal"
          desc="Transparent pricing. No confusing tiers—just progress."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricing.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6 }}
              className={
                p.featured
                  ? "relative overflow-hidden rounded-[28px] border border-amber-200/25 bg-gradient-to-b from-white/10 to-black/10 p-6 shadow-[0_0_60px_rgba(250,204,21,0.12)]"
                  : "rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              }
            >
              {p.featured && (
                <div className="absolute right-6 top-6 inline-flex items-center rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-black shadow-[0_0_40px_rgba(250,204,21,0.25)]">
                  Most Popular
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm text-white/65">{p.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold">{p.price}</div>
                  <div className="text-xs text-white/60">/ month</div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {p.perks.map((x) => (
                  <div key={x} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-amber-200" />
                    <div className="text-sm text-white/75">{x}</div>
                  </div>
                ))}
              </div>

              <motion.a
                href="#testimonials"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={
                  p.featured
                    ? "mt-6 inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_40px_rgba(250,204,21,0.25)] transition hover:bg-amber-200"
                    : "mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl transition hover:bg-white/10"
                }
              >
                Choose Plan
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <SectionHeading
          kicker="REVIEWS"
          title="Built for athletes who don’t quit"
          desc="Real feedback from members who trained with TITAN Gym."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/60">{t.role}</div>
                </div>
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2"
                >
                  <span aria-hidden className="text-amber-200 text-lg">
                    “
                  </span>
                </motion.div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm font-semibold text-white/90">
                TITAN <span className="text-amber-200">GYM</span>
              </div>
              <div className="mt-2 text-xs text-white/60">Train hard. Recover smarter. Repeat.</div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: "#classes", label: "Classes" },
                { href: "#programs", label: "Programs" },
                { href: "#pricing", label: "Pricing" },
              ].map((x) => (
                <a
                  key={x.href}
                  href={x.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                >
                  {x.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* subtle scroll to top hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none fixed bottom-6 right-6 hidden sm:block"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70 backdrop-blur-xl">
          Scroll • Feel the motion
        </div>
      </motion.div>
    </div>
  );
}

