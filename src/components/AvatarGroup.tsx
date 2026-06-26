import { User } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

interface AvatarGroupProps {
  /** 1..5 avatars; a missing `src` renders a neutral circle placeholder for that slot. */
  avatars: { src?: string; alt: string }[];
  /** Maximum number of avatars to render. Defaults to 5. */
  max?: number;
}

const AVATAR_SIZE = 40; // 40px = h-10 w-10 (4px multiple)

/**
 * Renders a row of overlapping circular avatars (capped at `max`, default 5).
 * Avatars with a `src` use `ImageWithFallback`; a missing or failed `src`
 * renders a neutral circle placeholder (a lucide `User` icon on `bg-neutral-300`)
 * so every slot stays visible and consistently sized (Reqs 6.2, 2.5).
 */
export default function AvatarGroup({ avatars, max = 5 }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);

  return (
    <div className="flex -space-x-3">
      {shown.map((avatar, index) => (
        <div
          key={index}
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-300 ring-2 ring-neutral-50"
        >
          {avatar.src ? (
            <ImageWithFallback
              src={avatar.src}
              alt={avatar.alt}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              fallbackClassName="bg-neutral-300"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span
              role="img"
              aria-label={avatar.alt}
              className="flex h-10 w-10 items-center justify-center text-neutral-500"
            >
              <User className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
