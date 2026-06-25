"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { useMemo } from "react";

export default function NavBar() {
    const { scrollY } = useScroll();
    const bg = useTransform(scrollY, [0, 180], ["rgba(0,0,0,0)", "rgba(2,6,23,0.78)"]);
    const blur = useTransform(scrollY, [0, 180], [0, 18]);

    const items = useMemo(
        () => [
            { href: "#classes", label: "Classes" },
            { href: "#programs", label: "Programs" },
            { href: "#pricing", label: "Pricing" },
            { href: "#testimonials", label: "Reviews" },
        ],
        []
    );

    return (
        <motion.header
            style={{ background: bg, backdropFilter: `blur(${blur}px)` }}
            className="fixed left-0 right-0 top-0 z-50 border-b border-white/10"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <Link href="/" className="group inline-flex items-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <Dumbbell className="h-5 w-5 text-amber-200" />
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white">
                        TITAN <span className="text-amber-200">GYM</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">
                    {items.map((it) => (
                        <a
                            key={it.href}
                            href={it.href}
                            className="text-sm text-white/70 transition hover:text-white"
                        >
                            {it.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <motion.a
                        href="#pricing"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="hidden rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_0_35px_rgba(250,204,21,0.25)] transition hover:bg-amber-200 sm:inline-flex"
                    >
                        Get Membership
                    </motion.a>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl lg:hidden"
                        aria-label="Menu"
                        onClick={() => {
                            const el = document.getElementById("classes");
                            el?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <span className="sr-only">Menu</span>
                        <span aria-hidden className="h-5 w-5">
                            ☰
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
}

