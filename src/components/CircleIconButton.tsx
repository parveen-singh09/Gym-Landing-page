import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type CircleButtonVariant = "light" | "dark" | "lime" | "outline";
type CircleButtonSize = "sm" | "md" | "lg";

interface CircleIconButtonProps {
  icon: LucideIcon;
  ariaLabel: string; // required — icon-only control
  variant?: CircleButtonVariant;
  size?: CircleButtonSize; // 40/48/56px → h-10/h-12/h-14
  href?: string;
  onClick?: () => void;
  disabled?: boolean; // aria-disabled + visible disabled style
}

const VARIANT_CLASSES: Record<CircleButtonVariant, string> = {
  light: "bg-neutral-50 text-neutral-950",
  dark: "bg-neutral-950 text-neutral-50",
  lime: "bg-primary text-primary-foreground",
  outline: "border border-neutral-50/20 bg-transparent text-neutral-50",
};

// Container size + proportional icon size (all 4px multiples).
const SIZE_CLASSES: Record<CircleButtonSize, string> = {
  sm: "h-10 w-10", // 40px
  md: "h-12 w-12", // 48px
  lg: "h-14 w-14", // 56px
};

const ICON_CLASSES: Record<CircleButtonSize, string> = {
  sm: "h-5 w-5", // 20px
  md: "h-6 w-6", // 24px
  lg: "h-7 w-7", // 28px
};

export default function CircleIconButton({
  icon: Icon,
  ariaLabel,
  variant = "dark",
  size = "md",
  href,
  onClick,
  disabled = false,
}: CircleIconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full transition-transform outline-none hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-ring/50";

  const disabledClasses = disabled
    ? "pointer-events-none opacity-40"
    : "";

  const className = [
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    disabledClasses,
  ]
    .filter(Boolean)
    .join(" ");

  const icon = <Icon className={ICON_CLASSES[size]} strokeWidth={2.25} />;

  if (href && !disabled) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
    >
      {icon}
    </button>
  );
}
