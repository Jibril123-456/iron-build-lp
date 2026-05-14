"use client";
import { useEffect, useState } from "react";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "#checkout";
const DURATION_S = 24 * 60 * 60;

function getDeadline(): number {
  const stored = sessionStorage.getItem("ib_urgency_deadline");
  if (stored) {
    const ts = parseInt(stored, 10);
    if (ts > Date.now()) return ts;
  }
  const deadline = Date.now() + DURATION_S * 1000;
  sessionStorage.setItem("ib_urgency_deadline", String(deadline));
  return deadline;
}

export function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const deadline = getDeadline();
    function tick() {
      setTimeLeft(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft === null) return null;

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const fmt = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-semibold"
      style={{ background: "#D85A30", color: "#0E0E10" }}
    >
      <span>
        ⚡ Offre de lancement — Prix augmente dans{" "}
        <strong className="font-black tabular-nums">{fmt}</strong>
      </span>
      <a
        href={CHECKOUT_URL}
        className="hidden sm:inline-flex items-center rounded px-3 py-1 text-xs font-bold transition-opacity hover:opacity-80"
        style={{ background: "#0E0E10", color: "#F5F2EC" }}
      >
        Accéder pour 27€ →
      </a>
    </div>
  );
}
