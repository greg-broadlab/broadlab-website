"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion";
import Link from "next/link";


// ─── Hero data ────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { src: "/logos/netflix.png",      alt: "Netflix" },
  { src: "/logos/amazon-prime.png", alt: "Amazon Prime Video" },
  { src: "/logos/disney-plus.png",  alt: "Disney+" },
  { src: "/logos/sky.png",          alt: "Sky" },
  { src: "/logos/channel-4.png",    alt: "Channel 4" },
  { src: "/logos/warner.png",       alt: "Warner Bros. Discovery" },
  { src: "/logos/pluto.png",        alt: "Pluto TV" },
  { src: "/logos/samsung.png",      alt: "Samsung TV Plus" },
];

// ─── Solutions detail data ────────────────────────────────────────────────────

const SOLUTIONS_DETAIL = [
  {
    n: "01",
    name: "Inventory Access",
    statement: "Your ads on every major streaming platform, booked in one place.",
    stat: { value: "19M", label: "homes reached" },
    facts: ["Direct deals only", "No open exchange", "All major UK platforms"],
  },
  {
    n: "02",
    name: "Audience Targeting",
    statement: "One precise audience, consistent wherever your ads run.",
    stat: { value: "1.8M", label: "UK postcodes mapped" },
    facts: ["5,000+ audience attributes", "Privacy-safe via Snowflake", "No publisher fragmentation"],
  },
  {
    n: "03",
    name: "Measurement",
    statement: "Proof CTV is working — from first view to final purchase.",
    stat: { value: "Daily", label: "in-flight reporting" },
    facts: ["Brand uplift", "Search uplift", "Conversion tracking", "Footfall attribution"],
  },
  {
    n: "04",
    name: "Optimisation",
    statement: "Campaigns that get measurably better every single day.",
    stat: { value: "3.1×", label: "average ROAS" },
    facts: ["Geo", "Creative", "Publisher", "Audience", "Frequency"],
  },
];



// ─── Campaign dashboard ───────────────────────────────────────────────────────

const CAMPAIGN_BARS = [14, 22, 30, 38, 50, 60, 72, 82];
const TILT = 6;

function CampaignDashboard({ inView }: { inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX           = useMotionValue(0);
  const rotateY           = useMotionValue(0);
  const rotateXSpring     = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const rotateYSpring     = useSpring(rotateY, { stiffness: 260, damping: 22 });
  const glowX             = useMotionValue(0);
  const glowY             = useMotionValue(0);
  const glowXSpring       = useSpring(glowX,   { stiffness: 200, damping: 25 });
  const glowYSpring       = useSpring(glowY,   { stiffness: 200, damping: 25 });
  const glowOpacity       = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * TILT);
    rotateY.set(-((e.clientX - cx) / (rect.width  / 2)) * TILT);
    glowX.set(e.clientX - cx);
    glowY.set(e.clientY - cy);
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0); rotateY.set(0);
    glowX.set(0);   glowY.set(0);
    glowOpacity.set(0);
  }

  return (
    <motion.div
      className="relative hidden lg:block"
      initial={{ opacity: 0, scale: 1.04, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.04, y: 20 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(58,174,206,0.2)",
          boxShadow: "0 16px 48px rgba(13,37,53,0.10), 0 4px 12px rgba(0,0,0,0.04)",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
        }}
      >
        {/* Mouse glow */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 280, height: 280,
            left: "50%", top: "50%",
            marginLeft: -140, marginTop: -140,
            x: glowXSpring, y: glowYSpring,
            opacity: glowOpacitySpring,
            background: "radial-gradient(circle, rgba(58,174,206,0.07) 0%, transparent 70%)",
          }}
        />

        <div style={{ padding: "24px 28px" }}>

          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "#3aaece" }}>
              Campaign Intelligence
            </p>
            <div className="flex items-center" style={{ gap: 6 }}>
              <motion.div
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#3aaece" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-[0.6rem] tracking-[0.1em]" style={{ color: "#9ca3af" }}>LIVE</p>
            </div>
          </div>

          {/* Main stat */}
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: "3rem", fontWeight: 800, color: "#0d2535", lineHeight: 1 }}>3.1×</p>
            <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
              <p className="text-[0.6rem] font-medium tracking-[0.12em] uppercase" style={{ color: "#9ca3af" }}>
                Return on ad spend
              </p>
              <span
                className="text-[0.6rem] font-bold tracking-[0.08em]"
                style={{
                  background: "rgba(58,174,206,0.15)",
                  color: "#3aaece",
                  padding: "2px 7px",
                  borderRadius: 4,
                }}
              >
                +12%
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end" style={{ gap: 4, height: 68, marginBottom: 20 }}>
            {CAMPAIGN_BARS.map((h, i) => (
              <motion.div
                key={i}
                style={{
                  flex: 1,
                  borderRadius: "3px 3px 0 0",
                  background: `rgba(58,174,206,${0.18 + (i / (CAMPAIGN_BARS.length - 1)) * 0.72})`,
                }}
                initial={{ height: 0 }}
                animate={inView ? { height: h } : { height: 0 }}
                transition={{ delay: 0.65 + i * 0.06, duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(13,37,53,0.07)", marginBottom: 20 }} />

          {/* Secondary stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { value: "−87%",  label: "Cost per order"  },
              { value: "19M",   label: "Homes reached"   },
              { value: "Daily", label: "AI optimisation" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0d2535", lineHeight: 1 }}>{s.value}</p>
                <p className="text-[0.6rem] leading-snug" style={{ color: "#9ca3af", marginTop: 5 }}>{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function SolutionsHero() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#f0f8fb" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-main pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div>
            <h1
              className="font-bold leading-tight"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", color: "#0d2535" }}
            >
              {["Outcomes,", "not impressions."].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: inView ? "0%" : "110%" }}
                    transition={{ delay: 0.1 + i * 0.13, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p
              style={{ fontSize: "1.0625rem", color: "#4b5563", maxWidth: "28rem", marginTop: "1.25rem", lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.38, duration: 0.55 }}
            >
              Four connected capabilities. One system built around your business outcome.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              style={{ marginTop: "2rem" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href="/contact#contact"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
                style={{ background: "#3aaece", color: "#ffffff" }}
              >
                Book a consultation
              </Link>
              <Link
                href="/system"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-[#10657f] hover:text-white"
                style={{ border: "1px solid #10657f", color: "#10657f" }}
              >
                See how it works
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <CampaignDashboard inView={inView} />

        </div>
      </div>

      {/* Platform logos */}
      <div className="relative z-10 container-main pb-12">
        <div className="h-px w-full mb-8" style={{ background: "rgba(58,174,206,0.12)" }} />
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          {PLATFORMS.map((p) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={p.alt}
              src={p.src}
              alt={p.alt}
              className="h-5 w-auto object-contain"
              style={{ filter: "grayscale(1) brightness(0.4)", opacity: 0.6 }}
            />
          ))}
        </motion.div>
        <motion.p
          className="mt-6 text-center text-xs font-medium tracking-wide"
          style={{ color: "#9ca3af" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          19 million homes · Premium inventory only · No open exchange
        </motion.p>
      </div>

    </section>
  );
}


// ─── Detail panels ────────────────────────────────────────────────────────────

const PLATFORMS_TEXT = [
  "Netflix", "Amazon Prime", "Disney+",
  "Sky", "Channel 4", "Warner Bros.",
  "Pluto TV", "Samsung TV+",
];

// Audience Graph mini dashboard data
const MINI_POSTCODES = [
  "SW1A 1AA", "EC1A 1BB", "W1K 5AB", "SE1 7PB",
  "N1 9GU",   "E1 6RF",   "WC2N 5DU","SW3 4LY",
  "E8 4RS",   "N16 9LX",  "SE22 0JR","W11 1LA",
];
const MINI_COLS = [
  "GEN_F%","AGE_25-44","OCC_PROF","HH_INC",
  "CTV_HRS","PURCH_IDX","BRAND_AFF","TV_RGN",
  "HOMEOWNR","CHILDREN","CAR_OWNR","DIGITL",
  "PREM_TV","SPORTS","NEWS","DRAMA",
];
function msr(seed: number) { return (((Math.sin(seed * 9301 + 49297) % 1) + 1) % 1); }
function miniScore(r: number, c: number) { return Math.floor(msr(r * 100 + c) * 100); }
function miniStyle(score: number): { bg: string; fg: string } {
  if (score >= 80) return { bg: "#0d2535", fg: "#3aaece" };
  if (score >= 64) return { bg: "#10657f", fg: "#eaf6fb" };
  if (score >= 48) return { bg: "#1e4f80", fg: "#ffffff" };
  if (score >= 32) return { bg: "#3aaece", fg: "#ffffff" };
  if (score >= 16) return { bg: "#eaf6fb", fg: "#10657f" };
  return { bg: "#f9fafb", fg: "#10657f" };
}
const M_CELL_W = 54, M_CELL_H = 30, M_COL_H = 32, M_PC_W = 88;
const M_LOOP_W = MINI_COLS.length * M_CELL_W;

// Measurement bar chart data
const MEASURE_BARS = [
  { label: "Wk 1", brand: 12, search: 8,  conv: 5,  foot: 4  },
  { label: "Wk 2", brand: 18, search: 13, conv: 9,  foot: 7  },
  { label: "Wk 3", brand: 27, search: 20, conv: 15, foot: 11 },
  { label: "Wk 4", brand: 38, search: 29, conv: 22, foot: 17 },
  { label: "Wk 5", brand: 52, search: 41, conv: 31, foot: 24 },
  { label: "Wk 6", brand: 67, search: 55, conv: 43, foot: 34 },
  { label: "Wk 7", brand: 79, search: 66, conv: 57, foot: 44 },
  { label: "Wk 8", brand: 88, search: 76, conv: 68, foot: 53 },
] as const;
const M_CHART_H = 200;

// Optimisation tabs data
const OPT_TABS = [
  {
    id: "audience",
    label: "Audience",
    sublabel: "Delivery by segment",
    bars: [
      { label: "ABC1 professionals", pct: 74 },
      { label: "Homeowners 35–54",   pct: 61 },
      { label: "High HH income",     pct: 53 },
      { label: "Family households",  pct: 38 },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    sublabel: "Delivery by creative variant",
    bars: [
      { label: "30s brand film",   pct: 84 },
      { label: "15s product spot", pct: 67 },
      { label: "30s testimonial",  pct: 52 },
      { label: "6s bumper",        pct: 41 },
    ],
  },
  {
    id: "geo",
    label: "Geo",
    sublabel: "Delivery by region",
    bars: [
      { label: "Greater London", pct: 36 },
      { label: "South East",     pct: 24 },
      { label: "Midlands",       pct: 19 },
      { label: "North West",     pct: 13 },
    ],
  },
  {
    id: "rf",
    label: "Reach & Freq",
    sublabel: "Household frequency distribution",
    bars: [
      { label: "Reached 2–3×", pct: 44 },
      { label: "Reached 1×",   pct: 28 },
      { label: "Reached 4–5×", pct: 19 },
      { label: "Reached 6×+",  pct:  9 },
    ],
  },
] as const;
type OptTabId = typeof OPT_TABS[number]["id"];

function InventoryPanel({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col h-full p-8">
      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#3aaece] mb-6">Premium Inventory</p>
      <div className="grid grid-cols-2 gap-3 flex-1 content-start">
        {PLATFORMS_TEXT.map((name, i) => (
          <motion.div
            key={name}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3"
            style={{ background: "#ffffff", border: "1px solid rgba(58,174,206,0.15)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3aaece", flexShrink: 0 }} />
            <p className="text-sm font-medium text-[#0d2535]">{name}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(58,174,206,0.12)" }}>
        <p className="text-xs text-[#9ca3af]">Direct deals only · No open exchange · 19M homes</p>
      </div>
    </div>
  );
}

function TargetingPanel({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col h-full">
      {/* App header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#eaf6fb] border-b border-[#e5e7eb]">
        <span className="text-[10px] font-bold text-[#10657f] tracking-[0.14em] uppercase">Audience Graph</span>
        <span className="flex items-center gap-1 text-[9px] text-[#3aaece] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3aaece] inline-block animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Table */}
      <div className="flex flex-1 overflow-hidden bg-white relative">
        {/* Fixed postcode column */}
        <div className="flex-shrink-0 z-10 border-r border-[#e5e7eb]" style={{ width: M_PC_W }}>
          <div className="flex items-center px-3 border-b border-[#e5e7eb] bg-[#eaf6fb]" style={{ height: M_COL_H }}>
            <span className="text-[8px] font-bold text-[#10657f] tracking-[0.1em] uppercase">Postcode</span>
          </div>
          {MINI_POSTCODES.map((pc, ri) => (
            <motion.div
              key={pc}
              className="flex items-center px-3 border-b border-[#e5e7eb] bg-white"
              style={{ height: M_CELL_H }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.1 + ri * 0.04, duration: 0.2 }}
            >
              <span className="text-[10px] font-semibold text-[#10657f] tracking-wide" style={{ fontFamily: "ui-monospace, monospace" }}>
                {pc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scrolling columns */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className="flex flex-col"
            style={{ width: M_LOOP_W * 2 }}
            animate={{ x: [0, -M_LOOP_W] }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          >
            {/* Headers */}
            <div className="flex flex-shrink-0" style={{ height: M_COL_H }}>
              {[...MINI_COLS, ...MINI_COLS].map((col, ci) => (
                <div
                  key={`h-${ci}`}
                  className="flex-shrink-0 flex items-center justify-center border-r border-b border-[#e5e7eb] bg-[#eaf6fb]"
                  style={{ width: M_CELL_W, height: M_COL_H }}
                >
                  <span className="text-[8px] font-bold text-[#10657f] tracking-[0.04em] uppercase truncate px-0.5">{col}</span>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {MINI_POSTCODES.map((_, ri) => (
              <motion.div
                key={`row-${ri}`}
                className="flex flex-shrink-0"
                style={{ height: M_CELL_H }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.1 + ri * 0.04, duration: 0.2 }}
              >
                {[...MINI_COLS, ...MINI_COLS].map((_, ci) => {
                  const score = miniScore(ri, ci % MINI_COLS.length);
                  const { bg, fg } = miniStyle(score);
                  return (
                    <div
                      key={`c-${ci}`}
                      className="flex-shrink-0 flex items-center justify-center border-r border-b border-white/30"
                      style={{ width: M_CELL_W, height: M_CELL_H, backgroundColor: bg }}
                    >
                      <span style={{ fontSize: 9, fontFamily: "ui-monospace, monospace", color: fg, fontWeight: 700 }}>
                        {score}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </motion.div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none z-20"
            style={{ height: 1 }}
            animate={{ top: [M_COL_H + 2, M_COL_H + MINI_POSTCODES.length * M_CELL_H - 2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#3aaece]/60 to-transparent" />
          </motion.div>

          {/* Right-edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#eaf6fb] border-t border-[#e5e7eb]">
        <span className="text-[9px] font-medium text-[#9ca3af] tracking-wide">1.8M Postcodes · 5,000+ Attributes · Updated daily</span>
        <span className="text-[9px] font-semibold text-[#10657f]/40 tracking-[0.08em] uppercase">Snowflake</span>
      </div>
    </div>
  );
}

function MeasurementPanel({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col h-full p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#0d2535]">Campaign Performance</p>
          <p className="text-[10px] text-[#9ca3af] mt-0.5">Outcome index · in-flight view</p>
        </div>
        <span className="flex items-center gap-1 text-[9px] text-[#3aaece] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3aaece] animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between flex-1">
        {MEASURE_BARS.map((bar, i) => (
          <div key={bar.label} className="flex flex-col items-center gap-1.5">
            <div className="flex items-end gap-[2px]" style={{ height: M_CHART_H }}>
              {([
                { h: bar.brand,  color: "#0d2535"               },
                { h: bar.search, color: "#3aaece"               },
                { h: bar.conv,   color: "rgba(58,174,206,0.35)" },
                { h: bar.foot,   color: "rgba(13,37,53,0.18)"   },
              ] as const).map((b, j) => (
                <motion.div
                  key={j}
                  className="rounded-t"
                  style={{ width: 7, backgroundColor: b.color }}
                  initial={{ height: 0 }}
                  animate={{ height: inView ? (b.h / 100) * M_CHART_H : 0 }}
                  transition={{ delay: 0.2 + i * 0.07 + j * 0.04, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ))}
            </div>
            <span className="text-[9px] text-[#9ca3af]">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 flex items-center gap-4 flex-wrap" style={{ borderTop: "1px solid #e5e7eb" }}>
        {[
          { color: "#0d2535",                label: "Brand lift"    },
          { color: "#3aaece",                label: "Search uplift" },
          { color: "rgba(58,174,206,0.35)",  label: "Conversion"   },
          { color: "rgba(13,37,53,0.18)",    label: "Footfall"      },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: l.color }} />
            <span className="text-[10px] text-[#6b7280]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OptimisationPanel({ inView: _ }: { inView: boolean }) {
  const [activeTab, setActiveTab] = useState<OptTabId>("audience");
  const tab = OPT_TABS.find(t => t.id === activeTab)!;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex bg-[#f9fafb] border-b border-[#e5e7eb] overflow-x-auto">
        {OPT_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`relative shrink-0 px-4 py-3 text-[10px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
              activeTab === t.id ? "text-[#0d2535]" : "text-[#9ca3af] hover:text-[#4b5563]"
            }`}
          >
            {t.label}
            {activeTab === t.id && (
              <motion.div
                layoutId="opt-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3aaece]"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-7 py-6 bg-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9ca3af] mb-5">
              {tab.sublabel}
            </p>
            <div className="flex-1 flex flex-col justify-between">
              {tab.bars.map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-4">
                  <span className="text-[11px] text-[#6b7280] shrink-0" style={{ width: 155 }}>{bar.label}</span>
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#f0f8fb" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #10657f, #3aaece)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <span className="text-xs font-bold tabular-nums text-[#0d2535]" style={{ width: 30, textAlign: "right" }}>
                    {bar.pct}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailPanel({ index, inView }: { index: number; inView: boolean }) {
  if (index === 0) return <InventoryPanel inView={inView} />;
  if (index === 1) return <TargetingPanel inView={inView} />;
  if (index === 2) return <MeasurementPanel inView={inView} />;
  return <OptimisationPanel inView={inView} />;
}

// ─── Solutions detail ─────────────────────────────────────────────────────────

const ADVANCE_SECS = 5;

function SolutionsDetail() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive(prev => (prev + 1) % SOLUTIONS_DETAIL.length);
    }, ADVANCE_SECS * 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="section-padding">
        <div className="container-main">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-10 items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >

            {/* Left — tabs */}
            <div className="flex flex-col">
              {SOLUTIONS_DETAIL.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  className="relative text-left overflow-hidden"
                  style={{
                    padding: "22px 20px",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    borderLeft: `2px solid ${active === i ? "#3aaece" : "rgba(58,174,206,0.15)"}`,
                    background: active === i ? "rgba(58,174,206,0.04)" : "transparent",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <p
                    className="text-xs font-bold tracking-widest mb-1"
                    style={{ color: active === i ? "#3aaece" : "rgba(58,174,206,0.35)" }}
                  >
                    {s.n}
                  </p>
                  <p
                    className="font-bold"
                    style={{
                      fontSize: "1.0625rem",
                      color: active === i ? "#0d2535" : "#9ca3af",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {s.name}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{s.statement}</p>
                        <div className="mt-4">
                          <p className="font-bold text-[#0d2535]" style={{ fontSize: "1.75rem", lineHeight: 1 }}>{s.stat.value}</p>
                          <p className="text-xs text-[#9ca3af] mt-1">{s.stat.label}</p>
                        </div>
                        <ul className="mt-4 flex flex-col gap-1.5">
                          {s.facts.map(fact => (
                            <li key={fact} className="flex items-center gap-2 text-xs text-[#4b5563]">
                              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#3aaece", flexShrink: 0, display: "inline-block" }} />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress bar */}
                  {active === i && (
                    <motion.div
                      key={`bar-${i}-${active}`}
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ background: "#3aaece" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: ADVANCE_SECS, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right — bespoke panel */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "#f0f8fb",
                border: "1px solid rgba(58,174,206,0.15)",
                height: 480,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DetailPanel index={active} inView={inView} />
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Results strip ────────────────────────────────────────────────────────────

const RESULTS = [
  { prefix: "",   end: 3,    suffix: ":1", decimals: 0, label: "Return on ad spend",          sector: "Financial Services" },
  { prefix: "−",  end: 87,   suffix: "%",  decimals: 0, label: "Cost per order",               sector: "Retail / DTC"       },
  { prefix: "+",  end: 24.8, suffix: "%",  decimals: 1, label: "Incremental showroom visits",  sector: "Automotive"         },
  { prefix: "",   end: 8.9,  suffix: "%",  decimals: 1, label: "Of total sales from CTV",      sector: "Sports Streaming"   },
];

function CountUp({ prefix = "", end, suffix = "", decimals = 0, inView }: {
  prefix?: string; end: number; suffix?: string; decimals?: number; inView: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) { setDisplay(v.toFixed(decimals)); },
    });
    return () => controls.stop();
  }, [inView, end, decimals]);

  return <>{prefix}{display}{suffix}</>;
}

function ResultsStrip() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#f0f8fb" }}>
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.3)" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Eyebrow */}
          <motion.p
            className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-12"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            Results from live BroadLab campaigns
          </motion.p>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(58,174,206,0.15)" }}
          >
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.sector}
                className="flex flex-col px-8 py-10 bg-[#f0f8fb]"
                style={{ borderTop: "3px solid #3aaece" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p
                  className="font-bold leading-none text-[#0d2535]"
                  style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}
                >
                  <CountUp
                    prefix={r.prefix}
                    end={r.end}
                    suffix={r.suffix}
                    decimals={r.decimals}
                    inView={inView}
                  />
                </p>
                <p className="mt-3 text-sm leading-snug text-[#4b5563]">{r.label}</p>
                <p
                  className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#3aaece]"
                  style={{
                    borderTop: "1px solid rgba(58,174,206,0.2)",
                    paddingTop: "12px",
                    marginTop: "auto",
                    paddingBottom: "2px",
                  }}
                >
                  {r.sector}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.p
            className="mt-6 text-center text-xs text-[#9ca3af]"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Each result is from a single client campaign. Figures are pending final sign-off before publication.
          </motion.p>

        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#f0f8fb" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">

            {/* Eyebrow */}
            <motion.p
              className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-6"
              style={{ color: "#3aaece" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              Get to know CTV
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Find out what CTV can do for your brand.
            </motion.h2>

            {/* Sub */}
            <motion.p
              className="mx-auto mt-5 leading-relaxed"
              style={{ fontSize: "1.0625rem", color: "#4b5563", maxWidth: "30rem" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.22, duration: 0.55 }}
            >
              Whether you&apos;re just exploring or ready to scale — we&apos;ll show you exactly where the opportunity is.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <Link
                href="/contact#contact"
                className="inline-flex items-center rounded-full px-9 py-4 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#3aaece", color: "#071c2a" }}
              >
                Get a CTV briefing
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="mt-8 text-xs font-medium tracking-wide"
              style={{ color: "#9ca3af" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Trusted by Lenovo, Lloyds Banking Group, Royal Caribbean, Heineken and DAZN.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function Solutions() {
  return (
    <>
      <SolutionsHero />
      <SolutionsDetail />
      <ResultsStrip />
      <FinalCTA />
    </>
  );
}
