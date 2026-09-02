"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { business } from "@/lib/business";
import { useScrollReveal } from "@/lib/useScrollReveal";

const FAQS = [
  {
    question: "How long does a full detail take?",
    answer:
      "It depends on the vehicle's condition and the services booked. Share your car's make, model and the service you're interested in when you message us, and we'll give you a realistic time estimate before you book.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes — send us your preferred date and time through the booking form or WhatsApp, and we'll confirm availability directly. This keeps each vehicle getting the time it actually needs.",
  },
  {
    question: "Should I get paint correction before ceramic coating?",
    answer:
      "If the paint has visible swirl marks, oxidation or fine scratches, correcting it first means the coating locks in a genuinely clear finish rather than sealing in existing imperfections. We'll assess this during inspection.",
  },
  {
    question: "Can I wait at the studio while my car is detailed?",
    answer:
      "For quicker services, yes. For a full detail or multi-stage correction, we'll let you know the expected timeline so you can decide whether to wait or drop the car off.",
  },
  {
    question: "How do I book or ask a question?",
    answer:
      "The fastest way is WhatsApp — tap the floating button anywhere on this site, or use the booking form, which opens a pre-filled WhatsApp message with your details.",
  },
];

export default function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>({ start: "top 85%" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="relative border-t border-white/10 bg-charcoal py-24 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl lg:text-7xl">
            FAQ
          </h2>
          <p className="max-w-sm text-balance text-steel">
            Answers to what people usually ask before their first visit.
            Anything else? Message us on WhatsApp.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-14 flex flex-col border-t border-white/10"
        >
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} data-reveal className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl font-semibold uppercase leading-tight text-bone sm:text-2xl">
                    {item.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-copper transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-steel sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-xs text-steel-dim">
          Still have a question? Call {business.phone} or message us on
          WhatsApp — link in the corner of every page.
        </p>
      </div>
    </section>
  );
}
