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
    image: "/images/team/jakob.jpg",
    bio: [
      "Jakob Nielsen is a media technology entrepreneur and senior advertising executive with over 25 years of experience across Addressable TV, advanced advertising, and marketing technology. Before founding Broadlab, he held senior leadership roles across the advertising and media technology sector, including co-founding and leading several businesses alongside Irwin Gotlieb, Managing Director of GroupM UK Digital, and a board seat at INVIDI Technologies. He also held various roles in Europe at Microsoft Digital Advertising Solutions. He holds a Master's degree in Economics and Business Administration from Copenhagen Business School.",
      "As CEO and Founder of Broadlab, Jakob leads the company's vision and strategy, helping brands and agencies build accountable Addressable TV systems that connect audience intelligence, premium inventory, activation and measurement in one operating model.",
      "For brands, this means a simpler and more effective way to unlock the value of Addressable TV: smarter access to audiences, more accountable media investment, and clearer evidence of business impact across the full marketing funnel.",
    ],
  },
  {
    name:  "Brian Jentz",
    role:  "Chief Product Officer",
    image: "/images/team/brian.jpg",
    bio: [
      "Brian Jentz is a product visionary who has spent over 20 years at the forefront of connected TV, video streaming and advertising technology. Having lived through every major inflection point in the industry, from the earliest days of IPTV and OTT through to programmatic video, linear addressable TV and CTV, he brings a rare combination of deep technical knowledge, commercial instinct and hands-on product leadership at a moment when AI is fundamentally reshaping how programmatic advertising works.",
      "At Broadlab, Brian leads product management, engineering and data science. Drawing on senior roles at Roku, Nielsen's Advanced Video Advertising division, Sorenson Media and Xumo / Specific Media, he is building the next generation of AI-driven tools that sit at the heart of Broadlab's CTV advertising platform, from advanced forecasting and audience intelligence to in-flight optimisation algorithms that learn and adapt in real time.",
      "Brian's focus is on solving the two problems that have historically held Addressable TV back: the operational complexity that makes it hard to scale outcomes, and the lack of transparency that makes results difficult to interpret and act on. By combining a cutting-edge platform with a specialist team of data scientists and CTV experts, he ensures that every campaign is built to perform, and that the intelligence it generates is put straight back to work.",
    ],
  },
  {
    name:  "Carrie Ward",
    role:  "Global Head of Data Science",
    image: "/images/team/carrie.jpg",
    bio: [
      "Carrie Ward is a data scientist and optimisation specialist with over 20 years of experience building AI and machine learning systems for the advertising industry; including programmatic video, addressable TV, and digital out-of-home. She holds a Master's degree in Applied Mathematics and is a named inventor on two patents in machine learning and media inventory optimisation.",
      "At Broadlab, Carrie leads the data science function, developing the core algorithms, data infrastructure, and proprietary planning tool that sit at the heart of the platform.",
      "For brands, this translates into smarter campaign performance: precisely targeted audiences, continuously optimised budget allocation, and clear measurement of results across the full marketing funnel.",
    ],
  },
  {
    name:  "Matt Mee",
    role:  "Chief Strategy Officer",
    image: "/images/team/matt.jpg",
    bio: [
      "Matt Mee is a media and strategy planning specialist, with 30 years of experience in leading integrated planning for brands as diverse as Mars, IKEA, VW and Adidas.",
      "As Global CSO of EssenceMediaCom, he led the development and global roll-out of their suite of advanced media planning and effectiveness tools.",
      "At Broadlab, he works with clients to design CTV solutions, customised for their categories and marketing challenges, that deliver market-leading results.",
    ],
  },
  {
    name:  "Kristian Claxton",
    role:  "Global EVP",
    image: "/images/team/kristian.jpg",
    bio: [
      "Kristian leads client relationships at Broadlab, helping brands build accountable CTV systems that deliver measurable results and proprietary marketing intelligence, creating competitive advantage.",
      "He brings 18 years of hands-on experience in digital marketing and advertising technology, including senior leadership at WPP, advising brands on Advanced TV strategy, marketing innovation and data.",
      "He guides customers through organisational change; helping teams adopt new capabilities, navigate adoption and build internal alignment around data-driven decision-making that drives performance and return on investment.",
    ],
  },
  {
    name:  "Cath Crow",
    role:  "Global Head of Client Success",
    image: "/images/team/cath.jpg",
    bio: [
      "Cath Crow is Global Head of Client Success at Broadlab, bringing more than 30 years of experience across performance TV and media. Widely recognised as a pioneer in performance television, she has spent her career helping brands connect media investment to measurable business outcomes.",
      "Before joining Broadlab, Cath spent 12 years at Sky Media as Head of Performance, where she helped pioneer deterministic tracking and outcome-based TV buying, working with leading advertisers and agencies to demonstrate the power of accountable television advertising. Prior to Sky, she led the DRTV business at Mediacom for 20 years, developing and delivering response-driven campaigns for major brands.",
      "At Broadlab, Cath works with brands and agencies to unlock the full potential of Connected TV through advanced audience targeting, campaign optimisation, and transparent measurement solutions that drive growth and performance.",
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
      className="relative flex items-center justify-center text-center"
      style={{ height: "100%" }}
    >
      {/* Background photo — overflow hidden scoped to image only so text descenders aren't clipped */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/engine-room.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay — matches Our Work page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(170deg, rgba(13,37,53,0.42) 0%, rgba(13,37,53,0.68) 55%, rgba(13,37,53,0.88) 100%)",
        }}
      />

      <div className="relative z-10 px-6">
        {/* Eyebrow with accent lines */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block w-8 h-px" style={{ background: "rgba(143,179,200,0.8)" }} />
          <span
            className="text-[0.6875rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: "rgba(143,179,200,0.9)" }}
          >
            Our Team
          </span>
          <span className="block w-8 h-px" style={{ background: "rgba(143,179,200,0.8)" }} />
        </motion.div>

        <h1
          className="font-bold text-white"
          style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
        >
          {["The people behind", "the system."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ delay: 0.12 + i * 0.14, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        <motion.p
          className="mt-6 text-[1.0625rem] leading-relaxed mx-auto max-w-xl"
          style={{ color: "rgba(255,255,255,0.72)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
          transition={{ delay: 0.42, duration: 0.55 }}
        >
          The specialists who built the system, and who run it for every client.
        </motion.p>
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
                &ldquo;AI has allowed us to build the system
                <span style={{ color: "#3a6682" }}> the industry should have built </span>years ago.&rdquo;
              </p>
            </motion.div>

            <motion.div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >
              <Image
                src="/images/team-work.jpg"
                alt="Broadlab team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team bio panel ────────────────────────────────────────────────────────────

const CARET_POSITIONS = ["calc(16.67% - 8px)", "calc(50% - 8px)", "calc(83.33% - 8px)"];

function TeamBioPanel({ index, onClose }: { index: number; onClose: () => void }) {
  const person = TEAM[index];
  const col    = index % 3;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl p-8 lg:p-10"
      style={{ background: "#f8fafc", border: "1px solid rgba(58,102,130,0.12)" }}
    >
      {/* Caret pointing up to the clicked card */}
      <div
        className="absolute -top-[9px] w-4 h-4 rotate-45 rounded-sm"
        style={{
          left: CARET_POSITIONS[col],
          background: "#f8fafc",
          borderTop: "1px solid rgba(58,102,130,0.12)",
          borderLeft: "1px solid rgba(58,102,130,0.12)",
        }}
      />

      <div className="flex items-center gap-4 mb-6">
        <div
          className="shrink-0 rounded-xl overflow-hidden"
          style={{ width: 64, height: 76, border: "1px solid rgba(58,102,130,0.15)", flexShrink: 0 }}
        >
          <Image
            src={person.image}
            alt={person.name}
            width={64}
            height={76}
            className="object-cover object-top w-full h-full"
          />
        </div>
        <div>
          <h2 className="font-bold text-[#0d2535]" style={{ fontSize: "1.25rem" }}>{person.name}</h2>
          <p className="text-sm font-medium text-[#3a6682] mt-0.5">{person.role}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto rounded-full p-2 transition-colors duration-200 hover:bg-[#eaf1f6]"
          aria-label="Close bio"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="h-px mb-6" style={{ background: "#e5e7eb" }} />

      <div className="flex flex-col gap-4 max-w-3xl">
        {person.bio.map((para, i) => (
          <p key={i} className="text-[0.9375rem] leading-relaxed text-[#4b5563]">{para}</p>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Team section — photo card grid ───────────────────────────────────────────

function TeamCard({
  member, index, active, inView, onClick,
}: {
  member: typeof TEAM[0]; index: number; active: number | null; inView: boolean; onClick: () => void;
}) {
  const isActive = active === index;
  return (
    <motion.button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl text-left focus:outline-none"
      style={{
        aspectRatio: "3/4",
        border: `2px solid ${isActive ? "#3a6682" : "transparent"}`,
        boxShadow: isActive ? "0 0 0 4px rgba(58,102,130,0.15)" : "0 2px 16px rgba(13,37,53,0.08)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="absolute inset-0 bg-[#eaf1f6]">
        {member.image && (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pt-10 pb-4"
        style={{ background: "linear-gradient(to top, rgba(13,37,53,0.88) 0%, rgba(13,37,53,0.5) 60%, transparent 100%)" }}
      >
        <p className="font-bold text-white text-[0.9375rem] leading-snug">{member.name}</p>
        <p className="text-[0.75rem] mt-0.5" style={{ color: "rgba(143,179,200,0.9)" }}>{member.role}</p>
      </div>
      {isActive && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3a6682" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5.5L4 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}

function TeamSection() {
  const [active, setActive] = useState<number | null>(null);
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (i: number) => setActive(active === i ? null : i);

  const row1 = TEAM.slice(0, 3);
  const row2 = TEAM.slice(3);

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />
      <div className="container-main section-padding">

        <motion.p
          className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3a6682] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet the team
        </motion.p>

        <div className="flex flex-col gap-5">

          {/* Row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {row1.map((member, localIdx) => (
              <TeamCard
                key={member.name}
                member={member}
                index={localIdx}
                active={active}
                inView={inView}
                onClick={() => toggle(localIdx)}
              />
            ))}
          </div>

          <AnimatePresence>
            {active !== null && active < 3 && (
              <TeamBioPanel key={active} index={active} onClose={() => setActive(null)} />
            )}
          </AnimatePresence>

          {/* Row 2 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {row2.map((member, localIdx) => {
              const globalIdx = localIdx + 3;
              return (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={globalIdx}
                  active={active}
                  inView={inView}
                  onClick={() => toggle(globalIdx)}
                />
              );
            })}
          </div>

          <AnimatePresence>
            {active !== null && active >= 3 && (
              <TeamBioPanel key={active} index={active} onClose={() => setActive(null)} />
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div style={{ background: "#0d2535" }}>

      {/* Sticky hero — content slides over on scroll */}
      <div style={{ position: "sticky", top: 0, height: "100svh", zIndex: 0 }}>
        <AboutHero />
      </div>

      {/* Slides up over the hero */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "white",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 48px rgba(13,37,53,0.12)",
        }}
      >
        <CompanyStatement />
        <TeamSection />
      </div>

    </div>
  );
}
