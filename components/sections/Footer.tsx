import { business } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-display text-lg font-semibold uppercase tracking-tight text-bone">
          Sood Motors
          <span className="ml-2 font-mono text-[0.6rem] font-normal tracking-[0.2em] text-steel-dim">
            Detailing Studio
          </span>
        </p>
        <p className="font-mono text-xs text-steel-dim">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
