"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { trackTimeOnPage } from "@/lib/tracking";

export function TimeTracker() {
  useEffect(() => {
    const milestones = [...siteConfig.tracking.timeMilestones].sort((a, b) => a - b);
    const timers: number[] = [];
    let elapsed = 0;
    let lastStart = Date.now();

    const schedule = (remaining: number[], baseElapsed: number) => {
      for (const m of remaining) {
        const delay = (m - baseElapsed) * 1000;
        if (delay <= 0) {
          trackTimeOnPage(m);
          continue;
        }
        const id = window.setTimeout(() => trackTimeOnPage(m), delay);
        timers.push(id);
      }
    };

    schedule(milestones, 0);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        elapsed += (Date.now() - lastStart) / 1000;
        timers.forEach((id) => clearTimeout(id));
        timers.length = 0;
      } else {
        lastStart = Date.now();
        const remaining = milestones.filter((m) => m > elapsed);
        schedule(remaining, elapsed);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return null;
}
