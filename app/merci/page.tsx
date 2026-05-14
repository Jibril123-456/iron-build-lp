import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Bienvenue · ${siteConfig.sections.footer.brand}`,
  description: "Ta transformation commence maintenant. Accès immédiat à ton programme.",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_UPSELL_CHECKOUT_URL || "/upsell";

  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-3xl">

        {/* Confirmation */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Paiement confirmé · Accès immédiat
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
            Bienvenue dans Iron Build —<br />
            <span className="text-accent">ta transformation commence maintenant.</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tu reçois un email avec ton lien de téléchargement dans les 2 prochaines minutes.
            Vérifie tes spams si tu ne le vois pas.
          </p>
        </div>

        {/* Ce que tu as dans ton programme */}
        <div className="rounded-sm border border-border bg-card p-8 mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-5">
            Ce que tu as dans ton programme
          </p>
          <ul className="space-y-3">
            {[
              "Programme split 3/4/5 jours (version salle + version maison)",
              "Plan alimentaire calculé pour ton métabolisme rapide",
              "Technique des calories invisibles (+990 kcal/jour)",
              "Tracker de progression sur 8 semaines",
              "Accès à vie + toutes les mises à jour gratuites",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upsell Student Physique Accelerator */}
        <div className="rounded-sm border border-accent/30 bg-accent/5 p-8 mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent mb-3">
            Offre exclusive · Disponible maintenant seulement
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
            Multiplie tes résultats avec le<br />
            <span className="text-accent">Student Physique Accelerator</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Le programme Iron Build te donne la base. L&apos;Accelerator ajoute le niveau supérieur :
            périodisation avancée sur 16 semaines, protocoles de récupération, ajustements caloriques
            progressifs — conçu pour maximiser chaque kilo pris. <strong className="text-foreground">Les membres qui le combinent
            avec Iron Build prennent en moyenne 2× plus de masse en 60 jours.</strong>
          </p>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-accent">67€</span>
            <span className="text-muted text-sm line-through">147€</span>
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">−54%</span>
          </div>
          <a
            href={checkoutUrl}
            className="inline-flex items-center justify-center w-full rounded-sm bg-accent text-accent-foreground font-bold text-sm px-6 py-4 hover:opacity-90 transition-opacity"
          >
            Ajouter l&apos;Accelerator — 67€
          </a>
          <p className="text-center text-xs text-muted mt-3">
            Cette offre n&apos;est disponible qu&apos;une seule fois, à ce prix.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Non merci, je garde juste Iron Build →
          </Link>
        </div>

      </Container>
    </main>
  );
}
