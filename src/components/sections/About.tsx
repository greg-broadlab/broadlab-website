"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Team data ─────────────────────────────────────────────────────────────────
// Bio copy to be confirmed by each person before launch

const TEAM = [
  {
    name:  "Jakob Nielsen",
    role:  "CEO & Founder",
    image: "/images/team/jakob.jpeg",
    bio: [
      "Jakob Nielsen is a media technology entrepreneur and senior advertising executive with over 25 years of experience across Addressable TV, advanced advertising, and marketing technology. Before founding Broadlab, he held senior leadership roles across the advertising and media technology sector, including co-founding and leading several businesses alongside Irwin Gotlieb, Managing Director of GroupM UK Digital, and a board seat at INVIDI Technologies. He also held various roles in Europe at Microsoft Digital Advertising Solutions. He holds a Master's degree in Economics and Business Administration from Copenhagen Business School.",
      "As CEO and Founder of Broadlab, Jakob leads the company's vision and strategy, helping brands and agencies build accountable Addressable TV systems that connect audience intelligence, premium inventory, activation and measurement in one operating model.",
      "For brands, this means a simpler and more effective way to unlock the value of Addressable TV: smarter access to audiences, more accountable media investment, and clearer evidence of business impact across the full marketing funnel.",
    ],
  },
  {
    name:  "Matt Mee",
    role:  "Chief Strategy Officer",
    image: null,
    bio: [
      "Matt Mee is a media and strategy planning specialist, with 30 years of experience in leading integrated planning for brands as diverse as Mars, IKEA, VW and Adidas.",
      "As Global CSO of EssenceMediaCom, he led the development and global roll-out of their suite of advanced media planning and effectiveness tools.",
      "At Broadlab, he works with clients to design CTV solutions, customised for their categories and marketing challenges, that deliver market-leading results.",
    ],
  },
  {
    name:  "Kristian Claxton",
    role:  "Global EVP",
    image: null,
    bio: [
      "Kristian leads client relationships at Broadlab, helping brands build accountable CTV systems that deliver measurable results and proprietary marketing intelligence, creating competitive advantage.",
      "He brings 18 years of hands-on experience in digital marketing and advertising technology, including senior leadership at WPP, advising brands on Advanced TV strategy, marketing innovation and data.",
      "He guides customers through organisational change; helping teams adopt new capabilities, navigate adoption and build internal alignment around data-driven decision-making that drives performance and return on investment.",
    ],
  },
  {
    name:  "Brian Jents",
    role:  "Placeholder role — to be confirmed",
    image: null,
    bio: [
      "Placeholder — to be provided by Brian.",
    ],
  },
  {
    name:  "Carrie Ward",
    role:  "Global Head of Data Science",
    image: null,
    bio: [
      "Carrie Ward is a data scientist and optimisation specialist with over 20 years of experience building AI and machine learning systems for the advertising industry; including programmatic video, addressable TV, and digital out-of-home. She holds a Master's degree in Applied Mathematics and is a named inventor on two patents in machine learning and media inventory optimisation.",
      "At Broadlab, Carrie leads the data science function, developing the core algorithms, data infrastructure, and proprietary planning tool that sit at the heart of the platform.",
      "For brands, this translates into smarter campaign performance: precisely targeted audiences, continuously optimised budget allocation, and clear measurement of results across the full marketing funnel.",
    ],
  },
  {
    name:  "Jana Eisenstein",
    role:  "Placeholder role — to be confirmed",
    image: null,
    bio: [
      "Placeholder — to be provided by Jana.",
    ],
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center"
      style={{ background: "#f0f8fb", minHeight: "100vh" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-main relative z-10 section-padding">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.p>

          <h1
            className="font-bold leading-tight text-[#0d2535]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            {["The people behind", "the system."].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ delay: 0.1 + i * 0.13, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}

// ─── Company statement ─────────────────────────────────────────────────────────

function CompanyStatement() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
              transition={{ delay: 0.1, duration: 0.65 }}
            >
              <p
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)", color: "#0d2535" }}
              >
                &ldquo;We built the system the industry
                <span style={{ color: "#3aaece" }}> should have built</span> years ago.&rdquo;
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >
              {/* Placeholder — confirm company origin story with BroadLab before launch */}
              <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                Placeholder company statement — to be confirmed with BroadLab. A short
                paragraph on why BroadLab was founded, what problem was being solved,
                and what the team believed needed to change about the way CTV was bought
                and measured.
              </p>
              <p className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                Second paragraph — the team&apos;s background, the combination of
                data science, media and technology expertise, and what makes BroadLab&apos;s
                approach structurally different from anything that came before it.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team selector ─────────────────────────────────────────────────────────────

function TeamSection() {
  const [active, setActive] = useState(0);
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const person = TEAM[active];

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />
      <div className="container-main section-padding">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet the team
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">

          {/* Left — name list */}
          <motion.div
            className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -12 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            {TEAM.map((member, i) => (
              <button
                key={member.name}
                onClick={() => setActive(i)}
                className="text-left flex-shrink-0 lg:flex-shrink-[unset] rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  background:  active === i ? "#f0f8fb" : "transparent",
                  borderLeft:  `3px solid ${active === i ? "#3aaece" : "transparent"}`,
                }}
              >
                <p
                  className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal"
                  style={{ color: active === i ? "#0d2535" : "#6b7280" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-xs mt-0.5 hidden lg:block"
                  style={{ color: active === i ? "#3aaece" : "#9ca3af" }}
                >
                  {member.role}
                </p>
              </button>
            ))}
          </motion.div>

          {/* Right — bio content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Header row — photo + name */}
              <div className="flex items-center gap-6">
                <div
                  className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden"
                  style={{ background: "#f0f8fb", border: "1px solid rgba(58,174,206,0.2)" }}
                >
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={80}
                      height={80}
                      className="object-cover object-top w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p style={{ fontSize: "0.4375rem", letterSpacing: "0.12em", color: "rgba(58,174,206,0.35)" }}>
                        PHOTO
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-[#0d2535]" style={{ fontSize: "1.375rem" }}>
                    {person.name}
                  </h2>
                  <p className="text-sm font-medium text-[#3aaece] mt-0.5">{person.role}</p>
                </div>
              </div>

              <div className="h-px" style={{ background: "#e5e7eb" }} />

              {/* Bio */}
              <div className="flex flex-col gap-5 max-w-2xl">
                {person.bio.map((para, i) => (
                  <p key={i} className="text-[0.9375rem] leading-relaxed text-[#4b5563]">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <>
      <AboutHero />
      <CompanyStatement />
      <TeamSection />
    </>
  );
}
