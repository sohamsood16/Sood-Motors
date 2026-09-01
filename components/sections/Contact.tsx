"use client";

import { Phone, MessageCircle, Camera, Clock } from "lucide-react";
import { business, whatsapp } from "@/lib/business";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/10 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <div>
            <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
              Contact
            </h2>
            <p className="mt-6 max-w-md text-balance leading-relaxed text-steel">
              Questions about a service, timing, or your specific vehicle?
              Reach the studio directly — we reply fastest on WhatsApp.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${business.phoneDial}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-bone transition-colors duration-200 hover:border-copper hover:text-copper"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phone}
              </a>
              <a
                href={whatsapp.buildUrl(
                  `Hello ${business.name}, I have a question about your services.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-bone transition-colors duration-200 hover:border-copper hover:text-copper"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-bone transition-colors duration-200 hover:border-copper hover:text-copper"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>

          <div className="rounded-[2px] border border-white/10 bg-charcoal p-8">
            <div className="flex items-center gap-2 text-bone">
              <Clock className="h-5 w-5 text-copper" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.2em] text-steel-dim">
                OPENING HOURS
              </span>
            </div>
            <dl className="mt-6 flex flex-col divide-y divide-white/10">
              {business.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <dt className="text-steel">{h.day}</dt>
                  <dd className="font-mono text-bone">
                    {h.open} – {h.close}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
