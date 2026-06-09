"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Y_TOP   = 36;
const Y_BOT   = 206;
const Y_RANGE = Y_BOT - Y_TOP;
const CPD_MAX = 60;

function yOf(cpd: number) {
  return Y_TOP + (1 - cpd / CPD_MAX) * Y_RANGE;
}

// X layout - wide gap so pill and bracket never collide
const C1_X1 = 60,  C1_X2 = 380;
const C2_X1 = 630, C2_X2 = 960;
const PILL_CX   = 460;           // pill centred left-half of gap
const BRACKET_X = 604;           // bracket right-half of gap, clear of pill

// Y values
const C1_Y1 = yOf(60);    // 36
const C1_Y2 = yOf(14);    // ~166
const C2_Y1 = yOf(34);    // ~110
const C2_Y2 = yOf(0.52);  // ~205
const BMID   = (C1_Y1 + C2_Y1) / 2;  // bracket mid-y

// Paths
const C1_PATH = `M ${C1_X1},${C1_Y1} C ${C1_X1+130},${C1_Y1+3} ${C1_X2-110},${C1_Y2-3} ${C1_X2},${C1_Y2}`;
const C2_PATH = `M ${C2_X1},${C2_Y1} C ${C2_X1+130},${C2_Y1+3} ${C2_X2-110},${C2_Y2-3} ${C2_X2},${C2_Y2}`;
const C1_AREA = `${C1_PATH} L ${C1_X2},${Y_BOT} L ${C1_X1},${Y_BOT} Z`;
const C2_AREA = `${C2_PATH} L ${C2_X2},${Y_BOT} L ${C2_X1},${Y_BOT} Z`;

export default function LearningSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12 max-w-xl mx-auto text-center">
            <motion.p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-4"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.05, duration: 0.5 }}>
              04 / Learning
            </motion.p>
            <motion.h2 className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.12, duration: 0.6 }}>
              Every campaign makes the next one smarter.
            </motion.h2>
            <motion.p className="mt-4 text-[1rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}>
              Each cycle feeds intelligence back into the system - so every brief starts sharper than the last.
            </motion.p>
          </div>

          {/* Chart card */}
          <motion.div className="mx-auto max-w-4xl rounded-2xl bg-white overflow-hidden"
            style={{ border: "1px solid rgba(58,102,130,0.18)", boxShadow: "0 12px 48px rgba(58,102,130,0.1)" }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ delay: 0.3, duration: 0.7 }}>

            {/* Card header */}
            <div className="flex items-center justify-between px-8 py-5"
              style={{ borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3a6682]">Real campaign data</p>
                <p className="mt-0.5 text-sm font-semibold text-[#0d2535]">Scottish Widows · Cost per acquisition</p>
              </div>
              <span className="text-[11px] text-[#9ca3af] font-medium">Oct 2025 – Mar 2026</span>
            </div>

            {/* SVG chart */}
            <div className="px-6 pt-10 pb-6">
              <svg viewBox="0 0 1020 248" className="w-full" style={{ overflow: "visible" }} aria-hidden="true">
                <defs>
                  <linearGradient id="lgC1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(13,37,53,0.13)" />
                    <stop offset="100%" stopColor="rgba(13,37,53,0.01)" />
                  </linearGradient>
                  <linearGradient id="lgC2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(58,102,130,0.22)" />
                    <stop offset="100%" stopColor="rgba(58,102,130,0.01)" />
                  </linearGradient>
                  <marker id="arrowTeal" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 9 3.5, 0 7" fill="#3a6682" />
                  </marker>
                  <filter id="cardShadow" x="-10%" y="-20%" width="120%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(58,102,130,0.12)" />
                  </filter>
                </defs>

                {/* Gridlines */}
                {[80, 120, 160, 200].map(y => (
                  <line key={y} x1={C1_X1} y1={y} x2={C2_X2} y2={y}
                    stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                ))}

                {/* £60 reference line */}
                <line x1={C1_X1} y1={C1_Y1} x2={C2_X2} y2={C1_Y1}
                  stroke="rgba(13,37,53,0.07)" strokeWidth="1" strokeDasharray="5 7" />

                {/* Area fills */}
                <motion.path d={C1_AREA} fill="url(#lgC1)"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 0.6, duration: 0.9 }} />
                <motion.path d={C2_AREA} fill="url(#lgC2)"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.2, duration: 0.9 }} />

                {/* ── CAMPAIGN 1 ── */}
                <motion.path d={C1_PATH} fill="none" stroke="#0d2535" strokeWidth="3"
                  strokeLinecap="round" pathLength={1} strokeDasharray="1"
                  initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: inView ? 0 : 1 }}
                  transition={{ delay: 0.6, duration: 1.4, ease: [0.4, 0, 0.2, 1] }} />

                {/* C1 start dot + label (above dot, outside area) */}
                <circle cx={C1_X1} cy={C1_Y1} r="6" fill="#0d2535" />
                <text x={C1_X1 + 12} y={C1_Y1 - 10} fontSize="16" fontWeight="700"
                  fill="#0d2535" fontFamily="Inter, system-ui, sans-serif">£60</text>

                {/* C1 end dot + label */}
                <motion.circle cx={C1_X2} cy={C1_Y2} r="6" fill="#0d2535"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
                  transition={{ delay: 2.0 }}
                  style={{ transformOrigin: `${C1_X2}px ${C1_Y2}px` }} />
                <motion.text x={C1_X2 - 12} y={C1_Y2 - 12} fontSize="16" fontWeight="700"
                  fill="#0d2535" textAnchor="end" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.0 }}>£14</motion.text>

                {/* ── GAP: arrow from C1 end → C2 start + callout box ── */}
                {/* Arrow path from £14 endpoint to £34 start */}
                <motion.path
                  d={`M ${C1_X2},${C1_Y2} C 450,${C1_Y2 - 20} 560,${C2_Y1 + 20} ${C2_X1 - 8},${C2_Y1}`}
                  fill="none" stroke="#3a6682" strokeWidth="2" strokeDasharray="5 4"
                  markerEnd="url(#arrowTeal)"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: inView ? 1 : 0, pathLength: inView ? 1 : 0 }}
                  transition={{ delay: 2.1, duration: 0.8, ease: "easeOut" }} />

                {/* Callout box centered on the arrow arc */}
                <motion.rect x="418" y="112" width="164" height="52" rx="8"
                  fill="white" stroke="#3a6682" strokeWidth="1.5"
                  filter="url(#cardShadow)"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.85 }}
                  transition={{ delay: 2.3, duration: 0.4 }}
                  style={{ transformOrigin: "500px 138px" }} />
                <motion.text x="500" y="131" textAnchor="middle"
                  fontSize="11" fontWeight="800" fill="#3a6682" letterSpacing="0.1em"
                  fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.4 }}>SYSTEM LEARNS</motion.text>
                <motion.text x="500" y="149" textAnchor="middle"
                  fontSize="10" fill="#6b7280"
                  fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.4 }}>Campaign 1 feeds Campaign 2</motion.text>

                {/* ── BRACKET (right half of gap, clear of pill) ── */}
                {/* Vertical line */}
                <motion.line x1={BRACKET_X} y1={C1_Y1} x2={BRACKET_X} y2={C2_Y1}
                  stroke="#3a6682" strokeWidth="1.5"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.4, duration: 0.35 }}
                  style={{ transformOrigin: `${BRACKET_X}px ${C1_Y1}px` }} />
                {/* Top tick */}
                <motion.line x1={BRACKET_X - 7} y1={C1_Y1} x2={BRACKET_X + 7} y2={C1_Y1}
                  stroke="#3a6682" strokeWidth="1.5"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.4 }} />
                {/* Bottom tick */}
                <motion.line x1={BRACKET_X - 7} y1={C2_Y1} x2={BRACKET_X + 7} y2={C2_Y1}
                  stroke="#3a6682" strokeWidth="1.5"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.55 }} />
                {/* 43% label - to the LEFT of bracket, away from C2 */}
                <motion.text x={BRACKET_X - 13} y={BMID - 3}
                  fontSize="14" fontWeight="800" fill="#3a6682"
                  textAnchor="end" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.55 }}>43%</motion.text>
                <motion.text x={BRACKET_X - 13} y={BMID + 13}
                  fontSize="10" fontWeight="600" fill="#3a6682"
                  textAnchor="end" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.55 }}>cheaper start</motion.text>

                {/* ── CAMPAIGN 2 ── */}

                {/* Ghost dot at typical restart level */}
                <motion.circle cx={C2_X1} cy={C1_Y1} r="6"
                  fill="none" stroke="rgba(13,37,53,0.25)" strokeWidth="1.5" strokeDasharray="2 2"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.35 }} />
                <motion.text x={C2_X1 + 12} y={C1_Y1 - 10} fontSize="11" fontWeight="600"
                  fill="rgba(13,37,53,0.35)" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.35 }}>Typical restart: £60</motion.text>

                {/* C2 curve */}
                <motion.path d={C2_PATH} fill="none" stroke="#3a6682" strokeWidth="3"
                  strokeLinecap="round" pathLength={1} strokeDasharray="1"
                  initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: inView ? 0 : 1 }}
                  transition={{ delay: 2.2, duration: 1.4, ease: [0.4, 0, 0.2, 1] }} />

                {/* C2 actual start dot + label (above dot) */}
                <motion.circle cx={C2_X1} cy={C2_Y1} r="6" fill="#3a6682"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
                  transition={{ delay: 2.2 }}
                  style={{ transformOrigin: `${C2_X1}px ${C2_Y1}px` }} />
                <motion.text x={C2_X1 + 12} y={C2_Y1 - 10} fontSize="16" fontWeight="700"
                  fill="#3a6682" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 2.2 }}>£34</motion.text>

                {/* C2 end dot + label */}
                <motion.circle cx={C2_X2} cy={C2_Y2} r="6" fill="#3a6682"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
                  transition={{ delay: 3.6 }}
                  style={{ transformOrigin: `${C2_X2}px ${C2_Y2}px` }} />
                <motion.text x={C2_X2 - 12} y={C2_Y2 - 12} fontSize="16" fontWeight="700"
                  fill="#3a6682" textAnchor="end" fontFamily="Inter, system-ui, sans-serif"
                  initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 3.6 }}>£0.52</motion.text>

                {/* Section labels */}
                <text x={C1_X1} y={Y_BOT + 30} fontSize="11" fontWeight="700"
                  letterSpacing="0.12em" fill="#9ca3af"
                  fontFamily="Inter, system-ui, sans-serif">CAMPAIGN 1</text>

<text x={C2_X1} y={Y_BOT + 30} fontSize="11" fontWeight="700"
                  letterSpacing="0.12em" fill="#9ca3af"
                  fontFamily="Inter, system-ui, sans-serif">CAMPAIGN 2</text>
              </svg>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-8 py-4"
              style={{ borderTop: "1px solid #f3f4f6" }}>
              <span className="text-[11px] text-[#9ca3af]">Scottish Widows · Audited campaign results</span>
              <span className="text-[11px] font-bold text-[#3a6682]">99% reduction in cost per acquisition</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
