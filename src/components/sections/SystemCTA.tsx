"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SystemCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white">
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />

      <div className="section-padding">
        <div className="container-main max-w-2xl mx-auto text-center">
          <motion.h2
            className="font-bold leading-tight text-[#0d2535]"
            style={{ fontSize: "clamp(1.75rem,3.5vw,3rem)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            The system that works in practice.
          </motion.h2>

          <motion.p
            className="mt-4 text-[1rem] leading-relaxed text-[#4b5563]"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
          >
            See how Broadlab has applied this system for Lloyds Banking Group, Lenovo, DAZN, and more.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ delay: 0.32, duration: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full bg-[#3aaece] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2d9ab8]"
            >
              View our work
            </Link>
            <Link
              href="/contact#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#10657f] px-7 py-3 text-sm font-semibold text-[#10657f] transition-colors hover:bg-[#10657f] hover:text-white"
            >
              Book a consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
