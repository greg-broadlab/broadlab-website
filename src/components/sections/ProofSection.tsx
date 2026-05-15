"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef   = useRef<number | null>(null);
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

// ─── Mini visuals — pure geometry, no text ───────────────────────────────────
// All: viewBox="0 0 80 48", bars sit on baseline y=44

function VisualROAS() {
  // Two bars: dim (spend) vs teal (3× return)
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" aria-hidden="true">
      <line x1="0" y1="44" x2="80" y2="44" stroke="rgba(58,174,206,0.12)" strokeWidth="1" />
      <rect x="8"  y="28" width="24" height="16" rx="2" fill="rgba(58,174,206,0.18)" stroke="rgba(58,174,206,0.25)" strokeWidth="1" />
      <rect x="48" y="2"  width="24" height="42" rx="2" fill="rgba(58,174,206,0.7)" />
    </svg>
  );
}

function VisualCostReduction() {
  // Tall dim bar → tiny teal bar, with a simple chevron-down between
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" aria-hidden="true">
      <line x1="0" y1="44" x2="80" y2="44" stroke="rgba(58,174,206,0.12)" strokeWidth="1" />
      <rect x="8"  y="2"  width="24" height="42" rx="2" fill="rgba(58,174,206,0.18)" stroke="rgba(58,174,206,0.25)" strokeWidth="1" />
      <rect x="56" y="38" width="16" height="6"  rx="2" fill="rgba(58,174,206,0.75)" />
    </svg>
  );
}

function VisualFootfall() {
  // Three ascending bars — signal-strength style
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" aria-hidden="true">
      <line x1="0" y1="44" x2="80" y2="44" stroke="rgba(58,174,206,0.12)" strokeWidth="1" />
      <rect x="8"  y="32" width="18" height="12" rx="2" fill="rgba(58,174,206,0.3)" />
      <rect x="31" y="20" width="18" height="24" rx="2" fill="rgba(58,174,206,0.5)" />
      <rect x="54" y="6"  width="18" height="38" rx="2" fill="rgba(58,174,206,0.75)" />
    </svg>
  );
}

function VisualAttribution() {
  // Horizontal stacked bar: large dim section + small teal slice on the right
  return (
    <svg width="80" height="48" viewBox="0 0 80 48" aria-hidden="true">
      <rect x="4"  y="18" width="56" height="12" rx="2" fill="rgba(58,174,206,0.14)" stroke="rgba(58,174,206,0.22)" strokeWidth="1" />
      <rect x="60" y="18" width="16" height="12" rx="2" fill="rgba(58,174,206,0.75)" />
    </svg>
  );
}

// ─── Case data ────────────────────────────────────────────────────────────────

// PLACEHOLDER — confirm all figures with BroadLab before launch
const CASES = [
  {
    value:   3,
    unit:    ":1",
    prefix:  "",
    decimal: false,
    metric:  "ROAS",
    detail:  "TV outperforming every other channel",
    sector:  "Financial Services",
    Visual:  VisualROAS,
  },
  {
    value:   87,
    unit:    "%",
    prefix:  "",
    decimal: false,
    metric:  "Reduction in cost per order",
    detail:  "Achieved within the first campaign flight",
    sector:  "Retail / DTC",
    Visual:  VisualCostReduction,
  },
  {
    value:   24.8,
    unit:    "%",
    prefix:  "+",
    decimal: true,
    metric:  "Increase in showroom visits",
    detail:  "Measured via geo holdout",
    sector:  "Automotive",
    Visual:  VisualFootfall,
  },
  {
    value:   8.9,
    unit:    "%",
    prefix:  "",
    decimal: true,
    metric:  "Of total sales attributed to CTV",
    detail:  "Full-funnel attribution",
    sector:  "Sports Streaming",
    Visual:  VisualAttribution,
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
      className="flex flex-col gap-5 rounded-xl p-7"
      style={{
        background: "rgba(255,255,255,0.05)",
        border:     "1px solid rgba(255,255,255,0.07)",
        borderTop:  "2px solid #3aaece",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Sector — prominent at top */}
      <p
        className="text-sm font-bold tracking-wide text-white"
      >
        {c.sector}
      </p>

      {/* Mini visual */}
      <div className="flex items-end" style={{ height: 48 }}>
        <Visual />
      </div>

      {/* Big number */}
      <p
        className="font-bold leading-none text-white"
        style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)" }}
      >
        {c.prefix}{display}{c.unit}
      </p>

      {/* Metric + detail */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[0.9375rem] font-semibold leading-snug text-white/80">
          {c.metric}
        </p>
        <p className="text-sm leading-relaxed text-white/45">
          {c.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProofSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0a3b4b" }}>

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
              Proven across sectors.
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-lg leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Outcomes that hold up to CFO and board scrutiny — across financial services, retail, automotive and media.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* CTA */}
          <div className="mt-10 text-center">
            <motion.h2
              className="font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              See what this looks like for your brand.
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              Book a consultation and we&apos;ll show you exactly how the system applies to your business.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.85, duration: 0.5 }}
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
