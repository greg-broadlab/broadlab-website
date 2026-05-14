"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Steps ────────────────────────────────────────────────────────────────────
// PLACEHOLDER — confirm copy with BroadLab before launch
const STEPS = [
  {
    n: "01",
    title: "Define Your Outcome",
    desc: "Every campaign starts with a clear business outcome — not a media target.",
  },
  {
    n: "02",
    title: "Design Your Solution",
    desc: "Custom audience architecture and measurement framework built around your goal.",
  },
  {
    n: "03",
    title: "Dynamic Optimisation",
    desc: "Real-time in-flight refinement across audience, creative, geography and frequency.",
  },
  {
    n: "04",
    title: "Learn & Scale",
    desc: "AI-driven signals compound across every campaign, building a structural performance edge.",
  },
] as const;

// ─── ID Graph Visual ──────────────────────────────────────────────────────────

const GRAPH_INPUTS  = ["Census Data", "TV / CTV Signals", "Behavioural Data"];
const GRAPH_OUTPUTS = ["CRM Integration", "In-Flight AI/ML", "Postcode Insights"];

// Dot positions [row, col] inside an 8 × 5 grid (0-indexed)
const DOTS: [number, number][] = [
  [0, 1], [0, 4], [0, 6],
  [1, 0], [1, 2], [1, 5], [1, 7],
  [2, 1], [2, 3], [2, 6],
  [3, 2], [3, 4], [3, 7],
  [4, 0], [4, 3], [4, 5],
];

const G_COLS = 8;
const G_ROWS = 5;
const G_CW   = 27; // cell width  px
const G_CH   = 26; // cell height px
const G_HDR  = 28; // dark header bar height px

// Total grid box dimensions
const GRID_W = G_COLS * G_CW;           // 216
const GRID_H = G_HDR + G_ROWS * G_CH;  // 18 + 130 = 148

function IDGraphVisual({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="flex items-center gap-5"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.94 }}
      transition={{ delay: 2.0, duration: 0.6 }}
    >
      {/* ── Left: inputs ── */}
      <div
        className="flex flex-col justify-around"
        style={{ width: 120, height: GRID_H }}
      >
        {GRAPH_INPUTS.map((label, i) => (
          <div key={i} className="flex items-center justify-end gap-2">
            <span
              className="font-semibold leading-snug text-right"
              style={{ fontSize: "0.5625rem", color: "#0a3b4b" }}
            >
              {label}
            </span>
            {/* Small inline arrow pointing right into the grid */}
            <svg width="18" height="8" viewBox="0 0 18 8" style={{ flexShrink: 0 }}>
              <line x1="0" y1="4" x2="13" y2="4" stroke="#3aaece" strokeWidth="1.2" strokeOpacity="0.65" />
              <polyline points="10,1 14,4 10,7" fill="none" stroke="#3aaece" strokeWidth="1.2" strokeOpacity="0.65" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Centre: dot grid + title ── */}
      <div className="flex flex-col items-center gap-2.5">
        <div
          style={{
            borderRadius: 4,
            border: "1px solid rgba(10,59,75,0.22)",
            overflow: "hidden",
          }}
        >
          {/* Dark header bar — title lives here */}
          <div
            className="flex items-center justify-center"
            style={{ background: "#0a3b4b", height: G_HDR, width: GRID_W }}
          >
            <p
              className="font-bold uppercase"
              style={{ fontSize: "0.5rem", letterSpacing: "0.14em", color: "#3aaece" }}
            >
              The BroadLab ID Graph
            </p>
          </div>

          {/* Dot grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${G_COLS}, ${G_CW}px)`,
              gridTemplateRows: `repeat(${G_ROWS}, ${G_CH}px)`,
            }}
          >
            {Array.from({ length: G_ROWS * G_COLS }, (_, idx) => {
              const row = Math.floor(idx / G_COLS);
              const col = idx % G_COLS;
              const hasDot = DOTS.some(([r, c]) => r === row && c === col);
              return (
                <div
                  key={idx}
                  style={{
                    width: G_CW,
                    height: G_CH,
                    borderRight: "0.5px solid rgba(58,174,206,0.16)",
                    borderBottom: "0.5px solid rgba(58,174,206,0.16)",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {hasDot && (
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#0a3b4b",
                        opacity: 0.6,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats beneath the grid */}
        <p style={{ fontSize: "0.5rem", color: "#9ca3af", letterSpacing: "0.04em" }}>
          3,000+ Segments · 1.8M Postcodes
        </p>
      </div>

      {/* ── Right: outputs ── */}
      <div
        className="flex flex-col justify-around"
        style={{ width: 120, height: GRID_H }}
      >
        {GRAPH_OUTPUTS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Small inline arrow pointing right out of the grid */}
            <svg width="18" height="8" viewBox="0 0 18 8" style={{ flexShrink: 0 }}>
              <line x1="0" y1="4" x2="13" y2="4" stroke="#3aaece" strokeWidth="1.2" strokeOpacity="0.65" />
              <polyline points="10,1 14,4 10,7" fill="none" stroke="#3aaece" strokeWidth="1.2" strokeOpacity="0.65" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <span
              className="font-semibold leading-snug"
              style={{ fontSize: "0.5625rem", color: "#0a3b4b" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* ── Header ── */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.h2
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(2rem,3.8vw,3.5rem)", color: "#0a3b4b" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                A system,
                <br className="hidden lg:block" />
                not a service.
              </motion.h2>
            </div>

            <motion.p
              className="self-end"
              style={{ fontSize: "1.0625rem", lineHeight: "1.75", color: "#4b5563" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* PLACEHOLDER — confirm copy with BroadLab */}
              Define the outcome, design the system, optimise in real time — then let
              compounding intelligence do what no single campaign ever could.
            </motion.p>
          </div>

          {/* ── Desktop: step cards + arrows ── */}
          <div
            className="hidden lg:grid items-stretch"
            style={{ gridTemplateColumns: "1fr 44px 1fr 44px 1fr 44px 1fr" }}
          >
            {STEPS.flatMap((step, i) => {
              const card = (
                <motion.div
                  key={`card-${step.n}`}
                  className="flex flex-col gap-3 rounded-xl p-6"
                  style={{
                    border: "1px solid rgba(58,174,206,0.18)",
                    borderTop: "2px solid #3aaece",
                    boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                  transition={{ delay: 0.3 + i * 0.14, duration: 0.5 }}
                >
                  <p
                    className="font-bold select-none leading-none"
                    style={{ fontSize: "clamp(2rem,3vw,2.75rem)", color: "rgba(58,174,206,0.1)" }}
                  >
                    {step.n}
                  </p>
                  <h3
                    className="font-semibold leading-snug"
                    style={{ fontSize: "1.0625rem", color: "#0a3b4b" }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: "1.65", color: "#4b5563" }}>
                    {step.desc}
                  </p>
                </motion.div>
              );

              if (i < STEPS.length - 1) {
                const arrow = (
                  <motion.div
                    key={`arrow-${i}`}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: 0.46 + i * 0.14, duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" style={{ color: "rgba(58,174,206,0.45)" }} />
                  </motion.div>
                );
                return [card, arrow];
              }
              return [card];
            })}
          </div>

          {/* ── Mobile: stacked cards ── */}
          <div className="flex flex-col gap-4 lg:hidden">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                className="flex flex-col gap-3 rounded-xl p-6"
                style={{
                  border: "1px solid rgba(58,174,206,0.18)",
                  borderTop: "2px solid #3aaece",
                  boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.3 + i * 0.14, duration: 0.5 }}
              >
                <p
                  className="font-bold select-none leading-none"
                  style={{ fontSize: "2rem", color: "rgba(58,174,206,0.1)" }}
                >
                  {step.n}
                </p>
                <h3 className="font-semibold leading-snug" style={{ fontSize: "1.0625rem", color: "#0a3b4b" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.65", color: "#4b5563" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Desktop: return arc + ID Graph visual ── */}
          {/*
            CSS border arc instead of SVG: always spans exactly 100% of the
            container so it always connects Step 4 to Step 1 at every screen width.
            border-radius "0 0 50% 50% / 0 0 100% 100%" creates a pure U-shape
            with zero straight vertical segments — the curve fills the full height.
          */}
          <div className="relative mt-0 hidden lg:block" style={{ height: 350 }}>

            {/* Anchor dot — Step 4 (top-right) */}
            <motion.div
              className="absolute top-0 right-0 rounded-full"
              style={{ width: 7, height: 7, marginTop: -3.5, background: "#3aaece", opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.5 : 0 }}
              transition={{ delay: 1.35, duration: 0.3 }}
            />

            {/* CSS arc */}
            <motion.div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: 300,
                borderLeft:   "2px solid rgba(58,174,206,0.4)",
                borderRight:  "2px solid rgba(58,174,206,0.4)",
                borderBottom: "2px solid rgba(58,174,206,0.4)",
                borderTop: "none",
                borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                transformOrigin: "top center",
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0 }}
              transition={{ delay: 1.4, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Anchor dot — Step 1 (top-left) */}
            <motion.div
              className="absolute top-0 left-0 rounded-full"
              style={{ width: 7, height: 7, marginTop: -3.5, background: "#3aaece", opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.5 : 0 }}
              transition={{ delay: 2.35, duration: 0.3 }}
            />

            {/* ID Graph visual — centred inside the arc bowl */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 32 }}>
              <IDGraphVisual inView={inView} />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
