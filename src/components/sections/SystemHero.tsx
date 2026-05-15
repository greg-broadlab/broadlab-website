"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ── Diagram constants ────────────────────────────────────────────────────────

const CX = 180;
const CY = 180;
const R  = 112; // orbit radius
const NR = 38;  // node circle radius

function pt(deg: number) {
  const r = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) };
}

// Clockwise node order: top → right → bottom → left
const NODES = [
  { id: "01", label: "Audience",  angle: 270 },
  { id: "02", label: "Measure",   angle:   0 },
  { id: "03", label: "Optimise",  angle:  90 },
  { id: "04", label: "Learn",     angle: 180 },
] as const;

// Arrow heads at midpoints between each node pair (clockwise)
// Direction = atan2 of the clockwise tangent at that angle
const ARROWS = [
  { angle: 315, dir:  45 },
  { angle:  45, dir: 135 },
  { angle: 135, dir: 225 },
  { angle: 225, dir: 315 },
];

// ── Loop diagram SVG ─────────────────────────────────────────────────────────

function LoopDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.svg
        viewBox="0 0 360 360"
        className="w-full max-w-[300px] sm:max-w-[340px]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ambient glow behind track */}
        <motion.circle
          cx={CX} cy={CY} r={R + 22}
          fill="rgba(58,174,206,0.045)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 1.0 }}
        />

        {/* Dashed orbit track */}
        <motion.circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(58,174,206,0.2)"
          strokeWidth={1}
          strokeDasharray="4 8"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        />

        {/* Clockwise arrow indicators at midpoints */}
        {ARROWS.map((a, i) => {
          const pos = pt(a.angle);
          return (
            <motion.polygon
              key={i}
              points="-5,-3.5 6,0 -5,3.5"
              fill="rgba(58,174,206,0.5)"
              transform={`translate(${pos.x},${pos.y}) rotate(${a.dir})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.4 }}
            />
          );
        })}

        {/* Centre — "THE SYSTEM" */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.7 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle
            cx={CX} cy={CY} r={28}
            fill="rgba(10,59,75,0.95)"
            stroke="rgba(58,174,206,0.2)"
            strokeWidth={1}
          />
          <text
            x={CX} y={CY - 5}
            textAnchor="middle"
            fontSize="6"
            fontWeight="700"
            letterSpacing="0.2em"
            fill="rgba(58,174,206,0.42)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            THE
          </text>
          <text
            x={CX} y={CY + 6}
            textAnchor="middle"
            fontSize="6"
            fontWeight="700"
            letterSpacing="0.2em"
            fill="rgba(58,174,206,0.42)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            SYSTEM
          </text>
        </motion.g>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const pos = pt(node.angle);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Pulse ring */}
              <motion.circle
                cx={pos.x} cy={pos.y} r={NR + 2}
                fill="none"
                stroke="rgba(58,174,206,0.28)"
                strokeWidth={1}
                animate={inView ? { r: [NR + 2, NR + 16], opacity: [0.28, 0] } : {}}
                transition={{
                  duration: 2.5,
                  delay: 1.6 + i * 0.45,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: "easeOut",
                }}
              />
              {/* Outer glow */}
              <circle cx={pos.x} cy={pos.y} r={NR + 7} fill="rgba(58,174,206,0.05)" />
              {/* Circle */}
              <circle
                cx={pos.x} cy={pos.y} r={NR}
                fill="rgba(10,59,75,0.95)"
                stroke="rgba(58,174,206,0.38)"
                strokeWidth={1.5}
              />
              {/* Number */}
              <text
                x={pos.x} y={pos.y - 9}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="7"
                fontWeight="700"
                letterSpacing="0.14em"
                fill="rgba(58,174,206,0.5)"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {node.id}
              </text>
              {/* Label */}
              <text
                x={pos.x} y={pos.y + 9}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10.5"
                fontWeight="700"
                fill="rgba(255,255,255,0.9)"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function SystemHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: "#0a3b4b" }}
    >
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 40%, transparent 20%, rgba(10,59,75,0.8) 100%)",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <div>
              <motion.h1
                className="font-bold leading-[1.1] text-white"
                style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.14, duration: 0.65 }}
              >
                A system that turns CTV into a growth engine.
              </motion.h1>

              <motion.p
                className="mt-5 max-w-sm leading-relaxed"
                style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.5)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.28, duration: 0.55 }}
              >
                Four connected capabilities. One continuous loop.
                Every campaign makes the next one stronger.
              </motion.p>

              {/* The four capabilities */}
              <motion.div
                className="mt-7 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
              >
                {[
                  ["01", "Audience",  "Smarter targeting through the ID Graph"],
                  ["02", "Measure",   "Outcomes tied to real business goals"],
                  ["03", "Optimise",  "Daily AI-powered refinement across every lever"],
                  ["04", "Learn",     "Compounding intelligence from every campaign"],
                ].map(([num, label, desc]) => (
                  <div key={num} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 tabular-nums text-[0.625rem] font-bold tracking-[0.1em]"
                      style={{ color: "rgba(58,174,206,0.55)" }}
                    >
                      {num}
                    </span>
                    <p className="text-[0.875rem] leading-snug" style={{ color: "rgba(234,246,251,0.6)" }}>
                      <span className="font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
                        {label}
                      </span>
                      {" — "}{desc}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="mt-9 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.52, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-7 py-3 text-[0.875rem] font-semibold text-[#0a3b4b] transition-colors duration-200 hover:bg-[#eaf6fb]"
                >
                  Book a consultation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full px-7 py-3 text-[0.875rem] font-semibold text-white transition-all duration-200"
                  style={{ border: "1.5px solid rgba(255,255,255,0.18)" }}
                >
                  Talk to BroadLab
                </Link>
              </motion.div>
            </div>

            {/* Right — loop diagram */}
            <LoopDiagram inView={inView} />

          </div>
        </div>
      </div>
    </section>
  );
}
