"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function SolutionsCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">

            <motion.h2
              className="font-bold leading-tight text-[#0d2535]"
              style={{ fontSize: "clamp(2rem,3.8vw,3.25rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}>
              See what BroadLab can do<br />
              <span style={{ color: "#3aaece" }}>for your campaigns.</span>
            </motion.h2>

            <motion.p
              className="mt-5 leading-relaxed text-[#4b5563] mx-auto"
              style={{ fontSize: "1.0625rem", maxWidth: "32rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}>
              Book a call and we&apos;ll walk you through exactly how our technology works - and what it would mean for your business.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
              transition={{ delay: 0.25, duration: 0.5 }}>
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
        </div>
      </div>
    </section>
  );
}
