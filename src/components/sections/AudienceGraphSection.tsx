"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AudienceGraphDashboard from "@/components/ui/AudienceGraphDashboard";

const NUMBERS = [
  { value: "60.3M", label: "Geo keys" },
  { value: "7,000+", label: "Attributes per record" },
] as const;

export default function AudienceGraphSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-14 max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              01 / Audience Graph
            </motion.p>
            <motion.h2
              className="font-bold text-[#0d2535]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              The foundation for effective CTV.
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              60.3 million geo keys mapped across 7,000+ demographic, behavioural and viewership attributes. AI-powered audience intelligence, privacy-safe via Snowflake.
            </motion.p>

            {/* Clean stat row — no pills, just numbers */}
            <motion.div
              className="mt-10 flex items-start justify-center gap-12 sm:gap-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {NUMBERS.map((n, i) => (
                <div key={n.label} className="flex flex-col items-center gap-1">
                  <span
                    className="font-bold leading-none"
                    style={{ fontSize: "clamp(1.75rem,2.5vw,2.25rem)", color: "#0d2535" }}
                  >
                    {n.value}
                  </span>
                  <span className="text-xs text-[#9ca3af] tracking-wide">{n.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard */}
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {inView && <AudienceGraphDashboard />}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
