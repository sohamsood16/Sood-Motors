"use client";

import { useState } from "react";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <section className="relative border-t border-white/10 bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Before / After
          </h2>
          <p className="max-w-sm text-balance text-steel">
            Drag the divider to see the difference correction and coating
            make to paint clarity.
          </p>
        </div>

        <div className="relative mt-14 aspect-[16/10] w-full select-none overflow-hidden rounded-[2px] border border-white/10 sm:aspect-[21/9]">
          {/* Before layer */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, #3a3d40 0%, #1c1f22 45%, #101214 100%)",
            }}
          >
            <span className="absolute left-5 top-5 rounded-full border border-white/15 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-steel">
              BEFORE
            </span>
          </div>

          {/* After layer, clipped by the slider position */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, #f3f1ec 0%, #c7cbd1 35%, #4a4e52 75%, #17191c 100%)",
              }}
            />
            <span className="absolute right-5 top-5 rounded-full border border-copper/50 bg-ink/40 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-copper">
              AFTER
            </span>
          </div>

          {/* Divider handle */}
          <div
            className="absolute inset-y-0 w-0.5 bg-bone"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-ink shadow-lg">
              <span aria-hidden="true" className="text-xs">
                ↔
              </span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Before and after comparison slider"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
