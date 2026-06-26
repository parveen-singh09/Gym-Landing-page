# Design System

This project uses a constrained palette. **Only three color families are allowed: `primary`, `accent`, and `neutral`.** Never introduce any other hue (no blues, reds, greens outside the lime family, etc.). All tokens live in `src/app/globals.css`.

## Color families

### Primary — brand lime
Anchored at `primary-500 = #c3ff00`. Use for the main brand surfaces, primary CTAs, highlights, and focus rings.
- Scale: `primary-50` … `primary-950`
- Semantic: `bg-primary`, `text-primary`, `text-primary-foreground` (dark text to place on lime)

### Accent — derived deeper lime
Derived from the primary by deepening and slightly desaturating it (`accent-500 = #9dd400`). Use for secondary emphasis, hover states, and to separate a second tier of action from primary.
- Scale: `accent-50` … `accent-950`
- Semantic: `bg-accent`, `text-accent`, `text-accent-foreground`

### Neutral — grayscale
True grayscale (`neutral-50 … neutral-950`). Use for backgrounds, surfaces, body text, borders, and disabled states. This carries most of the UI.

## Semantic tokens (auto light/dark via `prefers-color-scheme`)
Prefer these over raw scale steps for surfaces and text so dark mode works automatically:
- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `bg-muted` / `text-muted-foreground`
- `border-border`
- `ring-ring` (focus rings, lime)

## Typography
Font sizes are decided **only** in the design system. Components must never set raw
font sizes (`text-lg`, `text-3xl`, `text-[20px]`, etc.). Use these four role utilities:

| Role | Utility | Size | Line height | Weight |
|------|---------|------|-------------|--------|
| Heading | `text-heading` | 2.25rem / 36px | 1.15 | 800 |
| Subheading | `text-subheading` | 1.5rem / 24px | 1.3 | 600 |
| Body | `text-body` | 1.125rem / 18px | 1.6 | inherited |
| Normal (default) | `text-normal` | 1rem / 16px | 1.5 | inherited |

- `heading` and `subheading` carry their own weight; `body` and `normal` inherit weight
  (add `font-medium` / `font-semibold` only when a specific element needs emphasis).

## Spacing
- IMPORTANT: All spacing must be a multiple of 4px. Use integer Tailwind spacing steps
  only (`p-1`=4px, `p-2`=8px, `p-3`=12px, `p-4`=16px, `gap-6`=24px, `gap-12`=48px …).
- Never use fractional steps (`p-0.5`, `gap-1.5`, etc.) or arbitrary non-multiples-of-4 values.

## Layout
- Sections are capped at `max-w-8xl` (96rem) and centered with `mx-auto`.
- `8xl` is a custom container token defined in `globals.css` (`--container-8xl: 96rem`).

## Rules
- IMPORTANT: Use only `primary`, `accent`, and `neutral`. No other colors.
- IMPORTANT: Use only the four typography roles for text size; never hardcode font sizes.
- IMPORTANT: All spacing is a multiple of 4px (integer Tailwind steps only).
- Section content is wrapped at `max-w-8xl` and centered.
- Lime is bright — always pair it with `*-foreground` (dark neutral) text, never white-on-lime.
- For surfaces/text that must adapt to light & dark, use the semantic tokens, not fixed neutral steps.
- Black/white surfaces should use `neutral-950` / `neutral-50` (not `#000` / `#fff`).
- Translucency for overlays/glass: layer `neutral-50/XX` or `neutral-950/XX` opacities.
