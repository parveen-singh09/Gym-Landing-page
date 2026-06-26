/**
 * Pure prop-validation helper for graceful degradation (design.md Req 2.5).
 *
 * Returns true when a required string prop is missing or blank (empty or
 * whitespace-only), signalling that the component should render a visible
 * placeholder in its place instead of failing to render.
 */
export function isBlank(value: string | undefined | null): boolean {
  return value == null || value.trim().length === 0;
}
