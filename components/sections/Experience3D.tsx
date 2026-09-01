"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const ExperienceCanvas = dynamic(
  () => import("@/components/three/ExperienceCanvas"),
  { ssr: false }
);

export default function Experience3D() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden border-t border-white/10 bg-ink py-24 sm:py-32"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-12">
        <div className="max-w-lg">
          <span className="font-mono text-xs tracking-[0.3em] text-copper">
            ENGINEERED PRECISION
          </span>
          <h2 className="mt-5 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl">
            Built like the cars we detail
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-steel">
            Every polish, coating and correction is measured, not eyeballed.
            This assembly turns as you scroll — a small nod to the
            tolerances we hold in the studio.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <ExperienceCanvas sectionRef={sectionRef} />
        </div>
      </div>
    </section>
  );
}
