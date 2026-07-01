import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Zone = {
  label: string;
  description: string;
  image: string;
};

const ZoneCard = ({
  label,
  description,
  image,
  className,
}: Zone & { className?: string }) => {
  return (
    <article
      className={cn(
        "group relative aspect-4/5 w-full overflow-hidden rounded-2xl",
        className
      )}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 1024px) 20rem, (min-width: 640px) 40vw, 80vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/10 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-secondary">
        {label}
      </span>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
        <p className="max-w-40 text-sm font-medium leading-snug text-white">
          {description}
        </p>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-secondary transition-transform group-hover:scale-105">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </article>
  );
};

export default ZoneCard;
