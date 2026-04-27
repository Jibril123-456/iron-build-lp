import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Tracking · Login",
  robots: { index: false, follow: false },
};

const AUTH_COOKIE = "lp_dashboard_auth";

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password");
  const from = formData.get("from");
  const expected = process.env.DASHBOARD_PASSWORD;

  if (!expected || typeof password !== "string" || password !== expected) {
    redirect("/tracking/login?e=invalid");
  }

  cookies().set(AUTH_COOKIE, expected, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  const dest = typeof from === "string" && from.startsWith("/tracking") ? from : "/tracking";
  redirect(dest);
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { e?: string; from?: string };
}) {
  const error = searchParams.e;
  const from = searchParams.from || "/tracking";

  return (
    <main className="min-h-screen grid place-items-center bg-background px-5">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-sm text-muted mb-8">Accès protégé.</p>

        <form action={login} className="space-y-4">
          <input type="hidden" name="from" value={from} />
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider text-muted mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full h-11 rounded-[var(--radius)] border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40"
            />
          </div>

          {error === "invalid" && (
            <p className="text-xs text-[#ff0000]">Mot de passe incorrect.</p>
          )}
          {error === "no_password" && (
            <p className="text-xs text-[#ff0000]">
              <code>DASHBOARD_PASSWORD</code> n&apos;est pas défini dans <code>.env.local</code>.
            </p>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-[var(--radius)] bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            Entrer
          </button>
        </form>
      </div>
    </main>
  );
}
