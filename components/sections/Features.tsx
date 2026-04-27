import { siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Features() {
  const f = siteConfig.sections.features;

  return (
    <Section id="features" className={cn(f.dark && "section-dark")}>
      <SectionHeader
        eyebrow={f.eyebrow}
        headline={f.headline}
        description={f.description}
      />

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {f.features.map((feature, i) => (
          <AnimateIn key={feature.title} delay={(i % 3) * 90}>
            <article className="group relative h-full rounded-[var(--radius)] border border-border bg-card p-6 md:p-7 transition-all hover:border-foreground/30 hover:-translate-y-0.5 overflow-hidden">
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition"
                style={{
                  background:
                    "radial-gradient(80% 60% at 50% 0%, rgba(255,0,0,0.08), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-foreground text-background transition group-hover:bg-[#ff0000] group-hover:text-white">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-2.5 text-sm md:text-base text-muted leading-relaxed">{feature.description}</p>
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
