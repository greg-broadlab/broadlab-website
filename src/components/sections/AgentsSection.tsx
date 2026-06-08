"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AGENTS = [
  {
    id: "data",
    role: "General AI Agent",
    tagline: "Ask anything about campaigns, supply, delivery or the wider data model - in plain English.",
    skills: ["Campaigns & Delivery", "Supply & Deals", "Geographic Breakdown", "Industry & Glossary"],
    prompts: ["What's my campaign pacing this week?", "Which supply is underperforming?"],
  },
  {
    id: "optimisation",
    role: "Optimisation Agent",
    tagline: "Dig into campaign performance, surface conversion insights and make data-driven optimisation decisions.",
    skills: ["Campaign Performance", "Conversion Insights", "Optimisation Rounds", "Change Log"],
    prompts: ["Start an optimisation round", "Where should I reallocate budget?"],
  },
  {
    id: "strategy",
    role: "Strategy Agent",
    tagline: "Builds briefs, plans audiences, structures campaigns and surfaces recommendations - before a pound is spent.",
    skills: ["Campaign Briefs", "Audience Strategy", "Client Recommendations", "Budget Planning"],
    prompts: ["Build a campaign brief for this client", "What audience should I target?"],
  },
];

function AgentCard({ agent, index, inView }: { agent: typeof AGENTS[number]; index: number; inView: boolean }) {
  return (
    <motion.div
      className="flex flex-col rounded-2xl overflow-hidden bg-white"
      style={{
        border: "1px solid rgba(58,174,206,0.18)",
        boxShadow: "0 4px 24px rgba(16,101,127,0.07)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Card header */}
      <div className="px-6 py-5" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "#3aaece" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.7 }}
            />
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#3aaece]">
              Active
            </span>
          </div>
        </div>
        <p className="text-sm font-bold text-[#0d2535]">{agent.role}</p>
        <p className="mt-2 text-xs leading-relaxed text-[#6b7280]" style={{ minHeight: "3.5rem" }}>{agent.tagline}</p>
      </div>

      {/* Skills */}
      <div className="px-6 py-4 flex-1">
        <p className="text-[9px] font-bold tracking-[0.16em] uppercase mb-3 text-[#9ca3af]">Skills</p>
        <div className="grid grid-cols-2 gap-2">
          {agent.skills.map((skill) => (
            <div key={skill}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[10px] font-medium text-[#4b5563]"
              style={{
                background: "#f9fafb",
                border: "1px solid #f3f4f6",
              }}>
              {skill}
              <span className="text-[#3aaece]">›</span>
            </div>
          ))}
        </div>

        {/* Suggested prompts */}
        <div className="mt-4 space-y-2">
          {agent.prompts.map((prompt) => (
            <div key={prompt}
              className="px-3 py-2 rounded-lg text-[10px] text-[#4b5563]"
              style={{
                background: "rgba(58,174,206,0.06)",
                border: "1px solid rgba(58,174,206,0.15)",
              }}>
              {prompt}
            </div>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="px-6 py-4" style={{ borderTop: "1px solid #f3f4f6" }}>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
          <span className="text-[10px] flex-1 text-[#d1d5db]">
            Or type your own question…
          </span>
          <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#3aaece" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#f0f8fb" }}>
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.3)" }} />

      <div className="section-padding">
        <div className="container-main">

          {/* Header */}
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
<motion.h2
                className="font-bold leading-tight text-[#0d2535]"
                style={{ fontSize: "clamp(2rem,3.8vw,3.25rem)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
                transition={{ delay: 0.1, duration: 0.6 }}>
                Built on agentic AI.
              </motion.h2>
            </div>
            <motion.p
              className="leading-relaxed text-[#4b5563]"
              style={{ fontSize: "1.0625rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}>
              Three AI agents, each built on BroadLab&apos;s proprietary data and tailored for a specific job - powering every decision we make across your campaigns.
            </motion.p>
          </div>

          {/* Agent cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENTS.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} inView={inView} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
