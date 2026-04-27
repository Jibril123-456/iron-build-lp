"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

export function FAQ() {
  const f = siteConfig.sections.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className={cn(f.dark && "section-dark")}>
      <SectionHeader eyebrow={f.eyebrow} headline={f.headline} />

      <AnimateIn>
        <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={cn(isOpen && "bg-background/50")}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-background/40 transition-colors"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{item.question}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "shrink-0 grid h-9 w-9 place-items-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-[#ff0000] bg-[#ff0000] text-white"
                        : "border-border text-muted",
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted leading-relaxed text-sm md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimateIn>
    </Section>
  );
}
