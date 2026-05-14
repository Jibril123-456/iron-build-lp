"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type Entry = { weight: number | null; date: string | null };
type TrackerData = { entries: Entry[] };

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "ironbuild_tracker_v1";
const WEEKS = 9; // S0 → S8

const STATUS_CONFIG = {
  green:  { color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)",  label: "Zone idéale", rule: "+0,3 à +0,8 kg/sem",          advice: "Continue comme ça ✓" },
  orange: { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)",  label: "Trop vite",   rule: "+1 kg/sem → −150 kcal/jour",  advice: "−150 kcal/jour" },
  red:    { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)", label: "Stagnation",  rule: "< +0,3 kg → +200 kcal/jour",  advice: "+200 kcal/jour" },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function emptyData(): TrackerData {
  return { entries: Array.from({ length: WEEKS }, () => ({ weight: null, date: null })) };
}

function variation(curr: number | null, prev: number | null): number | null {
  if (curr == null || prev == null) return null;
  return Math.round((curr - prev) * 100) / 100;
}

function getStatus(v: number | null): StatusKey | null {
  if (v == null) return null;
  if (v >= 1.0) return "orange";
  if (v >= 0.3) return "green";
  return "red";
}

function fmtDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

function parseWeight(s: string): number | null {
  const n = parseFloat(s.replace(",", "."));
  return isNaN(n) || n < 30 || n > 250 ? null : n;
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

function Chart({ entries, variations }: { entries: Entry[]; variations: (number | null)[] }) {
  const points = entries
    .map((e, i) => (e.weight != null ? { i, w: e.weight } : null))
    .filter((p): p is { i: number; w: number } => p !== null);

  if (points.length < 2) {
    return (
      <div className="flex items-center justify-center h-28 text-xs font-medium uppercase tracking-widest" style={{ color: "#2E2E33", fontFamily: "monospace" }}>
        Entre au moins 2 semaines pour voir la courbe
      </div>
    );
  }

  const W = 560; const H = 160;
  const PL = 44; const PR = 12; const PT = 16; const PB = 28;
  const CW = W - PL - PR; const CH = H - PT - PB;

  const weights = points.map(p => p.w);
  const minW = Math.min(...weights) - 0.5;
  const maxW = Math.max(...weights) + 0.5;
  const range = maxW - minW || 1;

  const x = (i: number) => PL + (i / 8) * CW;
  const y = (w: number) => PT + (1 - (w - minW) / range) * CH;

  const linePath = points
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${x(p.i).toFixed(1)} ${y(p.w).toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${x(points[points.length - 1].i).toFixed(1)} ${(PT + CH).toFixed(1)} L ${x(points[0].i).toFixed(1)} ${(PT + CH).toFixed(1)} Z`;

  // Y-axis ticks (3 labels)
  const yTicks = [minW + 0.5, (minW + maxW) / 2, maxW - 0.5];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Courbe de progression de poids">
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D85A30" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D85A30" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.33, 0.67, 1].map((t, idx) => (
        <line key={idx} x1={PL} y1={PT + t * CH} x2={W - PR} y2={PT + t * CH} stroke="#2E2E33" strokeWidth="1" />
      ))}
      {/* Vertical reference lines for each week */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x(i)} y1={PT} x2={x(i)} y2={PT + CH} stroke="#1e1e20" strokeWidth="1" />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#area-fill)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#D85A30" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* Dots */}
      {points.map(p => {
        const s = getStatus(variations[p.i]);
        const fill = s ? STATUS_CONFIG[s].color : "#D85A30";
        return (
          <g key={p.i}>
            <circle cx={x(p.i)} cy={y(p.w)} r="6" fill="#0E0E10" stroke={fill} strokeWidth="2.5" />
            <circle cx={x(p.i)} cy={y(p.w)} r="2.5" fill={fill} />
          </g>
        );
      })}

      {/* Y labels */}
      {yTicks.map((w, i) => (
        <text key={i} x={PL - 6} y={y(w) + 4} textAnchor="end" fontSize="9" fill="#6b7280" fontFamily="monospace">
          {w.toFixed(1)}
        </text>
      ))}

      {/* X labels */}
      {Array.from({ length: 9 }, (_, i) => (
        <text key={i} x={x(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="monospace">
          S{i}
        </text>
      ))}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TrackerClient() {
  const [data, setData] = useState<TrackerData>(emptyData());
  const [editWeek, setEditWeek] = useState<number>(0);
  const [inputVal, setInputVal] = useState("");
  const [flash, setFlash] = useState<"saved" | "error" | null>(null);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TrackerData;
        setData(parsed);
        // Auto-select next empty week
        const next = parsed.entries.findIndex(e => e.weight == null);
        setEditWeek(next === -1 ? 8 : next);
      }
    } catch { /* ignore */ }
  }, []);

  // Derived state
  const variations = data.entries.map((e, i) =>
    variation(e.weight, data.entries[i - 1]?.weight ?? null)
  );
  const filledCount = data.entries.filter(e => e.weight != null).length;

  function showFlash(type: "saved" | "error") {
    if (flashRef.current) clearTimeout(flashRef.current);
    setFlash(type);
    flashRef.current = setTimeout(() => setFlash(null), 2200);
  }

  function handleSave() {
    const w = parseWeight(inputVal);
    if (w == null) { showFlash("error"); inputRef.current?.focus(); return; }

    const updated: TrackerData = {
      entries: data.entries.map((e, i) =>
        i === editWeek
          ? { weight: w, date: new Date().toISOString().split("T")[0] }
          : e
      ),
    };
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Advance to next empty week
    const next = updated.entries.findIndex((e, i) => i > editWeek && e.weight == null);
    if (next !== -1) setEditWeek(next);
    setInputVal("");
    showFlash("saved");
    inputRef.current?.focus();
  }

  function handleReset() {
    if (!window.confirm("Effacer toutes les données ? Cette action est irréversible.")) return;
    const d = emptyData();
    setData(d);
    localStorage.removeItem(STORAGE_KEY);
    setEditWeek(0);
    setInputVal("");
  }

  function handleRowClick(i: number) {
    setEditWeek(i);
    setInputVal(data.entries[i].weight?.toString() ?? "");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const currentEntry = data.entries[editWeek];
  const isComplete = filledCount === WEEKS;

  return (
    <main className="min-h-screen py-12 md:py-20" style={{ background: "#0E0E10", color: "#F5F2EC" }}>
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest mb-8"
            style={{ color: "#A8A29A", fontFamily: "monospace" }}
          >
            ← Iron Build
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] mb-3" style={{ color: "#D85A30", fontFamily: "monospace" }}>
                ■ Tracker · 8 Semaines
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                Progression de poids
              </h1>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A8A29A" }}>
                Pèse-toi chaque lundi matin, à jeun, même conditions. Données stockées localement sur ton appareil.
              </p>
            </div>
            {filledCount > 0 && (
              <button
                onClick={handleReset}
                className="text-xs uppercase tracking-widest shrink-0 mt-1 transition-colors hover:opacity-60"
                style={{ color: "#2E2E33", fontFamily: "monospace" }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ── Input card ── */}
        <div className="rounded-sm border p-6 mb-6" style={{ background: "#18181B", borderColor: editWeek !== null ? "#D85A30" : "#2E2E33", borderWidth: 1 }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "#D85A30", fontFamily: "monospace" }}>
              {isComplete ? "Programme terminé — modifie une semaine" : `Saisie du poids — S${editWeek}`}
            </p>
            {flash === "saved" && (
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#34d399", fontFamily: "monospace" }}>✓ Sauvegardé</span>
            )}
            {flash === "error" && (
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#f87171", fontFamily: "monospace" }}>Poids invalide (ex: 63.5)</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={editWeek}
              onChange={e => handleRowClick(Number(e.target.value))}
              className="rounded-sm px-3 py-2.5 text-sm outline-none shrink-0"
              style={{ background: "#0E0E10", border: "1px solid #2E2E33", color: "#F5F2EC", fontFamily: "monospace" }}
            >
              {Array.from({ length: WEEKS }, (_, i) => (
                <option key={i} value={i}>
                  S{i}{i === 0 ? " · Départ" : ""}
                  {data.entries[i].weight != null ? ` · ${data.entries[i].weight} kg` : " · —"}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="number"
                step="0.1"
                min="30"
                max="250"
                placeholder={currentEntry.weight != null ? `Actuel : ${currentEntry.weight} kg` : "Ex : 63.5"}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSave()}
                className="w-full rounded-sm px-3 py-2.5 text-sm outline-none"
                style={{ background: "#0E0E10", border: "1px solid #2E2E33", color: "#F5F2EC" }}
              />
            </div>
            <span className="text-sm shrink-0" style={{ color: "#A8A29A" }}>kg</span>
            <button
              onClick={handleSave}
              disabled={!inputVal.trim()}
              className="px-5 py-2.5 text-sm font-bold rounded-sm shrink-0 transition-opacity disabled:opacity-30"
              style={{ background: "#D85A30", color: "#F5F2EC" }}
            >
              Sauvegarder
            </button>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#2E2E33" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(filledCount / WEEKS) * 100}%`, background: "#D85A30" }}
            />
          </div>
          <span className="text-xs shrink-0" style={{ color: "#A8A29A", fontFamily: "monospace" }}>
            {filledCount}/{WEEKS} semaines
          </span>
        </div>

        {/* ── Chart ── */}
        <div className="rounded-sm border p-6 mb-6" style={{ background: "#18181B", borderColor: "#2E2E33" }}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] mb-5" style={{ color: "#A8A29A", fontFamily: "monospace" }}>
            Courbe de progression
          </p>
          <Chart entries={data.entries} variations={variations} />
        </div>

        {/* ── Table ── */}
        <div className="rounded-sm border overflow-hidden mb-6" style={{ borderColor: "#2E2E33" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr style={{ background: "#18181B", borderBottom: "1px solid #2E2E33" }}>
                  {["Sem.", "Date", "Poids", "Variation", "Zone", "Conseil"].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.14em]"
                      style={{ color: "#A8A29A", fontFamily: "monospace" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry, i) => {
                  const v = variations[i];
                  const s = getStatus(v);
                  const cfg = s ? STATUS_CONFIG[s] : null;
                  const isEmpty = entry.weight == null;
                  const isSelected = editWeek === i;

                  return (
                    <tr
                      key={i}
                      onClick={() => handleRowClick(i)}
                      className="cursor-pointer transition-colors"
                      style={{
                        background: isSelected
                          ? "rgba(216,90,48,0.06)"
                          : i % 2 === 0 ? "#0E0E10" : "#111113",
                        borderBottom: "1px solid #1a1a1d",
                        borderLeft: isSelected ? "2px solid #D85A30" : "2px solid transparent",
                      }}
                    >
                      {/* Semaine */}
                      <td className="px-4 py-3 font-black text-xs" style={{ color: i === 0 ? "#A8845C" : "#F5F2EC", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                        S{i}{i === 0 && <span className="ml-1.5 font-normal" style={{ color: "#A8A29A" }}>Départ</span>}
                      </td>
                      {/* Date */}
                      <td className="px-4 py-3 text-xs" style={{ color: "#6b7280", fontFamily: "monospace" }}>
                        {fmtDate(entry.date)}
                      </td>
                      {/* Poids */}
                      <td className="px-4 py-3 font-bold" style={{ color: isEmpty ? "#2E2E33" : "#F5F2EC" }}>
                        {isEmpty ? "—" : `${entry.weight} kg`}
                      </td>
                      {/* Variation */}
                      <td className="px-4 py-3 font-bold text-sm" style={{ color: cfg ? cfg.color : "#2E2E33" }}>
                        {v == null ? "—" : v >= 0 ? `+${v.toFixed(2)} kg` : `${v.toFixed(2)} kg`}
                      </td>
                      {/* Zone */}
                      <td className="px-4 py-3">
                        {cfg ? (
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm"
                            style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, fontFamily: "monospace" }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: cfg.color }} />
                            {cfg.label}
                          </span>
                        ) : (
                          <span style={{ color: "#2E2E33" }}>—</span>
                        )}
                      </td>
                      {/* Conseil */}
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: cfg ? cfg.color : "#2E2E33" }}>
                        {cfg ? cfg.advice : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {(Object.entries(STATUS_CONFIG) as [StatusKey, typeof STATUS_CONFIG[StatusKey]][]).map(([, cfg]) => (
            <div
              key={cfg.label}
              className="rounded-sm border p-4"
              style={{ background: cfg.bg, borderColor: cfg.border }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: cfg.color }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cfg.color, fontFamily: "monospace" }}>
                  {cfg.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#A8A29A" }}>{cfg.rule}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
