"use client";

import { motion } from "framer-motion";
import { Check, Heart, Flame, ShieldAlert, Award, Activity, Zap, TrendingUp, Sparkles } from "lucide-react";

import BackgroundTitan from "./_components/BackgroundTitan";
import FeatureCards from "./_components/FeatureCards";
import HeroCTA from "./_components/HeroCTA";
import MarqueeStats from "./_components/MarqueeStats";
import NavBar from "./_components/NavBar";
import SectionHeading from "./_components/SectionHeading";
import MetricCard from "./_components/MetricCard";
import WorkoutCard from "./_components/WorkoutCard";
import WatchPromoCard from "./_components/WatchPromoCard";
import TiltContainer from "./_components/TiltContainer";

const pricing = [
  {
    name: "Core Pass",
    price: "$39",
    desc: "Build consistent fitness habits.",
    perks: ["Access to all Gym Zones", "Base Workout Routines", "2 Core Assessment Check-ins"],
    featured: false,
  },
  {
    name: "Titan Track",
    price: "$79",
    desc: "Accelerate your athletic progression.",
    perks: ["Customized 12-Week Programs", "Full Biometric Analytics", "Weekly Form Review Sessions", "Sports Nutrition Guidance"],
    featured: true,
  },
  {
    name: "Elite Performance",
    price: "$129",
    desc: "1-on-1 coaching & active recovery.",
    perks: ["Dedicated Personal Trainer", "Premium Hydration & Recovery Zone", "Custom Smart Watch Sync Support", "Monthly DEXA Body Scans"],
    featured: false,
  },
];

const testimonials = [
  { 
    name: "Marcus Vance", 
    role: "Competitive Runner", 
    text: "The real-time metrics tracking completely transformed my training splits. Under Coach Vance, my recovery time dropped by 18% in the first month." 
  },
  { 
    name: "Rohan Kulkarni", 
    role: "Powerlifting Enthusiast", 
    text: "Titan's program structure is unparalleled. The weights feel heavy but the guidance makes it safe. Absolutely love the design and community." 
  },
  { 
    name: "Mira Sen", 
    role: "CrossFit Practitioner", 
    text: "Every session has a deliberate purpose. You don't just sweat; you learn, adapt, and improve form under expert watch." 
  },
];

const workouts = [
  {
    title: "Titan Strength Flow",
    trainer: "Sarah Chen",
    duration: "45 mins",
    calories: "450 kcal",
    level: "Intermediate" as const,
    category: "STRENGTH",
  },
  {
    title: "Oxygen Engine Cardio",
    trainer: "Marcus Vance",
    duration: "50 mins",
    calories: "620 kcal",
    level: "Advanced" as const,
    category: "CARDIO",
  },
  {
    title: "Mobility & Flow Block",
    trainer: "Aria Thorne",
    duration: "35 mins",
    calories: "220 kcal",
    level: "Beginner" as const,
    category: "RECOVERY",
  },
];

export default function Home() {
  // Animation variants for sequential spring letter reveals
  const textRevealContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 * i },
    }),
  };

  const textRevealItem = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 35,
      rotateX: 15,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120,
      },
    },
  };

  // Section 3D tilt reveal as they enter viewport
  const sectionReveal3D = {
    hidden: { opacity: 0, y: 70, rotateX: 10, transformPerspective: 1200 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 24,
        stiffness: 70,
        duration: 0.8,
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E0D] text-white overflow-x-hidden">
      {/* Header Navigation */}
      <NavBar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Interactive background canvas */}
        <BackgroundTitan />

        <div className="relative mx-auto max-w-6xl w-full px-5 z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <motion.div
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Dynamic tag indicator */}
              <motion.div 
                variants={textRevealItem}
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl mb-8"
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#C3FF00] animate-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C3FF00]" />
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-[#C3FF00] uppercase">
                  Titan Performance Training
                </span>
              </motion.div>

              {/* Title from Reference Image 2 - Spring animation */}
              <motion.h1 
                variants={textRevealItem}
                className="text-5xl font-extrabold tracking-tight text-white sm:text-7.5xl leading-[1.05]"
              >
                Be healthier.<br />
                Be stronger.<br />
                <span className="text-[#C3FF00]">Be confident.</span>
              </motion.h1>

              <motion.p 
                variants={textRevealItem}
                className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/60 font-medium"
              >
                Premium coaching, data-driven athletic conditioning, and high-energy training programs. Level up your performance today.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={textRevealItem}>
                <HeroCTA />
              </motion.div>

              {/* Micro specs */}
              <div className="mt-12 grid gap-4 grid-cols-3 border-t border-white/5 pt-8">
                {[
                  { k: "Personal Coaching", v: "Unlimited" },
                  { k: "Weekly Classes", v: "150+" },
                  { k: "Gym Facilities", v: "24/7 Access" },
                ].map((x, idx) => (
                  <motion.div
                    key={x.k}
                    variants={textRevealItem}
                    custom={idx}
                    className="flex flex-col"
                  >
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{x.k}</span>
                    <span className="mt-1 text-base font-extrabold text-white">{x.v}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Graphics/Dashboard Mockup Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="lg:col-span-5 relative w-full flex items-center justify-center"
            >
              {/* Interactive 3D Tilt Container for Tracker Mockup */}
              <TiltContainer className="w-full max-w-[420px] rounded-[36px]" maxTilt={6}>
                <div className="w-full rounded-[36px] border border-white/10 bg-[#111413]/85 p-8 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#C3FF00]/25 transition-colors duration-500">
                  
                  {/* Diagonal strip glow */}
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#C3FF00]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C3FF00]/15 transition-colors" />

                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/5" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#C3FF00]/10 border border-[#C3FF00]/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-[#C3FF00]" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold tracking-tight text-white">TITAN TRACKER</div>
                        <div className="text-[10px] font-bold text-white/40 tracking-wider">LIVE TELEMETRY</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full animate-pulse">
                      CONNECTED
                    </span>
                  </div>

                  {/* Micro Smart-Watch Render (Image Reference 1) */}
                  <div className="my-8 flex justify-center" style={{ transform: "translateZ(30px)" }}>
                    <div className="relative w-36 h-36 rounded-full border-[10px] border-zinc-900 bg-black flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                      {/* Watch face content */}
                      <div className="absolute inset-0.5 rounded-full border border-white/5 flex flex-col items-center justify-center p-2 text-center">
                        <div className="text-[8px] font-bold tracking-widest text-[#C3FF00] uppercase">TITAN</div>
                        
                        <div className="text-xl font-black text-white mt-1 leading-none tracking-tight">134</div>
                        <div className="text-[8px] font-bold text-white/50 tracking-wider uppercase">BPM ACTIVE</div>

                        {/* Micro progress ring */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-95" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                          <motion.circle 
                            cx="18" 
                            cy="18" 
                            r="15.915" 
                            fill="none" 
                            stroke="#C3FF00" 
                            strokeWidth="1.5" 
                            strokeDasharray="75, 100" 
                            strokeLinecap="round" 
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: "78, 100" }}
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                          />
                        </svg>

                        {/* Time */}
                        <div className="text-[8px] font-bold text-[#C3FF00] mt-1.5">10:14:18</div>
                      </div>

                      {/* Physical side buttons */}
                      <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-zinc-800 rounded-r" />
                      <div className="absolute right-[-14px] top-1/3 -translate-y-1/2 w-1.5 h-3 bg-zinc-950 rounded-r" />
                    </div>
                  </div>

                  {/* Heart Rate Stats progress bar */}
                  <div className="space-y-4" style={{ transform: "translateZ(15px)" }}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white/60">Target HR Zone</span>
                      <span className="font-extrabold text-[#C3FF00]">85% Max</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-[#C3FF00] to-[#b0e600]"
                      />
                    </div>
                  </div>
                </div>
              </TiltContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS INFINITE MARQUEE */}
      <section className="relative z-10 py-4 max-w-6xl mx-auto px-5">
        <MarqueeStats />
      </section>

      {/* METRICS & SMART WATCH INTEGRATION SECTION (REFERENCE IMAGES 1 & 3) */}
      <motion.section 
        id="metrics" 
        variants={sectionReveal3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-6xl px-5 py-24 sm:py-32 relative z-10"
      >
        <SectionHeading
          kicker="LIVE METRICS"
          title="Telemetry that drives performance"
          desc="Synchronize your personal tracker to monitor exact heart rate patterns, caloric expenditure, and daily athletic scores in real-time."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-12 items-stretch">
          
          {/* Neon Watch Trial Promo Card (Image Reference 3) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <WatchPromoCard />
          </div>

          {/* Biometrics Metrics cards list */}
          <div className="md:col-span-7 grid gap-4 sm:grid-cols-2">
            <MetricCard
              title="Heart Rate"
              value="134"
              unit="bpm"
              change="+12% active"
              icon={Heart}
              iconColor="text-rose-500"
              chartType="pulse"
            />
            <MetricCard
              title="Active Energy"
              value="580"
              unit="kcal"
              change="Goal 800"
              icon={Flame}
              iconColor="text-[#C3FF00]"
              chartType="bar"
            />
            <MetricCard
              title="Recovery Index"
              value="94"
              unit="%"
              change="Optimal condition"
              icon={TrendingUp}
              iconColor="text-emerald-400"
              chartType="ring"
              percent={94}
            />
            <TiltContainer className="w-full h-full rounded-3xl" maxTilt={15}>
              <div className="rounded-3xl border border-white/10 bg-[#111413]/70 p-6 backdrop-blur-xl flex flex-col justify-center items-center text-center h-full group hover:border-[#C3FF00]/25 transition-colors duration-300 shadow-md">
                <Sparkles className="h-8 w-8 text-[#C3FF00] mb-3 animate-pulse" style={{ transform: "translateZ(15px)" }} />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider" style={{ transform: "translateZ(10px)" }}>Sync Your Device</h4>
                <p className="mt-1.5 text-xs text-white/50 max-w-[200px]" style={{ transform: "translateZ(5px)" }}>Supports Garmin, Apple Watch, Polar, and Whoop sensors.</p>
              </div>
            </TiltContainer>
          </div>
        </div>
      </motion.section>

      {/* CLASSES & ENGINEERING SECTION */}
      <motion.section 
        variants={sectionReveal3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-6xl px-5 py-12 sm:py-16 relative z-10 border-t border-white/5"
      >
        <SectionHeading
          kicker="ATHLETIC SYSTEMS"
          title="Classes engineered for results"
          desc="High-intensity structural blocks focusing on progressive overload, agility, stamina, and deep athletic recovery."
        />

        <div className="mt-12">
          <FeatureCards />
        </div>
      </motion.section>

      {/* PROGRAMS WORKOUTS SECTION (SMALL CARD COMPONENTS) */}
      <motion.section 
        id="programs" 
        variants={sectionReveal3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-6xl px-5 py-24 sm:py-32 relative z-10"
      >
        <SectionHeading
          kicker="ATHLETIC TRACKS"
          title="Pick your focus session"
          desc="Check out our weekly program highlights. Each track is designed for different levels, trainers, and athletic targets."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w, index) => (
            <WorkoutCard
              key={w.title}
              title={w.title}
              trainer={w.trainer}
              duration={w.duration}
              calories={w.calories}
              level={w.level}
              category={w.category}
              index={index}
            />
          ))}
        </div>
      </motion.section>

      {/* MEMBERSHIP PRICING SECTION */}
      <motion.section 
        id="pricing" 
        variants={sectionReveal3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-6xl px-5 py-12 sm:py-16 relative z-10 border-t border-white/5"
      >
        <SectionHeading
          kicker="MEMBERSHIP PLANS"
          title="Transparent pricing. Pure performance."
          desc="Pick a membership tier that matches your goals. No confusing options—just results."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 items-stretch">
          {pricing.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className={`rounded-[32px] p-8 backdrop-blur-xl border flex flex-col justify-between ${
                p.featured
                  ? "border-[#C3FF00]/40 bg-gradient-to-b from-[#181E1C] to-[#0A0E0D] shadow-[0_15px_40px_rgba(195,255,0,0.06)] relative overflow-hidden"
                  : "border-white/10 bg-[#111413]/70"
              }`}
            >
              {p.featured && (
                <div className="absolute right-6 top-6 inline-flex items-center rounded-full bg-[#C3FF00] px-3.5 py-1 text-[9px] font-extrabold uppercase tracking-widest text-black shadow-lg">
                  RECOMMENDED
                </div>
              )}

              <div>
                <div className="text-xl font-bold tracking-tight text-white">{p.name}</div>
                <p className="mt-2 text-xs text-white/50 font-medium">{p.desc}</p>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{p.price}</span>
                  <span className="text-xs font-semibold text-white/40">/ month</span>
                </div>

                <div className="mt-8 space-y-4 border-t border-white/5 pt-6">
                  {p.perks.map((x) => (
                    <div key={x} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C3FF00]/10 border border-[#C3FF00]/20">
                        <Check className="h-3 w-3 text-[#C3FF00] stroke-[3]" />
                      </span>
                      <span className="text-xs text-white/70 font-semibold leading-normal">{x}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 ${
                  p.featured
                    ? "bg-[#C3FF00] text-black hover:bg-[#b0e600] shadow-[0_10px_20px_rgba(195,255,0,0.1)]"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Join Now
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS SECTION */}
      <motion.section 
        id="testimonials" 
        variants={sectionReveal3D}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-6xl px-5 py-24 sm:py-32 relative z-10"
      >
        <SectionHeading
          kicker="TESTIMONIALS"
          title="Stories from the training zone"
          desc="Real members. Measurable feedback. Genuine athletic improvement."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-[#111413]/70 p-8 backdrop-blur-xl flex flex-col justify-between"
            >
              <p className="text-sm leading-relaxed text-white/60 font-semibold italic">
                “{t.text}”
              </p>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-white">{t.name}</div>
                  <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase mt-0.5">{t.role}</div>
                </div>
                <div className="rounded-xl bg-[#C3FF00]/5 border border-[#C3FF00]/10 px-3 py-2">
                  <span className="text-[#C3FF00] text-xl font-serif">“</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/30 relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <div className="text-base font-extrabold tracking-wider text-white">
                TITAN <span className="text-[#C3FF00]">GYM</span>
              </div>
              <p className="mt-2 text-xs text-white/40 font-medium">Train hard. Recover smarter. Achieve precision.</p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: "#metrics", label: "Metrics" },
                { href: "#programs", label: "Programs" },
                { href: "#pricing", label: "Pricing" },
              ].map((x) => (
                <a
                  key={x.href}
                  href={x.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4.5 py-2 text-xs font-bold text-white/70 transition hover:bg-white/10"
                >
                  {x.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-semibold text-white/30 tracking-wide uppercase">
            <span>© {new Date().getFullYear()} TITAN Gym. All Rights Reserved.</span>
            <span>DESIGNED BY ANTIGRAVITY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


