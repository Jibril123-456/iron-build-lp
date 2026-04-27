-- Schema pour la landing page tracking + leads.
-- Copie-colle ce fichier dans le SQL Editor de Supabase et clique "Run".

-- ============================================================================
-- Table : events
-- Stocke tous les events de tracking (page views, scroll, clics CTA, form, ...)
-- ============================================================================
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  session_id   text        not null,
  event_name   text        not null,
  payload      jsonb       not null default '{}'::jsonb,
  utm          jsonb       not null default '{}'::jsonb,
  path         text,
  referrer     text,
  user_agent   text,
  created_at   timestamptz not null default now()
);

create index if not exists events_session_id_idx on public.events (session_id);
create index if not exists events_event_name_idx on public.events (event_name);
create index if not exists events_created_at_idx on public.events (created_at desc);

-- ============================================================================
-- Table : leads
-- Stocke les soumissions du formulaire de qualification.
-- ============================================================================
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  session_id   text        not null,
  form_id      text        not null,
  name         text,
  email        text,
  niche        text,
  revenue      text,
  youtube      text,
  pain         text,
  qualified    boolean     not null default true,
  utm          jsonb       not null default '{}'::jsonb,
  created_at   timestamptz not null default now()
);

create index if not exists leads_session_id_idx on public.leads (session_id);
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_qualified_idx  on public.leads (qualified);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ============================================================================
-- RLS désactivé sur ces tables : toutes les lectures/écritures passent par le
-- service_role key côté serveur (API routes Next.js). Aucun client public ne
-- doit accéder directement à ces tables.
-- ============================================================================
alter table public.events disable row level security;
alter table public.leads  disable row level security;
