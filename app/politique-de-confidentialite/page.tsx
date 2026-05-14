import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Iron Build™",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <Container className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-10">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 text-sm text-muted leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">1. Responsable du traitement</h2>
            <p>
              [Nom / raison sociale], [adresse], [email de contact].<br />
              Ci-après dénommé « Iron Build™ ».
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">2. Données collectées</h2>
            <p>
              Dans le cadre de vos achats, nous collectons : nom, prénom, adresse email,
              données de paiement (traitées par Stripe — Iron Build™ ne stocke aucune
              donnée bancaire). Les données de navigation (pages vues, clics, durée de visite)
              peuvent être collectées via Microsoft Clarity, Google Analytics et Facebook Pixel
              à des fins d&apos;amélioration du site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">3. Finalités du traitement</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Traitement et livraison des commandes</li>
              <li>Communication relative à votre achat</li>
              <li>Amélioration de l&apos;expérience utilisateur (analytics)</li>
              <li>Marketing ciblé (pixels publicitaires, avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">4. Base légale</h2>
            <p>
              Exécution du contrat (commande), intérêt légitime (analytics), consentement
              (cookies publicitaires).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">5. Durée de conservation</h2>
            <p>
              Les données de commande sont conservées 5 ans à compter de la transaction
              (obligation légale comptable). Les données analytics sont conservées selon
              les politiques des outils tiers utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de portabilité et d&apos;opposition. Pour exercer ces droits,
              contactez : [ton@email.com]. Vous pouvez également déposer une réclamation
              auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">7. Cookies</h2>
            <p>
              Ce site utilise des cookies fonctionnels et analytiques (Microsoft Clarity,
              Google Analytics) ainsi que des pixels publicitaires (Meta/Facebook).
              Ces traceurs sont soumis à votre consentement conformément à la
              réglementation ePrivacy.
            </p>
          </section>

          <p className="text-xs text-muted/60 pt-4 border-t border-border">
            — À compléter et valider avec ton avocat / DPO avant mise en ligne.
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
