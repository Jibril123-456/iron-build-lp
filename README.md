# LP Template — Landing pages d'infopreneur générées avec l'IA

Template Next.js 14 + Tailwind v4 conçu pour générer des landing pages de coachs, formateurs et vendeurs d'accompagnement à partir d'un prompt unique dans Claude Code.

## Stack

- Next.js 14 (App Router)
- TypeScript strict
- Tailwind CSS v4 (configuration via `@theme` CSS)
- next/font pour les Google Fonts
- Aucune dépendance lourde — UI custom, icônes inline

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — la LP fonctionne immédiatement avec du contenu placeholder.

La page de référence du tracking est sur [http://localhost:3000/tracking](http://localhost:3000/tracking).

## Personnaliser ta landing page

Tout passe par **un seul fichier** : [`config/site.ts`](config/site.ts).

- Métadonnées SEO + OG
- Couleurs du thème (appliquées à l'exécution via CSS variables)
- Polices (display + body)
- Contenu de chaque section
- IDs de tracking (Pixel FB, GA4)
- URLs des CTA (Calendly, checkout)
- Activer / désactiver chaque section

Tu peux le modifier à la main, ou utiliser le prompt de génération.

## Le prompt de setup

Voir [`setup.md`](setup.md). Tu ouvres le projet avec Claude Code (`cd "Template LP" && claude`), tu copies-colles le prompt depuis `setup.md`, il te pose les bonnes questions par phases (business, offre, ICP, copywriting, sections, design, tracking, **backend optionnel**, pages additionnelles) et il modifie `config/site.ts` (et `lib/fonts.ts` si besoin).

## Frontend par défaut, backend à la demande

Le template démarre **frontend-only** : zéro backend, zéro DB, déploiement statique sur Vercel en 30 secondes. Les CTA redirigent vers tes outils externes (Calendly, Stripe, page d'opt-in de ton outil email). Le tracking passe par Facebook Pixel + GA4 directement depuis le navigateur.

Si pendant le setup tu actives la **Phase 7 (backend)** — c-à-d tu veux capturer des emails directement sur la LP, des forms personnalisés, ou un dashboard de tracking custom — Claude Code scaffold automatiquement :

- Une intégration Supabase (tables `events` + `leads`, schema SQL prêt à coller)
- Les API routes Next.js (`/api/events`, `/api/forms/submit`)
- Un composant Form générique configurable
- Un dashboard `/tracking` réel (KPIs, breakdown events, liste des leads) protégé par mot de passe
- Le middleware pour gérer l'auth + le cookie de session visiteur

Si tu n'en as pas besoin, **rien de tout ça n'est créé** — la LP reste minimale.

## Architecture

```
app/
  layout.tsx          → racine, fonts, tracking, métadonnées
  page.tsx            → landing page (assemble les sections actives)
  tracking/page.tsx   → page de référence du tracking
  globals.css         → @theme Tailwind v4

components/
  sections/           → Hero, Problem, Features, Pricing, FAQ, etc.
  ui/                 → Button, Container, Section, Badge
  tracking/           → Pixel FB, GA4, scroll, time, UTM

config/
  site.ts             → SOURCE UNIQUE de configuration

lib/
  tracking.ts         → API tracking centralisée (track / trackPageView)
  fonts.ts            → next/font/google
  utils.ts            → cn() et helpers
```

## Tracking

Voir `lib/tracking.ts` et la page `/tracking`. Events trackés out-of-the-box :

- **PageView** (FB + GA4)
- **Scroll depth** : 25%, 50%, 75%, 100%
- **Time on page** : 15s, 30s, 60s, 120s
- **Lead** : déclenché par les CTA primaires
- **InitiateCheckout** : déclenché par les CTA pricing
- **UTM capture** : `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` stockés en localStorage

## Déploiement

Vercel (recommandé) :

```bash
vercel
```

N'oublie pas d'ajouter les variables d'environnement (`NEXT_PUBLIC_FB_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`, etc.) sur ton projet Vercel.

## Performance

- Score Lighthouse cible : 90+ sur Performance / Accessibility / SEO
- Pas de JS inutile sur le rendu initial
- Polices chargées via next/font (pas de FOIT)
- Images : à fournir en `.webp` ou `.avif` quand tu remplaces les placeholders
