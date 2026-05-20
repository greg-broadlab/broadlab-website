"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INPUTS = [
  { label: "Census Data",      desc: "Demographics & household attributes" },
  { label: "TV / CTV Signals", desc: "Viewing behaviour & frequency data"  },
  { label: "Behavioural Data", desc: "Purchase, intent & attitudinal"      },
];

const OUTPUTS = [
  { label: "Audience Targeting",     desc: "3,000+ precision segments"        },
  { label: "In-Flight Optimisation", desc: "AI/ML signals, updated daily"     },
  { label: "Postcode Insights",      desc: "1.8M postcodes mapped & modelled" },
];

// PLACEHOLDER — swap with real approved logo image files before launch
const CLIENTS = [
  "Heineken",
  "ASOS",
  "Lenovo",
  "Amazon Ring",
  "Estée Lauder",
  "Indeed",
  "Royal Caribbean",
  "Scottish Widows",
  "Spire Healthcare",
];

const DATA_TYPES = ["Intent", "Demo", "Financial", "Attitudinal"];

// ─── Graph Diagram ────────────────────────────────────────────────────────────

function GraphDiagram({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden rounded-2xl"
      style={{
        background: "#0d2535",
        border: "1px solid rgba(58,174,206,0.15)",
        boxShadow: "0 32px 80px rgba(13,37,53,0.15), 0 0 0 1px rgba(58,174,206,0.06)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr]">

        {/* Left — Data Inputs */}
        <div className="flex flex-col justify-center gap-7 p-8 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Data Inputs
          </p>
          {INPUTS.map((input, i) => (
            <motion.div
              key={input.label}
              className="flex items-start justify-between gap-4"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -14 }}
              transition={{ delay: 0.5 + i * 0.13, duration: 0.45 }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3aaece]/50" />
                <div>
                  <p className="text-sm font-semibold text-white/80">{input.label}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-white/40">{input.desc}</p>
                </div>
              </div>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#3aaece]/50" />
            </motion.div>
          ))}
        </div>

        {/* Centre — The BroadLab ID Graph */}
        <div
          className="relative flex flex-col items-center justify-center gap-5 px-8 py-10 text-center"
          style={{
            borderLeft:  "1px solid rgba(58,174,206,0.12)",
            borderRight: "1px solid rgba(58,174,206,0.12)",
            backgroundImage: [
              "linear-gradient(rgba(58,174,206,0.06) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(58,174,206,0.06) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "22px 22px",
          }}
        >
          {/* Vignette over grid so content stays readable */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(10,59,75,0.7) 30%, transparent 80%)",
            }}
          />

          {/* Animated glow pulse */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(58,174,206,0.08) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.93 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Identity */}
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#3aaece]/70">
                Proprietary Engine
              </p>
              <p className="text-sm font-bold leading-snug text-white">
                The BroadLab<br />ID Graph
              </p>
            </div>

            <div className="h-px w-12 bg-[#3aaece]/20" />

            {/* Stats */}
            <div className="flex flex-col items-center gap-3">
              <div>
                <p
                  className="font-bold leading-none text-white"
                  style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
                >
                  3,000+
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40">
                  Audience Segments
                </p>
              </div>

              <div className="h-px w-8 bg-[#3aaece]/15" />

              <div>
                <p
                  className="font-bold leading-none text-white"
                  style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)" }}
                >
                  1.8M
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.14em] text-white/40">
                  UK Postcodes
                </p>
              </div>
            </div>

            <div className="h-px w-12 bg-[#3aaece]/20" />

            {/* Data type pills */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {DATA_TYPES.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-medium text-[#3aaece]/80"
                  style={{
                    background: "rgba(58,174,206,0.08)",
                    border: "1px solid rgba(58,174,206,0.18)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Live badge */}
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3aaece]" />
              <span className="text-[9px] tracking-wide text-white/40">Live · Updated daily</span>
            </div>
          </motion.div>
        </div>

        {/* Right — Intelligence Outputs */}
        <div className="flex flex-col justify-center gap-7 p-8 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Intelligence Outputs
          </p>
          {OUTPUTS.map((output, i) => (
            <motion.div
              key={output.label}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 14 }}
              transition={{ delay: 0.72 + i * 0.13, duration: 0.45 }}
            >
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#3aaece]/50" />
              <div>
                <p className="text-sm font-semibold text-white/80">{output.label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/40">{output.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

// ─── Logo Marquee ─────────────────────────────────────────────────────────────

function LogoMarquee({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
        Trusted by
      </p>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        />

        <div
          className="flex items-center gap-14 py-1"
          style={{ animation: "marquee 32s linear infinite", width: "max-content" }}
        >
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-semibold text-[#9ca3af] transition-colors duration-200 hover:text-[#4b5563]"
              style={{ cursor: "default" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] tracking-wide text-[#9ca3af]">
        Operating across{" "}
        <span className="text-[#4b5563]">United Kingdom · North America · Australia & New Zealand · Europe</span>
      </p>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TheSystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#10657f]"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                The BroadLab ID Graph
              </motion.p>
              <motion.h2
                className="text-[clamp(2rem,3.8vw,3.5rem)] font-bold leading-tight text-[#0d2535]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Audience intelligence.{" "}
                <br className="hidden lg:block" />
                Engineered, not estimated.
              </motion.h2>
            </div>

            <motion.p
              className="self-end text-[1.0625rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* PLACEHOLDER — confirm copy with BroadLab */}
              BroadLab's proprietary ID Graph combines census, behavioural and
              TV signal data — creating the audience intelligence layer that gives
              every campaign a structural edge before it launches.
            </motion.p>
          </div>

          {/* Diagram */}
          <GraphDiagram inView={inView} />

          {/* Logo marquee + markets */}
          <LogoMarquee inView={inView} />

        </div>
      </div>
    </section>
  );
}
