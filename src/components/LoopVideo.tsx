"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

/** A short muted loop that only loads and plays while it is on screen. */
export default function LoopVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className={className ?? "h-full w-full object-cover"}
    />
  );
}
