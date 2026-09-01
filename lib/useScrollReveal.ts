"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";

interface RevealOptions {
  /** CSS selector, scoped to the container, for the elements to animate in. */
  targets?: string;
  y?: number;
  stagger?: number;
  start?: string;
}

/**
 * Fades + lifts matching children into view once the container scrolls into
 * the viewport. Falls back to a no-op when the user prefers reduced motion.
 */
export function useScrollReveal<T extends HTMLElement>({
  targets = "[data-reveal]",
  y = 32,
  stagger = 0.08,
  start = "top 78%",
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    ensureGsapRegistered();
    const el = ref.current;
    const items = el.querySelectorAll(targets);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [targets, y, stagger, start]);

  return ref;
}
