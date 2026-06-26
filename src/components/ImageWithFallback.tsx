"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  /** Tailwind classes for the fallback surface, e.g. "bg-neutral-800". */
  fallbackClassName?: string;
}

/**
 * Wraps `next/image` and renders a neutral fallback surface instead of a broken
 * image when loading fails. The fallback fills the same reserved box as the
 * image (via `fill` -> `absolute inset-0`, or the explicit `width`/`height`),
 * so swapping to it produces no layout shift and no broken-image icon.
 *
 * Per the modified Next.js image docs, every usage must set either `fill` or
 * both `width`+`height`, and uses the default quality (no `next.config.ts`
 * change required).
 */
export default function ImageWithFallback({
  fallbackClassName = "bg-neutral-800",
  fill,
  width,
  height,
  className,
  style,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    if (fill) {
      // `fill` mode: the parent reserves the box, so cover it absolutely.
      return (
        <div
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${fallbackClassName}`}
        />
      );
    }

    // `width`/`height` mode: reserve the same intrinsic box inline.
    return (
      <div
        aria-hidden="true"
        className={`${className ?? ""} ${fallbackClassName}`.trim()}
        style={{ width, height, ...style }}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={() => setErrored(true)}
    />
  );
}
