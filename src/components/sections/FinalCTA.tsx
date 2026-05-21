"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const MODELS = [
  {
    name: "Managed",
    desc: "Full CTV planning and activation handled end-to-end — strategy, audience, supply, measurement and optimisation.",
  },
  {
    name: "Specialist support",
    desc: "Targeted expertise across audience building, in-flight measurement and continuous optimisation — plugged into your existing team.",
  },
  {
    name: "Capability-building",
    desc: "For teams developing in-house CTV solutions — frameworks, tooling and training to accelerate the build.",
  },
];

export default function FinalCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#f0f8fb" }}>

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">

          {/* Support models */}
          <motion.h2
            className="mb-14 text-center font-bold leading-tight text-[#0d2535]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Flexible support, built around your model.
          </motion.h2>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            {MODELS.map((model, i) => (
              <motion.div
                key={model.name}
                className="grid grid-cols-1 gap-3 py-9 md:grid-cols-[1fr_2fr] md:gap-20 md:items-center"
                style={{
                  borderBottom: i < MODELS.length - 1
                    ? "1px solid rgba(0,0,0,0.06)"
                    : undefined,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="font-bold text-[#0d2535]" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>
                  {model.name}
                </span>
                <p className="leading-relaxed text-[#4b5563]" style={{ fontSize: "1rem" }}>
                  {model.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-16 h-px w-24"
            style={{ background: "rgba(58,174,206,0.35)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          {/* CTA */}
          <div className="mt-14 text-center">
            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Grow more with CTV.
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md leading-relaxed text-[#4b5563]"
              style={{ fontSize: "1.0625rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Book a call. We&apos;ll show you exactly what&apos;s possible.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link href="/contact#contact" className="btn-primary">
                Book a consultation
              </Link>

              <Link
                href="/system"
                className="inline-flex items-center gap-2 rounded-full border border-[#10657f] px-7 py-3 text-sm font-semibold text-[#10657f] transition-colors duration-200 hover:bg-[#10657f] hover:text-white"
              >
                Explore the System
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
