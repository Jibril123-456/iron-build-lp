import type { CSSProperties } from "react";
import type { SiteConfig } from "@/config/site";

const RADIUS_MAP: Record<SiteConfig["theme"]["radius"], string> = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
};

export function themeToCssVars(theme: SiteConfig["theme"]): CSSProperties {
  const c = theme.colors;
  return {
    "--color-background": c.background,
    "--color-foreground": c.foreground,
    "--color-muted": c.muted,
    "--color-border": c.border,
    "--color-card": c.card,
    "--color-primary": c.primary,
    "--color-primary-foreground": c.primaryForeground,
    "--color-accent": c.accent,
    "--color-accent-foreground": c.accentForeground,
    "--radius": RADIUS_MAP[theme.radius],
  } as CSSProperties;
}
