import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubmitBody = {
  formId?: unknown;
  data?: unknown;
  utm?: unknown;
};

const MAX_FIELD_LEN = 1000;

function asString(v: unknown, max = MAX_FIELD_LEN): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function asObject(v: unknown): Record<string, unknown> {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return {};
}

function readSessionFromCookie(req: Request): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  for (const part of cookie.split(";")) {
    const [k, v] = part.trim().split("=");
    if (k === "lp_session" && v) return v.slice(0, 64);
  }
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "supabase_not_configured" }, { status: 503 });
  }

  let body: SubmitBody;
  try {
    body = (await req.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const formId = asString(body.formId, 64);
  if (!formId || formId !== siteConfig.forms.qualification.id) {
    return NextResponse.json({ ok: false, error: "unknown_form" }, { status: 400 });
  }

  const sessionId = req.headers.get("x-lp-session") ?? readSessionFromCookie(req);
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "no_session" }, { status: 400 });
  }

  const data = asObject(body.data);
  const utm = asObject(body.utm);

  const name = asString(data.name, 120);
  const niche = asString(data.niche, 200);
  const revenue = asString(data.revenue, 16);
  const youtube = asString(data.youtube, 16);
  const pain = asString(data.pain, 800);
  const email = asString(data.email, 200);

  if (!name || !niche || !revenue || !youtube || !pain || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const form = siteConfig.forms.qualification;
  const revenueQuestion = form.questions.find(
    (q): q is Extract<typeof q, { type: "choice" }> => q.id === "revenue" && q.type === "choice",
  );
  const opt = revenueQuestion?.options.find((o) => o.value === revenue);
  if (!opt) {
    return NextResponse.json({ ok: false, error: "invalid_revenue" }, { status: 400 });
  }
  const qualified = !opt.disqualifies;

  const supabase = getSupabaseAdmin();

  const { error: leadError } = await supabase.from("leads").insert({
    session_id: sessionId,
    form_id: formId,
    name,
    email,
    niche,
    revenue,
    youtube,
    pain,
    qualified,
    utm,
  });

  if (leadError) {
    console.error("[forms/submit] lead insert failed", leadError);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  await supabase.from("events").insert({
    session_id: sessionId,
    event_name: qualified ? "form_qualified" : "form_unqualified",
    payload: { form_id: formId, revenue, youtube },
    utm,
    path: asString(req.headers.get("referer"), 512),
    user_agent: asString(req.headers.get("user-agent"), 512),
  });

  return NextResponse.json({ ok: true, qualified });
}
