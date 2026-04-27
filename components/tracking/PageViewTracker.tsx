"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { trackPageView } from "@/lib/tracking";

export function PageViewTracker() {
  useEffect(() => {
    const wantFb = Boolean(siteConfig.tracking.fbPixelId);
    const wantGa = Boolean(siteConfig.tracking.ga4Id);

    if (!wantFb && !wantGa) {
      trackPageView();
      return;
    }

    const start = Date.now();
    const interval = window.setInterval(() => {
      const fbReady = !wantFb || typeof window.fbq === "function";
      const gaReady = !wantGa || typeof window.gtag === "function";
      const expired = Date.now() - start > 4000;
      if ((fbReady && gaReady) || expired) {
        window.clearInterval(interval);
        trackPageView();
      }
    }, 80);

    return () => window.clearInterval(interval);
  }, []);

  return null;
}
