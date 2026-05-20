"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, active]);

  return count;
}

// ─── Mini sparkline ───────────────────────────────────────────────────────────

function Sparkline({ values, color }: { values: readonly number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const W = 56;
  const H = 22;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * W;
      const y = H - ((v - min) / range) * H;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={W} height={H} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── KPI tile ─────────────────────────────────────────────────────────────────

function KpiTile({
  label,
  rawValue,
  suffix,
  prefix,
  decimal,
  trend,
  trendLabel,
  sparkValues,
  index,
  inView,
}: {
  label: string;
  rawValue: number;
  suffix: string;
  prefix: string;
  decimal: boolean;
  trend: "up" | "down";
  trendLabel: string;
  sparkValues: readonly number[];
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(rawValue, 1200, inView);
  const display = decimal ? count.toFixed(1) : Math.round(count).toString();
  const trendColor = trend === "up" ? "#3aaece" : "#3aaece";

  return (
    <motion.div
      className="rounded-xl p-5"
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 12px rgba(16,101,127,0.06)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 18 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.55 }}
    >
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#9ca3af] mb-3">
        {label}
      </p>
      <p className="text-[2rem] font-bold leading-none text-[#0d2535] mb-2">
        {prefix}{display}{suffix}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[0.6875rem] font-medium" style={{ color: trendColor }}>
          {trendLabel}
        </span>
        <Sparkline values={sparkValues} color="rgba(58,174,206,0.6)" />
      </div>
    </motion.div>
  );
}

// ─── Optimisation lever ───────────────────────────────────────────────────────

function Lever({ label, active, delay, inView }: { label: string; active: boolean; delay: number; inView: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-2.5"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -12 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className="h-2 w-2 rounded-full shrink-0"
        style={{ backgroundColor: active ? "#3aaece" : "#d1d5db" }}
      />
      <span className="text-xs text-[#4b5563]">{label}</span>
      {active && (
        <span className="ml-auto text-[0.625rem] font-semibold text-[#3aaece]/70 uppercase tracking-wide">
          Active
        </span>
      )}
    </motion.div>
  );
}

// ─── KPI data ─────────────────────────────────────────────────────────────────

// Numbers from Scottish Widows case study — confirm before launch
const KPIS = [
  {
    label: "Triple-channel lift",
    rawValue: 9,
    suffix: "×",
    prefix: "",
    decimal: false,
    trend: "up" as const,
    trendLabel: "vs organic — geo holdout",
    sparkValues: [1.8, 3.1, 4.4, 5.2, 6.7, 7.9, 9],
  },
  {
    label: "ROAS",
    rawValue: 3,
    suffix: ":1",
    prefix: "£",
    decimal: false,
    trend: "up" as const,
    trendLabel: "↑ Board-grade proof",
    sparkValues: [0.8, 1.2, 1.8, 2.1, 2.5, 2.8, 3],
  },
  {
    label: "Below CPD target",
    rawValue: 51,
    suffix: "%",
    prefix: "",
    decimal: false,
    trend: "up" as const,
    trendLabel: "↓ Cost per download",
    sparkValues: [8, 16, 24, 33, 40, 46, 51],
  },
  {
    label: "DM amplification",
    rawValue: 53,
    suffix: "%",
    prefix: "+",
    decimal: false,
    trend: "up" as const,
    trendLabel: "↑ CTV × direct mail",
    sparkValues: [10, 18, 27, 35, 43, 49, 53],
  },
] as const;

const LEVERS = [
  { label: "Audience optimisation", active: true },
  { label: "Creative rotation", active: true },
  { label: "Inventory & supply path", active: true },
  { label: "Frequency capping", active: true },
  { label: "Geography weighting", active: true },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function MeasurementDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#f0f8fb" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12 text-center">
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.75rem,3vw,2.75rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Geo holdout.<br className="hidden sm:block" /> Causal, not modelled.
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-lg leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "#4b5563" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              True incrementality via geo holdout — not correlation, not last-click.
              Results that hold up to CFO and board scrutiny, every campaign.
            </motion.p>
          </div>

          {/* Dashboard widget */}
          <div className="mx-auto max-w-4xl">

            {/* Dashboard header bar */}
            <motion.div
              className="flex items-center justify-between rounded-t-xl px-5 py-3"
              style={{
                background: "#ffffff",
                borderTop: "1px solid #e5e7eb",
                borderLeft: "1px solid #e5e7eb",
                borderRight: "1px solid #e5e7eb",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png" alt="" className="h-4 w-auto" />
                <span className="text-[11px] font-bold text-[#9ca3af] tracking-[0.12em] uppercase">
                  Geo Holdout Results · Scottish Widows
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-[#3aaece] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3aaece] animate-pulse" />
                LIVE
              </span>
            </motion.div>

            {/* KPI grid */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-px"
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderTop: "none",
              }}
            >
              {KPIS.map((kpi, i) => (
                <div key={kpi.label} className="p-px">
                  <KpiTile {...kpi} index={i} inView={inView} />
                </div>
              ))}
            </div>

            {/* Optimisation panel */}
            <motion.div
              className="rounded-b-xl px-6 py-5"
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderTop: "1px solid #e5e7eb",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[#9ca3af] mb-4">
                Optimisation Levers — All Active
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {LEVERS.map((lever, i) => (
                  <Lever
                    key={lever.label}
                    label={lever.label}
                    active={lever.active}
                    delay={0.7 + i * 0.07}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
