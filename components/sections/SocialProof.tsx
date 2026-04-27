import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function SocialProof() {
  const s = siteConfig.sections.socialProof;

  return (
    <section id="social-proof" className="border-y border-border/60 bg-card/30 py-12 md:py-16">
      <Container>
        <AnimateIn>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-muted mb-8">
            {s.caption}
          </p>
        </AnimateIn>

        {s.logos.length > 0 && (
          <AnimateIn delay={80}>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-12">
              {s.logos.map((logo) => (
                <li key={logo.name}>
                  {logo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-7 w-auto opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition"
                    />
                  ) : (
                    <span className="text-base md:text-lg font-display font-semibold text-muted/60 tracking-tight">
                      {logo.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </AnimateIn>
        )}

        {s.stats.length > 0 && (
          <AnimateIn delay={160}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {s.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimateIn>
        )}

        {s.shortQuotes.length > 0 && (
          <AnimateIn delay={240}>
            <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {s.shortQuotes.map((q) => (
                <figure
                  key={q.author}
                  className="rounded-[var(--radius)] border border-border bg-background p-5"
                >
                  <blockquote className="text-sm text-foreground/90 leading-relaxed">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs text-muted">— {q.author}</figcaption>
                </figure>
              ))}
            </div>
          </AnimateIn>
        )}
      </Container>
    </section>
  );
}
