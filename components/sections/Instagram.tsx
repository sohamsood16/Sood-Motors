"use client";

import { Camera } from "lucide-react";
import { business } from "@/lib/business";

const TILES = [
  "linear-gradient(160deg, #2a2d30 0%, #101214 60%, #c1743c 140%)",
  "radial-gradient(circle at 40% 30%, #f3f1ec 0%, #74797f 35%, #101214 100%)",
  "radial-gradient(circle at 60% 60%, #c7cbd1 0%, #2a2d30 55%, #0a0b0c 100%)",
  "linear-gradient(200deg, #8a5530 0%, #17191c 55%, #0a0b0c 100%)",
  "conic-gradient(from 120deg at 50% 50%, #1c1f22, #7fa4c9 25%, #1c1f22 55%, #c1743c 85%, #1c1f22)",
  "radial-gradient(circle at 30% 70%, #f3f1ec 0%, #4a4e52 40%, #0a0b0c 100%)",
];

export default function InstagramSection() {
  return (
    <section className="relative border-t border-white/10 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-copper">
              @SOODMOTORSDETAILINGSTUDIO
            </span>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
              Follow the Craft
            </h2>
          </div>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-bone transition-colors duration-200 hover:border-copper hover:text-copper"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Follow Us on Instagram
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {TILES.map((gradient, i) => (
            <a
              key={i}
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Sood Motors Detailing Studio on Instagram"
              className="group relative aspect-square overflow-hidden rounded-[2px]"
            >
              <div
                className="absolute inset-0 scale-105 transition-transform duration-500 group-hover:scale-115"
                style={{ background: gradient }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40">
                <Camera
                  className="h-5 w-5 text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
