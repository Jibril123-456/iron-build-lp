import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";

function renderHeadline(headline: string, highlight?: string) {
  if (!highlight) return headline;
  const idx = headline.indexOf(highlight);
  if (idx === -1) return headline;
  const before = headline.slice(0, idx);
  const after = headline.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="text-accent">{highlight}</span>
      {after}
    </>
  );
}

function BeforeAfterVisual({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid grid-cols-2 gap-[3px] overflow-hidden rounded-sm">
      {/* AVANT */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Avant — Iron Build"
          className="w-full h-[420px] md:h-[540px] object-cover object-top"
        />
        {/* gradient masking the head */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
          style={{ background: "linear-gradient(to bottom, #0E0E10 0%, #0E0E10 20%, transparent 100%)" }}
        />
        {/* label */}
        <div className="absolute top-5 left-5 z-10">
          <span
            className="inline-block px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.22em]"
            style={{ background: "rgba(14,14,16,0.82)", border: "1px solid #2E2E33", color: "#A8A29A" }}
          >
            Avant
          </span>
        </div>
        {/* bottom stat */}
        <div className="absolute bottom-0 inset-x-0 p-4" style={{ background: "linear-gradient(to top, #0E0E10 60%, transparent)" }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted mb-0.5">Stagnation · 18 mois</p>
          <p className="text-xl font-black tracking-tight text-foreground">Aucun résultat visible</p>
        </div>
      </div>

      {/* APRÈS */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt="Après — Iron Build"
          className="w-full h-[420px] md:h-[540px] object-cover object-top"
        />
        {/* label */}
        <div className="absolute top-5 right-5 z-10">
          <span
            className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "#D85A30", color: "#0E0E10" }}
          >
            Après
          </span>
        </div>
        {/* bottom stat */}
        <div className="absolute bottom-0 inset-x-0 p-4" style={{ background: "linear-gradient(to top, #0E0E10 60%, transparent)" }}>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] mb-0.5" style={{ color: "#D85A30" }}>Iron Build · 30 jours</p>
          <p className="text-xl font-black tracking-tight" style={{ color: "#D85A30" }}>+4,8 kg de muscle</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const h = siteConfig.sections.hero;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(50%_60%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-radial-fade opacity-40"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {h.liveIndicator && (
            <AnimateIn>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#ff0000] animate-blink" />
                  <span className="rounded-full h-2 w-2 bg-[#ff0000]" />
                </span>
                <span>{h.liveIndicator}</span>
              </div>
            </AnimateIn>
          )}

          {h.badge && (
            <AnimateIn>
              <Badge variant="accent" className="mb-6">{h.badge}</Badge>
            </AnimateIn>
          )}

          <AnimateIn delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.98] text-balance">
              {renderHeadline(h.headline, h.headlineHighlight)}
            </h1>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p className="mt-7 text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto text-pretty">
              {h.subheadline}
            </p>
          </AnimateIn>

          <AnimateIn delay={320}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button cta={h.primaryCta} size="lg" />
              {h.secondaryCta && <Button cta={h.secondaryCta} size="lg" />}
            </div>
          </AnimateIn>

          {h.trustLine && (
            <AnimateIn delay={420}>
              <p className="mt-6 text-sm text-muted">{h.trustLine}</p>
            </AnimateIn>
          )}
        </div>

        {h.visual && h.visual.kind !== "none" && (
          <AnimateIn delay={520}>
            <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
              {h.visual.kind === "beforeafter" && (
                <BeforeAfterVisual before={h.visual.before} after={h.visual.after} />
              )}
              {h.visual.kind === "image" && (
                <div className="relative rounded-sm border border-border bg-card overflow-hidden shadow-2xl shadow-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.visual.src}
                    alt={h.visual.alt}
                    className="w-full h-auto max-h-[600px] object-cover object-top"
                  />
                </div>
              )}
              {h.visual.kind === "video" && (
                <div className="relative rounded-sm border border-border bg-card overflow-hidden shadow-2xl shadow-black/10">
                  <video
                    src={h.visual.src}
                    poster={h.visual.poster}
                    controls
                    playsInline
                    className="w-full h-auto"
                  />
                </div>
              )}
              {h.visual.kind === "embed" && (
                <div className="relative rounded-sm border border-border bg-card overflow-hidden shadow-2xl shadow-black/10">
                  <div dangerouslySetInnerHTML={{ __html: h.visual.html }} />
                </div>
              )}
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
