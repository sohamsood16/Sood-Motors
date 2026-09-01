"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { galleryItems } from "@/lib/gallery";
import { useScrollReveal } from "@/lib/useScrollReveal";

const SPAN_CLASSES: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  square: "",
};

export default function Gallery() {
  const ref = useScrollReveal<HTMLDivElement>({ start: "top 85%" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length
    );
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section
      id="gallery"
      className="relative border-t border-white/10 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Gallery
          </h2>
          <p className="max-w-sm text-balance text-steel">
            A look inside the studio — from foam wash to final inspection.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 sm:gap-4"
        >
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-reveal
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-[2px] text-left ${SPAN_CLASSES[item.span]} aspect-square sm:aspect-auto`}
              aria-label={`Open ${item.title} image`}
            >
              <div
                className="absolute inset-0 scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
                style={{ background: item.gradient }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-steel-dim">
                  {item.category.toUpperCase()}
                </span>
                <span className="mt-1 font-display text-lg font-semibold uppercase leading-tight text-bone sm:text-xl">
                  {item.title}
                </span>
              </div>
              <Expand
                className="absolute right-3 top-3 h-4 w-4 text-bone/0 transition-colors duration-300 group-hover:text-bone/80"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryItems[activeIndex].title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-5 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-copper hover:text-copper"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-copper hover:text-copper sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2px]">
            <div
              className="absolute inset-0"
              style={{ background: galleryItems[activeIndex].gradient }}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-transparent to-transparent p-6">
              <span className="font-mono text-xs tracking-[0.2em] text-steel-dim">
                {galleryItems[activeIndex].category.toUpperCase()}
              </span>
              <span className="mt-1 font-display text-3xl font-semibold uppercase text-bone">
                {galleryItems[activeIndex].title}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone transition-colors hover:border-copper hover:text-copper sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
