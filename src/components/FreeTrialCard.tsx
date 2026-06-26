import { ArrowUpRight } from "lucide-react";
import CircleIconButton from "./CircleIconButton";

interface FreeTrialCardProps {
  /** Headline shown on the lime surface. */
  title?: string;
  /** Supporting line beneath the headline. */
  subtitle?: string;
  /** Destination for the circular action button. */
  href?: string;
}

/**
 * Lime stats card promoting the free trial (Reqs 6.4, 6.5, 3.6).
 *
 * Renders the exact headline and subtitle plus a circular action button in the
 * top-right corner. Because the surface is lime (`bg-primary`), all text uses
 * the dark `*-foreground` tokens — never white-on-lime.
 */
export default function FreeTrialCard({
  title = "Get 14 days for free",
  subtitle = "Just give us a call or message us in the chat",
  href = "#",
}: FreeTrialCardProps) {
  return (
    <div className="relative flex h-full flex-col justify-between gap-6 rounded-3xl bg-primary p-6 text-primary-foreground">
      <div className="flex justify-end">
        <CircleIconButton
          icon={ArrowUpRight}
          ariaLabel="Get started"
          variant="dark"
          size="lg"
          href={href}
        />
      </div>

      <div>
        <h3 className="text-subheading text-primary-foreground">{title}</h3>
        <p className="mt-3 text-normal text-primary-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
