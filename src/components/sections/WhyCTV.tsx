"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Target } from "lucide-react";

// ---------------------------------------------------------------------------
// Data — PLACEHOLDER: stats sourced from OFCOM, Amplified Intelligence,
// and INCRMNTAL/Profitability 2. Confirm with BroadLab before going live.
// ---------------------------------------------------------------------------

const STATS = [
  {
    id: "scale",
    icon: TrendingUp,
    label: "SCALE",
    value: 86,
    decimal: false,
    suffix: "%",
    prefix: "",
    claim: "of primary UK TV sets are now used to watch TV online",
    source: "OFCOM",
  },
  {
    id: "impact",
    icon: Zap,
    label: "IMPACT",
    value: 2.5,
    decimal: true,
    suffix: "X",
    prefix: "",
    claim: "more active attention than linear TV — with 3× less wastage than scrollable social",
    source: "AMPLIFIED INTELLIGENCE",
  },
  {
    id: "accountability",
    icon: Target,
    label: "ACCOUNTABILITY",
    value: 1,
    decimal: false,
    suffix: "",
    prefix: "#",
    claim: "medium for incremental effectiveness across Sales, Reach & Attention",
    source: "INCRMNTAL / Profitability 2",
  },
] as const;

// ---------------------------------------------------------------------------
// Count-up hook
// ---------------------------------------------------------------------------

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(eased * end);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, active]);

  return count;
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value, 1200, inView);

  const Icon = stat.icon;
  const display = stat.decimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ delay: index * 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex flex-col gap-7 rounded-xl bg-white/10 border border-white/10 px-9 py-10"
      style={{ borderTop: "2px solid #3aaece" }}
    >
      {/* Icon + label */}
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-[#3aaece]/70" />
        <span className="text-xs font-semibold tracking-[0.15em] text-[#3aaece]/70 uppercase">
          {stat.label}
        </span>
      </div>

      {/* Counted number */}
      <div
        className="font-bold leading-none text-white"
        style={{ fontSize: "clamp(3.25rem, 5.5vw, 4.75rem)" }}
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>

      {/* Claim */}
      <p className="text-sm leading-relaxed text-[#eaf6fb]">
        {stat.claim}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function WhyCTV() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#0a3b4b]">
      {/* 1px accent line — punctuates the boundary with the Hero */}
      <div className="h-px w-full bg-[#3aaece]/40" />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div ref={headingRef} className="mb-16 max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 18 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              The most powerful screen in{" "}
              <span style={{ color: "#3aaece" }}>media.</span>
            </motion.h2>

            <motion.p
              className="mt-4 max-w-[520px] mx-auto text-[1.0625rem] leading-relaxed text-[#eaf6fb]"
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              {/* PLACEHOLDER — confirm with BroadLab */}
              Most brands aren&apos;t close to unlocking it. The gap between what CTV can deliver and what the market is actually achieving is exactly where BroadLab operates.
            </motion.p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
