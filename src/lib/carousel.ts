/**
 * Pure carousel state logic for ZoneCarousel.
 *
 * Extracted as a pure reducer so navigation behavior can be unit- and
 * property-tested independently of the DOM (see design.md "Data Models" and
 * "Correctness Properties" → Property 1).
 */

/** State driving the carousel. */
export interface CarouselState {
  /** Current active card index, always within [0, count - 1]. */
  currentIndex: number;
  /** Number of cards (>= 1). */
  count: number;
}

/** The two navigation actions the carousel supports. */
export type CarouselAction = "next" | "prev";

/**
 * Pure carousel transition reducer.
 *
 * - "next" advances the index by 1, clamped to the last index (count - 1).
 * - "prev" decrements the index by 1, clamped to 0.
 *
 * At a boundary the index is left unchanged (Req 7.11).
 */
export function carouselReducer(
  state: CarouselState,
  action: CarouselAction,
): CarouselState {
  if (action === "next") {
    return {
      ...state,
      currentIndex: Math.min(state.currentIndex + 1, state.count - 1),
    };
  }
  return {
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0),
  };
}

/** True when at the first card — the left/prev control should be disabled. */
export function leftDisabled(state: CarouselState): boolean {
  return state.currentIndex === 0;
}

/** True when at the last card — the right/next control should be disabled. */
export function rightDisabled(state: CarouselState): boolean {
  return state.currentIndex === state.count - 1;
}
