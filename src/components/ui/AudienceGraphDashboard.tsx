"use client";

import { motion } from "framer-motion";

const POSTCODES = [
  "SW1A 1AA", "EC1A 1BB", "W1K 5AB", "SE1 7PB",
  "N1 9GU",   "E1 6RF",   "WC2N 5DU","SW3 4LY",
  "W2 3QA",   "NW1 8XR",  "SE11 4TH","E14 5HP",
  "N7 0LN",   "SW7 2AZ",  "W1F 9HT", "EC2V 8RT",
];

const DATA_COLS = [
  "GEN_F%",   "AGE_25-44","OCC_PROF", "HH_INC",  "CTV_HRS",
  "PURCH_IDX","BRAND_AFF","TV_RGN",   "HOMEOWNR","CHILDREN",
  "CAR_OWNR", "DIGITL",   "PREM_TV",  "SPORTS",  "NEWS",
  "DRAMA",    "LIFESTYLE","HEALTH",   "FINANCE", "RETAIL",
  "AUTOMTV",  "TRAVEL",   "FOODIE",   "TECH",    "GAMING",
  "FASHION",  "HOME_IMP", "LUXURY",   "ECO",     "FAMILY",
];

function sr(seed: number) {
  return (((Math.sin(seed * 9301 + 49297) % 1) + 1) % 1);
}

function scoreToStyle(score: number): { bg: string; fg: string } {
  if (score >= 80) return { bg: "#0d2535", fg: "#3aaece" };
  if (score >= 64) return { bg: "#10657f", fg: "#eaf6fb" };
  if (score >= 48) return { bg: "#1e4f80", fg: "#ffffff" };
  if (score >= 32) return { bg: "#3aaece", fg: "#ffffff" };
  if (score >= 16) return { bg: "#eaf6fb", fg: "#10657f" };
  return { bg: "#f9fafb", fg: "#10657f" };
}

const SCORES = POSTCODES.map((_, ri) =>
  DATA_COLS.map((_, ci) => Math.floor(sr(ri * 100 + ci) * 100))
);

const CELL_W  = 68;
const CELL_H  = 34;
const COL_H   = 38;
const PC_W    = 118;
const LOOP_W  = DATA_COLS.length * CELL_W;

export default function AudienceGraphDashboard() {
  return (
    <div className="rounded-xl border border-[#e5e7eb] overflow-hidden"
      style={{ boxShadow: "0 32px 80px rgba(16,101,127,0.13), 0 8px 24px rgba(16,101,127,0.07)" }}
    >
      {/* App header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#eaf6fb] border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="h-[18px] w-auto" style={{ mixBlendMode: "multiply" }} />
          <span className="text-[11px] font-bold text-[#10657f] tracking-[0.14em] uppercase">
            Audience Graph
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(["UK", "US"] as const).map((m) => (
              <span
                key={m}
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  m === "UK"
                    ? "bg-[#10657f] text-white"
                    : "text-[#9ca3af] border border-[#e5e7eb]"
                }`}
              >
                {m}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-[9px] text-[#3aaece] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3aaece] inline-block animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex bg-white overflow-hidden" style={{ height: POSTCODES.length * CELL_H + COL_H }}>

        {/* Fixed postcode column */}
        <div className="flex-shrink-0 z-10 border-r border-[#e5e7eb]" style={{ width: PC_W }}>
          <div
            className="flex items-center px-3 border-b border-[#e5e7eb] bg-[#eaf6fb]"
            style={{ height: COL_H }}
          >
            <span className="text-[9px] font-bold text-[#10657f] tracking-[0.1em] uppercase">
              Postcode
            </span>
          </div>
          {POSTCODES.map((pc, ri) => (
            <motion.div
              key={pc}
              className="flex items-center px-3 border-b border-[#e5e7eb] bg-white"
              style={{ height: CELL_H }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + ri * 0.035, duration: 0.2 }}
            >
              <span
                className="text-[11px] font-semibold text-[#10657f] tracking-wide"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {pc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scrolling data columns */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div
            className="flex flex-col"
            style={{ width: LOOP_W * 2 }}
            animate={{ x: [0, -LOOP_W] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {/* Column headers — duplicated for seamless loop */}
            <div className="flex flex-shrink-0" style={{ height: COL_H }}>
              {[...DATA_COLS, ...DATA_COLS].map((col, ci) => (
                <div
                  key={`h-${ci}`}
                  className="flex-shrink-0 flex items-center justify-center border-r border-b border-[#e5e7eb] bg-[#eaf6fb]"
                  style={{ width: CELL_W, height: COL_H }}
                >
                  <span className="text-[9px] font-bold text-[#10657f] tracking-[0.05em] uppercase px-0.5 truncate">
                    {col}
                  </span>
                </div>
              ))}
            </div>

            {/* Data rows — duplicated for seamless loop */}
            {POSTCODES.map((_, ri) => (
              <motion.div
                key={`row-${ri}`}
                className="flex flex-shrink-0"
                style={{ height: CELL_H }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + ri * 0.035, duration: 0.2 }}
              >
                {[...SCORES[ri], ...SCORES[ri]].map((score, ci) => {
                  const { bg, fg } = scoreToStyle(score);
                  return (
                    <div
                      key={`c-${ci}`}
                      className="flex-shrink-0 flex items-center justify-center border-r border-b border-white/40"
                      style={{ width: CELL_W, height: CELL_H, backgroundColor: bg }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "ui-monospace, monospace",
                          color: fg,
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                        }}
                      >
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
            animate={{ top: [COL_H + 2, COL_H + POSTCODES.length * CELL_H - 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#3aaece]/60 to-transparent" />
          </motion.div>

          {/* Right-edge fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#eaf6fb] border-t border-[#e5e7eb]">
        <span className="text-[9px] font-medium text-[#9ca3af] tracking-wide">
          60.3M Geo Keys · 7,000+ Attributes · Updated daily
        </span>
        <span className="text-[9px] font-semibold text-[#10657f]/40 tracking-[0.08em] uppercase">
          Powered by Snowflake
        </span>
      </div>
    </div>
  );
}
