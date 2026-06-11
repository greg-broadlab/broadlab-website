"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const FEATURES = [
  { label: "Campaigns built around your outcomes", desc: "Every campaign is structured around the metrics that matter to your business, before a single penny is spent." },
  { label: "Precision audiences from 60.3M geographic data points", desc: "We build privacy-safe audience segments using our very own Audience Graph - accurate, scalable and consistent across every platform." },
  { label: "Supply allocated across premium CTV", desc: "We plan and allocate across premium inventory with full pricing transparency and no hidden intermediaries." },
  { label: "Full visibility from brief to live", desc: "You see exactly how your campaign is structured, what it costs and how it's performing - at every stage." },
];


function BCAPMockup({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(58,102,130,0.1)" }}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 24 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6" cy="6" r="3" stroke="#0d2535" strokeWidth="1.5" />
            <circle cx="10" cy="6" r="3" stroke="#0d2535" strokeWidth="1.5" />
            <path d="M2 14c0-2.5 3-4 6-4s6 1.5 6 4" stroke="#0d2535" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-[12px] font-bold text-[#0d2535]">Build Your Audience</p>
        </div>
        <span className="text-[9px] font-bold px-2 py-1 rounded text-[#3a6682]"
          style={{ background: "rgba(58,102,130,0.08)", border: "1px solid rgba(58,102,130,0.2)" }}>
          Broadlab
        </span>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">

        {/* Campaign Details */}
        <div className="rounded-xl p-3" style={{ border: "1px solid #f3f4f6", background: "#fafafa" }}>
          <p className="text-[9px] font-semibold text-[#9ca3af] mb-2.5">Campaign Details (Optional)</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-[9px] text-[#6b7280] mb-1">Advertiser</p>
              <div className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-[#0d2535]"
                style={{ border: "1px solid #e5e7eb", background: "white" }}>
                Bella+Duke
              </div>
            </div>
            <div>
              <p className="text-[9px] text-[#6b7280] mb-1">Industry</p>
              <div className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-[#0d2535]"
                style={{ border: "1px solid #e5e7eb", background: "white" }}>
                Pets &gt; Pet Supplies
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-[9px] text-[#6b7280] mb-1">Budget</p>
              <div className="px-2.5 py-1.5 rounded-lg text-[10px] text-[#9ca3af]"
                style={{ border: "1px solid #e5e7eb", background: "white" }}>
                £ 0
              </div>
            </div>
            <div>
              <p className="text-[9px] text-[#6b7280] mb-1">CPM</p>
              <div className="px-2.5 py-1.5 rounded-lg text-[10px] text-[#9ca3af]"
                style={{ border: "1px solid #e5e7eb", background: "white" }}>
                Auto
              </div>
            </div>
            <div>
              <p className="text-[9px] text-[#6b7280] mb-1">KPI</p>
              <div className="px-2.5 py-1.5 rounded-lg text-[10px] text-[#9ca3af] flex items-center justify-between"
                style={{ border: "1px solid #e5e7eb", background: "white" }}>
                Select a KPI
                <span>▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Brief */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-semibold text-[#0d2535]">Audience Brief <span className="text-[#3a6682]">*</span></p>
            <span className="text-[9px] font-medium text-[#3a6682] px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(58,102,130,0.08)", border: "1px solid rgba(58,102,130,0.2)" }}>
              ✦ Format with AI
            </span>
          </div>
          <div className="rounded-xl px-3 py-2.5" style={{ border: "1px solid #e5e7eb", background: "white", minHeight: 60 }}>
            <p className="text-[10px] text-[#0d2535] leading-relaxed">
              Premium Pet Pamperers - high household income, aged 30-55, own pets and treat them as family. Interested in premium pet nutrition and wellness.
            </p>
          </div>
          <p className="text-[9px] text-[#9ca3af] mt-1">Describe your target audience using natural language</p>
        </div>

        {/* Vendor + Filters */}
        {["Vendor(s)", "Filters (Optional)"].map((label) => (
          <div key={label} className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer"
            style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}>
            <p className="text-[10px] font-medium text-[#4b5563]">{label}</p>
            <span className="text-[#9ca3af] text-xs">▾</span>
          </div>
        ))}

        {/* Action buttons */}
        <div className="flex gap-2 mt-1">
          <button className="text-[10px] font-semibold px-3 py-2 rounded-lg text-[#ef4444] flex items-center gap-1"
            style={{ border: "1px solid #fecaca", background: "white" }}>
            ✕ Clear
          </button>
          <button className="flex-1 text-[10px] font-semibold px-3 py-2 rounded-lg text-white flex items-center justify-center gap-1"
            style={{ background: "#4b5563" }}>
            ✦ Build Audience
          </button>
          <button className="flex-1 text-[10px] font-semibold px-3 py-2 rounded-lg text-white flex items-center justify-center gap-1"
            style={{ background: "#3a6682" }}>
            ↻ Re-launch Clustering
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default function BCAPSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#eaf1f6" }}>
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left - copy */}
            <div>
              <motion.p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-4"
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
                <span style={{ color: "#3a6682" }}>your campaigns.</span>
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
                      style={{ background: "rgba(58,102,130,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3a6682]" />
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
                  className="inline-flex items-center gap-2 rounded-full bg-[#3a6682] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d2535]">
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
