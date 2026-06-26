"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Dumbbell, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

export default function NavBar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(10, 14, 13, 0)", "rgba(10, 14, 13, 0.85)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.08)"]);
  const blur = useTransform(scrollY, [0, 80], [0, 16]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = useMemo(
    () => [
      { href: "#metrics", label: "Metrics" },
      { href: "#programs", label: "Programs" },
      { href: "#pricing", label: "Pricing" },
      { href: "#testimonials", label: "Reviews" },
    ],
    []
  );

  return (
    <>
      <motion.header
        style={{ 
          background: bg, 
          backdropFilter: `blur(${blur}px)`,
          borderBottomColor: borderOpacity
        }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-[#C3FF00]/10 transition-colors">
              <Dumbbell className="h-5 w-5 text-[#C3FF00] group-hover:scale-110 transition-transform" />
            </span>
            <span className="text-base font-extrabold tracking-wider text-white">
              TITAN <span className="text-[#C3FF00]">GYM</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-sm font-semibold tracking-wide text-white/70 transition hover:text-[#C3FF00]"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden rounded-full bg-[#C3FF00] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#b0e600] sm:inline-flex"
            >
              Get Membership
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl lg:hidden"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="text-xl">
                {mobileMenuOpen ? "✕" : "☰"}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-[73px] z-40 bg-[#0A0E0D]/95 border-b border-white/10 backdrop-blur-2xl p-6 lg:hidden"
        >
          <nav className="flex flex-col gap-4">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-white/80 hover:text-[#C3FF00] transition-colors py-2 border-b border-white/5"
              >
                {it.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#C3FF00] py-3 text-sm font-bold text-black uppercase tracking-wider"
            >
              Get Membership
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </motion.div>
      )}
    </>
  );
}


