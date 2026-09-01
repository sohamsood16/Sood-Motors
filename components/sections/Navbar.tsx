"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { business, whatsapp } from "@/lib/business";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
      >
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl"
        >
          SOOD MOTORS
          <span className="ml-2 hidden font-mono text-[0.65rem] font-normal uppercase tracking-[0.25em] text-steel-dim sm:inline">
            Detailing Studio
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-steel transition-colors duration-200 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${business.phoneDial}`}
            className="font-mono text-sm text-steel transition-colors hover:text-bone"
          >
            {business.phone}
          </a>
          <a
            href="#booking"
            className="rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-copper"
          >
            Book a Detail
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-bone lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden bg-ink transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 border-t border-white/10 px-5 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg text-steel transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-3">
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="rounded-full bg-bone px-5 py-3 text-center text-sm font-medium text-ink"
              >
                Book a Detail
              </a>
              <a
                href={whatsapp.buildUrl(
                  `Hello ${business.name}, I'd like to know more about your services.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-center text-sm text-steel"
              >
                Message on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
