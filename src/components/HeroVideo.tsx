"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  desktopSrc: string;
  mobileSrc: string;
};

/**
 * Background video for the homepage hero. The poster image is rendered by the
 * server underneath, so the page paints instantly; the video is attached after
 * hydration, sized for the device, and fades in once it can play.
 */
export default function HeroVideo({ desktopSrc, mobileSrc }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduceMotion || connection?.saveData) return;

    const small = window.matchMedia("(max-width: 900px)").matches;
    video.src = small ? mobileSrc : desktopSrc;
    video.load();

    const onCanPlay = () => {
      setReady(true);
      video.play().catch(() => undefined);
    };
    video.addEventListener("canplay", onCanPlay, { once: true });

    // Pause when the hero is off screen or the tab is hidden to save battery.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    io.observe(video);
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [desktopSrc, mobileSrc]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
