import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type PillButtonVariant = "primary" | "dark" | "white" | "ghost";

export interface PillButtonProps {
  /** Visible label. */
  children: React.ReactNode;
  /** Visual style. Defaults to "primary". */
  variant?: PillButtonVariant;
  /** When present, renders a navigable link (<a>) instead of a <button>. */
  href?: string;
  /** Click handler (used for the <button> rendering). */
  onClick?: () => void;
  /** Renders a trailing circular ArrowUpRight chip. */
  showArrow?: boolean;
  /** Accessible label, used when the visible label is not descriptive enough. */
  ariaLabel?: string;
  /** Disables the control (button) or visually disables the link. */
  disabled?: boolean;
}

/**
 * The single shared pill-shaped button used across the landing page.
 *
 * Renders a Next.js <Link> (an <a>) when `href` is provided and the control is
 * enabled, otherwise a native <button>. Uses only design-system tokens
 * (primary/accent/neutral families) and the four typography roles. The `primary`
 * (lime) surface always pairs with dark `*-foreground` text — never white-on-lime.
 */

// Pill surface + label styles per variant (design-system tokens only).
const VARIANT_CLASSES: Record<PillButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-accent",
  dark: "bg-neutral-950 text-neutral-50 hover:bg-neutral-800",
  white: "bg-neutral-50 text-neutral-950 hover:bg-neutral-200",
  ghost:
    "bg-neutral-50/10 text-neutral-50 border border-neutral-50/20 hover:bg-neutral-50/20",
};

// Trailing arrow-chip styles per variant, kept legible against each surface.
const CHIP_CLASSES: Record<PillButtonVariant, string> = {
  primary: "bg-neutral-950 text-primary",
  dark: "bg-neutral-50 text-neutral-950",
  white: "bg-neutral-950 text-neutral-50",
  ghost: "bg-neutral-50/15 text-neutral-50",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 " +
  "text-normal font-medium transition-colors focus-visible:outline-none " +
  "focus-visible:ring-4 focus-visible:ring-ring/50 " +
  "disabled:opacity-50 disabled:pointer-events-none";

export default function PillButton({
  children,
  variant = "primary",
  href,
  onClick,
  showArrow = false,
  ariaLabel,
  disabled = false,
}: PillButtonProps) {
  const className = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CHIP_CLASSES[variant]}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  // Navigable link when an href is provided and the control is enabled.
  if (href && !disabled) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={className}
    >
      {content}
    </button>
  );
}
