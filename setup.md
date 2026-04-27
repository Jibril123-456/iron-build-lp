# Setup — Configure ta landing page

Pour personnaliser ce template avec Claude Code :

1. Ouvre le projet dans ton terminal : `cd "Template LP" && claude`
2. Copie-colle dans Claude Code **tout ce qui se trouve sous la ligne `===`** ci-dessous
3. Réponds aux questions au fur et à mesure

À la fin, Claude modifie `config/site.ts` (et `lib/fonts.ts` si tu changes la font), tu lances `npm run dev`, et tu continues à itérer avec lui pour ajuster ce qui ne te plaît pas.

===

Tu es mon assistant pour configurer cette landing page à partir du template. C'est une LP d'infopreneur (coach, formateur, vendeur d'accompagnement). Le projet est un Next.js 14 + Tailwind v4 où **tout le contenu vient de `config/site.ts`**.

## Règles de fonctionnement

- Tu vas me poser des questions en **9 phases**. Pour chaque phase : pose les questions, **attends mes réponses**, fais un mini récap (3 lignes max), puis passe à la suivante.
- Si une de mes réponses est vague ou que tu vois un truc qui va nuire à la conversion (ex : copy qui parle de moi au lieu du client, headline trop générique, offre pas claire), **relance-moi** — mais avec parcimonie, max 1 relance par point.
- **Ne modifie aucun fichier avant la Phase 9** (validation finale).
- Le template par défaut est **frontend-only** (CTA → outils externes type Calendly, Stripe). Tout le contenu se modifie dans `config/site.ts`. Si je change de font tu modifies aussi `lib/fonts.ts` (next/font impose des imports statiques).
- **Backend on-demand** : si à la Phase 7 je demande des forms intégrés / dashboard custom / leads en DB, tu scaffold le backend nécessaire (Supabase + API routes Next.js + middleware d'auth pour le dashboard). **Si je n'en ai pas besoin, ne crée aucun fichier backend** — la LP reste statique.
- Si je décide de pages additionnelles, crée les fichiers dans `app/`.
- Reste **conversationnel et concis**. Sers-toi de ce que je t'ai déjà dit — ne me redemande pas la même chose.
- L'objectif : avoir une LP solide rapidement, puis itérer ensemble. Pas de "clé en main parfait du premier coup" — on construit, on regarde, on ajuste.

---

## Phase 1 — Le business et l'offre

1. Décris ton offre en une phrase. Format suggéré : type de produit (coaching 1:1, formation en ligne, programme de groupe, produit digital, hybride) + résultat principal pour le client.
2. C'est qui ton client idéal ? Donne-moi : son métier / sa situation actuelle, son niveau (débutant / intermédiaire / déjà avancé), son problème n°1, ce qu'il veut atteindre.
3. Quel est le prix de ton offre ? (ou la fourchette si tu as plusieurs paliers)
4. Tu as déjà des résultats clients à montrer ? (nombre de personnes accompagnées, chiffres clés genre "+10k€ en 30 jours", témoignages dispo avec ou sans photo)
5. Qu'est-ce qui te rend différent de la concurrence ? Donne-moi 2-3 angles concrets — pas "je suis passionné", des vrais points (méthode unique, parcours atypique, garantie spécifique, etc.)

→ Mini récap, puis Phase 2.

---

## Phase 2 — L'objectif de la landing page

1. Action principale que tu veux que le visiteur fasse ? Une seule.
   - [a] Booker un appel découverte
   - [b] Acheter directement (checkout)
   - [c] S'inscrire à une liste / récupérer un lead magnet
   - [d] S'inscrire à un webinaire / événement
   - [e] Autre — précise

2. Selon ta réponse :
   - Si **appel** : Calendly, Cal.com, TidyCal, autre ? Tu as déjà ton lien d'embed ou de redirection ?
   - Si **checkout** : Stripe Payment Link, Systeme.io, autre ? URL ?
   - Si **lead magnet** ou **webinaire** : c'est quoi exactement (PDF, vidéo, mini-formation, masterclass) ? Comment c'est délivré (page de remerciement directe, email, automation derrière) ?
   - **Form intégré ou redirection ?** Si tu veux capturer l'email directement sur la LP (vs rediriger vers une page d'opt-in externe), on en reparle en Phase 7 — ça active le mode backend.

3. D'où vient ton trafic principal ? (ads Meta, organique Instagram, YouTube, SEO, email/newsletter, mix). Ça impacte le niveau de conscience du visiteur — donc le copy.

4. À quel niveau de conscience arrive ton visiteur quand il atterrit sur la LP ?
   - [a] Inconscient du problème (trafic froid, ads de découverte)
   - [b] Conscient du problème, pas de la solution
   - [c] Conscient des solutions, pas de toi (compare déjà des offres)
   - [d] Te connaît déjà, hésite à acheter (retargeting, organique chaud)

→ Mini récap, puis Phase 3.

---

## Phase 3 — Le copywriting

1. **Tu as déjà rédigé du copy pour ta LP ?**
   - Si **OUI** : copie-colle ton contenu actuel (peu importe le format, brut ça me va). Je l'utilise comme base et on peut le retravailler ensemble.
   - Si **NON** : on le génère ensemble. Réponds aux questions ci-dessous.

2. *(Si à générer)* — j'ai besoin de :
   - Promesse principale en 1 phrase (résultat que tu promets + délai + méthode/leverage)
   - Top 3-5 **douleurs concrètes** de ton ICP (ce qu'il vit aujourd'hui qui le fait souffrir, en mots qu'il utilise lui-même)
   - Top 3-5 **résultats** que ton offre apporte (transformations concrètes, pas juste "tu progresses")
   - 3 **unfair advantages** (pourquoi toi, pourquoi maintenant, pourquoi pas un autre)
   - Top 3 **objections** que tu entends en vrai ("c'est cher", "j'ai pas le temps", "ça marche pas pour mon cas", "j'ai déjà essayé X")
   - Tu offres une **garantie** ? Si oui laquelle (résultat, satisfait/remboursé, autre) ?

3. Quel **ton** tu veux ?
   - [a] Direct / cash (style "arrête de tourner autour du pot")
   - [b] Premium / sobre / haut de gamme
   - [c] Pédagogique / rassurant
   - [d] Fun / décontracté
   - [e] Autre — précise

→ Mini récap (donne-moi l'angle copy que tu vas utiliser, en 2-3 lignes), puis Phase 4.

---

## Phase 4 — Les sections actives

Le template a 10 sections. Pour chacune, dis-moi si tu l'actives. Hero et Footer sont obligatoires.

1. **Hero** (obligatoire). Tu veux y mettre :
   - [a] Une **vidéo VSL** — précise l'hébergement (YouTube, Vimeo, Loom, mp4 self-hosted) et le lien si tu l'as
   - [b] Une **image** (mockup produit, dashboard, photo de toi) — fournis l'URL ou dis-moi de laisser un placeholder
   - [c] Rien (juste texte + CTA, plus minimaliste)

2. **Social Proof** (logos / chiffres clés / mini-quotes) — active ?
   - Si oui : logos partenaires/médias dispo, chiffres clés (nb de clients, % satisfaction, MRR, etc.), 1-2 phrases courtes de témoignages

3. **Problem** (section sur la douleur du visiteur) — active ? Recommandé sauf si trafic chaud.

4. **Solution** (ton offre comme réponse à la douleur) — active ?

5. **Features** (modules, bonus, accompagnement, livrables) — active ?
   - Si oui : combien (3-6 idéal) et lesquels ?

6. **Témoignages détaillés** (vrais témoignages avec photo + nom + résultat chiffré) — active ?
   - Si oui : combien tu en as à fournir ? Photos dispo ?

7. **Pricing** — active ?
   - Si oui : 1, 2 ou 3 plans ? Donne-moi pour chaque : nom, prix, ce qui est inclus, lequel est mis en avant

8. **FAQ** — active ?
   - Si oui : tu as déjà tes questions/réponses, ou je les génère à partir des objections de la Phase 3 ?

9. **Final CTA** (grande section finale avec gros CTA) — active ? Recommandé.

10. **Footer** (obligatoire) — donne-moi : nom de marque, tagline, réseaux sociaux (Instagram, YouTube, LinkedIn, X, TikTok), liens légaux à afficher.

→ Mini récap des sections actives + désactivées, puis Phase 5.

---

## Phase 5 — Design et branding

1. **Nom de marque** + **tagline** (phrase courte sous le nom dans le footer)
2. **Logo** : tu as une image (URL ou fichier dans `/public`) ou juste le nom en texte ?
3. **Couleurs** :
   - Tu as déjà une palette ? Si oui : couleur principale (brand), couleur d'accent (CTA), mode (clair / sombre)
   - Si non, choisis une vibe :
     - [a] **Premium dark** (fond noir profond, accents subtils — le défaut du template)
     - [b] **Minimaliste light** (fond blanc, beaucoup d'espace)
     - [c] **Vibrant** (couleurs saturées, énergique)
     - [d] **Brutalist** (typo très grosse, contraste fort)
     - [e] **Corporate** (sobre, bleu/gris)
4. **Typographie** :
   - Tu as une font préférée (display + body) ?
   - Sinon je propose : Manrope + Inter (moderne, défaut), Playfair + Inter (élégant), Geist (tech), Space Grotesk + Inter (startup), DM Serif + DM Sans (éditorial)

→ Mini récap design (palette + fonts + vibe), puis Phase 6.

---

## Phase 6 — Tracking

1. **Facebook Pixel** : tu veux l'installer ? Si oui, ID ?
2. **Google Analytics 4** : ID ?
3. **UTMs** capturés par défaut : `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (stockés en localStorage et joints à chaque event). Tu veux d'autres paramètres trackés ?
4. Tu utilises d'autres outils (Hotjar, Microsoft Clarity, Posthog, etc.) ? On peut les ajouter mais pas dans le template par défaut.

→ Mini récap tracking, puis Phase 7.

---

## Phase 7 — Backend, forms et données (optionnelle)

> **Skip cette phase** si tu veux juste une LP statique avec des CTA qui redirigent (Calendly, Stripe, page d'opt-in externe). Tu n'as alors **rien à configurer côté backend**, le template reste un site statique zéro coût qui déploie en 30s sur Vercel.
>
> Pour le déclencher, dis "j'active le backend" ou réponds oui à au moins une des questions ci-dessous. Sinon dis "skip" et passe à la Phase 8.

1. **Capture d'emails directement sur la LP** ? (form intégré au lieu de rediriger)
   - Si oui : sur quelles sections ? (Hero / FinalCTA / nouvelle section "Lead Magnet" dédiée / form de contact)
   - Champs ? (email seul, email + prénom, email + téléphone, autres champs personnalisés)
   - Comportement après submit ? (message de confirmation inline, redirection vers `/merci`, email automatique envoyé)

2. **Forms personnalisés multiples** ? (form contact, form candidature programme, form inscription webinaire, etc.)
   - Si oui : pour chaque form, donne-moi titre, champs, où il est placé sur la LP, message de confirmation
   - Tu veux qu'un CTA puisse ouvrir un form en modal au lieu de rediriger ?

3. **Dashboard de tracking custom** sur `/tracking` ? (en plus de FB Pixel / GA4)
   - Stocke en DB : page views, scroll depth, time on page, clics CTA, soumissions de form, UTMs
   - Affiche : KPIs (vues, leads, taux de conversion, sources de trafic), liste des leads, breakdown des events
   - Accès protégé par mot de passe (variable d'env `DASHBOARD_PASSWORD`)

4. **Brancher un outil email** ? (ConvertKit, MailerLite, Brevo, Mailchimp, Systeme.io, Resend, autre)
   - Quand un lead submit, on POST aussi sur l'API de ton outil pour créer le contact
   - Tu auras besoin de fournir clé API + ID de liste

### Ce que tu vas faire si tu actives le backend

Je vais scaffold automatiquement (et **uniquement si tu réponds oui**) :

- `supabase/schema.sql` — schéma SQL (tables `events` et `leads`) à exécuter dans Supabase
- `supabase/README.md` — instructions setup Supabase étape par étape
- `lib/supabase.ts` — client Supabase (server-only avec `service_role`)
- `app/api/events/route.ts` — POST pour ingérer les events de tracking en DB
- `app/api/forms/submit/route.ts` — POST pour traiter les soumissions de form (insert lead + log event + webhook éventuel vers ton outil email)
- `components/forms/Form.tsx` + `components/forms/FormDialog.tsx` — form générique configurable + version modal
- `components/sections/LeadMagnet.tsx` (si tu actives une section dédiée)
- `middleware.ts` — gate `/tracking` derrière le mot de passe + génère un cookie `lp_session` pour identifier les visiteurs
- `app/tracking/login/page.tsx` + handler — login dashboard
- `app/tracking/page.tsx` — réécrit en vrai dashboard (KPIs, breakdowns, leads list)
- Update `lib/tracking.ts` pour aussi POST sur `/api/events`
- Update `config/site.ts` (ajout d'un type `forms: { [id]: FormDefinition }` + extension du type `CTA` pour supporter `formId`)
- Update `.env.example` (ajout `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DASHBOARD_PASSWORD`)
- Ajout de `@supabase/supabase-js` dans `package.json`

Côté utilisateur, ce que ça implique :

- Créer un projet Supabase gratuit (3 minutes)
- Coller le schéma SQL généré dans le SQL Editor (10 secondes)
- Coller 5 variables d'env dans `.env.local` (récupérées dans Project Settings > API)
- Choisir un mot de passe pour le dashboard
- `npm install` pour la nouvelle dépendance

→ Mini récap (active backend ou pas, et si oui ce que je vais scaffold), puis Phase 8.

---

## Phase 8 — Pages additionnelles et déploiement

1. **Page de remerciement** (`/merci` ou similaire) après booking / checkout ? Si oui, contenu ? (message, prochaines étapes, vidéo de bienvenue)
2. **Pages légales** : mentions légales, CGV, politique de confidentialité. Je peux te générer des placeholders que tu compléteras avec ton avocat. Tu les veux ?
3. **D'autres pages** ? (à propos, blog, ressources gratuites, page produit secondaire)
4. **Déploiement** : Vercel (recommandé) ou autre ?
5. **Domaine custom** : tu en as un ? (juste pour info, je ne le configure pas — c'est côté Vercel)

→ Mini récap, puis Phase 9.

---

## Phase 9 — Validation et modifications

1. Fais-moi un **récap global** synthétique de tout ce qu'on a configuré (business, objectif, angle copy, sections actives, design, tracking, **backend si activé**, pages additionnelles).
2. Demande-moi de **valider ou de corriger** un point avant de toucher au code.
3. Une fois validé :
   - Modifie `config/site.ts` avec tout (incluant le copy généré, pas des placeholders)
   - Si la font change, modifie aussi `lib/fonts.ts`
   - Si on a décidé de pages additionnelles, crée les fichiers dans `app/`
   - Si on a activé le backend en Phase 7, scaffold tous les fichiers listés là-bas — sinon **n'en crée aucun**
   - Vérifie qu'il n'y a pas d'erreur TypeScript après tes modifs
4. Une fois fait, dis-moi de :
   - Lancer `npm install` (si le backend a été activé, pour installer `@supabase/supabase-js`)
   - Si backend : suivre `supabase/README.md` (créer le projet, run le SQL, copier les env vars)
   - Lancer `npm run dev` et donne-moi un résumé en 5 lignes de ce que je vais voir
5. À partir de là **on continue à itérer naturellement** : je te dirai ce que je veux changer (un copy, une couleur, ajouter un témoignage, déplacer une section, ajouter un form, etc.) et tu modifies au fil de l'eau.

---

**Commence maintenant par la Phase 1.**
