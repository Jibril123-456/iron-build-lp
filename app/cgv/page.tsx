import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Iron Build™",
  robots: { index: false, follow: false },
};

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-10">
          Conditions Générales de Vente
        </h1>

        <div className="space-y-8 text-sm text-muted leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 1 — Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes de
              programmes digitaux proposés par Iron Build™ sur le site ironbuild.fr.
              Tout achat implique l&apos;acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 2 — Produits</h2>
            <p>
              Iron Build™ propose des programmes digitaux de coaching fitness (PDF, vidéos,
              outils de suivi) livrés par voie électronique. Les descriptions et prix sont
              indiqués sur le site au moment de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 3 — Prix et paiement</h2>
            <p>
              Les prix sont indiqués en euros TTC. Le paiement s&apos;effectue en ligne via
              Stripe (carte bancaire). La commande est confirmée après validation du paiement.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 4 — Livraison</h2>
            <p>
              Les produits digitaux sont délivrés immédiatement après confirmation du paiement,
              par email à l&apos;adresse fournie lors de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 5 — Droit de rétractation et garantie</h2>
            <p>
              Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de
              rétractation de 14 jours ne s&apos;applique pas aux contenus numériques fournis
              immédiatement avec l&apos;accord exprès du consommateur.<br /><br />
              Iron Build™ propose néanmoins une <strong className="text-foreground">garantie satisfait ou remboursé de 30 jours</strong> :
              si vous avez suivi la méthode et n&apos;obtenez pas de résultats, nous remboursons
              intégralement sur simple demande par email, sans justification.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 6 — Propriété intellectuelle</h2>
            <p>
              Les programmes achetés sont destinés à un usage personnel et non commercial.
              Toute reproduction, diffusion ou revente est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Article 7 — Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français.
              Tout litige relève de la compétence des tribunaux français.
            </p>
          </section>

          <p className="text-xs text-muted/60 pt-4 border-t border-border">
            — À compléter et valider avec ton avocat avant mise en ligne.
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
