"use client";

import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/business";

export default function WhatsAppFloat() {
  const url = whatsapp.buildUrl(
    "Hello Sood Motors Detailing Studio, I'd like to know more about your detailing services."
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sood Motors Detailing Studio on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105 focus-visible:outline-offset-4 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden" />
      <MessageCircle
        className="relative h-6 w-6 fill-ink text-ink"
        strokeWidth={0}
        aria-hidden="true"
      />
    </a>
  );
}
