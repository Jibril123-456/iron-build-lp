import { siteConfig } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Pricing() {
  const p = siteConfig.sections.pricing;

  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow={p.eyebrow}
        headline={p.headline}
        description={p.description}
      />

      <div
        className={cn(
          "grid gap-5 max-w-5xl mx-auto",
          p.plans.length === 1 && "max-w-md",
          p.plans.length === 2 && "md:grid-cols-2",
          p.plans.length >= 3 && "md:grid-cols-3",
        )}
      >
        {p.plans.map((plan, i) => (
          <AnimateIn key={plan.name} delay={i * 80}>
            <article
              className={cn(
                "relative h-full flex flex-col rounded-2xl border p-7",
                plan.highlighted
                  ? "border-accent/50 bg-card shadow-2xl shadow-accent/10"
                  : "border-border bg-card",
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {plan.badge}
                  </span>
                </div>
              )}

              <header>
                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>
                )}
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted">{plan.period}</span>
                  )}
                </div>
              </header>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                    >
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button cta={plan.cta} size="md" block />
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>

      {p.guarantee && (
        <AnimateIn delay={240}>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted">
            <Icon name="shield" className="h-4 w-4 text-emerald-400" />
            <span>{p.guarantee}</span>
          </div>
        </AnimateIn>
      )}
    </Section>
  );
}
