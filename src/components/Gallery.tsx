"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "@/data/media";

type Props = {
  images: Img[];
  columns?: 2 | 3;
};

/** Masonry gallery with an accessible, keyboard-friendly lightbox. */
export default function Gallery({ images, columns = 3 }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className={`gap-3 [column-fill:_balance] sm:columns-2 md:gap-4 ${columns === 3 ? "lg:columns-3" : ""}`}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Enlarge image: ${img.alt}`}
              className="img-zoom group relative block w-full overflow-hidden bg-stone"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes={
                  columns === 3
                    ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    : "(min-width: 640px) 50vw, 100vw"
                }
                className="h-auto w-full"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label="Image viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
      >
        {current && (
          <div
            className="flex h-full w-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 text-xs uppercase tracking-[0.2em] text-white/70">
              <span aria-live="polite">
                {index! + 1} / {images.length}
              </span>
              <button type="button" onClick={close} className="px-2 py-2 hover:text-gold" autoFocus>
                Close ✕
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <button type="button" onClick={() => step(-1)} className="btn btn-outline !min-h-[2.75rem] !px-4">
                ← Prev
              </button>
              <p className="hidden truncate text-center text-sm text-white/60 sm:block">{current.alt}</p>
              <button type="button" onClick={() => step(1)} className="btn btn-outline !min-h-[2.75rem] !px-4">
                Next →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
