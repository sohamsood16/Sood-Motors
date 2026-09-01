"use client";

import { MapPin, Navigation } from "lucide-react";
import { business } from "@/lib/business";

export default function Location() {
  const mapQuery = encodeURIComponent(business.mapsQuery);
  const embedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <section
      id="location"
      className="relative border-t border-white/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
          Location
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="flex flex-col justify-between rounded-[2px] border border-white/10 bg-charcoal-soft p-8">
            <div>
              <MapPin className="h-6 w-6 text-copper" aria-hidden="true" />
              <p className="mt-5 font-display text-2xl font-semibold uppercase leading-snug text-bone">
                {business.name}
              </p>
              <address className="mt-3 text-balance not-italic leading-relaxed text-steel">
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.city}, {business.address.state}{" "}
                {business.address.postalCode}
              </address>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-copper"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-white/10 sm:aspect-[16/9]">
            <iframe
              title={`Map showing the location of ${business.name}`}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale invert-0"
              style={{ filter: "grayscale(0.4) contrast(1.05)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
