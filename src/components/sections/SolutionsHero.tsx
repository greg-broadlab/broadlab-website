"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const SOLUTIONS = [
  {
    id: "marketplaces",
    label: "Curated Marketplaces",
    desc: "Premium CTV supply, direct connections, full transparency.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3aaece" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "identity",
    label: "Identity Solutions",
    desc: "Privacy-safe, geo-based identity graphs with CRM integration.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3aaece" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.5 2 6 5 6 8c0 4 6 13 6 13s6-9 6-13c0-3-2.5-6-6-6z" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    ),
  },
  {
    id: "audience",
    label: "Audience Planning",
    desc: "Custom audience building with full-funnel CTV measurement.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3aaece" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="#3aaece" />
      </svg>
    ),
  },
  {
    id: "optimisation",
    label: "Optimisation",
    desc: "AI-driven, 46,000+ variables analysed continuously in-flight.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3aaece" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" />
      </svg>
    ),
  },
];

function SolutionTiles({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {SOLUTIONS.map((s, i) => (
        <motion.a
          key={s.id}
          href={`#${s.id}`}
          className="group flex flex-col gap-4 rounded-2xl bg-white p-6 cursor-pointer"
          style={{
            border: "1px solid rgba(58,174,206,0.15)",
            boxShadow: "0 2px 12px rgba(16,101,127,0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{
            y: -3,
            boxShadow: "0 8px 28px rgba(16,101,127,0.1)",
            borderColor: "rgba(58,174,206,0.35)",
          }}
        >
          {/* Icon row */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                background: "rgba(58,174,206,0.08)",
              }}
            >
              {s.icon}
            </div>
            <motion.svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#3aaece" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-bold text-[#0d2535] leading-snug">{s.label}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6b7280]">{s.desc}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default function SolutionsHero() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 md:pt-20"
      style={{ background: "#f0f8fb" }}>
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="section-padding relative z-10">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <div>
              <motion.p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{ delay: 0.05, duration: 0.5 }}>
                Solutions
              </motion.p>

              <motion.h1 className="font-bold leading-[1.1] text-[#0d2535]"
                style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.12, duration: 0.65 }}>
                Better technology.<br />
                <span style={{ color: "#3aaece" }}>Measurable outcomes.</span>
              </motion.h1>

              <motion.p className="mt-5 leading-relaxed text-[#4b5563]"
                style={{ fontSize: "1.0625rem", maxWidth: "30rem" }}
                initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.26, duration: 0.55 }}>
                BroadLab is built from the ground up with AI and proprietary data at its core.
                Not added on. Not integrated after the fact. The technology is the difference.
              </motion.p>

              <motion.div className="mt-9 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.38, duration: 0.5 }}>
                <Link href="/contact#contact" className="btn-primary">
                  Book a consultation
                </Link>
                <Link href="/system"
                  className="inline-flex items-center gap-2 rounded-full border border-[#10657f] px-7 py-3 text-sm font-semibold text-[#10657f] transition-colors duration-200 hover:bg-[#10657f] hover:text-white">
                  Explore the system
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Right — solution tiles */}
            <SolutionTiles inView={inView} />

          </div>
        </div>
      </div>
    </section>
  );
}
