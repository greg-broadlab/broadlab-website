"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AudienceGraphDashboard from "@/components/ui/AudienceGraphDashboard";

const NUMBERS = [
  { value: "1.8M", label: "UK postcodes" },
  { value: "6,233", label: "Attributes per record" },
  { value: "32M", label: "US Zip+4" },
] as const;

export default function AudienceGraphSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-14 text-center">
            <motion.h2
              className="font-bold text-[#0a3b4b]"
              style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              The Audience ID Graph
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[#4b5563]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Every UK postcode and US Zip+4 mapped across 6,233 demographic,
              behavioural and viewership attributes. Privacy-safe via Snowflake.
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
                    style={{ fontSize: "clamp(1.75rem,2.5vw,2.25rem)", color: "#0a3b4b" }}
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
