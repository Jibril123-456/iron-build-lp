import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Momentum Reset Protocol — Iron Build™",
  description: "Relance ta progression avec le protocole de déblocage en 4 semaines.",
  robots: { index: false, follow: false },
};

const CHECKOUT_URL = process.env.NEXT_PUBLIC_DOWNSELL_CHECKOUT_URL || "#checkout";

export default function DownsellPage() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-3xl">

        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-5">
            ■ Alternative · Pour repartir sur de bonnes bases
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            Momentum Reset<br />
            <span className="text-accent">Protocol</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            T&apos;as l&apos;impression d&apos;être bloqué ? Le Momentum Reset est un protocole de
            4 semaines pour remettre à zéro ton métabolisme et relancer une progression nette.
            Simple, court, focalisé.
          </p>
        </div>

        {/* Contenu */}
        <div className="rounded-sm border border-border bg-card p-8 mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-6">
            Ce que tu obtiens
          </p>
          <ul className="space-y-4">
            {[
              { title: "Protocole de déblocage 4 semaines", desc: "Séquence précise pour casser un plateau — recalibration calorique, rythme d'entraînement, timing." },
              { title: "Plan nutritionnel de relance", desc: "Pas de régime, pas de privation. Une recalibration qui remet ton métabolisme en mode anabolique." },
              { title: "Séances courtes 30 minutes", desc: "Format conçu pour les périodes chargées. Tu n'as pas besoin de tout refaire — juste de débloquer." },
              { title: "Accès à vie", desc: "À utiliser chaque fois que tu sens une stagnation arriver." },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="rounded-sm border border-accent/30 bg-accent/5 p-8 text-center">
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-5xl font-black text-accent">37€</span>
            <span className="text-muted text-base">accès à vie</span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center w-full rounded-sm bg-accent text-accent-foreground font-bold text-sm px-6 py-4 hover:opacity-90 transition-opacity mb-4"
          >
            Obtenir le Momentum Reset — 37€
          </a>
          <p className="text-xs text-muted">Accès immédiat · Garantie 30 jours · Accès à vie</p>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            ← Retour à Iron Build
          </Link>
        </div>

      </Container>
    </main>
  );
}
