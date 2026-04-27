import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Tracking · Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const AUTH_COOKIE = "lp_dashboard_auth";

type EventRow = {
  id: string;
  session_id: string;
  event_name: string;
  payload: Record<string, unknown>;
  utm: Record<string, unknown>;
  created_at: string;
};

type LeadRow = {
  id: string;
  session_id: string;
  name: string | null;
  email: string | null;
  niche: string | null;
  revenue: string | null;
  youtube: string | null;
  pain: string | null;
  qualified: boolean;
  utm: Record<string, unknown>;
  created_at: string;
};

async function logout() {
  "use server";
  cookies().delete(AUTH_COOKIE);
  redirect("/tracking/login");
}

export default async function TrackingDashboard() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen py-16">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Dashboard indisponible</h1>
          <p className="text-muted">
            Supabase n&apos;est pas configuré. Renseigne <code>SUPABASE_URL</code> et{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> dans <code>.env.local</code>, puis redémarre{" "}
            <code>npm run dev</code>.
          </p>
        </Container>
      </main>
    );
  }

  const supabase = getSupabaseAdmin();

  const [
    eventsRes,
    leadsRes,
    eventCountsRes,
    sessionCountRes,
  ] = await Promise.all([
    supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("events")
      .select("event_name")
      .limit(10000),
    supabase
      .from("events")
      .select("session_id")
      .eq("event_name", "PageView"),
  ]);

  const events = (eventsRes.data ?? []) as EventRow[];
  const leads = (leadsRes.data ?? []) as LeadRow[];
  const allEventNames = (eventCountsRes.data ?? []) as { event_name: string }[];
  const pageViewSessions = (sessionCountRes.data ?? []) as { session_id: string }[];

  // KPIs
  const counts = countBy(allEventNames.map((e) => e.event_name));
  const uniqueSessions = new Set(pageViewSessions.map((p) => p.session_id)).size;
  const formOpens = counts.form_open ?? 0;
  const formQualified = counts.form_qualified ?? 0;
  const formUnqualified = counts.form_unqualified ?? 0;
  const formAbandoned = counts.form_abandoned ?? 0;
  const bookings = counts.booking_success ?? 0;

  const ctaClicks = counts.Lead ?? 0;
  const visitorToFormPct = uniqueSessions > 0 ? (formOpens / uniqueSessions) * 100 : 0;
  const formToQualifiedPct = formOpens > 0 ? (formQualified / formOpens) * 100 : 0;
  const qualifiedToBookingPct = formQualified > 0 ? (bookings / formQualified) * 100 : 0;
  const overallConversionPct = uniqueSessions > 0 ? (bookings / uniqueSessions) * 100 : 0;

  // Scroll distribution
  const scrollEvents = events.filter((e) => e.event_name === "scroll_depth");
  const scrollDist = {
    25: scrollEvents.filter((e) => Number(e.payload?.depth) >= 25).length,
    50: scrollEvents.filter((e) => Number(e.payload?.depth) >= 50).length,
    75: scrollEvents.filter((e) => Number(e.payload?.depth) >= 75).length,
    100: scrollEvents.filter((e) => Number(e.payload?.depth) >= 100).length,
  };
  const maxScroll = Math.max(scrollDist[25], 1);

  // UTM source breakdown
  const utmSources = new Map<string, number>();
  for (const e of events) {
    if (e.event_name !== "PageView") continue;
    const src = (e.utm?.utm_source as string) || "(direct)";
    utmSources.set(src, (utmSources.get(src) ?? 0) + 1);
  }
  const sortedSources = [...utmSources.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <main className="min-h-screen py-12 md:py-16 bg-background">
      <Container className="max-w-6xl">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted mt-1">
              Données live · jamais cachées · refresh = reload de la page
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              ← Voir la LP
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Kpi label="Visiteurs uniques" value={uniqueSessions} />
          <Kpi label="Form ouverts" value={formOpens} pct={visitorToFormPct} pctLabel="des visiteurs" />
          <Kpi label="Form qualifiés" value={formQualified} pct={formToQualifiedPct} pctLabel="des ouvertures" />
          <Kpi label="Bookings" value={bookings} pct={overallConversionPct} pctLabel="conversion globale" highlight />
        </section>

        {/* Funnel */}
        <Card title="Funnel de conversion" className="mb-10">
          <FunnelStep label="Visiteurs uniques" value={uniqueSessions} max={uniqueSessions} />
          <FunnelStep label="Clics CTA" value={ctaClicks} max={uniqueSessions} />
          <FunnelStep label="Form ouverts" value={formOpens} max={uniqueSessions} />
          <FunnelStep label="Form qualifiés" value={formQualified} max={uniqueSessions} />
          <FunnelStep label="Bookings confirmés" value={bookings} max={uniqueSessions} highlight />
          {formUnqualified > 0 && (
            <p className="mt-4 text-xs text-muted">
              <span className="text-[#ff0000]">●</span> {formUnqualified} profil(s) non qualifié(s) (CA &lt; 1k€) ·{" "}
              {formAbandoned} abandon(s) en cours de form
            </p>
          )}
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Scroll depth */}
          <Card title="Profondeur de scroll">
            <div className="space-y-3">
              {[25, 50, 75, 100].map((depth) => {
                const count = scrollDist[depth as 25 | 50 | 75 | 100];
                const pct = (count / maxScroll) * 100;
                return (
                  <div key={depth}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono">{depth}%</span>
                      <span className="text-muted">
                        {count} session{count > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-card border border-border overflow-hidden">
                      <div
                        className="h-full bg-[#ff0000]"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* UTM sources */}
          <Card title="Sources de trafic (UTM)">
            {sortedSources.length === 0 ? (
              <p className="text-sm text-muted">Aucune donnée UTM pour le moment.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {sortedSources.map(([src, n]) => (
                  <li key={src} className="flex items-center justify-between">
                    <span className="font-mono text-xs">{src}</span>
                    <span className="text-muted">{n}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Leads */}
        <Card title={`Leads récents (${leads.length})`} className="mb-10">
          {leads.length === 0 ? (
            <p className="text-sm text-muted">Aucun lead pour le moment.</p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm">
                <thead className="text-muted text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-2 py-2 font-medium">Date</th>
                    <th className="text-left px-2 py-2 font-medium">Nom</th>
                    <th className="text-left px-2 py-2 font-medium">Email</th>
                    <th className="text-left px-2 py-2 font-medium">Niche</th>
                    <th className="text-left px-2 py-2 font-medium">CA</th>
                    <th className="text-left px-2 py-2 font-medium">YT</th>
                    <th className="text-left px-2 py-2 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-border align-top">
                      <td className="px-2 py-3 text-muted whitespace-nowrap text-xs">
                        {formatDate(l.created_at)}
                      </td>
                      <td className="px-2 py-3 font-medium">{l.name ?? "—"}</td>
                      <td className="px-2 py-3 font-mono text-xs">{l.email ?? "—"}</td>
                      <td className="px-2 py-3 text-muted">{l.niche ?? "—"}</td>
                      <td className="px-2 py-3 font-mono text-xs">{l.revenue ?? "—"}</td>
                      <td className="px-2 py-3 text-xs">{youtubeLabel(l.youtube)}</td>
                      <td className="px-2 py-3">
                        {l.qualified ? (
                          <Tag color="green">qualifié</Tag>
                        ) : (
                          <Tag color="red">non qualifié</Tag>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Events feed */}
        <Card title={`Events récents (${events.length})`}>
          <div className="overflow-x-auto -mx-2 max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-muted text-xs uppercase tracking-wider sticky top-0 bg-card">
                <tr>
                  <th className="text-left px-2 py-2 font-medium">Date</th>
                  <th className="text-left px-2 py-2 font-medium">Event</th>
                  <th className="text-left px-2 py-2 font-medium">Session</th>
                  <th className="text-left px-2 py-2 font-medium">Payload</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 100).map((e) => (
                  <tr key={e.id} className="border-t border-border">
                    <td className="px-2 py-2 text-muted whitespace-nowrap text-xs">
                      {formatDate(e.created_at)}
                    </td>
                    <td className="px-2 py-2 font-mono text-xs">{e.event_name}</td>
                    <td className="px-2 py-2 font-mono text-xs text-muted">
                      {e.session_id.slice(0, 8)}…
                    </td>
                    <td className="px-2 py-2 font-mono text-xs text-muted truncate max-w-xs">
                      {summarizePayload(e.payload)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </main>
  );
}

// === UI ===

function Kpi({
  label,
  value,
  pct,
  pctLabel,
  highlight,
}: {
  label: string;
  value: number;
  pct?: number;
  pctLabel?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border p-5 ${
        highlight ? "border-[#ff0000]/30 bg-[#ff0000]/5" : "border-border bg-card"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-muted mb-2">{label}</p>
      <p className="text-3xl font-bold tracking-tight">{value.toLocaleString("fr-FR")}</p>
      {typeof pct === "number" && (
        <p className="mt-1 text-xs text-muted">
          {pct.toFixed(1)}% <span className="opacity-60">{pctLabel}</span>
        </p>
      )}
    </div>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[var(--radius)] border border-border bg-card p-6 ${className ?? ""}`}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-5">{title}</h2>
      {children}
    </section>
  );
}

function FunnelStep({
  label,
  value,
  max,
  highlight,
}: {
  label: string;
  value: number;
  max: number;
  highlight?: boolean;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-muted text-xs">
          {value.toLocaleString("fr-FR")} <span className="opacity-60">· {pct.toFixed(1)}%</span>
        </span>
      </div>
      <div className="h-3 rounded-full border border-border overflow-hidden bg-background">
        <div
          className={`h-full ${highlight ? "bg-[#ff0000]" : "bg-primary"}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: "green" | "red" }) {
  const cls =
    color === "green"
      ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"
      : "bg-[#ff0000]/10 text-[#ff0000] border-[#ff0000]/30";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${cls}`}>
      {children}
    </span>
  );
}

// === Helpers ===

function countBy(arr: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const v of arr) out[v] = (out[v] ?? 0) + 1;
  return out;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function youtubeLabel(v: string | null): string {
  switch (v) {
    case "no":
      return "Non";
    case "sometimes":
      return "Sporadique";
    case "regular":
      return "Régulier";
    default:
      return "—";
  }
}

function summarizePayload(payload: Record<string, unknown>): string {
  const entries = Object.entries(payload);
  if (entries.length === 0) return "";
  return entries
    .map(([k, v]) => `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`)
    .join(" · ")
    .slice(0, 120);
}
