"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
      className="fixed inset-0 z-[100] bg-[#0a3b4b] overflow-hidden"
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
          src="/images/logo.png"
          alt=""
          className="h-28 w-auto"
          style={{ filter: "invert(1) brightness(6) contrast(1.2)", mixBlendMode: "screen" }}
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

      <motion.p
        className="absolute left-1/2 -translate-x-1/2 text-white font-bold tracking-[0.25em] text-xl pointer-events-none select-none"
        style={{ top: "calc(50% + 68px)", fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        BROADLAB
      </motion.p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Gradient orbs
// ---------------------------------------------------------------------------

const ORBS = [
  {
    size: 640,
    color: "#10657f",
    blur: 130,
    opacity: 0.18,
    x: "-18%",
    y: "-20%",
    drift: { x: 22, y: 18 },
    duration: 11,
  },
  {
    size: 480,
    color: "#3aaece",
    blur: 110,
    opacity: 0.14,
    x: "62%",
    y: "38%",
    drift: { x: -20, y: -24 },
    duration: 14,
  },
  {
    size: 520,
    color: "#1e4f80",
    blur: 140,
    opacity: 0.12,
    x: "30%",
    y: "55%",
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
            backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }}
        />

        {/* Gradient orbs */}
        <GradientOrbs visible={introComplete} />

        {/* Edge fade — keeps orbs from bleeding to hard edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_50%,white_100%)]" />

        {/* Content */}
        <motion.div
          className="container-main relative z-10 w-full"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-center max-w-[700px] mx-auto">

            <motion.h1
              className="font-bold text-[#0a3b4b] leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              CTV is one of the fastest-growing channels for brand and commercial growth.
            </motion.h1>

            <motion.p
              className="mt-6 text-base md:text-lg text-[#4b5563] leading-relaxed max-w-[520px]"
              initial={{ opacity: 0, y: 10 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.55 }}
            >
              BroadLab helps marketers and their agencies turn CTV investment into measurable, compounding business growth.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.48, duration: 0.5 }}
            >
              <Link href="/contact" className="btn-primary">Book a consultation</Link>
              <Link href="/system" className="btn-secondary">Explore the System</Link>
            </motion.div>

            <motion.p
              className="mt-6 text-xs font-medium tracking-wide text-center"
              style={{ color: "#9ca3af" }}
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              Trusted by Lenovo, Lloyds Banking Group, Royal Caribbean, Heineken, DAZN and more.
            </motion.p>

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
