"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { trackScrollDepth } from "@/lib/tracking";

export function ScrollTracker() {
  useEffect(() => {
    const milestones = [...siteConfig.tracking.scrollDepths].sort((a, b) => a - b);
    if (milestones.length === 0) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable <= 0) {
          ticking = false;
          return;
        }
        const pct = Math.round((window.scrollY / scrollable) * 100);
        for (const m of milestones) {
          if (pct >= m) trackScrollDepth(m);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
