"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
// ─── Featured bio data ─────────────────────────────────────────────────────────
// Bio copy to be provided by each person before launch

const FEATURED = [
  {
    name: "Jakob Nielsen",
    role: "Chief Executive Officer",
    bio: "Placeholder — to be provided by Jakob. A short paragraph on what drove the founding of BroadLab, his background in the industry, and what he believes about the future of outcome-driven TV.",
    image: "/images/team/jakob.jpeg",
  },
  {
    name: "Matt Mee",
    role: "Chief Strategy Officer",
    bio: "Placeholder — to be provided by Matt. A short paragraph on strategic background, vision for how BroadLab sits in the market, and what makes the methodology genuinely different from anything else in CTV.",
    image: null,
  },
  {
    name: "Kristian Claxton",
    role: "Vice President",
    bio: "Placeholder — to be provided by Kristian. A short paragraph on area of expertise, what he brings to client relationships, and his view on building intelligence systems that compound over time.",
    image: null,
  },
];

// Add more entries here when additional featured bios are needed
const EXTRA_BIO_SLOTS = 2;

// ─── Team data ─────────────────────────────────────────────────────────────────
// Update names, roles and image paths as the team grows


// ─── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#f0f8fb" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-main relative z-10 section-padding">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.p>

          <h1
            className="font-bold leading-tight text-[#0d2535]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            {["The people behind", "the system."].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ delay: 0.1 + i * 0.13, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.div
            className="mt-8 flex items-center gap-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.38, duration: 0.5 }}
          >
            {[["25+", "Specialists"], ["7", "Practice areas"]].map(([val, label]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-bold text-[#0d2535]" style={{ fontSize: "1.75rem" }}>{val}</span>
                <span className="text-xs text-[#9ca3af]" style={{ letterSpacing: "0.08em" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Company statement ─────────────────────────────────────────────────────────

function CompanyStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
              transition={{ delay: 0.1, duration: 0.65 }}
            >
              <p
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)", color: "#0d2535" }}
              >
                "We built the system the industry
                <span style={{ color: "#3aaece" }}> should have built</span> years ago."
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >
              {/* Placeholder — confirm company origin story with BroadLab before launch */}
              <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                Placeholder company statement — to be confirmed with BroadLab. A short
                paragraph on why BroadLab was founded, what problem was being solved,
                and what the team believed needed to change about the way CTV was bought
                and measured.
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                Second paragraph — the team&apos;s background, the combination of
                data science, media and technology expertise, and what makes BroadLab&apos;s
                approach structurally different from anything that came before it.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Featured bio strip ────────────────────────────────────────────────────────

function FeaturedBio({
  person,
  index,
}: {
  person: { name: string; role: string; bio: string; image: string | null };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imageRight = index % 2 === 0;

  const photoBlock = (
    <motion.div
      className="relative min-h-[380px] lg:min-h-0 overflow-hidden order-1 lg:order-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ delay: 0.05, duration: 0.75 }}
    >
      {person.image ? (
        <>
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover object-top"
            sizes="50vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,59,75,0.25)" }} />
        </>
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0d2535 0%, #10657f 100%)" }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p style={{ fontSize: "0.5625rem", letterSpacing: "0.18em", color: "rgba(58,174,206,0.25)" }}>
              HEADSHOT PLACEHOLDER
            </p>
          </div>
        </>
      )}
    </motion.div>
  );

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 order-2 lg:order-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p
        className="text-[0.625rem] font-bold uppercase tracking-[0.18em] mb-3"
        style={{ color: "#3aaece" }}
      >
        {person.role}
      </p>
      <h2
        className="font-bold leading-none mb-6"
        style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: "#0d2535" }}
      >
        {person.name}
      </h2>
      <div className="w-10 h-0.5 mb-7" style={{ background: "rgba(58,174,206,0.4)" }} />
      <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
        {person.bio}
      </p>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#e5e7eb]"
      style={{ minHeight: 500 }}
    >
      {imageRight ? <>{textBlock}{photoBlock}</> : <>{photoBlock}{textBlock}</>}
    </div>
  );
}

// ─── Empty bio slot ────────────────────────────────────────────────────────────

function EmptyBioSlot({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center border-b border-[#e5e7eb]"
      style={{ minHeight: 200 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-2xl px-12 py-10 m-8"
        style={{
          border: "2px dashed rgba(58,174,206,0.25)",
          background: "rgba(234,246,251,0.3)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(58,174,206,0.1)", border: "1.5px dashed rgba(58,174,206,0.4)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="#3aaece" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm font-semibold" style={{ color: "#9ca3af" }}>Add featured bio here</p>
        <p className="text-xs text-center max-w-xs" style={{ color: "#d1d5db" }}>
          Duplicate a FeaturedBio entry in the FEATURED array at the top of About.tsx
        </p>
      </div>
    </motion.div>
  );
}

// ─── Office mosaic ─────────────────────────────────────────────────────────────

const MOSAIC_CELLS = [
  { label: "Office",    gradient: "linear-gradient(160deg, #071c2a, #0d2535)", gridArea: "1 / 1 / 3 / 2" },
  { label: "Meeting",   gradient: "linear-gradient(160deg, #0d2535, #10657f)", gridArea: "1 / 2 / 2 / 4" },
  { label: "Team",      gradient: "linear-gradient(160deg, #0d4a60, #0d2535)", gridArea: "2 / 2 / 3 / 3" },
  { label: "Work",      gradient: "linear-gradient(160deg, #071c2a, #10657f)", gridArea: "2 / 3 / 3 / 4" },
];

function OfficeMosaic() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="section-padding">
        <div className="container-main">

          <motion.p
            className="text-[0.625rem] font-bold uppercase tracking-[0.18em] mb-8"
            style={{ color: "#3aaece" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            The BroadLab office
          </motion.p>

          {/* Desktop asymmetric grid */}
          <div
            className="hidden sm:grid gap-3"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "280px 280px",
            }}
          >
            {MOSAIC_CELLS.map((cell, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden relative"
                style={{ gridArea: cell.gridArea, background: cell.gradient }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.97 }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/*
                  Replace each placeholder with a real photo:
                  <Image src="/images/about/{label.toLowerCase()}.jpg" alt="{label}" fill className="object-cover" />
                */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.08) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p style={{ fontSize: "0.5625rem", letterSpacing: "0.18em", color: "rgba(58,174,206,0.22)" }}>
                    {cell.label.toUpperCase()} PHOTO
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: simple 2-col grid */}
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {MOSAIC_CELLS.map((cell, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden relative"
                style={{ height: 180, background: cell.gradient }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.6 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <p style={{ fontSize: "0.5rem", letterSpacing: "0.14em", color: "rgba(58,174,206,0.22)" }}>
                    {cell.label.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


// ─── Recognition ───────────────────────────────────────────────────────────────
// PLACEHOLDER — add confirmed awards below as they are received.
// The first entry is confirmed. Remaining entries are templates.

const AWARDS = [
  {
    body:      "Thinkbox TV Planning Awards",
    category:  "Best use of Addressability",
    campaign:  "BroadLab for Scottish Widows",
    year:      "2025",
    status:    "Shortlisted",
    confirmed: true,
  },
  {
    body:      "Placeholder",
    category:  "",
    campaign:  "",
    year:      "",
    status:    "Placeholder",
    confirmed: false,
  },
  {
    body:      "Placeholder",
    category:  "",
    campaign:  "",
    year:      "",
    status:    "Placeholder",
    confirmed: false,
  },
] as const;

function Recognition() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />
      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-12">
            <motion.p
              className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "#3aaece" }}
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

          {/* Award cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(58,174,206,0.12)" }}>
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                className="bg-white flex flex-col gap-5 p-8"
                style={{
                  borderTop: `3px solid ${award.confirmed ? "#3aaece" : "rgba(58,174,206,0.2)"}`,
                  opacity: award.confirmed ? 1 : 0.45,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? (award.confirmed ? 1 : 0.45) : 0, y: inView ? 0 : 20 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Logo / star + status */}
                <div className="flex items-center justify-between">
                  {award.confirmed ? (
                    <div
                      className="flex items-center justify-center rounded px-2.5 py-1.5"
                      style={{ background: "#f0f8fb", border: "1px solid rgba(58,174,206,0.2)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/thinkbox.png"
                        alt="Thinkbox"
                        style={{ height: 20, width: "auto" }}
                      />
                    </div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.43.59 3.435L7 8.75l-3.09 1.75.59-3.435L2 4.635l3.455-.545L7 1z"
                        fill="rgba(58,174,206,0.3)" />
                    </svg>
                  )}
                  <span
                    className="text-[0.625rem] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-1"
                    style={{
                      color:      award.confirmed ? "#3aaece" : "rgba(58,174,206,0.35)",
                      background: award.confirmed ? "rgba(58,174,206,0.1)" : "rgba(58,174,206,0.04)",
                    }}
                  >
                    {award.status}
                  </span>
                </div>

                {/* Award body */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <p
                    className="font-bold text-[#0d2535] leading-snug"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {award.body}
                  </p>
                  <p className="text-sm text-[#6b7280]">
                    {award.category}
                  </p>
                </div>

                {/* Campaign + year */}
                <div
                  className="pt-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid #e5e7eb" }}
                >
                  <p
                    className="text-xs"
                    style={{ color: award.confirmed ? "#3aaece" : "#d1d5db" }}
                  >
                    {award.campaign}
                  </p>
                  <p className="text-xs font-semibold tabular-nums text-[#9ca3af]">
                    {award.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <>
      <AboutHero />
      <CompanyStatement />

      {/* Featured bios */}
      <div style={{ background: "white" }}>
        {FEATURED.map((person, i) => (
          <FeaturedBio key={person.name} person={person} index={i} />
        ))}
        {Array.from({ length: EXTRA_BIO_SLOTS }, (_, i) => (
          <EmptyBioSlot key={i} index={i} />
        ))}
      </div>

      <OfficeMosaic />
      <Recognition />
    </>
  );
}
