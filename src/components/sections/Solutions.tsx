"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

const HERO_SOLUTIONS = [
  { name: "Inventory Access",   stat: "19M homes across all major platforms" },
  { name: "Audience Targeting", stat: "1.7M UK postcodes, privacy-safe" },
  { name: "Measurement",        stat: "Brand to purchase, tracked daily" },
  { name: "Optimisation",       stat: "In-flight, AI-driven, every day" },
];

// ─── Solutions detail data ────────────────────────────────────────────────────

const SOLUTIONS_DETAIL = [
  {
    n: "01",
    name: "Inventory Access",
    statement: "Your ads on every major streaming platform, booked in one place.",
    facts: ["Direct deals only", "No open exchange", "19M homes"],
    image: "/images/streaming.jpg",
  },
  {
    n: "02",
    name: "Audience Targeting",
    statement: "One precise audience, consistent wherever your ads run.",
    facts: ["1.7M UK postcodes", "Privacy-safe", "No publisher fragmentation"],
    image: "/images/audience-targeting.png",
  },
  {
    n: "03",
    name: "Measurement",
    statement: "Proof CTV is working, from first view to final purchase.",
    facts: ["Brand uplift", "Search uplift", "Conversion", "Footfall"],
    image: "/images/optimise.jpg",
  },
  {
    n: "04",
    name: "Optimisation",
    statement: "Campaigns that get better every single day.",
    facts: ["Geo", "Creative", "Publisher", "Audience", "Frequency"],
    image: "/images/audience-build.jpg",
  },
];



// ─── Hero (full-screen, merged with proposition) ───────────────────────────────

function SolutionsHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a3b4b" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Edge fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 25%, rgba(10,59,75,0.85) 100%)",
        }}
      />

      {/* Main content — vertically centred in available space */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-main pt-28 pb-10">

        {/* Headline */}
        <div className="text-center mb-14">
          <motion.h1
            className="font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            Our solutions for CTV that work.
          </motion.h1>
          <motion.p
            className="mt-5 mx-auto leading-relaxed"
            style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.5)", maxWidth: "30rem" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            Built for brands who need CTV to do more than just reach people.
          </motion.p>
        </div>

        {/* Four solution cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HERO_SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.name}
              className="flex flex-col gap-3 rounded-xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: "2px solid rgba(58,174,206,0.45)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p
                className="font-bold text-white leading-snug"
                style={{ fontSize: "0.9375rem" }}
              >
                {s.name}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(58,174,206,0.75)" }}
              >
                {s.stat}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Logos — anchored at bottom */}
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
              style={{ filter: "brightness(0) invert(1)", opacity: 0.4 }}
            />
          ))}
        </motion.div>
        <motion.p
          className="mt-6 text-center text-xs font-medium tracking-wide"
          style={{ color: "rgba(234,246,251,0.25)" }}
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


// ─── Solutions detail ─────────────────────────────────────────────────────────

const ADVANCE_SECS = 5;

function SolutionsDetail() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (i: number) => setActive(i);

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
            className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-10 items-stretch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >

            {/* Left — solution tabs */}
            <div className="flex flex-col">
              {SOLUTIONS_DETAIL.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => goTo(i)}
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
                      color: active === i ? "#0a3b4b" : "#9ca3af",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {s.name}
                  </p>


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

            {/* Right — image panel */}
            <div
              className="group relative rounded-2xl overflow-hidden"
              style={{ minHeight: 460 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SOLUTIONS_DETAIL[active].image}
                    alt={SOLUTIONS_DETAIL[active].name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 ease-in-out"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(7,28,42,0.88) 0%, rgba(7,28,42,0.45) 45%, rgba(7,28,42,0.12) 100%)",
                    }}
                  />

                  {/* Overlay content */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                  >
                    <p
                      className="text-xs font-bold tracking-[0.18em] mb-2"
                      style={{ color: "#3aaece" }}
                    >
                      {SOLUTIONS_DETAIL[active].n}
                    </p>
                    <h3
                      className="font-bold text-white leading-tight mb-3"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                    >
                      {SOLUTIONS_DETAIL[active].name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-sm"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {SOLUTIONS_DETAIL[active].statement}
                    </p>
                    <p
                      className="mt-4 text-xs font-semibold tracking-wide"
                      style={{ color: "rgba(58,174,206,0.75)" }}
                    >
                      {SOLUTIONS_DETAIL[active].facts.join("  ·  ")}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
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
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0a3b4b" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Edge fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(10,59,75,0.9) 100%)",
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
              className="font-bold leading-tight text-white"
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
              style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.55)", maxWidth: "30rem" }}
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
                href="/contact"
                className="inline-flex items-center rounded-full px-9 py-4 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#3aaece", color: "#071c2a" }}
              >
                Get a CTV briefing
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="mt-8 text-xs font-medium tracking-wide"
              style={{ color: "rgba(234,246,251,0.25)" }}
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
      <FinalCTA />
    </>
  );
}
