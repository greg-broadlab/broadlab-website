"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CAPABILITIES = [
  {
    n: "01",
    name: "Audience Graph",
    desc: "1.8M UK postcodes. 5,000+ attributes. One privacy-safe view of your audience, consistent across every platform.",
  },
  {
    n: "02",
    name: "Outcome Measurement",
    desc: "Brand lift, search uplift, conversion, footfall and sales — all tracked daily, in-flight.",
  },
  {
    n: "03",
    name: "Optimisation Engine",
    desc: "AI and expert-led refinement across audience, creative, geography, supply and frequency — every single day.",
  },
  {
    n: "04",
    name: "Compounding Intelligence",
    desc: "Every campaign feeds back into the system, making the next one stronger and more precise.",
  },
];

export default function Positioning() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left — positioning statement */}
            <div className="lg:sticky lg:top-32">

              <motion.p
                className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-5"
                style={{ color: "#3aaece" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                The BroadLab System
              </motion.p>

              <motion.h2
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)", color: "#0d2535" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                One system.<br />Four capabilities.
              </motion.h2>

              <motion.p
                className="mt-6 leading-relaxed"
                style={{ fontSize: "1.0625rem", color: "#4b5563", maxWidth: "26rem" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.2, duration: 0.55 }}
              >
                BroadLab is the intelligence layer that sits above fragmented CTV — unifying audience, measurement, optimisation and learning into one connected system.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link
                  href="/system"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-60"
                  style={{ color: "#0d2535" }}
                >
                  Explore the System
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/solutions"
                  scroll={true}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-60"
                  style={{ color: "#3aaece" }}
                >
                  See our solutions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

            </div>

            {/* Right — four capabilities */}
            <div className="flex flex-col">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.n}
                  className="flex gap-6 py-8"
                  style={{
                    borderBottom: i < CAPABILITIES.length - 1 ? "1px solid #e5e7eb" : undefined,
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 16 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span
                    className="shrink-0 font-bold tabular-nums leading-none select-none"
                    style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", color: "rgba(58,174,206,0.15)", paddingTop: "2px" }}
                  >
                    {cap.n}
                  </span>
                  <div>
                    <h3
                      className="font-bold leading-snug mb-2"
                      style={{ fontSize: "1.0625rem", color: "#0d2535" }}
                    >
                      {cap.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4b5563" }}
                    >
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
