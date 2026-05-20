"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Mini visuals ──────────────────────────────────────────────────────────────

function sr(seed: number) {
  return (((Math.sin(seed * 9301 + 49297) % 1) + 1) % 1);
}

// Card 1: Audience ID Graph — postcode heatmap grid
function MiniHeatmap() {
  const ROWS = 4;
  const COLS = 7;
  const PALETTE = ["#eaf6fb", "rgba(58,174,206,0.25)", "rgba(58,174,206,0.55)", "#10657f"];
  const grid = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => Math.min(3, Math.floor(sr(r * 13 + c) * 4)))
  );
  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((v, c) => (
            <div
              key={c}
              className="rounded-sm"
              style={{ width: 20, height: 15, backgroundColor: PALETTE[v] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Card 2: CTV Supply Curation — ascending signal bars
function MiniSupplyGrid() {
  const bars = [
    { h: 16, o: 0.25 },
    { h: 24, o: 0.35 },
    { h: 34, o: 0.5 },
    { h: 44, o: 0.65 },
    { h: 54, o: 0.85 },
  ];
  return (
    <div className="flex flex-col justify-end gap-2" style={{ height: 72 }}>
      <div className="flex items-end gap-1.5">
        {bars.map((b, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: 13,
              height: b.h,
              backgroundColor: `rgba(58,174,206,${b.o})`,
            }}
          />
        ))}
      </div>
      <span className="text-[8px] font-medium tracking-wide" style={{ color: "#9ca3af" }}>
        30+ BVOD partners
      </span>
    </div>
  );
}

// Card 3: Incrementality Proof — clean control vs test bars
function MiniHoldout() {
  return (
    <div className="flex items-end gap-3" style={{ height: 72 }}>
      {/* Control bar */}
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div
          className="w-10 rounded-sm"
          style={{
            height: 20,
            background: "rgba(58,174,206,0.15)",
            border: "1px solid rgba(58,174,206,0.3)",
          }}
        />
        <span
          className="text-[7.5px] font-semibold tracking-[0.08em]"
          style={{ color: "#9ca3af" }}
        >
          CTRL
        </span>
      </div>

      {/* Test bar */}
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div
          className="w-10 rounded-sm"
          style={{ height: 52, background: "rgba(58,174,206,0.7)" }}
        />
        <span
          className="text-[7.5px] font-semibold tracking-[0.08em]"
          style={{ color: "#3aaece" }}
        >
          CTV
        </span>
      </div>

      {/* Delta indicator */}
      <div className="flex flex-col items-center justify-end pb-5">
        <svg width="14" height="36" viewBox="0 0 14 36" aria-hidden="true">
          <line x1="7" y1="2" x2="7" y2="34" stroke="rgba(58,174,206,0.35)" strokeWidth="1" strokeDasharray="2.5 2" />
          <path d="M 3,6 L 7,2 L 11,6" stroke="rgba(58,174,206,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-bold" style={{ color: "#0d2535" }}>Δ</span>
      </div>
    </div>
  );
}

// Card 4: Compounding Intelligence — exponential growth curve
function MiniLoop() {
  const pts: [number, number][] = [[0, 52], [20, 47], [40, 37], [60, 20], [80, 4]];
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden="true">
      {/* Axis */}
      <line x1="0" y1="58" x2="88" y2="58" stroke="rgba(16,101,127,0.12)" strokeWidth="1" />
      {/* Dashed linear reference */}
      <line
        x1="0" y1="52" x2="80" y2="8"
        stroke="rgba(58,174,206,0.15)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {/* Compound curve */}
      <polyline
        points={line}
        fill="none"
        stroke="#3aaece"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Campaign dots */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 2.5 : 3.5} fill={i === 0 ? "rgba(58,174,206,0.35)" : "#3aaece"} />
      ))}
      {/* "Campaign N" label on last dot */}
      <text x="64" y="16" fill="rgba(58,174,206,0.45)" fontSize={7} fontWeight={600}>C4</text>
      <text x="2" y="48" fill="rgba(58,174,206,0.3)" fontSize={7} fontWeight={600}>C1</text>
    </svg>
  );
}

// ─── Component data ────────────────────────────────────────────────────────────

const COMPONENTS = [
  {
    step: "01",
    name: "Audience ID Graph",
    desc: "Postcode-level identity resolution linking CRM, census, behavioural, demographic, financial, web/app usage and TV signals — with 6,233 attributes per record.",
    bullets: ["1.8M UK postcodes · 6,233 attributes", "32M US Zip+4", "Privacy-safe via Snowflake"],
    Visual: MiniHeatmap,
  },
  {
    step: "02",
    name: "CTV Supply Curation",
    desc: "Rigorously curated premium inventory across every major streaming platform. Full control over where, when and how your brand appears — DSP-agnostic.",
    bullets: ["30+ BVOD partners globally", "DSP-agnostic", "Premium-only inventory"],
    Visual: MiniSupplyGrid,
  },
  {
    step: "03",
    name: "Incrementality Proof",
    desc: "True incrementality measurement using geo holdout — not correlation, not last-click. Results that hold up to CFO and board scrutiny.",
    bullets: ["Geo holdout methodology", "Causal, not modelled", "Board-grade results"],
    Visual: MiniHoldout,
  },
  {
    step: "04",
    name: "Compounding Intelligence",
    desc: "AI-driven learning accumulates into a proprietary asset that rivals cannot replicate. Every campaign feeds the next — audiences sharpen, costs fall.",
    bullets: ["Every campaign feeds the next", "Proprietary asset you own", "CRM + MMM integration"],
    Visual: MiniLoop,
  },
] as const;

// ─── Card ──────────────────────────────────────────────────────────────────────

function ComponentCard({
  comp,
  index,
  inView,
}: {
  comp: (typeof COMPONENTS)[number];
  index: number;
  inView: boolean;
}) {
  const { Visual } = comp;
  return (
    <motion.div
      className="flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-7"
      style={{ boxShadow: "0 2px 16px rgba(16,101,127,0.07)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Mini visual */}
      <div className="mb-6 flex items-end h-[72px]">
        <Visual />
      </div>

      {/* Step number */}
      <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#3aaece]/60 mb-1">
        {comp.step}
      </p>

      {/* Name */}
      <h3 className="text-[1.0625rem] font-bold text-[#0d2535] mb-3 leading-snug">
        {comp.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-[#4b5563] mb-5">{comp.desc}</p>

      {/* Bullets */}
      <ul className="mt-auto flex flex-col gap-1.5">
        {comp.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs text-[#4b5563]">
            <span
              className="h-1 w-1 rounded-full shrink-0"
              style={{ backgroundColor: "#3aaece" }}
            />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FourComponents() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#f9fafb" }}>
      <div className="section-padding">
        <div className="container-main">

          <div className="mb-12 text-center">
            <motion.h2
              className="font-bold text-[#0d2535]"
              style={{ fontSize: "clamp(1.75rem,3vw,2.75rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Four components. One system.
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Each layer is purpose-built. Together they form a decision system that
              compounds with every campaign.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COMPONENTS.map((comp, i) => (
              <ComponentCard key={comp.step} comp={comp} index={i} inView={inView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
