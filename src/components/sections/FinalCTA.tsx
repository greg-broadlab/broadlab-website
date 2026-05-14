"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Figures from audited campaign results — confirm with BroadLab before launch
const RESULTS = [
  {
    prefix: "",
    value: 9,
    unit: "×",
    decimal: false,
    metric: "Triple-channel lift vs organic",
    desc: "Geo holdout. Causal, not modelled.",
    sector: "Financial Services · Scottish Widows",
  },
  {
    prefix: "",
    value: 87,
    unit: "%",
    decimal: false,
    metric: "Reduction in cost per order",
    desc: "Achieved within the first campaign flight",
    sector: "Retail / DTC · Wonderbly",
  },
  {
    prefix: "+",
    value: 100.6,
    unit: "%",
    decimal: true,
    metric: "Incremental test drives",
    desc: "PLZ holdout. Not correlation. Not last-click.",
    sector: "Automotive · Kia EV2",
  },
] as const;

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

// ─── Result card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  index,
  inView,
}: {
  result: (typeof RESULTS)[number];
  index: number;
  inView: boolean;
}) {
  const count   = useCountUp(result.value, 1300, inView);
  const display = result.decimal ? count.toFixed(1) : Math.round(count).toString();

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
      {/* Big number */}
      <p
        className="font-bold leading-none text-white"
        style={{ fontSize: "clamp(3rem,5vw,4.25rem)" }}
      >
        {result.prefix}{display}{result.unit}
      </p>

      {/* Metric + description */}
      <div>
        <p className="text-[0.9375rem] font-semibold leading-snug text-white/80">
          {result.metric}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/45">
          {result.desc}
        </p>
      </div>

      {/* Sector label */}
      <p
        className="mt-auto text-[0.625rem] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "rgba(58,174,206,0.6)" }}
      >
        {result.sector}
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0a3b4b" }}>

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Edge vignette so dots fade at the borders */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(10,59,75,0.75) 100%)",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">


          {/* Result cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {RESULTS.map((result, i) => (
              <ResultCard key={i} result={result} index={i} inView={inView} />
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

              <Link
                href="/system"
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                Explore the System
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
