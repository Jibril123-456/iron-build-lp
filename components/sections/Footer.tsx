import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const SOCIAL_LABELS: Record<"x" | "instagram" | "youtube" | "linkedin" | "tiktok", string> = {
  x: "X (Twitter)",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

const SOCIAL_ICONS: Record<"x" | "instagram" | "youtube" | "linkedin" | "tiktok", React.ReactNode> = {
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.553 8.63L23 22h-6.99l-5.473-7.155L4.244 22H1l8.094-9.247L1 2h7.155l4.946 6.54L18.244 2Zm-1.226 18h1.81L7.07 4H5.13l11.888 16Z" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s-.1-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.36-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.2 8.2 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12Z" />
    </svg>
  ),
};

export function Footer() {
  const f = siteConfig.sections.footer;

  return (
    <footer
      className={cn(
        "border-t border-border",
        f.dark && "section-dark",
      )}
    >
      <Container className="py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-sm">
            <div className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              {f.brand}
              <span className="text-[#ff0000]">.</span>
            </div>
            {f.tagline && <p className="mt-2 text-sm text-muted">{f.tagline}</p>}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
            {f.links.length > 0 && (
              <nav>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {f.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {f.socials.length > 0 && (
              <ul className="flex items-center gap-2">
                {f.socials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={SOCIAL_LABELS[s.platform]}
                      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      {SOCIAL_ICONS[s.platform]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs text-muted">
          <p>{f.legal}</p>
          <Link href="/tracking" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </div>
      </Container>
    </footer>
  );
}
