import AvatarGroup from "./AvatarGroup";

interface SatisfiedClientsCardProps {
  /** Avatars to display in the group (1..5). Defaults to four placeholder slots. */
  avatars?: { src?: string; alt: string }[];
  /** Supporting paragraph beneath the headline. */
  supportingText?: string;
}

// Default avatar slots render as neutral placeholders (no `src`) so the group
// always shows a consistent set even before real client photos are supplied.
const DEFAULT_AVATARS: { src?: string; alt: string }[] = [
  { alt: "Satisfied client" },
  { alt: "Satisfied client" },
  { alt: "Satisfied client" },
  { alt: "Satisfied client" },
];

const DEFAULT_SUPPORTING_TEXT =
  "They arrive with different goals, yet they all find the support and " +
  "motivation they need. Their success is the ultimate validation of our method.";

/**
 * White stats card highlighting the satisfied-client count (Req 6.2).
 *
 * Renders the exact "10,000+ satisfied clients" text, an `AvatarGroup` (1..5),
 * and supporting copy. Uses only design-system neutral tokens and the four
 * typography roles.
 */
export default function SatisfiedClientsCard({
  avatars = DEFAULT_AVATARS,
  supportingText = DEFAULT_SUPPORTING_TEXT,
}: SatisfiedClientsCardProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-neutral-50 p-6 text-neutral-950">
      <AvatarGroup avatars={avatars} max={5} />

      <div>
        <p className="text-subheading text-neutral-950">
          <span className="font-semibold">10,000+</span> satisfied clients
        </p>
        <p className="mt-3 text-normal text-neutral-500">{supportingText}</p>
      </div>
    </div>
  );
}
