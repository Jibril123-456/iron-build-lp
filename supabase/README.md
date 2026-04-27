# Setup Supabase

Étapes rapides pour brancher la base. ~5 minutes.

## 1. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un compte (gratuit).
2. Clique **New project**.
3. Nom au choix, choisis une région proche (`Europe West (Paris)` par défaut).
4. Mot de passe DB : Supabase en propose un, copie-le quelque part (tu n'en auras pas besoin pour ce projet, mais c'est utile à garder).
5. Patiente 1-2 min que le projet soit provisionné.

## 2. Exécuter le schéma SQL

1. Dans le projet Supabase, ouvre **SQL Editor** (icône ⚡ dans la sidebar).
2. Clique **+ New query**.
3. Copie-colle le contenu de [`schema.sql`](./schema.sql) dans l'éditeur.
4. Clique **Run** en bas à droite.
5. Tu dois voir `Success. No rows returned`. Les tables `events` et `leads` sont créées.

## 3. Récupérer les clés API

Va dans **Project Settings** (icône ⚙️) → **API**. Tu y trouves :

- **Project URL** → c'est `SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_URL`.
- **anon public** → c'est `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publique, OK côté navigateur).
- **service_role** ⚠️ **secret** → c'est `SUPABASE_SERVICE_ROLE_KEY`. Ne le commit JAMAIS, ne l'expose JAMAIS côté client.

## 4. Configurer `.env.local`

Crée (ou complète) un fichier `.env.local` à la racine du projet :

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cal.com
NEXT_PUBLIC_CALCOM_LINK=titouan.grow/call-coworking
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/titouan.grow/call-coworking

# YouTube vidéo affichée sur /merci
NEXT_PUBLIC_MERCI_YOUTUBE_ID=YOUR_VIDEO_ID

# Supabase
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...

# Mot de passe pour /tracking
DASHBOARD_PASSWORD=change-me-please
```

## 5. Installer la dépendance + lancer le dev

```bash
npm install
npm run dev
```

## 6. Vérifier que ça marche

1. Ouvre http://localhost:3000.
2. Recharge plusieurs fois la page, scroll, clique sur le CTA, ferme le modal.
3. Va sur http://localhost:3000/tracking → tu devrais arriver sur la page de login.
4. Entre le `DASHBOARD_PASSWORD`.
5. Tu vois les KPIs, le funnel, et la liste des events.

Si la table `events` reste vide :

- Ouvre la console DevTools → Network → filtre `events`. Tu dois voir des `POST /api/events` qui renvoient 200.
- Vérifie que `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont bien dans `.env.local` et que tu as **redémarré `npm run dev`** après ajout (Next.js charge `.env.local` au boot).

## 7. Sécurité — checklist avant prod

- [ ] `DASHBOARD_PASSWORD` est un vrai mot de passe (pas `change-me-please`).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` n'est JAMAIS exposé côté client (ne commence jamais par `NEXT_PUBLIC_`).
- [ ] `.env.local` est dans le `.gitignore` (Next.js le fait par défaut, mais vérifie).
- [ ] Sur Vercel : ajouter ces vars dans **Project Settings → Environment Variables** avant le premier deploy.

## 8. Resetter les données

Pour vider les tables sans casser le schéma, dans le SQL Editor :

```sql
truncate table public.events;
truncate table public.leads;
```
