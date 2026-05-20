"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MAX_TILT = 10;

const CASES = [
  {
    id: "lloyds",
    sector: "Financial Services",
    client: "Lloyds Banking Group",
    stat: "£3",
    statSuffix: " ROAS",
    label: "Return on ad spend",
  },
  {
    id: "lenovo",
    sector: "Technology",
    client: "Lenovo",
    stat: "22%",
    statSuffix: "",
    label: "Awareness gain",
  },
  {
    id: "dazn",
    sector: "Media & Entertainment",
    client: "DAZN",
    stat: "10,000+",
    statSuffix: "",
    label: "Subscriptions driven",
  },
] as const;

export default function OurWork() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#f0f8fb]">
      <div className="h-px w-full bg-[#3aaece]/30" />

      <div className="section-padding">
        <div className="container-main">

          <div ref={headingRef} className="mb-16 max-w-2xl mx-auto text-center">
            <motion.p
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our work
            </motion.p>
            <motion.h2
              className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold leading-tight text-[#0d2535]"
              initial={{ opacity: 0, y: 18 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Proven{" "}
              <span style={{ color: "#3aaece" }}>in practice.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CASES.map((c, i) => (
              <CaseCard key={c.id} caseItem={c} index={i} />
            ))}
          </div>

          {/* Additional sectors */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span className="text-xs font-medium text-[#9ca3af] mr-1">Also across</span>
            {["Retail", "Automotive", "Sports Streaming", "B2B Tech", "Consumer Electronics"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#d1d5db] px-3 py-1 text-xs font-medium text-[#6b7280]"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#3aaece] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d9ab8]"
            >
              View our work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function CaseCard({
  caseItem,
  index,
}: {
  caseItem: (typeof CASES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 280, damping: 22 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 280, damping: 22 });

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 200, damping: 25 });
  const glowYSpring = useSpring(glowY, { stiffness: 200, damping: 25 });
  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(dy * MAX_TILT);
    rotateY.set(-dx * MAX_TILT);
    glowX.set(e.clientX - cx);
    glowY.set(e.clientY - cy);
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(0);
    glowY.set(0);
    glowOpacity.set(0);
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ delay: index * 0.15, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col gap-6 rounded-xl bg-white border border-[#e5e7eb] px-9 py-10 overflow-hidden"
        style={{
          borderTop: "2px solid #3aaece",
          boxShadow: "0 4px 24px rgba(16,101,127,0.06)",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
        }}
      >
        {/* Cursor glow */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 220,
            height: 220,
            left: "50%",
            top: "50%",
            marginLeft: -110,
            marginTop: -110,
            x: glowXSpring,
            y: glowYSpring,
            opacity: glowOpacitySpring,
            background: "radial-gradient(circle, rgba(58,174,206,0.12) 0%, transparent 70%)",
          }}
        />

        <span className="text-xs font-semibold tracking-[0.15em] text-[#3aaece] uppercase">
          {caseItem.sector}
        </span>

        <div>
          <div
            className="font-bold leading-none text-[#0d2535]"
            style={{ fontSize: "clamp(3rem,5vw,4.5rem)" }}
          >
            {caseItem.stat}
            {caseItem.statSuffix && (
              <span
                className="font-bold text-[#3aaece]"
                style={{ fontSize: "clamp(1.5rem,2.5vw,2.25rem)" }}
              >
                {caseItem.statSuffix}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-[#4b5563]">{caseItem.label}</p>
        </div>

        <p className="mt-auto text-xs font-semibold tracking-[0.12em] uppercase text-[#9ca3af]">
          {caseItem.client}
        </p>
      </motion.div>
    </div>
  );
}
