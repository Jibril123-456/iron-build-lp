import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Solution() {
  const s = siteConfig.sections.solution;

  return (
    <Section id="solution" className={cn(s.dark && "section-dark", "relative overflow-hidden")}>
      {s.dark && (
        <div aria-hidden className="absolute inset-0 bg-radial-red-glow opacity-60 pointer-events-none" />
      )}

      <div className="relative max-w-4xl mx-auto text-center mb-14 md:mb-20">
        <AnimateIn>
          <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.18em] text-[#ff0000]">
            {s.eyebrow}
          </span>
        </AnimateIn>
        <AnimateIn delay={80}>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {s.headline}
          </h2>
        </AnimateIn>
        <AnimateIn delay={160}>
          <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto text-pretty">
            {s.description}
          </p>
        </AnimateIn>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <ul className="space-y-3">
          {s.bullets.map((b, i) => (
            <AnimateIn key={i} delay={i * 90}>
              <li className="group flex items-start gap-4 rounded-[var(--radius)] border border-border bg-card px-5 py-4 transition hover:border-[#ff0000]/40">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff0000] text-white shadow-lg shadow-[#ff0000]/30"
                >
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-base md:text-lg font-medium leading-relaxed pt-0.5">{b}</span>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </Section>
  );
}
