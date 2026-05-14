"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Step data ─────────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: "01",
    name: "Define Your Outcome",
    desc: "Sales, downloads, awareness, footfall — your goal. Not a reach target.",
  },
  {
    step: "02",
    name: "Design Your Solution",
    desc: "ID Graph audience, curated supply, geo holdout measurement — built in from day one.",
  },
  {
    step: "03",
    name: "Dynamic Optimisation",
    desc: "Creative, audience, frequency and inventory optimised daily against your outcome.",
  },
  {
    step: "04",
    name: "Learn & Scale",
    desc: "Every campaign builds the intelligence asset. Costs fall. The gap with rivals compounds.",
  },
] as const;

// ─── Step card ─────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof STEPS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col gap-2.5 rounded-xl p-5 h-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTop: "2px solid rgba(58,174,206,0.7)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 18 }}
      transition={{ delay: 0.25 + index * 0.13, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p
        className="text-[0.625rem] font-bold tracking-[0.16em]"
        style={{ color: "rgba(58,174,206,0.65)" }}
      >
        {step.step}
      </p>
      <p className="text-[0.9375rem] font-bold text-white leading-snug">{step.name}</p>
      <p className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(234,246,251,0.5)" }}>
        {step.desc}
      </p>
    </motion.div>
  );
}

// ─── Connector arrow ───────────────────────────────────────────────────────────

const ARROW_PATHS = {
  right: "M 6,20 L 42,20 M 32,11 L 42,20 L 32,29",
  down:  "M 20,6 L 20,42 M 11,32 L 20,42 L 29,32",
  left:  "M 42,20 L 6,20 M 16,11 L 6,20 L 16,29",
  up:    "M 20,42 L 20,6 M 11,16 L 20,6 L 29,16",
};

function Arrow({
  direction,
  inView,
  delay,
}: {
  direction: keyof typeof ARROW_PATHS;
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay, duration: 0.4 }}
      >
        <motion.path
          d={ARROW_PATHS[direction]}
          stroke="rgba(58,174,206,0.4)"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ delay: delay + 0.05, duration: 0.55, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
}

// ─── 2×2 step grid ─────────────────────────────────────────────────────────────

function StepGrid({ inView }: { inView: boolean }) {
  return (
    <div className="w-full">
      {/* Desktop: 3×3 grid with arrow cells */}
      <div
        className="hidden sm:grid"
        style={{
          gridTemplateColumns: "1fr 48px 1fr",
          gridTemplateRows: "auto 48px auto",
        }}
      >
        {/* Row 1 */}
        <StepCard step={STEPS[0]} index={0} inView={inView} />
        <Arrow direction="right" inView={inView} delay={0.75} />
        <StepCard step={STEPS[1]} index={1} inView={inView} />

        {/* Row 2 — arrows only */}
        <Arrow direction="up" inView={inView} delay={1.25} />
        {/* Centre cell */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p
            className="text-center text-[7px] font-semibold uppercase leading-relaxed"
            style={{ color: "rgba(58,174,206,0.22)", letterSpacing: "0.1em" }}
          >
            ID<br />Graph
          </p>
        </motion.div>
        <Arrow direction="down" inView={inView} delay={0.9} />

        {/* Row 3 */}
        <StepCard step={STEPS[3]} index={3} inView={inView} />
        <Arrow direction="left" inView={inView} delay={1.1} />
        <StepCard step={STEPS[2]} index={2} inView={inView} />
      </div>

      {/* Mobile: 2×2 grid, no arrows */}
      <div className="sm:hidden grid grid-cols-2 gap-3">
        {STEPS.map((step, i) => (
          <StepCard key={step.step} step={step} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function SystemHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: "#0a3b4b" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 40%, transparent 20%, rgba(10,59,75,0.8) 100%)",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <motion.h1
                className="font-bold leading-tight text-white"
                style={{ fontSize: "clamp(2.25rem,4.5vw,3.75rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.1, duration: 0.65 }}
              >
                A System,<br />Not a Service.
              </motion.h1>

              <motion.p
                className="mt-6 leading-relaxed max-w-sm"
                style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.6)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
              >
                We build systems that turn CTV into proprietary marketing intelligence
                brands own, compound and use across their entire organisation.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0a3b4b] transition-colors duration-200 hover:bg-[#eaf6fb]"
                >
                  Book a consultation
                </Link>
              </motion.div>

              <motion.p
                className="mt-8 text-[0.6875rem]"
                style={{ color: "rgba(58,174,206,0.4)", letterSpacing: "0.04em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Powered throughout by The Broadlab ID Graph —{" "}
                <span style={{ color: "rgba(234,246,251,0.3)" }}>
                  the intelligence layer connecting every decision.
                </span>
              </motion.p>
            </div>

            {/* Right — step cards */}
            <StepGrid inView={inView} />

          </div>
        </div>
      </div>
    </section>
  );
}
