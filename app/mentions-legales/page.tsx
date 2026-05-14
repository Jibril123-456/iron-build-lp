import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales — Iron Build™",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-10">
          Mentions légales
        </h1>

        <div className="space-y-8 text-sm text-muted leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Éditeur du site</h2>
            <p>
              [Nom / raison sociale]<br />
              [Forme juridique — ex : auto-entrepreneur]<br />
              [Adresse complète]<br />
              [SIRET]<br />
              Email : [ton@email.com]
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Directeur de la publication</h2>
            <p>[Prénom Nom]</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Hébergement</h2>
            <p>
              Vercel Inc.<br />
              340 Pine Street, Suite 701<br />
              San Francisco, CA 94104 – États-Unis<br />
              vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, méthode)
              sont la propriété exclusive de Iron Build™ et sont protégés par les lois françaises
              et internationales relatives à la propriété intellectuelle.
              Toute reproduction est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Données personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos données personnelles,
              consultez notre{" "}
              <Link href="/politique-de-confidentialite" className="text-accent hover:underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <p className="text-xs text-muted/60 pt-4 border-t border-border">
            — À compléter avec ton avocat avant mise en ligne.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            ← Retour à Iron Build
          </Link>
        </div>
      </Container>
    </main>
  );
}
