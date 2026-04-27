import { siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

export function Problem() {
  const p = siteConfig.sections.problem;

  return (
    <Section id="problem" className={cn(p.dark && "section-dark")}>
      <SectionHeader
        eyebrow={p.eyebrow}
        headline={p.headline}
        description={p.description}
      />

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2">
        {p.pains.map((pain, i) => (
          <AnimateIn key={pain.title} delay={i * 80}>
            <article className="group relative h-full rounded-[var(--radius)] border border-border bg-card p-6 md:p-7 transition-all hover:border-[#ff0000]/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#ff0000]/10 overflow-hidden">
              {/* Number */}
              <div className="absolute top-5 right-5 text-5xl md:text-6xl font-bold tracking-tight text-foreground/[0.04] leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="relative flex items-center gap-3 mb-3">
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#ff0000]/10 text-[#ff0000] transition group-hover:bg-[#ff0000] group-hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </span>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight pr-8">{pain.title}</h3>
              </div>
              <p className="relative text-sm md:text-base text-muted leading-relaxed">
                {pain.description}
              </p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
