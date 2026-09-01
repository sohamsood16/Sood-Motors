"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/business";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useBooking } from "@/lib/BookingContext";

export default function Services() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState<string | null>(null);
  const { selectService } = useBooking();

  return (
    <section
      id="services"
      className="relative border-t border-white/10 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          ref={ref}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2
            data-reveal
            className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl"
          >
            Services
          </h2>
          <p
            data-reveal
            className="max-w-sm text-balance text-steel"
          >
            Eight disciplines, one standard: every vehicle leaves the studio
            looking deliberately cared for.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              data-reveal
              onMouseEnter={() => setActive(service.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => selectService(service.title)}
              className="group relative flex min-h-[280px] flex-col justify-between border-b border-r border-white/10 p-7 text-left transition-colors duration-300 hover:bg-charcoal-soft sm:min-h-[320px] [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-steel-dim">
                  N&deg;{service.number}
                </span>
                <ArrowUpRight
                  className={`h-5 w-5 text-steel-dim transition-all duration-300 ${
                    active === service.id
                      ? "-translate-y-0.5 translate-x-0.5 text-copper"
                      : ""
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold uppercase leading-tight text-bone sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {service.description}
                </p>
                <span className="mt-5 inline-block text-xs font-medium uppercase tracking-[0.15em] text-copper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Book this service
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
