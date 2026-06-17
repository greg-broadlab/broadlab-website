"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const MODELS = [
  {
    name: "Managed",
    desc: "Full CTV planning and activation handled end-to-end - strategy, audience, supply, measurement and optimisation.",
  },
  {
    name: "Specialist support",
    desc: "Targeted expertise across audience building, in-flight measurement and continuous optimisation - plugged into your existing team.",
  },
  {
    name: "Capability-building",
    desc: "For teams developing in-house CTV solutions - frameworks, tooling and training to accelerate the build.",
  },
];

export default function FinalCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#eaf1f6" }}>

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,102,130,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-padding relative z-10">
        <div className="container-main">

          {/* Heading */}
          <motion.h2
            className="mb-10 font-bold leading-tight text-[#0d2535] text-center"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Flexible support, built around your model.
          </motion.h2>

          {/* Full-width photo */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl mb-14"
            style={{ height: "clamp(260px, 42vw, 520px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/images/office-exec.jpg"
              alt="Broadlab team in session"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </motion.div>

          {/* Support models — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {MODELS.map((model, i) => (
              <motion.div
                key={model.name}
                className="rounded-2xl bg-white p-8"
                style={{
                  border: "1px solid rgba(58,102,130,0.12)",
                  boxShadow: "0 2px 12px rgba(58,102,130,0.05)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="font-bold text-[#0d2535] mb-3" style={{ fontSize: "1.125rem" }}>
                  {model.name}
                </p>
                <p className="leading-relaxed text-[#4b5563]" style={{ fontSize: "0.9375rem" }}>
                  {model.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="mx-auto h-px w-24"
            style={{ background: "rgba(58,102,130,0.25)" }}
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
                className="inline-flex items-center gap-2 rounded-full border border-[#3a6682] px-7 py-3 text-sm font-semibold text-[#3a6682] transition-colors duration-200 hover:bg-[#3a6682] hover:text-white"
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
