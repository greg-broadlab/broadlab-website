"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const BARRIERS = [
  {
    n: "01",
    title: "Fragmentation",
    desc: "CTV is bought across multiple platforms with duplicate audiences, no unified reporting and no clear picture of what's actually working.",
  },
  {
    n: "02",
    title: "Focus",
    desc: "CTV falls between TV and digital teams, so it rarely gets the strategic focus or planning logic the channel deserves.",
  },
  {
    n: "03",
    title: "Metrics",
    desc: "Most CTV is still measured on delivery — impressions, completions, CPM — not on what it does for the business.",
  },
];

const MAX_TILT = 10;

function BarrierCard({ barrier, index, inView }: {
  barrier: typeof BARRIERS[number];
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
    <div style={{ perspective: "1000px" }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col gap-4 rounded-xl p-7 overflow-hidden h-full"
        style={{
          border: "1px solid rgba(58,174,206,0.18)",
          borderTop: "2px solid #3aaece",
          boxShadow: "0 2px 16px rgba(10,59,75,0.06)",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 + index * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Light glow that follows cursor */}
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

        <span
          className="font-bold leading-none select-none"
          style={{ fontSize: "2rem", color: "rgba(58,174,206,0.2)" }}
        >
          {barrier.n}
        </span>
        <h3 className="font-semibold text-[#0d2535] text-xl leading-snug">
          {barrier.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#4b5563]">
          {barrier.desc}
        </p>
      </motion.div>
    </div>
  );
}

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
              className="font-bold text-[#0d2535] leading-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              What&apos;s holding CTV back.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {BARRIERS.map((barrier, i) => (
              <BarrierCard key={barrier.n} barrier={barrier} index={i} inView={inView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
