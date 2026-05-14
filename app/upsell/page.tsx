import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Student Physique Accelerator — Iron Build™",
  description: "Le programme avancé pour doubler tes résultats en 60 jours.",
  robots: { index: false, follow: false },
};

const CHECKOUT_URL = process.env.NEXT_PUBLIC_UPSELL_CHECKOUT_URL || "#checkout";

export default function UpsellPage() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-3xl">

        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-5">
            ■ Offre avancée · Pour ceux qui veulent aller plus loin
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            Student Physique<br />
            <span className="text-accent">Accelerator</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Iron Build pose les fondations. L&apos;Accelerator les multiplie.
            Périodisation 16 semaines, protocoles récupération, ajustements caloriques
            progressifs — pour ceux qui veulent un physique, pas juste quelques kilos.
          </p>
        </div>

        {/* Contenu */}
        <div className="rounded-sm border border-border bg-card p-8 mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-6">
            Ce que tu obtiens
          </p>
          <ul className="space-y-4">
            {[
              { title: "Périodisation avancée 16 semaines", desc: "Progression structurée semaine par semaine — plus de stagnation, jamais." },
              { title: "Ajustements caloriques progressifs", desc: "La méthode d'escalade calorique pour continuer à prendre du muscle sans plateau." },
              { title: "Protocoles récupération active", desc: "Sommeil, stretching ciblé, micro-repos — les facteurs que 80% des skinny ignorent." },
              { title: "Suivi de composition corporelle", desc: "Méthodes de mesure précises pour distinguer muscle et eau. Tu sais ce que tu prends vraiment." },
              { title: "Accès à vie + mises à jour", desc: "Toutes les évolutions futures de l'Accelerator incluses sans supplément." },
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
            <span className="text-5xl font-black text-accent">67€</span>
            <span className="text-muted text-base">accès à vie</span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center w-full rounded-sm bg-accent text-accent-foreground font-bold text-sm px-6 py-4 hover:opacity-90 transition-opacity mb-4"
          >
            Obtenir l&apos;Accelerator — 67€
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
