"use client";

import { ShieldCheck, Eye, Wrench, MessageSquare } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const POINTS = [
  {
    icon: Eye,
    title: "Inspection-first approach",
    description:
      "We walk every vehicle under raking light before quoting any work, so you know exactly what your paint needs — not a generic package.",
  },
  {
    icon: Wrench,
    title: "Stage-by-stage correction",
    description:
      "Polishing is done in measured cutting and refining stages rather than a single rushed pass, so the finish is even across every panel.",
  },
  {
    icon: ShieldCheck,
    title: "Protection built to last",
    description:
      "Ceramic coating and PPF are only applied once the surface has met our finish standard, so protection is sealed onto genuinely correct paint.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    description:
      "Bookings and updates go straight through WhatsApp with the studio — no call centre, no middleman.",
  },
];

export default function WhyChooseUs() {
  const ref = useScrollReveal<HTMLDivElement>({ start: "top 82%" });

  return (
    <section
      id="why-us"
      className="relative border-t border-white/10 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
          Why Choose Us
        </h2>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[2px] bg-white/10 sm:grid-cols-2"
        >
          {POINTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              data-reveal
              className="bg-charcoal p-8 sm:p-10"
            >
              <Icon className="h-6 w-6 text-copper" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight text-bone sm:text-3xl">
                {title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-steel sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
