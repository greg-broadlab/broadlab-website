"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

export default function SupportModels() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#ffffff" }}>
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.3)" }} />

      <div className="section-padding">
        <div className="container-main">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left — heading + model rows */}
            <div>
              <motion.h2
                className="mb-12 font-bold leading-tight text-[#0d2535]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Flexible support, built around your model.
              </motion.h2>

              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                {MODELS.map((model, i) => (
                  <motion.div
                    key={model.name}
                    className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-12 md:items-center"
                    style={{
                      borderBottom: i < MODELS.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : undefined,
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span
                      className="font-bold text-[#0d2535]"
                      style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" }}
                    >
                      {model.name}
                    </span>
                    <p
                      className="leading-relaxed text-[#4b5563]"
                      style={{ fontSize: "1rem" }}
                    >
                      {model.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — team photo placeholder */}
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/5" }}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: "#f0f8fb", border: "1.5px dashed rgba(58,174,206,0.35)" }}
              >
                {/* Placeholder person icon */}
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <circle cx="28" cy="20" r="10" fill="rgba(58,174,206,0.2)" />
                  <path d="M8 48c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="rgba(58,174,206,0.15)" />
                </svg>
                <p className="text-xs font-medium tracking-wide" style={{ color: "rgba(58,174,206,0.6)" }}>
                  Team photo coming soon
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
