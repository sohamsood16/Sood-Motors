"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ScrollAssembly from "./ScrollAssembly";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";

export default function ExperienceCanvas({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [smallViewport, setSmallViewport] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);

    const widthMql = window.matchMedia("(max-width: 767px)");
    const widthHandler = (e: MediaQueryListEvent) => setSmallViewport(e.matches);
    widthMql.addEventListener("change", widthHandler);

    return () => {
      mql.removeEventListener("change", handler);
      widthMql.removeEventListener("change", widthHandler);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    ensureGsapRegistered();
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, [reduceMotion, sectionRef]);

  if (smallViewport) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-40 w-40 rounded-full border border-white/15 bg-[radial-gradient(circle_at_40%_35%,rgba(199,203,209,0.25),rgba(10,11,12,0.9))]" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.4, 6.4], fov: 38 }}
          frameloop={inView ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ScrollAssembly reduceMotion={reduceMotion} progressRef={progress} />
        </Canvas>
      </Suspense>
    </div>
  );
}
