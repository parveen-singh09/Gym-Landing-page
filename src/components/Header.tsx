"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import PillButton from "./PillButton";

/** A single navigation entry pointing at an in-page section anchor. */
interface NavLink {
  label: string;
  href: string;
}

/** The five required nav links, in left-to-right order (Req 4.2). */
const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Plans", href: "#plans" },
  { label: "Contacts", href: "#contacts" },
];

export interface HeaderProps {
  /** Overrides the default five nav links. */
  navLinks?: NavLink[];
}

/**
 * The navigation bar that renders inside the dark Hero_Block.
 *
 * Shows the `.TITAN` logo with a lime dot accent, the five in-page nav links
 * (centered on desktop), a "Log in" link, and a white "Try for free" pill.
 * Below `lg`, the links collapse into a `Menu`/`X` toggled panel while the logo
 * and "Try for free" pill stay visible and non-overlapping (Reqs 4.8, 9.4).
 *
 * In-page anchors use plain `<a href="#section">`: there is no route to
 * prefetch, so a native anchor (paired with CSS `scroll-behavior: smooth`)
 * is the right tool rather than `next/link`.
 */
export default function Header({ navLinks = NAV_LINKS }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between gap-4 py-4">
      {/* Logo: lime dot accent + TITAN wordmark (Req 4.1). */}
      <a
        href="#"
        aria-label="TITAN home"
        className="text-subheading font-black tracking-tight text-neutral-50"
      >
        <span className="text-primary">.</span>TITAN
      </a>

      {/* Desktop nav: centered, hidden below lg (Req 4.2). */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-normal text-neutral-400 transition-colors hover:text-neutral-50"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right cluster: Log in (desktop) + white "Try for free" pill + mobile toggle. */}
      <div className="flex items-center gap-4">
        <a
          href="#login"
          className="hidden text-normal text-neutral-50 transition-colors hover:text-neutral-400 lg:inline"
        >
          Log in
        </a>

        <PillButton variant="white" href="#plans" ariaLabel="Try for free">
          Try for free
        </PillButton>

        {/* Mobile menu toggle: visible below lg (Reqs 4.8, 9.4). */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-neutral-50 transition-colors hover:bg-neutral-50/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 lg:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile panel: revealed by the toggle, lists all five links + Log in (Req 4.8). */}
      {menuOpen && (
        <nav className="absolute left-0 right-0 top-full z-10 mt-4 flex flex-col gap-4 rounded-3xl bg-neutral-900 p-6 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-normal text-neutral-400 transition-colors hover:text-neutral-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#login"
            onClick={() => setMenuOpen(false)}
            className="text-normal text-neutral-50 transition-colors hover:text-neutral-400"
          >
            Log in
          </a>
        </nav>
      )}
    </header>
  );
}
