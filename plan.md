# Animated Gym Landing Page — Plan

## Goal
Build a slick, dark-themed **animated gym landing page** inspired by the reference image
(Yahoo "internet organized around you" layout): a central animated **orbital core** with
floating glass cards orbiting it, bold headline, and smooth scroll/entrance animations —
re-themed for a gym/fitness brand.

## Tech Stack
- **Vite + React** (no SSR needed, fast dev server, easy preview)
- **GSAP** — orbital rotation, scroll-triggered reveals, timeline-based hero intro
- **Framer Motion** — component entrance animations, hover micro-interactions
- Plain CSS (CSS variables for design tokens) — no UI framework, keep it lightweight

## Design Direction
- **Theme:** dark (near-black `#0a0a12` base), violet/indigo accent (`#7c5cff`),
  glassmorphism cards (blur + subtle border), neon glow highlights
- **Typography:** large bold display headline with a colored accent word
  (e.g. "Train **stronger** every day")
- **Mood:** energetic, premium, modern fitness studio

## Page Structure (sections)
1. **Navbar** — logo, nav links (Classes, Trainers, Pricing), "Join Now" CTA button
2. **Hero**
   - Bold headline + subcopy + two CTAs ("Start Free Trial", "See How It Works")
   - Small stat row (e.g. 400+ Members · Certified Trainers · 24/7 Access)
   - **Animated orbital core**: glowing center (energy/pulse ring) with floating
     glass cards orbiting (Strength, Cardio, Yoga, HIIT, Nutrition, Recovery)
   - "Trending / Popular classes" side rail (like the reference's right column)
3. **Features** — why train with us (3–4 cards, scroll reveal)
4. **Classes** — grid of class types with imagery/icons
5. **Trainers** — trainer cards with hover lift
6. **Pricing** — 3 tiers (Basic / Pro / Elite), highlight the middle plan
7. **CTA band** — "Ready to start?" with join button
8. **Footer** — links, socials, copyright

## Animation Plan
- **Hero intro timeline (GSAP):** headline words stagger up, cards fade+scale in,
  orbit rings draw in
- **Orbital motion:** continuous slow rotation of the orbit container; cards
  counter-rotate so they stay upright (GSAP `repeat: -1`)
- **Center pulse:** scaling glow ring loop
- **Scroll reveals (GSAP ScrollTrigger):** sections fade/slide up on enter
- **Hover (Framer Motion):** card lift + glow on trainer/pricing/feature cards
- **Cursor-follow parallax (optional):** subtle tilt of orbital core toward cursor

## File Structure
```
Gym-Landing-page/
├── index.html
├── package.json
├── vite.config.js
├── plan.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css        # tokens, resets, shared utilities
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── OrbitalCore.jsx   # the animated globe/orbit centerpiece
    │   ├── Features.jsx
    │   ├── Classes.jsx
    │   ├── Trainers.jsx
    │   ├── Pricing.jsx
    │   ├── CTA.jsx
    │   └── Footer.jsx
    └── data/
        └── content.js        # text, class list, trainers, pricing tiers
```

## Dependencies
- `react`, `react-dom`
- `gsap` (includes ScrollTrigger)
- `framer-motion`
- dev: `vite`, `@vitejs/plugin-react`

## Build Steps (when resumed)
1. Scaffold config: `package.json`, `vite.config.js`, `index.html`, `main.jsx`, `App.jsx`
2. `npm install`
3. Global styles + design tokens
4. Navbar + Hero + OrbitalCore (the animated centerpiece — highest effort)
5. Remaining sections (Features → Footer)
6. Wire GSAP ScrollTrigger reveals
7. `npm run dev` / `npm run build` to verify it compiles
8. Polish: responsive breakpoints, reduced-motion fallback

## Open Questions / Decisions (defaults chosen)
- Brand name: placeholder **"PULSE"** gym (easy to rename)
- No backend/forms wiring — CTAs are visual only for now
- Images: use CSS gradients + icons (no external assets) to keep it self-contained;
  can swap in real photos later
- Accessibility: respect `prefers-reduced-motion`, keyboard-focusable nav/buttons

## Status
- [x] Environment checked (Node v22.13, npm 10.9)
- [x] Plan written
- [ ] Implementation — **paused, awaiting go-ahead**
