"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef  = useRef<number | null>(null);
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

// ─── Proof visuals ─────────────────────────────────────────────────────────────

function VisualHoldout() {
  return (
    <div className="flex items-end gap-5" style={{ height: 64 }}>
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div
          style={{
            width: 34,
            height: 16,
            borderRadius: 3,
            background: "rgba(58,174,206,0.12)",
            border: "1px solid rgba(58,174,206,0.28)",
          }}
        />
        <span style={{ fontSize: "0.5625rem", color: "rgba(234,246,251,0.3)", fontWeight: 600, letterSpacing: "0.08em" }}>
          CTRL
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#3aaece", letterSpacing: "0.04em", marginBottom: 2 }}>
          9×
        </span>
        <div style={{ width: 34, height: 52, borderRadius: 3, background: "rgba(58,174,206,0.75)" }} />
        <span style={{ fontSize: "0.5625rem", color: "#3aaece", fontWeight: 600, letterSpacing: "0.08em" }}>
          CTV
        </span>
      </div>
    </div>
  );
}

function VisualCostReduction() {
  return (
    <div className="flex items-end gap-3" style={{ height: 64 }}>
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div
          style={{
            width: 34,
            height: 52,
            borderRadius: 3,
            background: "rgba(58,174,206,0.18)",
            border: "1px solid rgba(58,174,206,0.25)",
          }}
        />
        <span style={{ fontSize: "0.5625rem", color: "rgba(234,246,251,0.3)", fontWeight: 600, letterSpacing: "0.08em" }}>
          BEFORE
        </span>
      </div>

      {/* Down arrow */}
      <svg width="14" height="36" viewBox="0 0 14 36" style={{ marginBottom: 18 }} aria-hidden="true">
        <line x1="7" y1="2" x2="7" y2="28" stroke="rgba(58,174,206,0.35)" strokeWidth="1" strokeDasharray="2.5 2" />
        <path d="M 3,24 L 7,30 L 11,24" stroke="rgba(58,174,206,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div style={{ width: 34, height: 8, borderRadius: 3, background: "rgba(58,174,206,0.8)" }} />
        <span style={{ fontSize: "0.5625rem", color: "#3aaece", fontWeight: 600, letterSpacing: "0.08em" }}>
          AFTER
        </span>
      </div>
    </div>
  );
}

function VisualIncrementalLift() {
  return (
    <div className="flex items-end gap-5" style={{ height: 64 }}>
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <div
          style={{
            width: 34,
            height: 22,
            borderRadius: 3,
            background: "rgba(58,174,206,0.12)",
            border: "1px solid rgba(58,174,206,0.28)",
          }}
        />
        <span style={{ fontSize: "0.5625rem", color: "rgba(234,246,251,0.3)", fontWeight: 600, letterSpacing: "0.08em" }}>
          CTRL
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5 justify-end">
        <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#3aaece", letterSpacing: "0.02em", marginBottom: 2 }}>
          +100.6%
        </span>
        <div style={{ width: 34, height: 46, borderRadius: 3, background: "rgba(58,174,206,0.75)" }} />
        <span style={{ fontSize: "0.5625rem", color: "#3aaece", fontWeight: 600, letterSpacing: "0.08em" }}>
          TEST
        </span>
      </div>
    </div>
  );
}

// ─── Case data ────────────────────────────────────────────────────────────────

// Numbers from audited campaign results — confirm with BroadLab before launch
const CASES = [
  {
    value:       9,
    unit:        "×",
    prefix:      "",
    decimal:     false,
    metric:      "Lift over untreated group",
    methodology: "Geo holdout — causal, not modelled",
    client:      "Financial Services · Scottish Widows",
    Visual:      VisualHoldout,
  },
  {
    value:       87,
    unit:        "%",
    prefix:      "",
    decimal:     false,
    metric:      "Reduction in cost per order",
    methodology: "Achieved within the first campaign flight",
    client:      "Retail / DTC · Wonderbly",
    Visual:      VisualCostReduction,
  },
  {
    value:       100.6,
    unit:        "%",
    prefix:      "+",
    decimal:     true,
    metric:      "Incremental test drives",
    methodology: "PLZ holdout — not correlation, not last-click",
    client:      "Automotive · Kia EV2",
    Visual:      VisualIncrementalLift,
  },
] as const;

// ─── Case card ────────────────────────────────────────────────────────────────

function CaseCard({
  c,
  index,
  inView,
}: {
  c: (typeof CASES)[number];
  index: number;
  inView: boolean;
}) {
  const count   = useCountUp(c.value, 1300, inView);
  const display = c.decimal ? count.toFixed(1) : Math.round(count).toString();
  const { Visual } = c;

  return (
    <motion.div
      className="flex flex-col gap-5 rounded-xl p-8"
      style={{
        background:  "rgba(255,255,255,0.05)",
        border:      "1px solid rgba(255,255,255,0.07)",
        borderTop:   "2px solid #3aaece",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
      transition={{ delay: index * 0.13, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Mini visual */}
      <div className="flex items-end h-[64px]">
        <Visual />
      </div>

      {/* Big number */}
      <p
        className="font-bold leading-none text-white"
        style={{ fontSize: "clamp(2.75rem,4.5vw,3.75rem)" }}
      >
        {c.prefix}{display}{c.unit}
      </p>

      {/* Metric + methodology */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.9375rem] font-semibold leading-snug text-white/80">
          {c.metric}
        </p>
        <p className="text-sm leading-relaxed text-white/45">
          {c.methodology}
        </p>
      </div>

      {/* Client label */}
      <p
        className="mt-auto text-[0.625rem] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "rgba(58,174,206,0.6)" }}
      >
        {c.client}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProofSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0a3b4b" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(10,59,75,0.75) 100%)",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12 text-center">
            <motion.h2
              className="font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Proof that holds up to board scrutiny.
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-lg leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Every result below was measured via geo or PLZ holdout — the same causal
              methodology used in clinical trials. Not correlation. Not modelled. Proof.
            </motion.p>
          </div>

          {/* Case study cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {CASES.map((c, i) => (
              <CaseCard key={i} c={c} index={i} inView={inView} />
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-16 h-px w-24"
            style={{ background: "rgba(58,174,206,0.2)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />

          {/* CTA block */}
          <div className="mt-10 text-center">
            <motion.h2
              className="font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              Ready to build yours?
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              Every week without a system is a week lost. Let&apos;s map the methodology to your brand.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0a3b4b] transition-colors duration-200 hover:bg-[#eaf6fb]"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
              >
                Book a consultation
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
