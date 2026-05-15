"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BARRIERS = [
  {
    n: "01",
    title: "Too many platforms, no single view",
    desc: "CTV is bought across multiple platforms with duplicate audiences, no unified reporting and no clear picture of what's actually working.",
  },
  {
    n: "02",
    title: "No one owns it properly",
    desc: "CTV falls between TV and digital teams, so it rarely gets the strategic focus or planning logic the channel deserves.",
  },
  {
    n: "03",
    title: "The wrong metrics",
    desc: "Most CTV is still measured on delivery — impressions, completions, CPM — not on what it does for the business.",
  },
];

export default function WhyUnderperforms() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">

          <div className="mb-14 max-w-xl mx-auto text-center">
            <motion.h2
              className="font-bold text-[#0a3b4b] leading-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              What&apos;s holding CTV back.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BARRIERS.map((barrier, i) => (
              <motion.div
                key={barrier.n}
                className="flex flex-col gap-4 rounded-xl p-7"
                style={{
                  border: "1px solid rgba(58,174,206,0.18)",
                  borderTop: "2px solid #3aaece",
                  boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span
                  className="font-bold leading-none select-none"
                  style={{ fontSize: "2rem", color: "rgba(58,174,206,0.2)" }}
                >
                  {barrier.n}
                </span>
                <h3 className="font-semibold text-[#0a3b4b] text-base leading-snug">
                  {barrier.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  {barrier.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
