"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "Inspection",
    description:
      "Every vehicle is walked around and photographed under raking light to log existing swirl marks, chips and trim condition before any work begins.",
  },
  {
    step: "02",
    title: "Decontamination",
    description:
      "A pH-balanced pre-wash and clay treatment lift bonded tar, rail dust and industrial fallout so the paint is genuinely clean, not just rinsed.",
  },
  {
    step: "03",
    title: "Correction",
    description:
      "Where needed, machine polishing works through cutting and refining stages to remove swirl marks and restore a true, distortion-free reflection.",
  },
  {
    step: "04",
    title: "Protection",
    description:
      "Ceramic coating or paint protection film is applied under controlled conditions, locked in once the surface meets our finish standard.",
  },
  {
    step: "05",
    title: "Interior & Final Pass",
    description:
      "Cabin extraction, trim conditioning and a final panel-by-panel inspection under LED light confirm the car is ready to leave the studio.",
  },
];

export default function Process() {
  const ref = useScrollReveal<HTMLDivElement>({ targets: "[data-reveal]", start: "top 82%" });

  return (
    <section
      id="process"
      className="relative border-t border-white/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
          The Process
        </h2>

        <div ref={ref} className="mt-16 flex flex-col">
          {STEPS.map((item) => (
            <div
              key={item.step}
              data-reveal
              className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-white/10 py-8 last:border-b sm:grid-cols-[6rem_1fr_2fr] sm:gap-10 sm:py-10"
            >
              <span className="font-mono text-sm text-copper sm:text-base">
                {item.step}
              </span>
              <h3 className="font-display text-2xl font-semibold uppercase leading-tight text-bone sm:text-3xl">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-steel sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
