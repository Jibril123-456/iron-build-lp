import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EventBody = {
  event_name?: unknown;
  payload?: unknown;
  utm?: unknown;
  path?: unknown;
  referrer?: unknown;
};

const MAX_PAYLOAD_BYTES = 16_000;

function asString(v: unknown, max = 256): string | null {
  if (typeof v !== "string") return null;
  if (!v) return null;
  return v.slice(0, max);
}

function asObject(v: unknown): Record<string, unknown> {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return {};
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "supabase_not_configured" }, { status: 503 });
  }

  let body: EventBody;
  try {
    const raw = await req.text();
    if (raw.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
    body = JSON.parse(raw) as EventBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventName = asString(body.event_name, 64);
  if (!eventName) {
    return NextResponse.json({ ok: false, error: "missing_event_name" }, { status: 400 });
  }

  const sessionId = req.headers.get("x-lp-session") ?? readSessionFromCookie(req);
  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "no_session" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("events").insert({
    session_id: sessionId,
    event_name: eventName,
    payload: asObject(body.payload),
    utm: asObject(body.utm),
    path: asString(body.path, 512),
    referrer: asString(body.referrer, 512),
    user_agent: asString(req.headers.get("user-agent"), 512),
  });

  if (error) {
    console.error("[events] insert failed", error);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
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
