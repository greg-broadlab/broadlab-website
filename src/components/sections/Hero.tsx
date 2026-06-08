"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Brand intro
// ---------------------------------------------------------------------------

const STREAMS = [
  { ox: 4,  oy: 5,  rot:  45  },
  { ox: 96, oy: 5,  rot: 135  },
  { ox: 2,  oy: 44, rot:   2  },
  { ox: 98, oy: 56, rot: 182  },
  { ox: 4,  oy: 95, rot:  -45 },
  { ox: 96, oy: 95, rot: -135 },
] as const;
const PPS = 8;

function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [gone,  setGone]  = useState(false);
  const cbRef = useRef(onComplete);
  useEffect(() => { cbRef.current = onComplete; });

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 750),
      setTimeout(() => cbRef.current(), 1100),
      setTimeout(() => setGone(true), 1450),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#f0f8fb] overflow-hidden"
      animate={{ y: phase >= 3 ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/broadlab-logo-transparent.png"
          alt=""
          className="h-28 w-auto"
        />
      </motion.div>

      {phase >= 1 && STREAMS.map((stream, si) =>
        Array.from({ length: PPS }, (_, pi) => (
          <motion.div
            key={`p-${si}-${pi}`}
            className="absolute bg-[#3aaece] rounded-sm pointer-events-none"
            style={{ width: 14, height: 2, rotate: stream.rot }}
            initial={{ left: `${stream.ox}%`, top: `${stream.oy}%`, opacity: 0 }}
            animate={{ left: "50%", top: "50%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 0.65,
              delay: (pi / PPS) * 0.45,
              ease: "easeIn",
              opacity: { times: [0, 0.15, 0.7, 1], duration: 0.65, delay: (pi / PPS) * 0.45 },
            }}
          />
        ))
      )}

    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Gradient orbs
// ---------------------------------------------------------------------------

const ORBS = [
  {
    size: 700,
    color: "#3aaece",
    blur: 160,
    opacity: 0.13,
    x: "-10%",
    y: "-25%",
    drift: { x: 22, y: 18 },
    duration: 11,
  },
  {
    size: 500,
    color: "#10657f",
    blur: 130,
    opacity: 0.10,
    x: "60%",
    y: "30%",
    drift: { x: -20, y: -24 },
    duration: 14,
  },
  {
    size: 560,
    color: "#3aaece",
    blur: 150,
    opacity: 0.08,
    x: "25%",
    y: "50%",
    drift: { x: 16, y: -14 },
    duration: 9,
  },
];

function GradientOrbs({ visible }: { visible: boolean }) {
  return (
    <>
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: 0,
          }}
          animate={visible ? {
            opacity: orb.opacity,
            x: [0, orb.drift.x, 0],
            y: [0, orb.drift.y, 0],
          } : {}}
          transition={{
            opacity: { duration: 1.4, delay: i * 0.2 },
            x: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
            y: { duration: orb.duration * 1.15, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Floating logo dots
// ---------------------------------------------------------------------------

const LOGO_PATHS = [
  "M212.65 287.46 c-2.22 -1.14 -3.36 -4.87 -2.75 -9.07 0.64 -4.43 2.42 -7.56 5.01 -8.70 1.68 -0.74 2.52 -0.60 3.86 0.67 1.24 1.18 1.75 2.79 1.68 5.78 -0.07 6.72 -4.43 13.07 -7.79 11.32z",
  "M197.87 280.61 c-0.87 -0.34 -2.05 -1.58 -2.79 -2.96 -0.64 -1.14 -0.74 -1.88 -0.74 -5.07 0 -3.46 0.07 -3.83 1.01 -5.68 1.21 -2.35 2.72 -3.53 4.57 -3.53 4.33 0 5.85 8.84 2.49 14.65 -1.14 1.95 -3.16 3.12 -4.54 2.59z",
  "M181.57 271.71 c-5.58 -4.87 -2.96 -16.93 3.02 -14.04 2.59 1.24 4.13 4.94 3.76 8.94 -0.50 5.21 -3.83 7.73 -6.79 5.11z",
  "M166.73 264.72 c-4.43 -2.69 -5.51 -11.32 -1.61 -12.97 2.28 -0.94 4.84 0.54 6.38 3.73 1.11 2.22 1.28 6.08 0.37 7.83 -1.08 2.08 -3.12 2.65 -5.14 1.41z",
  "M152.01 257.46 c-1.61 -0.81 -3.49 -2.86 -4.43 -4.77 -0.71 -1.41 -0.84 -2.08 -0.71 -3.59 0.10 -1.11 0.40 -2.08 0.77 -2.52 1.51 -1.65 4.67 -0.94 6.85 1.58 4.23 4.77 2.32 11.82 -2.49 9.31z",
  "M220.71 252.05 c-2.49 -0.97 -3.86 -5.24 -3.02 -9.34 1.34 -6.52 6.48 -10.75 9.71 -8.06 1.44 1.24 1.81 2.75 1.61 6.35 -0.17 3.36 -0.91 5.68 -2.59 8.10 -1.48 2.18 -4.20 3.56 -5.71 2.96z",
  "M136.46 249.74 c-4.10 -2.05 -6.79 -7.19 -4.77 -9.20 1.95 -1.95 7.36 0.81 8.94 4.57 0.71 1.65 0.60 3.70 -0.20 4.50 -0.81 0.81 -2.42 0.87 -3.96 0.13z",
  "M201.60 247.42 c-3.12 -2.65 -2.86 -9.84 0.57 -13.50 1.38 -1.51 3.49 -2.35 4.97 -1.98 3.49 0.87 4.60 7.22 2.12 12.23 -1.88 3.83 -5.24 5.27 -7.66 3.26z",
  "M184.09 243.82 c-1.58 -1.08 -2.49 -3.02 -2.62 -5.71 -0.17 -2.92 0.57 -5.14 2.22 -6.72 1.58 -1.51 2.42 -1.95 3.80 -1.95 5.58 0 6.62 10.82 1.34 14.34 -1.48 1.01 -3.29 1.01 -4.74 0.03z",
  "M121.31 242.51 c-1.41 -0.57 -4.13 -2.72 -5.11 -4.10 -1.11 -1.55 -1.24 -2.92 -0.37 -3.70 1.65 -1.51 6.65 0.54 8.87 3.59 1.01 1.41 1.28 3.43 0.54 4.17 -0.47 0.47 -2.79 0.50 -3.93 0.03z",
  "M166.42 240.06 c-1.51 -0.94 -3.02 -3.36 -3.36 -5.44 -0.27 -1.85 0.37 -4 1.68 -5.44 1.04 -1.11 1.31 -1.21 3.29 -1.34 1.95 -0.13 2.25 -0.07 3.22 0.77 1.78 1.48 2.55 3.33 2.55 6.05 0 3.73 -1.55 5.88 -4.40 6.11 -1.28 0.10 -1.88 -0.03 -2.99 -0.71z",
  "M149.32 236.53 c-4.64 -2.15 -6.11 -8.43 -2.45 -10.31 1.51 -0.77 4.23 -0.50 5.91 0.64 1.55 1.01 3.09 3.80 3.09 5.51 0 1.71 -0.84 3.36 -2.08 4.13 -1.38 0.84 -2.72 0.84 -4.47 0.03z",
  "M131.18 232.64 c-2.12 -1.01 -2.55 -1.38 -3.66 -2.99 -0.84 -1.28 -1.14 -3.12 -0.67 -4.40 0.60 -1.51 4.54 -2.02 6.79 -0.87 2.35 1.21 3.73 2.96 4.23 5.31 0.27 1.21 -0.44 2.89 -1.44 3.46 -1.14 0.60 -3.46 0.37 -5.24 -0.50z",
  "M113.04 228.81 c-2.32 -1.11 -4.37 -3.12 -4.67 -4.57 -0.17 -0.84 -0.07 -1.21 0.64 -1.85 2.28 -2.15 8.63 -0.07 10.45 3.43 1.81 3.49 -1.81 5.21 -6.42 2.99z",
  "M105.32 215.87 c-1.71 -0.77 -3.29 -2.32 -3.70 -3.53 -0.30 -0.97 0.67 -2.62 1.95 -3.29 1.31 -0.67 4.60 -0.74 6.38 -0.13 2.86 0.97 4.77 3.73 3.93 5.74 -0.87 2.08 -5.34 2.72 -8.57 1.21z",
  "M126.14 216.04 c-1.71 -0.77 -3.43 -2.72 -3.70 -4.20 -0.74 -3.86 4.40 -6.25 8.84 -4.03 2.08 1.04 3.12 2.39 3.33 4.27 0.17 1.71 -0.37 2.82 -1.88 3.83 -1.44 0.97 -4.60 1.04 -6.58 0.13z",
  "M146.23 215.84 c-1.48 -0.74 -1.91 -1.18 -2.65 -2.72 -1.04 -2.12 -0.94 -3.90 0.27 -5.61 1.44 -2.02 5.27 -2.86 7.63 -1.65 3.86 1.95 4.57 7.53 1.28 9.88 -1.61 1.18 -4.33 1.21 -6.52 0.10z",
  "M166.99 216.07 c-0.64 -0.30 -1.61 -1.14 -2.18 -1.85 -0.84 -1.04 -1.04 -1.65 -1.14 -3.39 -0.20 -3.19 1.21 -5.54 4.03 -6.75 2.59 -1.08 5.07 -0.37 6.79 1.95 0.84 1.14 1.14 4.64 0.54 6.45 -1.14 3.46 -4.97 5.17 -8.03 3.59z",
  "M187.59 216.21 c-2.35 -1.04 -3.76 -4.43 -3.12 -7.69 0.50 -2.82 2.05 -4.94 4.37 -6.15 1.95 -0.97 3.46 -1.04 4.90 -0.13 1.71 1.04 2.28 2.42 2.28 5.71 0 2.42 -0.13 3.09 -0.91 4.54 -1.04 2.02 -2.02 2.99 -3.70 3.70 -1.51 0.60 -2.45 0.64 -3.83 0.03z",
  "M207.37 216.01 c-2.69 -1.61 -3.43 -6.32 -1.61 -10.31 1.75 -3.93 5.38 -6.35 8.06 -5.48 5.01 1.65 3.29 13.27 -2.35 15.82 -1.75 0.81 -2.75 0.81 -4.10 -0.03z",
  "M227.09 215.40 c-3.06 -3.06 -2.25 -10.04 1.71 -14.34 2.65 -2.86 5.38 -3.63 7.32 -2.02 3.29 2.79 1.88 11.39 -2.55 15.69 -2.45 2.35 -4.57 2.59 -6.48 0.67z",
  "M98.97 203.54 c-1.61 -0.37 -3.46 -1.48 -3.90 -2.32 -0.97 -1.81 0.57 -4.27 3.26 -5.17 6.21 -2.12 12.06 2.02 8.26 5.85 -1.78 1.75 -4.57 2.35 -7.63 1.65z",
  "M120.77 199.65 c-1.61 -0.84 -2.49 -1.81 -2.89 -3.12 -1.31 -4.40 6.48 -8.16 10.85 -5.27 1.48 1.01 2.42 2.96 2.15 4.43 -0.30 1.51 -1.68 3.12 -3.39 3.90 -1.71 0.77 -5.31 0.84 -6.72 0.07z",
  "M144.62 195.68 c-4.67 -1.65 -4.80 -7.53 -0.20 -10.01 3.22 -1.78 6.52 -1.55 8.36 0.57 2.75 3.16 0.87 8.06 -3.63 9.41 -2.18 0.64 -2.79 0.64 -4.54 0.03z",
  "M167.10 192.02 c-2.25 -0.97 -3.53 -3.83 -2.86 -6.42 1.61 -6.38 9.61 -8.90 12.23 -3.86 0.74 1.44 0.64 4.30 -0.24 6.08 -1.75 3.63 -5.95 5.58 -9.14 4.20z",
  "M89.83 190.85 c-1.58 -0.71 -2.35 -2.15 -1.98 -3.63 0.60 -2.42 5.38 -5.14 8.97 -5.14 3.93 0 6.11 2.39 4.77 5.21 -1.51 3.22 -8.10 5.24 -11.76 3.56z",
  "M189.80 188.16 c-1.68 -0.87 -2.69 -2.79 -2.65 -5.07 0 -4.50 3.06 -8.53 7.09 -9.37 1.44 -0.34 1.88 -0.30 2.89 0.20 1.81 0.91 2.52 2.12 2.69 4.60 0.27 4.03 -1.75 7.76 -5.04 9.41 -2.05 1.04 -3.39 1.11 -4.97 0.24z",
  "M213.12 184.43 c-1.08 -0.44 -2.42 -2.25 -2.69 -3.56 -0.84 -4.54 1.48 -9.68 5.38 -11.89 5.98 -3.43 9.54 2.65 5.98 10.21 -2.02 4.23 -5.68 6.45 -8.67 5.24z",
  "M116.03 183.12 c-1.75 -0.81 -2.49 -1.85 -2.49 -3.49 0 -3.29 3.49 -6.11 8.10 -6.52 2.32 -0.24 3.66 0.24 4.84 1.65 1.65 1.95 0.74 5.48 -1.81 7.19 -2.75 1.81 -6.21 2.28 -8.63 1.18z",
  "M235.66 180.77 c-2.49 -1.04 -3.53 -5.24 -2.25 -9.34 1.85 -5.91 7.29 -10.11 10.95 -8.43 2.82 1.24 3.12 6.21 0.74 11.22 -2.39 5.01 -6.38 7.79 -9.44 6.55z",
  "M83.61 178.75 c-1.58 -0.50 -2.22 -1.01 -2.62 -2.02 -1.04 -2.49 2.59 -6.05 7.66 -7.56 2.28 -0.67 3.73 -0.67 5.31 -0.03 1.55 0.64 2.08 1.38 2.12 2.86 0 2.25 -2.39 4.70 -6.01 6.08 -2.02 0.74 -5.17 1.08 -6.45 0.67z",
  "M141.93 175.53 c-4.17 -1.51 -3.76 -6.89 0.71 -9.84 1.65 -1.11 4.33 -2.08 5.74 -2.08 2.52 0 4.47 1.91 4.47 4.40 0 2.12 -0.44 3.22 -1.95 4.77 -2.49 2.59 -6.28 3.76 -8.97 2.75z",
  "M167.30 168.10 c-1.61 -0.67 -3.02 -2.82 -3.02 -4.60 0 -1.68 1.85 -5.07 3.46 -6.42 2.28 -1.85 3.56 -2.35 5.85 -2.35 1.91 -0.03 2.18 0.07 3.12 1.01 2.96 2.96 1.31 8.77 -3.22 11.42 -1.51 0.87 -5.01 1.41 -6.18 0.94z",
  "M110.62 166.63 c-0.57 -0.34 -1.24 -0.94 -1.41 -1.31 -1.95 -3.63 4.10 -9.44 9.94 -9.51 4.17 -0.07 5.85 2.42 4.10 6.05 -1.98 4.03 -9.31 6.82 -12.63 4.77z",
  "M76.26 166.05 c-1.48 -0.77 -2.18 -2.02 -1.88 -3.26 0.34 -1.38 3.29 -4.33 5.51 -5.51 4.37 -2.32 7.69 -2.55 9.54 -0.74 1.24 1.24 1.21 2.49 -0.07 4.43 -2.59 3.90 -9.91 6.72 -13.10 5.07z",
  "M193.23 160.58 c-3.36 -0.77 -4.40 -5.07 -2.18 -9.10 1.34 -2.49 4.40 -5.17 6.69 -5.88 1.65 -0.54 1.98 -0.57 3.26 -0.13 0.91 0.34 1.68 0.91 2.18 1.68 0.71 1.01 0.77 1.48 0.67 3.53 -0.13 2.86 -1.08 4.90 -3.16 7.09 -2.18 2.25 -5.11 3.33 -7.46 2.82z",
  "M139.92 155.98 c-2.05 -0.57 -3.46 -2.75 -2.99 -4.67 1.18 -5.07 8.63 -9.61 12.90 -7.86 2.02 0.84 2.62 3.90 1.31 6.62 -1.78 3.66 -7.83 6.85 -11.22 5.91z",
  "M218.16 152.85 c-1.08 -0.44 -2.42 -2.25 -2.69 -3.56 -0.81 -4.40 2.49 -10.31 6.99 -12.40 2.32 -1.08 3.96 -1.08 5.24 0 1.44 1.21 1.85 2.49 1.68 5.21 -0.47 6.55 -6.75 12.56 -11.22 10.75z",
  "M105.48 150.23 c-1.85 -1.85 -1.11 -4.40 2.18 -7.39 2.52 -2.32 5.58 -3.80 8.30 -4 1.95 -0.17 2.22 -0.10 3.19 0.71 2.25 1.88 1.65 4.70 -1.61 7.73 -2.79 2.59 -5.21 3.70 -8.43 3.86 -2.52 0.10 -2.62 0.07 -3.63 -0.91z",
  "M242.95 144.92 c-3.46 -2.42 -2.45 -9.71 2.02 -14.48 5.24 -5.58 10.85 -4.10 10.25 2.72 -0.34 4.17 -3.09 9 -6.42 11.22 -1.31 0.87 -1.95 1.08 -3.36 1.08 -1.04 0 -2.05 -0.20 -2.49 -0.54z",
  "M167.43 143.98 c-2.45 -1.11 -3.16 -3.86 -1.81 -6.85 1.44 -3.22 6.11 -6.65 9.57 -7.05 4.10 -0.44 6.08 3.43 4 7.83 -1.98 4.23 -8.47 7.59 -11.76 6.08z",
  "M137.90 135.82 c-1.18 -0.34 -2.12 -1.11 -2.52 -2.15 -1.28 -3.02 2.08 -7.69 7.39 -10.38 2.69 -1.34 4.33 -1.55 6.15 -0.74 3.43 1.51 2.72 5.78 -1.61 9.74 -2.89 2.65 -7.02 4.20 -9.41 3.53z",
  "M194.98 132.39 c-1.48 -0.91 -2.28 -2.75 -2.05 -4.80 0.71 -5.91 8.57 -12.19 12.66 -10.11 2.45 1.28 3.06 5.07 1.34 8.67 -1.01 2.08 -4.03 5.17 -6.08 6.15 -1.91 0.94 -4.43 0.97 -5.88 0.10z",
  "M223.57 121.41 c-0.74 -0.24 -1.38 -0.47 -1.41 -0.47 -0.07 0 -0.40 -0.64 -0.81 -1.41 -2.18 -4.30 1.78 -11.93 7.63 -14.61 5.71 -2.59 8.67 2.55 5.41 9.44 -2.45 5.14 -7.29 8.30 -10.82 7.05z",
  "M167.03 120.40 c-2.99 -2.08 -1.91 -6.72 2.55 -10.95 3.73 -3.49 7.53 -4.80 10.11 -3.49 1.98 1.04 2.28 4 0.71 7.16 -1.24 2.49 -4.67 5.85 -7.12 6.99 -2.12 0.97 -5.07 1.14 -6.25 0.30z",
  "M251.31 109.95 c-2.05 -1.08 -2.55 -2.12 -2.55 -5.27 0 -2.52 0.10 -2.99 1.28 -5.38 2.42 -4.84 7.16 -8.60 10.38 -8.16 1.65 0.24 2.45 0.91 3.16 2.79 2.52 6.58 -6.89 18.81 -12.26 16.02z",
  "M198.88 105.55 c-3.29 -0.54 -4.23 -4.40 -2.15 -8.53 1.18 -2.32 5.17 -6.32 7.53 -7.49 2.55 -1.31 5.01 -1.38 6.21 -0.13 2.62 2.59 0.97 8.70 -3.46 12.73 -2.62 2.45 -5.88 3.83 -8.13 3.43z",
  "M228.03 89.83 c-1.98 -1.08 -2.55 -4.57 -1.28 -7.93 1.31 -3.49 5.07 -7.56 8.63 -9.37 0.74 -0.37 1.95 -0.64 2.99 -0.64 1.41 0 1.88 0.17 2.62 0.91 1.11 1.11 1.31 1.91 1.14 4.60 -0.44 7.12 -9.41 15.02 -14.11 12.43z",
  "M258.77 74.58 c-1.68 -1.01 -2.22 -2.39 -2.05 -5.21 0.17 -3.43 1.88 -6.82 5.11 -10.08 4.60 -4.64 8.77 -5.48 10.41 -2.05 2.15 4.54 -2.86 14.51 -8.63 17.20 -2.12 0.97 -3.43 1.01 -4.84 0.13z",
];

const DOT_CENTERS = LOGO_PATHS.map((d) => {
  const m = d.match(/^M([\d.]+)\s+([\d.]+)/);
  return m ? { cx: parseFloat(m[1]), cy: parseFloat(m[2]) } : { cx: 172, cy: 172 };
});

const REPULSION_RADIUS = 70;
const MAX_FORCE = 22;

function LogoDot({
  d,
  index,
  visible,
  mouseX,
  mouseY,
}: {
  d: string;
  index: number;
  visible: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const baseOpacity = 0.65 - (index / 48) * 0.35;
  const { cx, cy } = DOT_CENTERS[index];

  const repX = useMotionValue(0);
  const repY = useMotionValue(0);
  const springX = useSpring(repX, { stiffness: 280, damping: 18 });
  const springY = useSpring(repY, { stiffness: 280, damping: 18 });

  useEffect(() => {
    function recalc() {
      const mx = mouseX.get();
      const my = mouseY.get();
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSION_RADIUS && dist > 0) {
        repX.set((dx / dist) * (1 - dist / REPULSION_RADIUS) * MAX_FORCE);
        repY.set((dy / dist) * (1 - dist / REPULSION_RADIUS) * MAX_FORCE);
      } else {
        repX.set(0);
        repY.set(0);
      }
    }
    const unsubX = mouseX.on("change", recalc);
    const unsubY = mouseY.on("change", recalc);
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, cx, cy, repX, repY]);

  return (
    <motion.path
      d={d}
      fill="#3aaece"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: baseOpacity } : { opacity: 0 }}
      transition={{ opacity: { duration: 0.5, delay: index * 0.04 } }}
    />
  );
}

function FloatingLogoDots({ visible }: { visible: boolean }) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  return (
    <div
      style={{ width: 480, height: 480 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 344);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 344);
      }}
      onMouseLeave={() => {
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
    >
      <svg viewBox="0 0 344 344" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {LOGO_PATHS.map((d, i) => (
          <LogoDot key={i} d={d} index={i} visible={visible} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro,     setShowIntro]     = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  useEffect(() => {
    if ((window as any).__blIntroRun) {
      setIntroComplete(true);
    } else {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleIntroComplete() {
    (window as any).__blIntroRun = true;
    setIntroComplete(true);
    setShowIntro(false);
  }

  return (
    <>
      {showIntro && <BrandIntro onComplete={handleIntroComplete} />}

      <section className="relative min-h-screen bg-white pt-16 md:pt-20 overflow-hidden flex items-center">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #cce6f0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }}
        />

        {/* Gradient orbs */}
        <GradientOrbs visible={introComplete} />

        {/* Edge fade - keeps orbs from bleeding to hard edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_50%,white_100%)]" />

        {/* Content */}
        <motion.div
          className="container-main relative z-10 w-full"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Left: headline + copy + CTAs */}
            <div className="flex flex-col items-start text-left md:w-[55%]">

              <motion.h1
                className="font-bold text-[#0d2535] leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                The CTV system that builds brands and drives{" "}
                <span style={{ color: "#3aaece" }}>outcomes.</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-base md:text-lg text-[#4b5563] leading-relaxed max-w-[480px]"
                initial={{ opacity: 0, y: 10 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.32, duration: 0.55 }}
              >
                BroadLab helps marketers and their agencies turn CTV investment into measurable, compounding business growth.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.48, duration: 0.5 }}
              >
                <Link href="/contact#contact" className="btn-primary">Book a consultation</Link>
                <Link href="/system" className="btn-secondary">Explore the System</Link>
              </motion.div>

              <motion.p
                className="mt-6 text-xs font-medium tracking-wide"
                style={{ color: "#9ca3af" }}
                initial={{ opacity: 0 }}
                animate={introComplete ? { opacity: 1 } : {}}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                Trusted by Lenovo, Lloyds Banking Group, Royal Caribbean, Heineken, DAZN and more.
              </motion.p>

            </div>

            {/* Right: logo mark */}
            <div className="hidden md:flex md:w-[45%] items-center justify-center">
              <FloatingLogoDots visible={introComplete} />
            </div>

          </div>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={introComplete && !scrolled ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 9L12 15L18 9" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

      </section>
    </>
  );
}
