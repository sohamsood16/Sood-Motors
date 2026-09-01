"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import PrecisionAssembly from "./PrecisionAssembly";

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-[2px]"
    >
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="rimGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#3a3f45" />
            <stop offset="55%" stopColor="#17191c" />
            <stop offset="100%" stopColor="#0a0b0c" />
          </radialGradient>
          <linearGradient id="metalStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e7e9ec" />
            <stop offset="50%" stopColor="#8f949a" />
            <stop offset="100%" stopColor="#c1743c" />
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#rimGlow)" />
        <g transform="translate(300 300)">
          <circle r="210" fill="none" stroke="#2a2d30" strokeWidth="1" />
          <circle
            r="150"
            fill="none"
            stroke="url(#metalStroke)"
            strokeWidth="10"
          />
          <circle r="95" fill="none" stroke="#4a4e52" strokeWidth="4" />
          <circle r="26" fill="#c1743c" opacity="0.85" />
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            const x1 = Math.cos(angle) * 30;
            const y1 = Math.sin(angle) * 30;
            const x2 = Math.cos(angle) * 130;
            const y2 = Math.sin(angle) * 130;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#aeb3b9"
                strokeWidth="9"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [smallViewport, setSmallViewport] = useState(
    () => window.matchMedia("(max-width: 639px)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);

    const widthMql = window.matchMedia("(max-width: 639px)");
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
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // On small screens we ship a static SVG composition instead of paying for
  // a WebGL context — real 3D is reserved for viewports that benefit from it.
  const useCanvas = !smallViewport && !reduceMotion;

  return (
    <div ref={containerRef} className="h-full w-full">
      {useCanvas ? (
        <Suspense fallback={<StaticFallback />}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 6], fov: 40 }}
            frameloop={inView ? "always" : "never"}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <PrecisionAssembly reduceMotion={reduceMotion} />
          </Canvas>
        </Suspense>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
