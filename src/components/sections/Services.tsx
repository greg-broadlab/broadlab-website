"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Vertical data ─────────────────────────────────────────────────────────────
// Results from audited campaign data — confirm with BroadLab before launch

const VERTICALS = [
  {
    sector: "Financial Services",
    problem: "Driving action in a high-trust, high-consideration category",
    desc: "Financial services brands face the hardest measurement problem in CTV — long consideration cycles, multiple touchpoints, and boardrooms that won't accept last-click attribution. BroadLab's geo holdout methodology delivers causal proof that satisfies CFOs and boards.",
    result: "9× lift over untreated group",
    client: "Scottish Widows",
    tags: ["Audience ID Graph", "Incrementality Proof", "Compounding Intelligence"],
    gradient: "linear-gradient(135deg, #071c2a 0%, #10657f 100%)",
  },
  {
    sector: "Retail / DTC",
    problem: "Proving CTV drives sales, not just awareness",
    desc: "For DTC brands, every pound of budget needs to prove itself against revenue — not reach, not views. BroadLab connects CTV exposure directly to purchase, with cost efficiency that compounds campaign after campaign.",
    result: "87% reduction in cost per order",
    client: "Wonderbly",
    tags: ["Audience ID Graph", "CTV Supply Curation", "Incrementality Proof"],
    gradient: "linear-gradient(135deg, #0a3b4b 0%, #1a6a85 100%)",
  },
  {
    sector: "Automotive",
    problem: "Connecting national CTV to local dealer footfall",
    desc: "Automotive brands need to bridge the gap between national CTV and local dealer action. BroadLab's PLZ holdout methodology proves which postcode regions CTV actually moved — giving regional media planning a causal foundation it has never had.",
    result: "+100.6% incremental test drives",
    client: "Kia EV2",
    tags: ["Audience ID Graph", "PLZ Holdout", "Compounding Intelligence"],
    gradient: "linear-gradient(135deg, #071c2a 0%, #0a3b4b 100%)",
  },
  {
    sector: "Streaming & Entertainment",
    problem: "Building subscription audiences at the lowest possible cost",
    desc: "Streaming platforms need to turn CTV into a subscriber acquisition engine, not just a brand channel. BroadLab deploys the full system — viewership data, lookalike audiences, and in-flight optimisation — against a single north star: cost per subscriber.",
    result: "8.9% of total sales attributed to CTV",
    client: "Sports Streaming",
    tags: ["Audience ID Graph", "CTV Supply Curation", "Compounding Intelligence"],
    gradient: "linear-gradient(135deg, #0d4a60 0%, #10657f 100%)",
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
      style={{ background: "#0a3b4b" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 20%, rgba(10,59,75,0.85) 100%)",
        }}
      />

      <div className="container-main relative z-10 text-center">
        <motion.h1
          className="font-bold leading-tight text-white"
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

// ─── Vertical section ──────────────────────────────────────────────────────────

function VerticalSection({
  v,
  index,
}: {
  v: (typeof VERTICALS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imageRight = index % 2 === 0;

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 order-2 lg:order-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p
        className="text-[0.625rem] font-bold uppercase tracking-[0.18em] mb-4"
        style={{ color: "#3aaece" }}
      >
        {v.sector}
      </p>

      <h2
        className="font-bold leading-snug mb-5"
        style={{ fontSize: "clamp(1.375rem,2.2vw,1.875rem)", color: "#0a3b4b" }}
      >
        {v.problem}
      </h2>

      <p className="text-[0.9375rem] leading-relaxed text-[#4b5563] mb-8">
        {v.desc}
      </p>

      {/* Result callout */}
      <div
        className="mb-8 pl-5 border-l-2"
        style={{ borderColor: "#3aaece" }}
      >
        <p
          className="font-bold leading-none mb-1.5"
          style={{ fontSize: "clamp(1.375rem,2vw,1.75rem)", color: "#0a3b4b" }}
        >
          {v.result}
        </p>
        <p className="text-xs tracking-wide" style={{ color: "#9ca3af" }}>
          {v.client}
        </p>
      </div>

    </motion.div>
  );

  const imageBlock = (
    <motion.div
      className="relative min-h-[300px] lg:min-h-0 order-1 lg:order-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ delay: 0.05, duration: 0.8 }}
    >
      {/*
        Drop a real photo at /public/images/services/<sector-slug>.jpg
        and replace this div with:
        <Image src="/images/services/<slug>.jpg" alt={v.sector} fill className="object-cover" />
        with an overlay div on top for the dark tint.
      */}
      <div className="absolute inset-0" style={{ background: v.gradient }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.09) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Sector watermark centred in the image block */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
        <p
          className="font-bold uppercase text-center"
          style={{ fontSize: "0.625rem", letterSpacing: "0.2em", color: "rgba(58,174,206,0.3)" }}
        >
          {v.sector}
        </p>
        <p
          style={{ fontSize: "0.5625rem", letterSpacing: "0.12em", color: "rgba(234,246,251,0.12)" }}
        >
          Replace with real photography
        </p>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#e5e7eb]"
      style={{ minHeight: 480 }}
    >
      {imageRight ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
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

              {/* Brand track */}
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
                  style={{ fontSize: "clamp(1.25rem,1.8vw,1.625rem)", color: "#0a3b4b" }}
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
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-200"
                    style={{ background: "#0a3b4b" }}
                  >
                    Talk to us
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Agency track */}
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
                  style={{ fontSize: "clamp(1.25rem,1.8vw,1.625rem)", color: "#0a3b4b" }}
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
                    href="/contact"
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
            style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)", color: "#0a3b4b" }}
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
              href="/contact"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:opacity-90"
              style={{ background: "#0a3b4b" }}
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
      <div style={{ background: "white" }}>
        {VERTICALS.map((v, i) => (
          <VerticalSection key={v.sector} v={v} index={i} />
        ))}
      </div>
      <AgencyCallout />
      <BottomHook />
    </>
  );
}
