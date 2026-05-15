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
    <section ref={ref} style={{ background: "#0a3b4b" }}>
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.4)" }} />

      <div className="section-padding">
        <div className="container-main">

          <motion.h2
            className="mb-14 text-center font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Flexible support, built around your model.
          </motion.h2>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {MODELS.map((model, i) => (
              <motion.div
                key={model.name}
                className="grid grid-cols-1 gap-3 py-9 md:grid-cols-[1fr_2fr] md:gap-20 md:items-center"
                style={{
                  borderBottom: i < MODELS.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : undefined,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span
                  className="font-bold text-white"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                >
                  {model.name}
                </span>
                <p
                  className="leading-relaxed"
                  style={{ color: "rgba(234,246,251,0.65)", fontSize: "1rem" }}
                >
                  {model.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
