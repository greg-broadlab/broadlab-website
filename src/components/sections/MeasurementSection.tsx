"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OUTCOMES = [
  { label: "Brand Lift",    sub: "Awareness and consideration", desc: "Measured via panel surveys, tracked daily while campaigns are live."         },
  { label: "Search Uplift", sub: "Incremental branded search",  desc: "Branded keyword uplift measured against a matched control group."            },
  { label: "Conversion",    sub: "Online and offline sales",    desc: "Purchase attribution across digital and in-store events."                   },
  { label: "Footfall",      sub: "In-store visits",             desc: "Incremental store visits measured via geo holdout and location panel data."  },
] as const;

const BARS = [
  { label: "Wk 1", brand: 12, search: 8,  conv: 5,  foot: 4  },
  { label: "Wk 2", brand: 18, search: 13, conv: 9,  foot: 7  },
  { label: "Wk 3", brand: 27, search: 20, conv: 15, foot: 11 },
  { label: "Wk 4", brand: 38, search: 29, conv: 22, foot: 17 },
  { label: "Wk 5", brand: 52, search: 41, conv: 31, foot: 24 },
  { label: "Wk 6", brand: 67, search: 55, conv: 43, foot: 34 },
  { label: "Wk 7", brand: 79, search: 66, conv: 57, foot: 44 },
  { label: "Wk 8", brand: 88, search: 76, conv: 68, foot: 53 },
] as const;

const CHART_H = 88;
const MAX_BAR = 100;

function BarGroup({ bar, inView, delay }: { bar: typeof BARS[number]; inView: boolean; delay: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-end gap-[3px]" style={{ height: CHART_H }}>
        {([
          { h: bar.brand,  color: "#0d2535" },
          { h: bar.search, color: "#3a6682" },
          { h: bar.conv,   color: "rgba(58,102,130,0.35)" },
          { h: bar.foot,   color: "rgba(13,37,53,0.2)" },
        ] as const).map((b, i) => (
          <motion.div
            key={i}
            className="rounded-t"
            style={{ width: 8, backgroundColor: b.color }}
            initial={{ height: 0 }}
            animate={{ height: inView ? (b.h / MAX_BAR) * CHART_H : 0 }}
            transition={{ delay: delay + i * 0.05, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ))}
      </div>
      <span className="text-[9px] text-[#9ca3af] whitespace-nowrap">{bar.label}</span>
    </div>
  );
}

export default function MeasurementSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left - copy */}
            <div>
              <motion.p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{ delay: 0.05, duration: 0.5 }}
              >
                02 / Measurement
              </motion.p>

              <motion.h2
                className="font-bold leading-tight text-[#0d2535]"
                style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.12, duration: 0.6 }}
              >
                Measure the outcomes that actually matter.
              </motion.h2>

              <motion.p
                className="mt-5 leading-relaxed text-[#4b5563]"
                style={{ fontSize: "1.0625rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
              >
                Not impressions. Not reach. Business outcomes - measured daily while campaigns are still live.
              </motion.p>

              {/* Outcome cards */}
              <motion.div
                className="mt-8 grid grid-cols-2 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.32, duration: 0.5 }}
              >
                {OUTCOMES.map((o) => (
                  <div
                    key={o.label}
                    className="rounded-lg border border-[#3a6682]/25 bg-white px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-[#0d2535]">{o.label}</p>
                    <p className="mt-0.5 text-xs text-[#6b7280]">{o.sub}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#9ca3af]">{o.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - animated bar chart */}
            <motion.div
              className="rounded-xl bg-white border border-[#e5e7eb] p-7"
              style={{ boxShadow: "0 4px 24px rgba(58,102,130,0.07)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >
              {/* Chart header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#0d2535]">Campaign Performance</p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">Outcome index · in-flight view</p>
                </div>
                <span className="flex items-center gap-1 text-[9px] text-[#3a6682] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3a6682] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Bar chart */}
              <div className="flex items-end justify-between">
                {BARS.map((bar, i) => (
                  <BarGroup
                    key={bar.label}
                    bar={bar}
                    inView={inView}
                    delay={0.45 + i * 0.07}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-5 flex items-center gap-4 flex-wrap">
                {[
                  { color: "#0d2535",              label: "Brand lift"    },
                  { color: "#3a6682",              label: "Search uplift" },
                  { color: "rgba(58,102,130,0.35)", label: "Conversion"   },
                  { color: "rgba(13,37,53,0.2)",   label: "Footfall"      },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: l.color }} />
                    <span className="text-[10px] text-[#6b7280]">{l.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
