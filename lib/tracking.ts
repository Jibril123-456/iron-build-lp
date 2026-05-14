import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __trackingFired?: Set<string>;
  }
}

export type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase"
  | "Contact"
  | "CompleteRegistration";

export type TrackPayload = Record<string, string | number | boolean | undefined>;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ttclid", "fbclid"] as const;
const UTM_STORAGE_KEY = "lp_utm";

function getFiredSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  if (!window.__trackingFired) window.__trackingFired = new Set();
  return window.__trackingFired;
}

export function fireOnce(key: string): boolean {
  const fired = getFiredSet();
  if (fired.has(key)) return false;
  fired.add(key);
  return true;
}

export function getStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function captureUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const captured: Record<string, string> = {};
  let hasNew = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      captured[key] = value;
      hasNew = true;
    }
  }
  if (hasNew) {
    try {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
    } catch {
      // localStorage may be unavailable; fail silent.
    }
    return captured;
  }
  return getStoredUtm();
}

function readSessionCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)lp_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Server-side ingestion for the custom dashboard. Fire-and-forget. */
function postEvent(eventName: string, payload: TrackPayload, utm: Record<string, string>) {
  if (typeof window === "undefined") return;
  // Don't pollute analytics with admin pageviews from the dashboard itself.
  if (window.location.pathname.startsWith("/tracking")) return;
  try {
    const body = JSON.stringify({
      event_name: eventName,
      payload,
      utm,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
    });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const session = readSessionCookie();
    if (session) headers["x-lp-session"] = session;

    if (navigator.sendBeacon) {
      // sendBeacon doesn't allow custom headers — fallback to fetch when we need session header.
      if (session) {
        void fetch("/api/events", { method: "POST", headers, body, keepalive: true }).catch(() => undefined);
      } else {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/events", blob);
      }
    } else {
      void fetch("/api/events", { method: "POST", headers, body, keepalive: true }).catch(() => undefined);
    }
  } catch {
    // never throw from tracking
  }
}

export function track(event: StandardEvent | string, payload: TrackPayload = {}): void {
  if (typeof window === "undefined") return;

  const utm = getStoredUtm();
  const enriched: TrackPayload = { ...payload, ...utm };

  // Server-side ingestion (Supabase via /api/events)
  postEvent(event, payload, utm);

  // Facebook Pixel
  if (siteConfig.tracking.fbPixelId && typeof window.fbq === "function") {
    const isStandard: StandardEvent[] = [
      "PageView",
      "ViewContent",
      "Lead",
      "InitiateCheckout",
      "Purchase",
      "Contact",
      "CompleteRegistration",
    ];
    const verb = (isStandard as string[]).includes(event) ? "track" : "trackCustom";
    window.fbq(verb, event, enriched);
  }

  // Google Analytics 4
  if (siteConfig.tracking.ga4Id && typeof window.gtag === "function") {
    const ga4Map: Record<string, string> = {
      PageView: "page_view",
      Lead: "generate_lead",
      InitiateCheckout: "begin_checkout",
      Purchase: "purchase",
      ViewContent: "view_item",
      Contact: "contact",
      CompleteRegistration: "sign_up",
    };
    const ga4Event = ga4Map[event] || event;
    window.gtag("event", ga4Event, enriched);
  }
}

export function trackPageView(): void {
  if (!fireOnce("page_view")) return;
  track("PageView");
}

export function trackScrollDepth(percent: number): void {
  if (!fireOnce(`scroll_${percent}`)) return;
  track("scroll_depth", { depth: percent });
}

export function trackTimeOnPage(seconds: number): void {
  if (!fireOnce(`time_${seconds}`)) return;
  track("time_on_page", { seconds });
}

export function trackedClick(event: string | undefined, payload: TrackPayload = {}) {
  return () => {
    if (!event) return;
    track(event, payload);
  };
}

export const trackingEvents = [
  { name: "PageView", description: "Vue de la page", builtin: true },
  { name: "scroll_depth", description: "Profondeur de scroll (25/50/75/100%)", builtin: true },
  { name: "time_on_page", description: "Temps passé sur la page (15/30/60/120s)", builtin: true },
  { name: "Lead", description: "CTA principal cliqué", builtin: true },
  { name: "form_open", description: "Formulaire de qualification ouvert", builtin: true },
  { name: "form_step", description: "Étape du formulaire validée", builtin: true },
  { name: "form_qualified", description: "Form complété avec profil qualifié", builtin: true },
  { name: "form_unqualified", description: "Form complété avec profil non qualifié", builtin: true },
  { name: "form_abandoned", description: "Formulaire fermé en cours de saisie", builtin: true },
  { name: "booking_success", description: "Booking Cal.com confirmé", builtin: true },
] as const;
