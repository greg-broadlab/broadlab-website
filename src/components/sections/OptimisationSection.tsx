"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TABS = [
  {
    id: "audience",
    label: "Audience",
    sublabel: "Delivery split by audience segment",
    bars: [
      { label: "Digital-first Pet Parents",       pct: 74 },
      { label: "Established Empty Nesters",       pct: 61 },
      { label: "Practical Pet Enthusiasts",       pct: 53 },
      { label: "Premium Pet Pamperers",           pct: 38 },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    sublabel: "Delivery share by creative variant",
    bars: [
      { label: "30s brand film",    pct: 84 },
      { label: "15s product spot",  pct: 67 },
      { label: "30s testimonial",   pct: 52 },
      { label: "6s bumper",         pct: 41 },
    ],
  },
  {
    id: "rf",
    label: "Reach & Frequency",
    sublabel: "Household frequency distribution",
    bars: [
      { label: "Reached 2–3×",  pct: 44 },
      { label: "Reached 1×",    pct: 28 },
      { label: "Reached 4–5×",  pct: 19 },
      { label: "Reached 6×+",   pct:  9 },
    ],
  },
  {
    id: "temporal",
    label: "Temporal",
    sublabel: "Delivery share by daypart",
    bars: [
      { label: "Primetime 8–11pm",    pct: 52 },
      { label: "Early evening 6–8pm", pct: 28 },
      { label: "Afternoon 12–6pm",    pct: 13 },
      { label: "Morning 6am–12pm",    pct:  7 },
    ],
  },
  {
    id: "geo",
    label: "Geo",
    sublabel: "Delivery share by region",
    bars: [
      { label: "Greater London",  pct: 36 },
      { label: "South East",      pct: 24 },
      { label: "Midlands",        pct: 19 },
      { label: "North West",      pct: 13 },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    sublabel: "Delivery split by supply type",
    bars: [
      { label: "Premium VOD",         pct: 54 },
      { label: "Smart TV / CTV app",  pct: 27 },
      { label: "Set-top box",         pct: 12 },
      { label: "Linear addressable",  pct:  7 },
    ],
  },
] as const;

type TabId = typeof TABS[number]["id"];

function HorizontalBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[11px] text-[#6b7280] shrink-0" style={{ width: 170 }}>
        {label}
      </span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#f0f8fb" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #10657f, #3aaece)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums text-[#0d2535]" style={{ width: 32, textAlign: "right" }}>
        {pct}%
      </span>
    </div>
  );
}

export default function OptimisationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<TabId>("audience");

  const active = TABS.find((t) => t.id === activeId)!;

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12 max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              03 / Optimisation
            </motion.p>
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              Every lever. Analysed every day.
            </motion.h2>
            <motion.p
              className="mt-5 text-[1.0625rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              AI and expert oversight across all six dimensions — simultaneously, every day.
            </motion.p>
          </div>

          {/* Interactive panel */}
          <motion.div
            className="rounded-xl border border-[#e5e7eb] overflow-hidden"
            style={{ boxShadow: "0 4px 32px rgba(16,101,127,0.08)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ delay: 0.3, duration: 0.65 }}
          >
            {/* Tab bar */}
            <div className="flex overflow-x-auto bg-[#f9fafb] border-b border-[#e5e7eb]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`relative shrink-0 px-5 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
                    activeId === tab.id
                      ? "text-[#0d2535]"
                      : "text-[#9ca3af] hover:text-[#4b5563]"
                  }`}
                >
                  {tab.label}
                  {activeId === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3aaece]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="px-8 py-8 md:px-10 md:py-9 bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af] mb-6">
                    {active.sublabel}
                  </p>
                  <div className="flex flex-col gap-5">
                    {active.bars.map((bar, i) => (
                      <HorizontalBar
                        key={`${active.id}-${bar.label}`}
                        label={bar.label}
                        pct={bar.pct}
                        delay={i * 0.08}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
