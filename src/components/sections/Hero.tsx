"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AudienceGraphDashboard from "@/components/ui/AudienceGraphDashboard";

// ---------------------------------------------------------------------------
// Brand intro — logo fades in → particle streams converge → wordmark → slide up
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
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1350),
      setTimeout(() => setPhase(3), 1850),
      setTimeout(() => cbRef.current(), 2650),
      setTimeout(() => setGone(true), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0a3b4b] overflow-hidden"
      animate={{ y: phase >= 3 ? "-100%" : "0%" }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
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
// Hero
// ---------------------------------------------------------------------------

export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if ((window as any).__blIntroRun) {
      setIntroComplete(true);
    } else {
      setShowIntro(true);
    }
  }, []);

  function handleIntroComplete() {
    (window as any).__blIntroRun = true;
    setIntroComplete(true);
    setShowIntro(false);
  }

  return (
    <>
      {showIntro && <BrandIntro onComplete={handleIntroComplete} />}

      <section className="relative min-h-screen bg-white pt-16 md:pt-20 overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,transparent_40%,white_100%)]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container-main relative z-10 pt-16 pb-10">
            <div className="flex flex-col items-center text-center max-w-[640px] mx-auto">

              <motion.p
                className="font-bold text-[#0a3b4b] leading-[1.1] tracking-tight max-w-[640px]"
                style={{ fontSize: "clamp(2.75rem,5.5vw,4.75rem)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                The intelligence layer for outcome-driven CTV.
              </motion.p>

              <motion.p
                className="mt-5 text-[0.9375rem] text-[#4b5563] leading-relaxed mb-8 max-w-[400px]"
                initial={{ opacity: 0, y: 10 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Define the outcome. Design the system. Optimise continuously.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={introComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <Link href="/contact" className="btn-primary">Book a consultation</Link>
                <Link href="/system" className="btn-secondary">Explore the System</Link>
              </motion.div>

            </div>
          </div>

          {/* Dashboard */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={introComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {introComplete && <AudienceGraphDashboard />}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <p className="sr-only">
        The BroadLab Audience Graph maps 1.8 million UK postcodes across 5,000+ demographic, behavioural, and viewership attributes, enabling precise outcome-driven CTV targeting.
      </p>
    </>
  );
}
