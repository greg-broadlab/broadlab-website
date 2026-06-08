"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { TrendingUp, Zap, Target } from "lucide-react";

// ---------------------------------------------------------------------------
// Data - PLACEHOLDER: stats sourced from OFCOM, Amplified Intelligence,
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
    claim: "more active attention than linear TV - with 3× less wastage than scrollable social",
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
      const eased = 1 - Math.pow(1 - progress, 3);
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

const MAX_TILT = 10;

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

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 280, damping: 22 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 280, damping: 22 });

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 200, damping: 25 });
  const glowYSpring = useSpring(glowY, { stiffness: 200, damping: 25 });
  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(dy * MAX_TILT);
    rotateY.set(-dx * MAX_TILT);
    glowX.set(e.clientX - cx);
    glowY.set(e.clientY - cy);
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(0);
    glowY.set(0);
    glowOpacity.set(0);
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ delay: index * 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col gap-7 rounded-xl bg-white border border-[#e5e7eb] px-9 py-10 overflow-hidden"
        style={{
          borderTop: "2px solid #3aaece",
          boxShadow: "0 4px 24px rgba(16,101,127,0.06)",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
        }}
      >
        {/* Light glow that follows cursor */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 220,
            height: 220,
            left: "50%",
            top: "50%",
            marginLeft: -110,
            marginTop: -110,
            x: glowXSpring,
            y: glowYSpring,
            opacity: glowOpacitySpring,
            background: "radial-gradient(circle, rgba(58,174,206,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Icon + label */}
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-[#3aaece]" />
          <span className="text-xs font-semibold tracking-[0.15em] text-[#3aaece] uppercase">
            {stat.label}
          </span>
        </div>

        {/* Counted number */}
        <div
          className="font-bold leading-none text-[#0d2535]"
          style={{ fontSize: "clamp(3.25rem, 5.5vw, 4.75rem)" }}
        >
          {stat.prefix}
          {display}
          {stat.suffix}
        </div>

        {/* Claim */}
        <p className="text-sm leading-relaxed text-[#4b5563]">
          {stat.claim}
        </p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function WhyCTV() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#f0f8fb]">
      <div className="h-px w-full bg-[#3aaece]/30" />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div ref={headingRef} className="mb-16 max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold leading-tight text-[#0d2535]"
              initial={{ opacity: 0, y: 18 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              The most powerful screen in{" "}
              <span style={{ color: "#3aaece" }}>media.</span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[560px] mx-auto text-[1.125rem] leading-relaxed text-[#4b5563] font-semibold"
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              {/* PLACEHOLDER - confirm 90% stat with BroadLab before go-live */}
              CTV reaches 90% of homes. For brands that use it properly, it&apos;s the most powerful and accountable channel in media.
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
