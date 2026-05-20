"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Geometry ──────────────────────────────────────────────────────────────────
const CX = 200, CY = 210;
const R  = 130;
const NR = 42;
function outer(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

const N_CAMP = outer(-90);  // top    (200,  80)
const N_OPT  = outer(0);    // right  (330, 210)
const N_MEAS = outer(90);   // bottom (200, 340)
const N_LRNN = outer(180);  // left   ( 70, 210)

// Closed clockwise loop — all four arrows
const ARROWS = [
  { path: "M 230,110 Q 304,106 300,182", headX: 285, headY: 126, headRot:  45, dashDelay: 0.0 },
  { path: "M 300,240 Q 304,314 230,310", headX: 285, headY: 295, headRot: 135, dashDelay: 0.3 },
  { path: "M 170,310 Q  96,314 100,240", headX: 115, headY: 295, headRot: 225, dashDelay: 0.6 },
  { path: "M 100,180 Q  96,106 170,110", headX: 115, headY: 126, headRot: 315, dashDelay: 0.9 },
] as const;

// Sub-labels positioned naturally around each node
const NODES = [
  { pos: N_CAMP, n: "01", label: "Campaign", sub: "Campaign runs",     subX: CX,  subY: 22,  anchor: "middle" as const, pulseDelay: 1.0 },
  { pos: N_OPT,  n: "02", label: "Optimise", sub: "Daily AI / ML",     subX: 382, subY: 210, anchor: "start"  as const, pulseDelay: 2.6 },
  { pos: N_MEAS, n: "03", label: "Measure",  sub: "Outcomes captured", subX: CX,  subY: 402, anchor: "middle" as const, pulseDelay: 4.2 },
  { pos: N_LRNN, n: "04", label: "Learn",    sub: "Signals stored",    subX: 18,  subY: 210, anchor: "end"    as const, pulseDelay: 5.8 },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export default function LearningSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#f0f8fb]">
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.3)" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12 max-w-xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              04 / Learning
            </motion.p>
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.12, duration: 0.6 }}
            >
              Every campaign makes the next one smarter.
            </motion.h2>
            <motion.p
              className="mt-4 text-[1rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              Each cycle feeds intelligence back into the Audience Graph — so every brief starts sharper than the last.
            </motion.p>
          </div>

          {/* Diagram */}
          <motion.div
            className="mx-auto"
            style={{ maxWidth: 480 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <svg
              viewBox="-50 10 500 410"
              className="w-full"
              style={{ overflow: "visible" }}
              aria-hidden="true"
            >
              {/* ── Arrows ── */}
              {ARROWS.map((a, i) => (
                <g key={i}>
                  {/* Faint track */}
                  <path
                    d={a.path}
                    fill="none"
                    stroke="rgba(58,174,206,0.12)"
                    strokeWidth={1.5}
                  />
                  {/* Flowing dashes */}
                  <motion.path
                    d={a.path}
                    fill="none"
                    stroke="rgba(58,174,206,0.5)"
                    strokeWidth={1.8}
                    strokeDasharray="5 9"
                    initial={{ opacity: 0, strokeDashoffset: 0 }}
                    animate={inView ? { opacity: 1, strokeDashoffset: [0, -14] } : { opacity: 0 }}
                    transition={{
                      opacity: { delay: 0.7, duration: 0.4 },
                      strokeDashoffset: {
                        delay: 0.7 + a.dashDelay,
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                  {/* Arrowhead */}
                  <motion.polygon
                    points="-5,-3.5 6,0 -5,3.5"
                    fill="rgba(58,174,206,0.7)"
                    transform={`translate(${a.headX},${a.headY}) rotate(${a.headRot})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: 1.0 + i * 0.1, duration: 0.3 }}
                  />
                </g>
              ))}

              {/* ── Outer nodes ── */}
              {NODES.map((node, i) => (
                <motion.g
                  key={node.n}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: `${node.pos.x}px ${node.pos.y}px` }}
                >
                  {/* Sequenced pulse ring */}
                  <motion.circle
                    cx={node.pos.x} cy={node.pos.y} r={NR + 2}
                    fill="none"
                    stroke="rgba(58,174,206,0.25)"
                    strokeWidth={1.2}
                    animate={inView ? { r: [NR + 2, NR + 16], opacity: [0.3, 0] } : {}}
                    transition={{ duration: 1.2, delay: node.pulseDelay, repeat: Infinity, repeatDelay: 5.8, ease: "easeOut" }}
                  />
                  {/* Circle */}
                  <circle
                    cx={node.pos.x} cy={node.pos.y} r={NR}
                    fill="#ffffff"
                    stroke="rgba(58,174,206,0.4)"
                    strokeWidth={1.5}
                  />
                  {/* Number */}
                  <text
                    x={node.pos.x} y={node.pos.y - 8}
                    textAnchor="middle" fontSize="7" fontWeight="700"
                    letterSpacing="0.14em" fill="rgba(16,101,127,0.4)"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {node.n}
                  </text>
                  {/* Label */}
                  <text
                    x={node.pos.x} y={node.pos.y + 9}
                    textAnchor="middle" dominantBaseline="central"
                    fontSize="11" fontWeight="700" fill="#0d2535"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {node.label}
                  </text>
                  {/* Sub-label — positioned to each node's outer edge */}
                  <text
                    x={node.subX} y={node.subY}
                    textAnchor={node.anchor} dominantBaseline="central"
                    fontSize="9.5" fontWeight="500" fill="#9ca3af"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {node.sub}
                  </text>
                </motion.g>
              ))}
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
