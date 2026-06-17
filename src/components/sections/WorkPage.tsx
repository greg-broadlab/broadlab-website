"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CASES = [
  {
    id: "lloyds",
    client: "Lloyds Banking Group",
    sector: "Financial Services",
    stat: "£3 ROAS",
    statLabel: "Return on ad spend",
    problem:
      "Lloyds needed CTV to do more than generate delivery metrics. The challenge was to turn a premium medium into a measurable driver of business performance, not just an awareness line item.",
    approach:
      "Broadlab combined consultancy, an AI-powered Audience Graph, propensity modelling and closed-loop measurement to configure CTV around a real business objective rather than legacy TV or programmatic assumptions.",
    outcome:
      "The result was over £3 ROAS, with TV outperforming every other channel - a strong demonstration of what happens when consultancy, technology and outcome-led measurement are connected properly.",
    quote: {
      text: "As Lloyds Banking Group invests to lead in data, technology and AI-driven marketing, we have worked with Broadlab to redefine what TV can do.",
      author: "Sam Taylor",
      role: "Head of Marketing, Lloyds Banking Group",
    },
    barriers: ["Programmatic legacy", "Organisational fit"],
  },
  {
    id: "lenovo",
    client: "Lenovo",
    sector: "Technology",
    stat: "22%",
    statLabel: "Awareness gain within target audience",
    problem:
      "Lenovo needed CTV activity to create a clear brand effect within a defined target audience, rather than relying on broad delivery signals that were difficult to translate into business confidence.",
    approach:
      "Broadlab applied its system across audience design, outcome-led measurement and optimisation to focus activity more tightly on the right viewers and generate clearer evidence of in-market impact.",
    outcome:
      "Broadlab's activity delivered a 22% awareness gain within the target audience, providing strong proof that better inputs and better measurement can translate into meaningful brand movement.",
    quote: {
      text: "The activity we ran with Broadlab for the Smarter AI campaigns was a huge success delivering 22% awareness gains within our target audience.",
      author: "Phil Oldham",
      role: "UK Marketing Director, Lenovo",
    },
    barriers: ["Fragmentation", "Programmatic legacy"],
  },
  {
    id: "dazn",
    client: "DAZN",
    sector: "Media & Entertainment",
    stat: "10,000+",
    statLabel: "Subscriptions driven",
    problem:
      "DAZN needed CTV to do more than build presence. The challenge was to translate targeting and campaign optimisation into direct subscriber growth while generating learning that could improve future activity.",
    approach:
      "Broadlab optimised daily towards likely boxing fans using a more accurate audience foundation and an outcome-led optimisation model tied directly to subscription goals.",
    outcome:
      "The campaign delivered 10,000+ subscriptions, alongside household brand uplift data that could be fed into the next campaign cycle - a strong example of Broadlab's compounding learning model in practice.",
    quote: null,
    barriers: ["Fragmentation", "Programmatic legacy"],
  },
] as const;

export default function WorkPageClient() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main style={{ background: "#eaf1f6" }}>
      <Navbar />

      {/* Sticky full-screen hero - content slides over on scroll */}
      <div style={{ position: "sticky", top: 0, height: "100svh", zIndex: 0 }}>
        <div className="relative h-full overflow-hidden">

          {/* Background photo */}
          <Image
            src="/images/backdrop-1.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />

          {/* Gradient overlay — deeper at bottom, lighter at top for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(170deg, rgba(13,37,53,0.42) 0%, rgba(13,37,53,0.68) 55%, rgba(13,37,53,0.88) 100%)",
            }}
          />

          {/* Centred content */}
          <div
            ref={heroRef}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          >
            {/* Eyebrow with accent line */}
            <motion.div
              className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="block w-8 h-px" style={{ background: "rgba(143,179,200,0.8)" }} />
              <span
                className="text-[0.6875rem] font-bold tracking-[0.22em] uppercase"
                style={{ color: "rgba(143,179,200,0.9)" }}
              >
                Our work
              </span>
              <span className="block w-8 h-px" style={{ background: "rgba(143,179,200,0.8)" }} />
            </motion.div>

            {/* Headline — bigger, tighter */}
            <h1
              className="font-bold text-white"
              style={{ fontSize: "clamp(3.25rem, 7vw, 6.5rem)", lineHeight: 1.04, letterSpacing: "-0.02em" }}
            >
              {["Real challenges.", "Measurable results."].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: heroInView ? "0%" : "110%" }}
                    transition={{ delay: 0.12 + i * 0.14, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              className="mt-6 text-[1.0625rem] leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,0.82)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.55 }}
            >
              Three case studies. Three sectors. One consistent outcome: CTV that works as a business tool.
            </motion.p>

            {/* Stat strip — replaces pills, adds immediate credibility */}
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="flex items-stretch justify-center">
                {[
                  { stat: "£3 ROAS",    label: "Financial Services · Lloyds" },
                  { stat: "22%",        label: "Awareness Gain · Lenovo"     },
                  { stat: "10,000+",    label: "Subscriptions · DAZN"        },
                ].map((s, i) => (
                  <div key={s.stat} className="flex-1 py-4 sm:py-5 text-center"
                    style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <p className="font-bold text-white" style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", letterSpacing: "-0.01em" }}>
                      {s.stat}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] font-medium hidden sm:block"
                      style={{ color: "rgba(255,255,255,0.48)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Slides up over the hero on scroll */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "white",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 48px rgba(13,37,53,0.10)",
        }}
      >

        {/* Stats breakdown */}
        <StatsGrid />

        {/* Case studies */}
        {CASES.map((c, i) => {
          if (i === 0) return <LloydsCaseStudy  key={c.id} caseItem={c} />;
          if (i === 1) return <LenovoCaseStudy  key={c.id} caseItem={c} />;
          return               <DAZNCaseStudy   key={c.id} caseItem={c} />;
        })}

        {/* Industry Recognition */}
        <RecognitionSection />

        {/* Final CTA */}
        <section className="bg-[#eaf1f6]">
          <div className="h-px w-full bg-[#3a6682]/30" />
          <div className="section-padding">
            <div className="container-main max-w-2xl mx-auto text-center">
              <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#0d2535] leading-tight">
                Tell us what you&apos;re trying to achieve with CTV.
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-[#4b5563]">
                We&apos;ll tell you whether and how we can help.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#3a6682] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a5068]"
                >
                  Book a 20-minute CTV consult
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0d2535] px-7 py-3.5 text-sm font-semibold text-[#0d2535] transition-colors hover:bg-[#0d2535] hover:text-white"
                >
                  Explore the Broadlab System
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

// ─── Industry Recognition ──────────────────────────────────────────────────────

const AWARDS = [
  {
    body:      "Thinkbox TV Planning Awards",
    category:  "Best use of Addressability",
    campaign:  "Broadlab for Scottish Widows",
    year:      "2025",
    status:    "Shortlisted",
    confirmed: true,
  },
] as const;

function RecognitionSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "white" }}>
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />
      <div className="section-padding">
        <div className="container-main" ref={ref}>

          <div className="mb-12">
            <motion.p
              className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-4 text-[#3a6682]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              Industry recognition
            </motion.p>
            <motion.h2
              className="font-bold text-[#0d2535]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Recognised for what we build.
            </motion.h2>
          </div>

          {/* Single award */}
          {AWARDS.filter(a => a.confirmed).map((award, i) => (
            <motion.div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl"
              style={{
                border: "1px solid rgba(58,102,130,0.18)",
                borderTop: "3px solid #3a6682",
                boxShadow: "0 4px 24px rgba(58,102,130,0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Logo + details together */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center rounded-lg px-4 py-3 shrink-0"
                  style={{ background: "#eaf1f6", border: "1px solid rgba(58,102,130,0.2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/thinkbox.png" alt="Thinkbox" style={{ height: 24, width: "auto" }} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#0d2535]" style={{ fontSize: "0.9375rem" }}>{award.body}</p>
                  <p className="text-sm text-[#6b7280] mt-1">{award.category}</p>
                </div>
              </div>

              {/* Campaign + year + status */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2 shrink-0">
                <div className="sm:text-right">
                  <p className="text-xs font-medium text-[#3a6682]">{award.campaign}</p>
                  <p className="text-xs font-semibold text-[#9ca3af] mt-1">{award.year}</p>
                </div>
                <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] rounded-full px-3 py-1.5"
                  style={{ color: "#3a6682", background: "rgba(58,102,130,0.1)" }}>
                  {award.status}
                </span>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}

// ─── Stats breakdown grid ──────────────────────────────────────────────────────

const STAT_CASES = [
  {
    sector: "Financial Services",
    client: "Scottish Widows",
    multiplier: "9×",
    label: "Triple-channel vs organic",
    stats: [
      { value: "2.4×",   desc: "CPD improvement over campaign" },
      { value: "51%",    desc: "below target CPD"              },
      { value: "+53%",   desc: "direct mail amplification"     },
      { value: "£3:1",   desc: "ROAS"                          },
    ],
  },
  {
    sector: "Automotive",
    client: "Kia EV2 / Innocean",
    multiplier: "5.5×",
    label: "Cost per visit improvement",
    stats: [
      { value: "+100.6%", desc: "incremental test drives"   },
      { value: "12×",     desc: "weekly site visit growth"  },
      { value: "+20.3%",  desc: "brand awareness"           },
      { value: "−74%",    desc: "cost per site visit"       },
    ],
  },
  {
    sector: "Retail / DTC",
    client: "Wonderbly",
    multiplier: "7.7×",
    label: "Cost per order improvement",
    stats: [
      { value: "87%",  desc: "reduction in cost per order" },
      { value: "+36%", desc: "brand awareness lift"        },
      { value: "✓",    desc: "positive ROAS confirmed"     },
    ],
  },
  {
    sector: "Sports Streaming",
    client: "DAZN",
    multiplier: "2–5×",
    label: "Performance via optimisation",
    stats: [
      { value: "+33.2%", desc: "purchase consideration lift"    },
      { value: "8.9%",   desc: "subscriptions attributed to CTV" },
      { value: "✓",      desc: "positive ROAS confirmed"         },
    ],
  },
] as const;

function StatsGrid() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div style={{ background: "#eaf1f6" }}>
      <div className="h-px" style={{ background: "rgba(58,102,130,0.25)" }} />
      <div className="section-padding">
        <div className="container-main" ref={ref}>

          <div className="mb-10">
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}>
              Consistently 2–9× performance improvement.
            </motion.h2>
            <motion.p
              className="mt-2 font-semibold"
              style={{ fontSize: "1.125rem", color: "#3a6682" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}>
              Across every sector we operate in.
            </motion.p>
            <motion.p
              className="mt-3 text-xs text-[#9ca3af]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}>
              The following multipliers are derived from audited campaign results. Each uses geo holdout or independent uplift methodology.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(58,102,130,0.15)", border: "1px solid rgba(58,102,130,0.15)", borderRadius: "1rem", overflow: "hidden" }}>
            {STAT_CASES.map((c, i) => (
              <motion.div
                key={c.client}
                className="bg-white flex flex-col p-6 gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55 }}>

                {/* Sector + client */}
                <div>
                  <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-[#3a6682] mb-1">{c.sector}</p>
                  <p className="text-sm font-bold text-[#0d2535]">{c.client}</p>
                </div>

                {/* Multiplier */}
                <div>
                  <p className="font-bold leading-none text-[#0d2535]" style={{ fontSize: "3rem" }}>{c.multiplier}</p>
                  <p className="mt-1 text-xs font-medium text-[#3a6682]">{c.label}</p>
                </div>

                <div className="h-px bg-[#f3f4f6]" />

                {/* Stats */}
                <div className="flex flex-col gap-2.5">
                  {c.stats.map((s) => (
                    <div key={s.desc} className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#0d2535] shrink-0 w-14 tabular-nums">{s.value}</span>
                      <span className="text-xs text-[#6b7280] leading-snug">{s.desc}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Case studies ──────────────────────────────────────────────────────────────

function LloydsCaseStudy({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div style={{ background: "white" }}>
      <div className="h-px" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Zone 1 - Header row */}
            <div
              className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-10"
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span
                  className="font-bold leading-none select-none"
                  style={{ fontSize: "1.75rem", color: "rgba(58,102,130,0.18)" }}
                >
                  01
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682]">
                  {caseItem.sector}
                </span>
                <span className="text-sm font-bold text-[#0d2535]">{caseItem.client}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseItem.barriers.map((b) => (
                  <span
                    key={b}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ border: "1px solid rgba(58,102,130,0.25)", color: "rgba(58,102,130,0.7)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Zone 2 - Narrative + results panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left - narrative, staggered */}
              <div className="flex flex-col gap-7">
                <NarrativeBlock label="The challenge"     text={caseItem.problem}  inView={inView} delay={0.25} />
                <NarrativeBlock label="What Broadlab did" text={caseItem.approach} inView={inView} delay={0.38} />
                <NarrativeBlock label="The outcome"       text={caseItem.outcome}  inView={inView} delay={0.51} />
              </div>

              {/* Right - results panel, metrics slide in from right */}
              <motion.div
                className="rounded-2xl p-6 sm:p-8 flex flex-col"
                style={{
                  background: "#eaf1f6",
                  border: "1px solid rgba(58,102,130,0.2)",
                  boxShadow: "0 4px 28px rgba(58,102,130,0.06)",
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3a6682] mb-7">
                  Campaign outcomes
                </p>

                {/* Stats grid */}
                {[
                  { value: "2.4×",  label: "CPD improvement over campaign" },
                  { value: "51%",   label: "Below target CPD"              },
                  { value: "+53%",  label: "Direct mail amplification"     },
                  { value: "£3:1",  label: "ROAS"                          },
                ].map((s, i) => (
                  <motion.div key={s.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}>
                    <div className="flex items-baseline gap-3 py-4"
                      style={{ borderBottom: i < 3 ? "1px solid rgba(58,102,130,0.12)" : "none" }}>
                      <span className="font-bold text-[#0d2535] shrink-0" style={{ fontSize: "1.75rem", minWidth: "4.5rem" }}>
                        {s.value}
                      </span>
                      <span className="text-sm text-[#4b5563] leading-snug">{s.label}</span>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-4 rounded-xl px-5 py-4"
                  style={{ background: "rgba(58,102,130,0.08)", border: "1px solid rgba(58,102,130,0.15)" }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}>
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#3a6682] mb-2">Key insight</p>
                  <p className="text-sm leading-relaxed text-[#0d2535]">TV outperformed every other channel in the media mix.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Zone 3 - Quote */}
            {caseItem.quote && (
              <motion.blockquote
                className="mt-12 pt-10 text-center"
                style={{ borderTop: "1px solid rgba(58,102,130,0.2)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <span
                  className="block font-bold"
                  style={{ fontSize: "3rem", lineHeight: 1, color: "#3a6682", marginBottom: "0.5rem" }}
                >
                  &ldquo;
                </span>
                <p className="text-[1.0625rem] italic leading-relaxed text-[#0d2535] max-w-2xl mx-auto">
                  {caseItem.quote.text}
                </p>
                <footer className="mt-4">
                  <cite className="not-italic text-sm font-semibold text-[#0d2535]">
                    {caseItem.quote.author}
                  </cite>
                  <span className="text-sm text-[#6b7280]"> - {caseItem.quote.role}</span>
                </footer>
              </motion.blockquote>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LenovoCaseStudy({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div style={{ background: "#eaf1f6" }}>
      <div className="h-px" style={{ background: "rgba(58,102,130,0.25)" }} />

      <div className="section-padding">
        <div className="container-main">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Zone 1 - Header row */}
            <div
              className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-10"
              style={{ borderBottom: "1px solid rgba(58,102,130,0.2)" }}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span
                  className="font-bold leading-none select-none"
                  style={{ fontSize: "1.75rem", color: "rgba(58,102,130,0.18)" }}
                >
                  02
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682]">
                  {caseItem.sector}
                </span>
                <span className="text-sm font-bold text-[#0d2535]">{caseItem.client}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseItem.barriers.map((b) => (
                  <span
                    key={b}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ border: "1px solid rgba(58,102,130,0.25)", color: "rgba(58,102,130,0.7)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Zone 2 - Narrative + results panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left - narrative, staggered */}
              <div className="flex flex-col gap-7">
                <NarrativeBlock label="The challenge"     text={caseItem.problem}  inView={inView} delay={0.25} />
                <NarrativeBlock label="What Broadlab did" text={caseItem.approach} inView={inView} delay={0.38} />
                <NarrativeBlock label="The outcome"       text={caseItem.outcome}  inView={inView} delay={0.51} />
              </div>

              {/* Right - results panel, slides in from right */}
              <motion.div
                className="rounded-2xl p-6 sm:p-8 flex flex-col"
                style={{
                  background: "white",
                  border: "1px solid rgba(58,102,130,0.2)",
                  boxShadow: "0 4px 28px rgba(58,102,130,0.06)",
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3a6682] mb-7">
                  Campaign outcomes
                </p>

                {/* Metric */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p className="font-bold leading-none text-[#0d2535]" style={{ fontSize: "2.5rem" }}>
                    <CountUp end={22} suffix="%" inView={inView} />
                  </p>
                  <p className="mt-1.5 text-sm text-[#4b5563]">Awareness gain</p>
                  <p className="mt-0.5 text-xs text-[#9ca3af]">Within defined target audience</p>
                </motion.div>

                <div className="my-6 h-px" style={{ background: "rgba(58,102,130,0.15)" }} />

                {/* What drove it */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55, duration: 0.5 }}
                >
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#9ca3af] mb-3">
                    What drove it
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Audience Graph targeting on defined prospect segments",
                      "Daily in-flight measurement against brand lift",
                      "Creative and frequency optimisation throughout",
                    ].map((point, i) => (
                      <motion.div
                        key={point}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: 8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.62 + i * 0.08, duration: 0.4 }}
                      >
                        <div className="mt-1.5 flex-shrink-0 rounded-full" style={{ width: 5, height: 5, background: "#3a6682" }} />
                        <p className="text-sm leading-snug text-[#4b5563]">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="my-6 h-px" style={{ background: "rgba(58,102,130,0.15)" }} />

                {/* Insight */}
                <motion.div
                  className="rounded-xl px-5 py-4"
                  style={{ background: "rgba(58,102,130,0.06)", border: "1px solid rgba(58,102,130,0.15)" }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.85, duration: 0.5 }}
                >
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#3a6682] mb-2">Key insight</p>
                  <p className="text-sm leading-relaxed text-[#0d2535]">
                    Better audience inputs created clearer proof of in-market impact.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Zone 3 - Quote */}
            {caseItem.quote && (
              <motion.blockquote
                className="mt-12 pt-10 text-center"
                style={{ borderTop: "1px solid rgba(58,102,130,0.2)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <span className="block font-bold" style={{ fontSize: "3rem", lineHeight: 1, color: "#3a6682", marginBottom: "0.5rem" }}>
                  &ldquo;
                </span>
                <p className="text-[1.0625rem] italic leading-relaxed text-[#0d2535] max-w-2xl mx-auto">
                  {caseItem.quote.text}
                </p>
                <footer className="mt-4">
                  <cite className="not-italic text-sm font-semibold text-[#0d2535]">{caseItem.quote.author}</cite>
                  <span className="text-sm text-[#6b7280]"> - {caseItem.quote.role}</span>
                </footer>
              </motion.blockquote>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DAZNCaseStudy({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div style={{ background: "white" }}>
      <div className="h-px" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Zone 1 - Header row */}
            <div
              className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-10"
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span
                  className="font-bold leading-none select-none"
                  style={{ fontSize: "1.75rem", color: "rgba(58,102,130,0.18)" }}
                >
                  03
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682]">
                  {caseItem.sector}
                </span>
                <span className="text-sm font-bold text-[#0d2535]">{caseItem.client}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseItem.barriers.map((b) => (
                  <span
                    key={b}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ border: "1px solid rgba(58,102,130,0.25)", color: "rgba(58,102,130,0.7)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Zone 2 - Narrative + results panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left - narrative, staggered */}
              <div className="flex flex-col gap-7">
                <NarrativeBlock label="The challenge"     text={caseItem.problem}  inView={inView} delay={0.25} />
                <NarrativeBlock label="What Broadlab did" text={caseItem.approach} inView={inView} delay={0.38} />
                <NarrativeBlock label="The outcome"       text={caseItem.outcome}  inView={inView} delay={0.51} />
              </div>

              {/* Right - results panel, slides in from right */}
              <motion.div
                className="rounded-2xl p-6 sm:p-8 flex flex-col"
                style={{
                  background: "#eaf1f6",
                  border: "1px solid rgba(58,102,130,0.2)",
                  boxShadow: "0 4px 28px rgba(58,102,130,0.06)",
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#3a6682] mb-7">
                  Campaign outcomes
                </p>

                {/* Stats grid */}
                {[
                  { value: "+33.2%", label: "Purchase consideration lift"      },
                  { value: "8.9%",   label: "Subscriptions attributed to CTV"  },
                  { value: "✓",      label: "Positive ROAS confirmed"           },
                ].map((s, i) => (
                  <motion.div key={s.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}>
                    <div className="flex items-baseline gap-3 py-4"
                      style={{ borderBottom: i < 2 ? "1px solid rgba(58,102,130,0.12)" : "none" }}>
                      <span className="font-bold shrink-0" style={{ fontSize: "1.75rem", minWidth: "4.5rem", color: s.value === "✓" ? "#3a6682" : "#0d2535" }}>
                        {s.value}
                      </span>
                      <span className="text-sm text-[#4b5563] leading-snug">{s.label}</span>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-4 rounded-xl px-5 py-4"
                  style={{ background: "rgba(58,102,130,0.08)", border: "1px solid rgba(58,102,130,0.15)" }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}>
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#3a6682] mb-2">Key insight</p>
                  <p className="text-sm leading-relaxed text-[#0d2535]">Optimising daily towards likely boxing fans - not broad sports audiences - made the difference.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Zone 3 - Compounding callout (no quote available) */}
            <motion.div
              className="mt-12 pt-10"
              style={{ borderTop: "1px solid #e5e7eb" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div
                className="rounded-2xl px-6 py-6 sm:px-10 sm:py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center"
                style={{ background: "#eaf1f6", border: "1px solid rgba(58,102,130,0.15)" }}
              >
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-2">
                    What this enabled next
                  </p>
                  <p className="font-bold text-[#0d2535]" style={{ fontSize: "1.25rem", lineHeight: 1.3 }}>
                    The system gets smarter with every campaign.
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  The brand uplift and audience data captured during the DAZN campaign fed directly into the next brief - tightening the audience model and giving the following cycle a sharper starting point. This is Broadlab&apos;s compounding intelligence model in practice.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CaseStudy({
  caseItem,
  index,
}: {
  caseItem: (typeof CASES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = String(index + 1).padStart(2, "0");

  return (
    <div style={{ background: index % 2 === 0 ? "white" : "#eaf1f6" }}>
      <div className="h-px" style={{ background: index % 2 === 0 ? "#e5e7eb" : "rgba(58,102,130,0.25)" }} />

      <div className="section-padding">
        <div className="container-main">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >

            {/* Three-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_2fr] gap-8 lg:gap-16 items-start">

              {/* Left - number + meta */}
              <div>
                <p
                  className="font-bold leading-none select-none"
                  style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", color: "rgba(58,102,130,0.15)" }}
                >
                  {n}
                </p>
                <p className="mt-4 text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682]">
                  {caseItem.sector}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#0d2535]">{caseItem.client}</p>
              </div>

              {/* Center - headline stat */}
              <div>
                <p
                  className="font-bold leading-none text-[#0d2535]"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
                >
                  {caseItem.stat}
                </p>
                <p className="mt-3 text-sm leading-snug text-[#4b5563]">{caseItem.statLabel}</p>
              </div>

              {/* Right - narrative */}
              <div className="flex flex-col gap-7">
                <NarrativeBlock label="The challenge" text={caseItem.problem} />
                <NarrativeBlock label="What Broadlab did" text={caseItem.approach} />
                <NarrativeBlock label="The outcome" text={caseItem.outcome} />
              </div>

            </div>

            {/* Quote - full width */}
            {caseItem.quote && (
              <motion.blockquote
                className="mt-12 pt-10 text-center"
                style={{ borderTop: "1px solid rgba(58,102,130,0.2)" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <span
                  className="block font-bold"
                  style={{ fontSize: "3rem", lineHeight: 1, color: "#3a6682", marginBottom: "0.5rem" }}
                >
                  &ldquo;
                </span>
                <p className="text-[1.0625rem] italic leading-relaxed text-[#0d2535] max-w-2xl mx-auto">
                  {caseItem.quote.text}
                </p>
                <footer className="mt-4">
                  <cite className="not-italic text-sm font-semibold text-[#0d2535]">
                    {caseItem.quote.author}
                  </cite>
                  <span className="text-sm text-[#6b7280]"> - {caseItem.quote.role}</span>
                </footer>
              </motion.blockquote>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function NarrativeBlock({ label, text, inView = true, delay = 0 }: {
  label: string; text: string; inView?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#9ca3af] mb-1.5">
        {label}
      </p>
      <p className="text-[0.9375rem] leading-relaxed text-[#374151]">{text}</p>
    </motion.div>
  );
}

function CountUp({ prefix = "", end, suffix = "", decimals = 0, format = false, inView }: {
  prefix?: string; end: number; suffix?: string; decimals?: number; format?: boolean; inView: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        const n = v.toFixed(decimals);
        setDisplay(format ? Number(n).toLocaleString() : n);
      },
    });
    return () => controls.stop();
  }, [inView, end, decimals, format]);

  return <>{prefix}{display}{suffix}</>;
}
