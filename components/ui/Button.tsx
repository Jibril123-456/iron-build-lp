"use client";

import Link from "next/link";
import type { CTA } from "@/config/site";
import { cn, isExternalLink } from "@/lib/utils";
import { trackedClick, track } from "@/lib/tracking";
import { openForm } from "@/components/forms/QualificationDialog";

const VARIANTS = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-black/10 cta-glow",
  secondary:
    "bg-card text-foreground border border-border hover:border-foreground/30 hover:bg-card/80",
  ghost:
    "bg-transparent text-foreground hover:bg-card/60 border border-transparent",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonProps = {
  cta: CTA;
  size?: keyof typeof SIZES;
  className?: string;
  block?: boolean;
};

export function Button({ cta, size = "md", className, block }: ButtonProps) {
  const variant = cta.variant ?? "primary";
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    block && "w-full",
    className,
  );

  // === Form trigger ===
  if (cta.formId) {
    const handleClick = () => {
      if (cta.trackingEvent) {
        track(cta.trackingEvent, { cta_label: cta.label });
      }
      openForm(cta.formId!);
    };
    return (
      <button type="button" className={classes} onClick={handleClick}>
        {cta.label}
        <ArrowRight />
      </button>
    );
  }

  const onClick = trackedClick(cta.trackingEvent, { cta_label: cta.label });

  if (isExternalLink(cta.href)) {
    return (
      <a
        href={cta.href}
        className={classes}
        onClick={onClick}
        target={cta.href.startsWith("http") ? "_blank" : undefined}
        rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {cta.label}
        <ArrowRight />
      </a>
    );
  }

  return (
    <Link href={cta.href} className={classes} onClick={onClick}>
      {cta.label}
      {cta.href.startsWith("#") ? null : <ArrowRight />}
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
