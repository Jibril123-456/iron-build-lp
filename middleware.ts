import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "lp_session";
const AUTH_COOKIE = "lp_dashboard_auth";

function genSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // === Dashboard auth ===
  if (pathname.startsWith("/tracking") && pathname !== "/tracking/login") {
    const password = process.env.DASHBOARD_PASSWORD;
    const authCookie = req.cookies.get(AUTH_COOKIE)?.value;

    if (!password) {
      // Fail closed: no password set, no access.
      const url = req.nextUrl.clone();
      url.pathname = "/tracking/login";
      url.searchParams.set("e", "no_password");
      return NextResponse.redirect(url);
    }

    if (authCookie !== password) {
      const url = req.nextUrl.clone();
      url.pathname = "/tracking/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // === Session cookie (for tracking attribution) ===
  const res = NextResponse.next();
  if (!req.cookies.get(SESSION_COOKIE)) {
    res.cookies.set(SESSION_COOKIE, genSessionId(), {
      path: "/",
      sameSite: "lax",
      httpOnly: false, // readable by client tracking script
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
  return res;
}

export const config = {
  matcher: [
    // run on every request except static assets and API routes that don't need it
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map|txt|xml)$).*)",
  ],
};
