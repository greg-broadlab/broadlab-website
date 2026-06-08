"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FEATURES = [
  { label: "Campaigns built around your outcomes", desc: "Every campaign is structured around the metrics that matter to your business, before a pound is spent." },
  { label: "Precision audiences from 60.3M geo keys", desc: "We build privacy-safe audience segments using the Audience Graph - accurate, scalable and consistent across every platform." },
  { label: "Supply allocated across premium CTV", desc: "We plan and allocate across premium inventory with full pricing transparency and no hidden intermediaries." },
  { label: "Full visibility from brief to live", desc: "You see exactly how your campaign is structured, what it costs and how it's performing - at every stage." },
];

const NAV_TABS = ["Audience", "Plan", "Supply", "Review", "Report"];

const SUPPLIERS = [
  { name: "Netflix",   cpm: "£17.64", type: "SVOD", meas: true,  geo: "98%", trend: [3,4,4,5,5,6,6] },
  { name: "DAZN",      cpm: "£15.00", type: "FAST", meas: true,  geo: "72%", trend: [2,3,3,4,4,5,5] },
  { name: "HBO Max",   cpm: "£11.00", type: "SVOD", meas: false, geo: "N/A", trend: [4,3,3,3,2,2,2] },
  { name: "Disney+",   cpm: "£14.50", type: "AVOD", meas: true,  geo: "45%", trend: [2,2,3,3,4,4,5] },
  { name: "Sky",       cpm: "£18.56", type: "FAST", meas: true,  geo: "2%",  trend: [5,5,4,4,3,3,4] },
];

const STATS = [
  { label: "IMPS",       value: "1.2M",   sub: "100% allocated" },
  { label: "TOTAL COST", value: "£25K",   sub: "gross £40.75"   },
  { label: "MARGIN",     value: "42.2%",  sub: "target ≥45%", warn: true },
  { label: "MEASURABLE", value: "55.4%",  sub: "target ≥80%"   },
];

function MiniTrend({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const w = 40, h = 18;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke="#3aaece" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ACTIVE_TAB = 2; // Supply - fixed, non-interactive

function BCAPMockup({ inView }: { inView: boolean }) {

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(16,101,127,0.1)" }}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 24 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        <div>
          <p className="text-[11px] font-bold text-[#0d2535]">Plan Campaign - Cambridge Building Society</p>
          <p className="text-[10px] text-[#9ca3af]">Supply allocation and pricing</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full text-[#6b7280]"
            style={{ background: "#f3f4f6" }}>Draft</span>
          <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ background: "#10657f" }}>Send for Approval</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 px-5 py-3"
        style={{ borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-[#9ca3af]">{s.label}</p>
            <p className="text-[13px] font-bold mt-0.5" style={{ color: s.warn ? "#f59e0b" : "#0d2535" }}>{s.value}</p>
            <p className="text-[8px] text-[#9ca3af]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex px-5 pt-2" style={{ borderBottom: "1px solid #f3f4f6" }}>
        {NAV_TABS.map((tab, i) => (
          <div key={tab}
            className="text-[10px] font-semibold px-4 py-2"
            style={{
              borderBottom: ACTIVE_TAB === i ? "2px solid #3aaece" : "2px solid transparent",
              color: ACTIVE_TAB === i ? "#3aaece" : "#9ca3af",
            }}>
            {tab}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-[#9ca3af] tracking-[0.1em] uppercase">
            Supply Allocation <span className="text-[#3aaece]">(8/34)</span>
          </p>
          <span className="text-[9px] font-semibold px-2.5 py-1 rounded-lg text-white"
            style={{ background: "#3aaece" }}>+ Add Deal</span>
        </div>

        {/* Table header */}
        <div className="grid gap-2 pb-2 mb-1"
          style={{ gridTemplateColumns: "1fr 56px 44px 44px 40px 44px", borderBottom: "1px solid #f3f4f6" }}>
          {["SUPPLIER", "INV. CPM", "TYPE", "MEAS.", "GEO", "TREND"].map((h) => (
            <p key={h} className="text-[8px] font-bold tracking-[0.08em] text-[#9ca3af]">{h}</p>
          ))}
        </div>

        {/* Rows */}
        {SUPPLIERS.map((s, i) => (
          <motion.div key={s.name}
            className="grid gap-2 py-2 items-center"
            style={{ gridTemplateColumns: "1fr 56px 44px 44px 40px 44px", borderBottom: i < SUPPLIERS.length - 1 ? "1px solid #f9fafb" : "none" }}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 8 }}
            transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: s.meas ? "#3aaece" : "#e5e7eb" }} />
              <span className="text-[11px] font-semibold text-[#0d2535]">{s.name}</span>
            </div>
            <span className="text-[10px] text-[#4b5563] font-medium">{s.cpm}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded text-[#6b7280] text-center"
              style={{ background: "#f3f4f6" }}>{s.type}</span>
            <span className="text-[10px] font-bold text-center"
              style={{ color: s.meas ? "#3aaece" : "#d1d5db" }}>{s.meas ? "✓" : "✗"}</span>
            <span className="text-[10px] text-[#6b7280] text-center">{s.geo}</span>
            <MiniTrend values={s.trend} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function BCAPSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left - copy */}
            <div>
              <motion.p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{ delay: 0.05, duration: 0.5 }}>
                Campaign & Audience Builder
              </motion.p>

              <motion.h2
                className="font-bold leading-tight text-[#0d2535]"
                style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.12, duration: 0.6 }}>
                How we build<br />
                <span style={{ color: "#3aaece" }}>your campaigns.</span>
              </motion.h2>

              <motion.div
                className="mt-8 flex flex-col gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}>
                {FEATURES.map((f, i) => (
                  <motion.div key={f.label}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -12 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(58,174,206,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3aaece]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0d2535]">{f.label}</p>
                      <p className="mt-0.5 text-sm text-[#6b7280] leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.6, duration: 0.5 }}>
                <Link href="/contact#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#10657f] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d2535]">
                  Book a consultation
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right - BCAP mockup */}
            <BCAPMockup inView={inView} />

          </div>
        </div>
      </div>
    </section>
  );
}
