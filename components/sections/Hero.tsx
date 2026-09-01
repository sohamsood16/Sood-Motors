"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set("[data-hero-item]", { opacity: 0, y: 26 })
        .set("[data-hero-canvas]", { opacity: 0, scale: 0.94 })
        .to("[data-hero-item]", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.15,
        })
        .to(
          "[data-hero-canvas]",
          { opacity: 1, scale: 1, duration: 1.2 },
          "-=0.7"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink pt-24"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-12">
        <div className="max-w-xl">
          <p
            data-hero-item
            className="font-mono text-xs tracking-[0.3em] text-copper"
          >
            KURUKSHETRA, HARYANA
          </p>

          <h1
            data-hero-item
            className="mt-6 font-display text-[16vw] font-semibold uppercase leading-[0.85] tracking-tight text-bone sm:text-[9vw] lg:text-[5.4vw]"
          >
            Precision.
            <br />
            Perfected.
          </h1>

          <p
            data-hero-item
            className="mt-7 max-w-md text-balance text-base leading-relaxed text-steel sm:text-lg"
          >
            Premium automotive detailing crafted to restore, protect and
            elevate your vehicle.
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-copper"
            >
              Book a Detail
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-200 hover:border-copper hover:text-copper"
            >
              Explore Services
            </a>
          </div>
        </div>

        <div
          data-hero-canvas
          className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none"
        >
          <HeroCanvas />
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-steel-dim transition-colors hover:text-steel sm:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
