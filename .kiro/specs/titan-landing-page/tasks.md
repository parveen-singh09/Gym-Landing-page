# Implementation Plan: TITAN Landing Page

## Overview

This plan rebuilds the gym landing page from scratch as a composition of reusable React
components in the project's modified Next.js 16.2.9 (App Router), React 19, Tailwind CSS v4,
TypeScript, and `lucide-react`. Work proceeds bottom-up: first the test tooling, then the
pure helpers and shared primitives, then each section component (with its property/unit
tests placed close to the implementation), then removal of obsolete components, and finally
wiring everything into `page.tsx` followed by a build verification.

Throughout, implementers MUST read the relevant guides in `node_modules/next/dist/docs/`
before writing any image or navigation code (this is a **modified** Next.js with breaking
changes — notably `<Image>`'s `priority` prop is deprecated in favor of `preload`). Use only
Design_System tokens (`primary`/`accent`/`neutral`, the four typography roles, 4px-multiple
spacing, `max-w-8xl mx-auto`) and the Satoshi font.

## Tasks

- [x] 1. Set up the test tooling (Vitest + React Testing Library + fast-check)
  - Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, and
    `fast-check` as devDependencies; add a `vitest.config.ts` using the `jsdom` environment
    and a setup file that imports `@testing-library/jest-dom`
  - Add a `test` script that runs Vitest with the `--run` flag (single, non-watch execution)
  - Add a smoke test (`src/test/setup.test.ts`) that asserts the toolchain renders a trivial
    component, to confirm the harness works
  - _Requirements: 10.5_

- [x] 2. Extract and test pure logic helpers
  - [x] 2.1 Implement `carouselReducer` and `isBlank` pure helpers
    - Create `src/lib/carousel.ts` exporting `CarouselState`, `CarouselAction`, and the
      pure `carouselReducer` (clamps via `Math.min`/`Math.max`) plus derived
      `leftDisabled`/`rightDisabled` helpers
    - Create `src/lib/isBlank.ts` exporting the pure `isBlank(value)` helper
    - _Requirements: 7.9, 7.10, 7.11, 2.5_

  - [ ]* 2.2 Write property test for carousel navigation bounds
    - **Property 1: Carousel navigation stays in bounds and steps by one**
    - Use `fast-check` with `fc.integer({ min: 1, max: 12 })` for count, a `fc.nat` mapped
      into `[0, n-1]` for the start index, and `fc.array(fc.constantFrom("next","prev"))`
      for the action sequence; assert the index stays in `[0, n-1]`, that `next` steps +1
      unless at `n-1`, and `prev` steps -1 unless at `0`; `numRuns: 100`
    - Tag: `Feature: titan-landing-page, Property 1`
    - **Validates: Requirements 7.9, 7.10, 7.11**

- [x] 3. Build shared primitive components
  - [x] 3.1 Implement `PillButton`
    - Create `src/components/PillButton.tsx` with the `primary` / `dark` / `white` / `ghost`
      variants, optional `href` (renders `<a>` else `<button>`), optional trailing
      `ArrowUpRight` chip via `showArrow`, `ariaLabel`, and `disabled`
    - Apply a visible focus ring (`focus-visible:ring-4 focus-visible:ring-ring/50`); lime
      surface must use `*-foreground` dark text (never white-on-lime)
    - Read `node_modules/next/dist/docs/.../04-linking-and-navigating.md` before adding the
      `href` navigation path
    - _Requirements: 2.4, 5.4, 5.5, 3.6, 10.4_

  - [x] 3.2 Implement `CircleIconButton`
    - Create `src/components/CircleIconButton.tsx` accepting a `lucide-react` `LucideIcon`,
      required `ariaLabel`, `light`/`dark`/`lime`/`outline` variants, `sm`/`md`/`lg` sizes
      (40/48/56px), optional `href`/`onClick`, and `disabled` (sets `aria-disabled` + visible
      disabled style)
    - Apply a visible focus ring; icon-only so `ariaLabel` is required
    - _Requirements: 2.4, 7.11, 10.4_

  - [x] 3.3 Implement `ImageWithFallback` (Client)
    - Create `src/components/ImageWithFallback.tsx` with `"use client"`; wrap `next/image`,
      track `errored` state, and on `onError` render a fallback `div` (`fallbackClassName`,
      default `bg-neutral-800`) filling the same reserved box (no layout shift)
    - Read `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` and
      `.../03-api-reference/02-components/image.md` first; ensure every usage sets `fill` or
      `width`+`height` and uses default quality (no `next.config.ts` change)
    - _Requirements: 5.3, 8.5, 2.5, 10.1, 10.3_

  - [x] 3.4 Implement `SectionBoundary` (Client)
    - Create `src/components/SectionBoundary.tsx` with `"use client"` as a React error
      boundary (`componentDidCatch`/state); render `children` normally, and on a child render
      error log `name` and render `null` so only the failed section is omitted
    - _Requirements: 1.4_

  - [x] 3.5 Implement `AvatarGroup`
    - Create `src/components/AvatarGroup.tsx` rendering 1–5 avatars via `ImageWithFallback`;
      a missing/failed `src` renders a neutral circle placeholder for that slot
    - _Requirements: 6.2, 2.5_

- [~] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Build the Header section
  - [x] 5.1 Implement `Header` (Client)
    - Rewrite `src/components/Header.tsx` with `"use client"`: `.TITAN` logo with a lime dot
      accent, exactly five nav links ("Services", "Schedule", "Gallery", "Plans", "Contacts"
      in order) linking to in-page anchors, a "Log in" link, and a `PillButton variant="white"`
      "Try for free"; meant to render inside the dark `Hero_Block`
    - Add `useState` mobile menu: `Menu`/`X` toggle below `lg` revealing all five links;
      keep logo and "Try for free" visible/non-overlapping at ≤767px
    - Read the linking-and-navigating doc before wiring anchor navigation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 9.4_

  - [ ]* 5.2 Write unit tests for `Header`
    - Assert the five labels render in order, the "Log in" link and white "Try for free"
      pill exist, and the mobile toggle reveals all five links below `lg`
    - _Requirements: 4.2, 4.3, 4.4, 4.8_

- [x] 6. Build the Hero section
  - [x] 6.1 Implement `Hero` (Server)
    - Rewrite `src/components/Hero.tsx`: headline "Be helthier. Be stronger. Be confident."
      (exact spelling) in `text-neutral-50` using `text-heading`; background via
      `ImageWithFallback` (`fill`, `object-cover`, `sizes`, decorative `alt=""`, transparent
      fallback so the dark Hero_Block shows through); a `PillButton variant="primary"`
      "Try for free" with arrow and a `PillButton variant="ghost"` "More about Titan"
    - **Update image usage from the deprecated `priority` prop to `preload`** per the
      modified Next.js image docs; read `.../02-components/image.md` before editing
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.1, 10.2, 10.3_

  - [ ]* 6.2 Write unit tests for `Hero`
    - Assert the exact headline text, both action buttons with their accessible labels/focus
      behavior, and that forcing the background image `onError` keeps headline/buttons visible
    - _Requirements: 5.1, 5.3, 5.4, 5.5_

- [x] 7. Build the Stats_Row section
  - [x] 7.1 Implement the three cards (`SatisfiedClientsCard`, `SleepTipCard`, `FreeTrialCard`)
    - `SatisfiedClientsCard` — white (`bg-neutral-50`), exact "10,000+ satisfied clients",
      an `AvatarGroup` (1–5), and supporting text
    - `SleepTipCard` — dark (`bg-neutral-800`), two `CircleIconButton`
      (`ChevronLeft`/`ChevronRight`), the exact sleep text, footer "Moscow, Russia" / "Nov.20"
    - `FreeTrialCard` — lime (`bg-primary`), exact "Get 14 days for free" + "Just give us a
      call or message us in the chat", a `CircleIconButton`; all text uses dark `*-foreground`
      tokens (never white on lime)
    - _Requirements: 6.2, 6.3, 6.4, 6.5, 3.6_

  - [x] 7.2 Implement `StatsRow` layout
    - Create `src/components/StatsRow.tsx` composing the three cards in a responsive grid:
      `grid-cols-1` stacked white→dark→lime at ≤767px, a non-overlapping arrangement at
      768–1023px, and `lg:grid-cols-3` single row with `items-stretch` at ≥1024px
    - _Requirements: 6.1, 6.6, 9.1, 9.2, 9.3_

  - [ ]* 7.3 Write unit tests for the cards and `StatsRow`
    - Assert each card's exact text, the avatar count (1–5), lime-card dark-text tokens, and
      the responsive grid class breakpoints
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [~] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Build the Welcome_Section, ZoneCarousel, and ZoneCard
  - [-] 9.1 Implement `ZoneCard` (Server)
    - Create `src/components/ZoneCard.tsx` accepting `imageSrc`, `imageAlt`, `tag` (1–40),
      `caption` (1–200), optional `href`; render the image via `ImageWithFallback`, the tag
      label, the caption, and exactly one in-bounds circular arrow `CircleIconButton`
    - Use `isBlank` to render a visible placeholder for any blank required prop without
      failing to render the rest
    - _Requirements: 2.2, 2.5, 7.4, 7.5, 7.6, 7.7, 10.2_

  - [ ]* 9.2 Write property test for `ZoneCard` rendering
    - **Property 2: Zone_Card renders any valid tag, caption, and image**
    - Use `fast-check` with `fc.string({ minLength: 1, maxLength: 40 })` for tag,
      `fc.string({ minLength: 1, maxLength: 200 })` for caption, plus a generated image
      source; assert the rendered output contains the tag text, caption text, and an image
      referencing the source; `numRuns: 100`
    - Tag: `Feature: titan-landing-page, Property 2`
    - **Validates: Requirements 2.2**

  - [ ]* 9.3 Write property test for blank-prop resilience
    - **Property 4: Missing required props degrade gracefully with a placeholder**
    - Use `fast-check` with a blank-string generator
      (`fc.stringOf(fc.constantFrom(" ", "\t", "\n"))` unioned with `fc.constant("")`);
      assert `ZoneCard` (and `FeatureTile` once it exists) renders without throwing, shows a
      visible placeholder for the blank prop, and still renders the other provided content;
      `numRuns: 100`
    - Tag: `Feature: titan-landing-page, Property 4`
    - **Validates: Requirements 2.5**

  - [x] 9.4 Implement `ZoneCarousel` (Client)
    - Create `src/components/ZoneCarousel.tsx` with `"use client"`; hold `currentIndex` using
      `carouselReducer`, render the active `ZoneCard`(s), and one left + one right
      `CircleIconButton` anchored bottom-right of the section; next/prev transition within
      500ms via CSS transition; at a boundary the index is unchanged and the actioned control
      is shown disabled
    - _Requirements: 7.7, 7.8, 7.9, 7.10, 7.11_

  - [x] 9.5 Implement `WelcomeSection` (Server)
    - Rewrite `src/components/WelcomeSection.tsx`: a "Sport center" pill tag, the welcome
      heading (`text-heading`, `text-foreground`), a `PillButton variant="dark"` "More", and
      the `ZoneCarousel` fed the Power zone (`/images/power-zone.jpg`) and Cardio zone
      (`/images/cardio-zone.jpg`) cards with the "Space for working with free weights" caption
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 2.1_

  - [ ]* 9.6 Write unit tests for `WelcomeSection` / `ZoneCarousel`
    - Assert the tag, heading, "More" button, both zone cards with their tags/captions, and
      the boundary behavior (left disabled at index 0, right disabled at last index)
    - _Requirements: 7.1, 7.2, 7.3, 7.8, 7.11_

- [x] 10. Build the Features_Bento and FeatureTile
  - [x] 10.1 Implement `FeatureTile` (Server)
    - Create `src/components/FeatureTile.tsx` with `text` and `stat` variants accepting
      `text` (1–200), optional `statValue` (required for `stat`), optional `icon`
      (`lucide-react`) or `imageSrc`/`imageAlt`; use `isBlank` to render a visible placeholder
      for blank required props without failing
    - _Requirements: 2.3, 2.5, 10.4, 10.2_

  - [ ]* 10.2 Write property test for `FeatureTile` rendering
    - **Property 3: Feature_Tile renders any valid text and visual**
    - Use `fast-check` with `fc.string({ minLength: 1, maxLength: 200 })` for text plus a
      generated icon or image source; assert the rendered output contains the text and the
      chosen visual (icon or image); `numRuns: 100`
    - Tag: `Feature: titan-landing-page, Property 3`
    - **Validates: Requirements 2.3**

  - [x] 10.3 Implement `FeaturesBento` (Server)
    - Rewrite `src/components/FeaturesBento.tsx`: a `bg-neutral-950` rounded panel with an
      `ImageWithFallback` gym background (`fill`, `object-cover`, decorative `alt=""`,
      `fallbackClassName="bg-neutral-800"`), the centered lime `.T` decorative text mark
      (`aria-hidden`, layered above the background and behind the tiles, sized via a
      `text-heading` role + transform, not a raw font-size), and a grid of all nine
      `FeatureTile`s — left group of 4 ("Professional coaches…", "The medical professional's
      office", stat "4 sports zones", "A bar serving wholesome drinks") and right group of 5
      ("Wi-Fi Free", "Tanning bed", "Fitness trackers and smart analysis", "Various kinds of
      massage", stat "500 M²"), with the icon mapping from the design
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 2.1, 10.4_

  - [ ]* 10.4 Write unit tests for `FeaturesBento`
    - Assert all nine tiles render with their exact content, the `.T` mark is present and
      `aria-hidden`, and forcing the background `onError` keeps the tiles and `.T` mark visible
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [~] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Remove obsolete components
  - Delete `src/components/PromoCard.tsx`, `src/components/MoreAboutButton.tsx`,
    `src/components/Button.tsx`, and `src/components/FeatureCard.tsx`, which are replaced by
    the new shared components and violate the palette/typography rules
  - Confirm no remaining file imports any of the removed components
  - _Requirements: 1.1, 1.3, 3.1, 3.2_

- [x] 13. Wire everything into `page.tsx`
  - [x] 13.1 Compose the page in top-to-bottom order
    - Rewrite `src/app/page.tsx` (Server) to render, exactly once and in order, the `Header`,
      `Hero`, and `StatsRow` inside a dark rounded `Hero_Block` wrapper, then `WelcomeSection`,
      then `FeaturesBento`; wrap each composed section in a `SectionBoundary` so a single
      section failure omits only that section; cap each section at `max-w-8xl mx-auto` with
      horizontal padding and a root `overflow-x-hidden` safeguard; remove all previous-page
      markup
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.4, 3.5, 9.5_

  - [ ]* 13.2 Write integration tests for page composition
    - Assert the five sections render once each in document order, that a thrown error in one
      section leaves the others intact, and that no obsolete-component markup remains
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 14. Add the static design-system compliance scan
  - [ ]* 14.1 Write a static-scan test over `src/` component source
    - Scan for disallowed tokens: foreign hues, raw hex/`bg-[...]` colors, raw font-size
      utilities (`text-lg`, `text-[20px]`, …), fractional/arbitrary non-4px spacing, and
      white-on-lime; fail on any match (reuse ESLint where possible)
    - _Requirements: 3.1, 3.2, 3.3, 3.6, 3.7, 6.5, 10.1, 10.3, 10.4_

- [x] 15. Final build verification
  - Run the project build (`npm run build` / `next build`) and `tsc --noEmit`; confirm the
    build completes successfully with zero TypeScript type errors, fixing any errors reported
    with their file name and source location
  - _Requirements: 10.5, 10.6_

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core
  implementation tasks are never optional.
- Each task references the specific requirement clauses it satisfies for traceability.
- Property-based test tasks (2.2, 9.2, 9.3, 10.2) each reference a single design property and
  use `fast-check` with at least 100 iterations.
- Checkpoints (4, 8, 11) ensure incremental validation as the page is assembled.
- Before writing any image or navigation code, read the relevant guides under
  `node_modules/next/dist/docs/` — this is a modified Next.js (`priority` → `preload`).

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2.1", "12"] },
    { "id": 1, "tasks": ["2.2", "3.1", "3.2", "3.3", "3.4"] },
    { "id": 2, "tasks": ["3.5", "5.1", "6.1", "9.1", "10.1"] },
    { "id": 3, "tasks": ["5.2", "6.2", "7.1", "9.2", "9.3", "10.2"] },
    { "id": 4, "tasks": ["7.2", "9.4", "10.3"] },
    { "id": 5, "tasks": ["7.3", "9.5", "10.4"] },
    { "id": 6, "tasks": ["9.6", "13.1"] },
    { "id": 7, "tasks": ["13.2", "14.1"] },
    { "id": 8, "tasks": ["15"] }
  ]
}
```
