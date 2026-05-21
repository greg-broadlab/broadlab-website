"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Vertical data ─────────────────────────────────────────────────────────────
// Results from audited campaign data — confirm with BroadLab before launch

const VERTICALS = [
  {
    sector: "Financial Services",
    client: "Scottish Widows",
    problem: "Driving action in a high-trust, high-consideration category",
    desc: "Financial services brands face the hardest measurement problem in CTV — long consideration cycles, multiple touchpoints, and boardrooms that won't accept last-click attribution. BroadLab's geo holdout methodology delivers causal proof that satisfies CFOs and boards.",
    resultNumber: "9×",
    resultLabel: "lift over untreated group",
    methodology: "Geo holdout — causal, not modelled",
    image: "/images/finance.jpg",
  },
  {
    sector: "Retail / DTC",
    client: "Wonderbly",
    problem: "Proving CTV drives sales, not just awareness",
    desc: "For DTC brands, every pound of budget needs to prove itself against revenue — not reach, not views. BroadLab connects CTV exposure directly to purchase, with cost efficiency that compounds campaign after campaign.",
    resultNumber: "87%",
    resultLabel: "reduction in cost per order",
    methodology: "Achieved within the first campaign flight",
    image: "/images/retail.jpg",
  },
  {
    sector: "Automotive",
    client: "Kia EV2",
    problem: "Connecting national CTV to local dealer footfall",
    desc: "Automotive brands need to bridge the gap between national CTV and local dealer action. BroadLab's PLZ holdout methodology proves which postcode regions CTV actually moved — giving regional media planning a causal foundation it has never had.",
    resultNumber: "+100.6%",
    resultLabel: "incremental test drives",
    methodology: "PLZ holdout — not correlation, not last-click",
    image: "/images/automotive.jpg",
  },
  {
    sector: "Streaming & Entertainment",
    client: "Sports Streaming",
    problem: "Building subscription audiences at the lowest possible cost",
    desc: "Streaming platforms need to turn CTV into a subscriber acquisition engine, not just a brand channel. BroadLab deploys the full system — viewership data, lookalike audiences, and in-flight optimisation — against a single north star: cost per subscriber.",
    resultNumber: "8.9%",
    resultLabel: "of total sales attributed to CTV",
    methodology: "Attribution — cross-platform, in-flight",
    image: "/images/streaming.jpg",
  },
] as const;

// ─── Intro ─────────────────────────────────────────────────────────────────────

function ServicesIntro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-20"
      style={{ background: "#f0f8fb" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-main relative z-10 text-center">
        <motion.h1
          className="font-bold leading-tight text-[#0d2535]"
          style={{ fontSize: "clamp(2.25rem,4.5vw,3.75rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          transition={{ delay: 0.1, duration: 0.65 }}
        >
          The same system.
          <br />
          Applied to your category.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-lg leading-relaxed"
          style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          Every sector has a different business problem. BroadLab deploys the
          same four-component intelligence system against each one — with
          measurement methodology that holds up to the hardest scrutiny in your category.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Case study switcher ───────────────────────────────────────────────────────

function CaseStudySwitcher() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const v = VERTICALS[active];

  return (
    <div ref={ref} className="section-padding">
      <div className="container-main">

        {/* Tab row */}
        <motion.div
          className="flex border-b border-[#e5e7eb] overflow-x-auto mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {VERTICALS.map((item, i) => (
            <button
              key={item.sector}
              onClick={() => setActive(i)}
              className="relative px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 shrink-0"
              style={{ color: active === i ? "#0d2535" : "#9ca3af" }}
            >
              {item.sector}
              {active === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#3aaece" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Text side */}
            <div className="flex flex-col justify-center">
              <p
                className="text-[0.625rem] font-bold uppercase tracking-[0.18em] mb-6"
                style={{ color: "#3aaece" }}
              >
                {v.client}
              </p>

              <div className="mb-8">
                <p
                  className="font-bold leading-none"
                  style={{ fontSize: "clamp(3.5rem,7vw,5.5rem)", color: "#0d2535" }}
                >
                  {v.resultNumber}
                </p>
                <p className="mt-2 text-base" style={{ color: "#6b7280" }}>
                  {v.resultLabel}
                </p>
              </div>

              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontSize: "clamp(1.25rem,2vw,1.625rem)", color: "#0d2535" }}
              >
                {v.problem}
              </h2>

              <p className="text-[0.9375rem] leading-relaxed mb-10" style={{ color: "#4b5563" }}>
                {v.desc}
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-[#e5e7eb]">
                <div
                  className="w-[3px] h-7 rounded-full shrink-0"
                  style={{ background: "#3aaece" }}
                />
                <p className="text-xs leading-snug" style={{ color: "#9ca3af" }}>
                  {v.methodology}
                </p>
              </div>
            </div>

            {/* Image side */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ minHeight: 440 }}
            >
              <Image
                src={v.image}
                alt={v.sector}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,59,75,0.4) 100%)" }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

// ─── Agency callout ────────────────────────────────────────────────────────────

function AgencyCallout() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#f9fafb" }}>
      <div className="section-padding">
        <div className="container-main">

          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 20px rgba(16,101,127,0.06)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">

              <div
                className="flex flex-col gap-5 p-10 lg:p-12"
                style={{ background: "white", borderRight: "1px solid #e5e7eb" }}
              >
                <p
                  className="text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "#3aaece" }}
                >
                  For Brands
                </p>
                <h3
                  className="font-bold leading-snug"
                  style={{ fontSize: "clamp(1.25rem,1.8vw,1.625rem)", color: "#0d2535" }}
                >
                  You own the intelligence.
                  <br />We build the system.
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                  BroadLab works directly with CMOs and heads of media to design,
                  run and compound an intelligence system around your brand&apos;s
                  specific outcomes. The audience graph, measurement framework and
                  optimisation loop are built for you — and owned by you.
                </p>
                <div className="mt-auto">
                  <Link
                    href="/contact#contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d2535]"
                    style={{ background: "#10657f" }}
                  >
                    Talk to us
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div
                className="flex flex-col gap-5 p-10 lg:p-12"
                style={{ background: "#f9fafb" }}
              >
                <p
                  className="text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "#3aaece" }}
                >
                  For Agencies & Holding Groups
                </p>
                <h3
                  className="font-bold leading-snug"
                  style={{ fontSize: "clamp(1.25rem,1.8vw,1.625rem)", color: "#0d2535" }}
                >
                  The intelligence layer
                  <br />above your existing buys.
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                  BroadLab is not a media buyer competing with your agency. We
                  sit above the buy — providing the ID graph, measurement
                  methodology and compounding intelligence that makes your
                  clients&apos; CTV investment provably more effective.
                </p>
                <div className="mt-auto">
                  <Link
                    href="/contact#contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200"
                    style={{
                      color: "#10657f",
                      border: "1px solid rgba(58,174,206,0.35)",
                      background: "white",
                    }}
                  >
                    Partner with us
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Bottom hook ───────────────────────────────────────────────────────────────

function BottomHook() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="section-padding">
        <div className="container-main text-center">
          <motion.p
            className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] mb-5"
            style={{ color: "#3aaece" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Every engagement starts the same way
          </motion.p>

          <motion.h2
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)", color: "#0d2535" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Define the outcome.
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-sm leading-relaxed"
            style={{ fontSize: "1.0625rem", color: "#4b5563" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Not a reach target. Not a viewability number. The business outcome
            your brand needs to move.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Link
              href="/contact#contact"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d2535]"
              style={{ background: "#10657f" }}
            >
              Book a consultation
            </Link>
            <Link
              href="/system"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:opacity-70"
              style={{ color: "#10657f" }}
            >
              See how the system works
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function Services() {
  return (
    <>
      <ServicesIntro />
      <section style={{ background: "white" }}>
        <CaseStudySwitcher />
      </section>
      <AgencyCallout />
      <BottomHook />
    </>
  );
}
