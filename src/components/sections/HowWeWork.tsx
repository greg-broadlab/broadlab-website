"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Define the right outcomes",
    desc: "Align measurement to the outcomes that matter most - brand, search, conversion or footfall.",
  },
  {
    n: "02",
    title: "Solution design",
    desc: "Design the full campaign system around the defined outcomes - audience, supply, creative and measurement all aligned from the start.",
  },
  {
    n: "03",
    title: "Optimise in flight",
    desc: "Use daily AI/ML signals and expert oversight to improve performance while campaigns are live.",
  },
  {
    n: "04",
    title: "Feed learning forward",
    desc: "Turn campaign intelligence into reusable advantage for the next cycle.",
  },
] as const;

export default function HowWeWork() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-16 max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              How it works
            </motion.p>
            <motion.h2
              className="font-bold leading-tight"
              style={{ fontSize: "clamp(2rem,3.8vw,3.5rem)", color: "#0d2535" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              How the Broadlab system works
            </motion.h2>
            <motion.p
              className="mt-5 max-w-xl mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: "1.75", color: "#4b5563" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Four steps. One continuous loop. Each stage feeds the next - so every campaign becomes more effective than the last.
            </motion.p>
          </div>

          {/* Desktop: step cards + arrows */}
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
                    border:    "1px solid rgba(58,102,130,0.18)",
                    borderTop: "2px solid #3a6682",
                    boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                  transition={{ delay: 0.3 + i * 0.14, duration: 0.5 }}
                >
                  <p
                    className="font-bold select-none leading-none"
                    style={{ fontSize: "clamp(2rem,3vw,2.75rem)", color: "rgba(58,102,130,0.12)" }}
                  >
                    {step.n}
                  </p>
                  <h3
                    className="font-semibold leading-snug"
                    style={{ fontSize: "1.0625rem", color: "#0d2535" }}
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
                    <ArrowRight className="h-4 w-4" style={{ color: "rgba(58,102,130,0.45)" }} />
                  </motion.div>
                );
                return [card, arrow];
              }
              return [card];
            })}
          </div>

          {/* Mobile: stacked cards */}
          <div className="flex flex-col gap-4 lg:hidden">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                className="flex flex-col gap-3 rounded-xl p-6"
                style={{
                  border:    "1px solid rgba(58,102,130,0.18)",
                  borderTop: "2px solid #3a6682",
                  boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.3 + i * 0.14, duration: 0.5 }}
              >
                <p
                  className="font-bold select-none leading-none"
                  style={{ fontSize: "2rem", color: "rgba(58,102,130,0.12)" }}
                >
                  {step.n}
                </p>
                <h3 className="font-semibold leading-snug" style={{ fontSize: "1.0625rem", color: "#0d2535" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.65", color: "#4b5563" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: return arc + connecting paragraph */}
          <div className="relative mt-0 hidden lg:block" style={{ height: 320 }}>

            {/* Anchor dot - Step 4 (top-right) */}
            <motion.div
              className="absolute top-0 right-0 rounded-full"
              style={{ width: 7, height: 7, marginTop: -3.5, background: "#3a6682", opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.5 : 0 }}
              transition={{ delay: 1.35, duration: 0.3 }}
            />

            {/* CSS arc */}
            <motion.div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: 270,
                borderLeft:   "2px solid rgba(58,102,130,0.4)",
                borderRight:  "2px solid rgba(58,102,130,0.4)",
                borderBottom: "2px solid rgba(58,102,130,0.4)",
                borderTop: "none",
                borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                transformOrigin: "top center",
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0 }}
              transition={{ delay: 1.4, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Anchor dot - Step 1 (top-left) */}
            <motion.div
              className="absolute top-0 left-0 rounded-full"
              style={{ width: 7, height: 7, marginTop: -3.5, background: "#3a6682", opacity: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.5 : 0 }}
              transition={{ delay: 2.35, duration: 0.3 }}
            />

            {/* Connecting chain centred inside the arc bowl */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0"
              style={{ top: 36 }}
            >
              {[
                ["Better audience insights improve", "outcomes"],
                ["Better measurement improves", "optimisation"],
                ["Better optimisation creates stronger", "learning"],
                ["Stronger learning feeds", "compound effectiveness"],
              ].map(([prefix, highlight], i) => (
                <div key={i} className="flex flex-col items-center">
                  <motion.p
                    className="text-center whitespace-nowrap"
                    style={{ fontSize: "0.875rem", color: "#4b5563" }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 6 }}
                    transition={{ delay: 2.0 + i * 0.2, duration: 0.5 }}
                  >
                    {prefix}{" "}
                    <span className="font-semibold text-[#3a6682]">{highlight}</span>
                    {i < 3 ? "." : "."}
                  </motion.p>
                  {i < 3 && (
                    <motion.div
                      className="flex flex-col items-center my-1"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: inView ? 1 : 0, scaleY: inView ? 1 : 0 }}
                      transition={{ delay: 2.15 + i * 0.2, duration: 0.3 }}
                      style={{ originY: 0 }}
                    >
                      <div style={{ width: 1, height: 10, background: "rgba(58,102,130,0.35)" }} />
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M0 0L4 5L8 0" stroke="rgba(58,102,130,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
