"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CARD_HEIGHT = 340;
const DURATION = 4;

const TABS = [
  {
    id: "marketplaces",
    label: "Curated Marketplaces",
    headline: "Premium supply.\nDirect access.",
    body: "BroadLab builds and manages curated CTV marketplaces across the UK, US and Europe - giving brands and agencies direct access to premium inventory with fewer intermediaries, lower fees and full transparency on every deal.",
  },
  {
    id: "identity",
    label: "Identity Solutions",
    headline: "One view.\nYours to keep.",
    body: "We build privacy-safe, brand-specific identity graphs that combine CRM data, CTV exposure and geo audience signals into a single planning and measurement asset - one that compounds in value with every campaign.",
  },
  {
    id: "audience",
    label: "Audience Planning",
    headline: "Plan smarter.\nActivate with precision.",
    body: "BCAP is BroadLab's campaign and audience builder - designed to make complex CTV planning fast and precise. Define outcomes, build audiences, allocate supply and launch, all in one place.",
  },
  {
    id: "optimisation",
    label: "Optimisation",
    headline: "Every lever.\nAdjusted every day.",
    body: "46,000+ variables monitored continuously throughout every campaign. BroadLab's optimisation engine adjusts audience, creative, geography, supply and frequency daily - delivering measurable improvements while campaigns are live.",
  },
];

// ── Cards ─────────────────────────────────────────────────────────────────────

function MarketplacesCard() {
  const regions = [
    { name: "UK",     publishers: ["Netflix", "DAZN", "Samsung TV+", "Sky", "Disney+", "HBO Max", "ITVX", "All 4"] },
    { name: "US",     publishers: ["Netflix", "Hulu", "Disney+", "HBO Max", "Peacock", "Pluto TV", "Roku", "Paramount+"] },
    { name: "Europe", publishers: ["Netflix", "DAZN", "Samsung TV+", "RTL", "Disney+", "ProSieben", "Pluto TV", "YouTube"] },
  ];
  return (
    <div className="rounded-2xl bg-white border border-[#e5e7eb] p-5 overflow-hidden"
      style={{ height: CARD_HEIGHT, boxShadow: "0 4px 24px rgba(58,102,130,0.07)" }}>
      <div className="grid grid-cols-3 gap-4 h-full">
        {regions.map((r) => (
          <div key={r.name} className="overflow-hidden">
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#3a6682] mb-2">{r.name}</p>
            <div className="h-px bg-[#e5e7eb] mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {r.publishers.map((p) => (
                <span key={p}
                  className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                  style={{ background: "#3a6682", color: "white" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IdentityCard() {
  const signals = [
    { source: "CRM",  label: "Purchase history",   value: "High value customer" },
    { source: "CTV",  label: "Ad exposure",         value: "3 active campaigns"  },
    { source: "Geo",  label: "Location signal",     value: "SW1A · London, UK"   },
  ];
  return (
    <div className="rounded-2xl bg-white border border-[#e5e7eb] p-6 flex flex-col gap-4 overflow-hidden"
      style={{ height: CARD_HEIGHT, boxShadow: "0 4px 24px rgba(58,102,130,0.07)" }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] text-[#3a6682] uppercase">Audience Profile</p>
          <p className="text-xs font-semibold text-[#0d2535] mt-0.5">#GB-SW1A-0012</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#3a6682] px-2.5 py-1 rounded-full"
          style={{ background: "rgba(58,102,130,0.08)", border: "1px solid rgba(58,102,130,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3a6682]" />
          Privacy-safe
        </span>
      </div>

      <div className="h-px bg-[#f3f4f6]" />

      {/* Data signals */}
      <div className="flex flex-col gap-3">
        {signals.map((d) => (
          <div key={d.source} className="flex items-center gap-3 py-2 px-3 rounded-xl"
            style={{ background: "#f9fafb", border: "1px solid #f3f4f6" }}>
            <span className="text-[9px] font-bold px-2 py-1 rounded shrink-0 text-white"
              style={{ background: "#3a6682" }}>{d.source}</span>
            <span className="text-xs text-[#6b7280] flex-1">{d.label}</span>
            <span className="text-xs font-semibold text-[#0d2535]">{d.value}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#f3f4f6]" />

      {/* Feature pills */}
      <div className="flex gap-2 flex-wrap mt-auto">
        {["No PII stored", "Brand-owned asset", "Compounds over time"].map((f) => (
          <span key={f} className="text-[10px] font-medium px-2.5 py-1 rounded-full text-[#6b7280]"
            style={{ background: "#f3f4f6", border: "1px solid #e5e7eb" }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function BCAPCard() {
  const [activeNav, setActiveNav] = useState(1);
  const navItems = ["Audience", "Plan", "Supply", "Review", "Report"];
  const suppliers = [
    { name: "Netflix",  cpm: "£17.64", type: "SVOD", meas: true  },
    { name: "DAZN",     cpm: "£15.00", type: "FAST", meas: true  },
    { name: "HBO Max",  cpm: "£11.00", type: "SVOD", meas: false },
    { name: "Disney+",  cpm: "£14.50", type: "AVOD", meas: true  },
    { name: "Sky",      cpm: "£18.56", type: "FAST", meas: true  },
  ];
  return (
    <div className="rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden flex"
      style={{ height: CARD_HEIGHT, boxShadow: "0 4px 24px rgba(58,102,130,0.07)" }}>
      {/* Sidebar */}
      <div className="w-10 flex flex-col items-center gap-3 py-4 shrink-0"
        style={{ background: "#f8fafc", borderRight: "1px solid #e5e7eb" }}>
        {["◉","⊞","≡","⊙","▤"].map((icon, i) => (
          <button key={i} onClick={() => setActiveNav(i)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[11px] transition-colors"
            style={{ background: activeNav === i ? "rgba(58,102,130,0.1)" : "transparent",
                     color: activeNav === i ? "#3a6682" : "#9ca3af" }}>
            {icon}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-4 py-3 shrink-0" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <p className="text-[11px] font-bold text-[#0d2535] truncate">Cambridge Building Society</p>
          <p className="text-[10px] text-[#9ca3af]">Supply allocation and pricing</p>
        </div>
        <div className="flex shrink-0 px-4 pt-2.5">
          {navItems.map((n, i) => (
            <button key={n} onClick={() => setActiveNav(i)}
              className="text-[10px] font-semibold px-3 py-1.5 transition-colors"
              style={{ borderBottom: activeNav === i ? "2px solid #3a6682" : "2px solid transparent",
                       color: activeNav === i ? "#3a6682" : "#9ca3af" }}>
              {n}
            </button>
          ))}
        </div>
        <div className="flex-1 px-4 py-3 overflow-hidden">
          <p className="text-[10px] font-bold text-[#9ca3af] tracking-[0.1em] uppercase mb-2">Supply Allocation</p>
          <div className="space-y-0">
            {suppliers.map((s) => (
              <div key={s.name} className="flex items-center gap-2 py-2"
                style={{ borderBottom: "1px solid #f9fafb" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: s.meas ? "#3a6682" : "#d1d5db" }} />
                <span className="text-[11px] font-semibold text-[#0d2535] flex-1 truncate">{s.name}</span>
                <span className="text-[10px] text-[#6b7280]">{s.cpm}</span>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded text-[#6b7280]"
                  style={{ background: "#f3f4f6" }}>{s.type}</span>
                <span className="text-[10px] font-bold" style={{ color: s.meas ? "#3a6682" : "#d1d5db" }}>
                  {s.meas ? "✓" : "✗"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OptimisationCard() {
  const levers = [
    { name: "Audience targeting", pct: 78, change: "+12%" },
    { name: "Creative rotation",  pct: 63, change: "+8%"  },
    { name: "Geography",          pct: 45, change: "-5%"  },
    { name: "Supply selection",   pct: 91, change: "+3%"  },
    { name: "Frequency cap",      pct: 55, change: "-2%"  },
    { name: "Bid strategy",       pct: 82, change: "+6%"  },
  ];
  return (
    <div className="rounded-2xl bg-white border border-[#e5e7eb] p-5 overflow-hidden"
      style={{ height: CARD_HEIGHT, boxShadow: "0 4px 24px rgba(58,102,130,0.07)" }}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[#9ca3af] uppercase">Live optimisation</p>
        <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#3a6682]">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-[#3a6682]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
          RUNNING
        </span>
      </div>
      <div className="space-y-3">
        {levers.map((lever, i) => (
          <div key={lever.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-[#4b5563]">{lever.name}</span>
              <span className="text-[10px] font-bold"
                style={{ color: lever.change.startsWith("+") ? "#3a6682" : "#f59e0b" }}>
                {lever.change}
              </span>
            </div>
            <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: lever.change.startsWith("+") ? "#3a6682" : "#3a6682" }}
                initial={{ width: 0 }}
                animate={{ width: `${lever.pct}%` }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CARDS = [MarketplacesCard, IdentityCard, BCAPCard, OptimisationCard];

// ── Section ───────────────────────────────────────────────────────────────────
export default function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    const map: Record<string, number> = { marketplaces: 0, identity: 1, audience: 2, optimisation: 3 };
    const hash = window.location.hash.replace("#", "");
    if (hash in map) setActive(map[hash]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const index = (e as CustomEvent).detail?.index;
      if (typeof index === "number") {
        setActive(index);
        setPaused(true);
        setTimeout(() => setPaused(false), 100);
      }
    };
    window.addEventListener("switchTab", handler);
    return () => window.removeEventListener("switchTab", handler);
  }, []);

  const handleTabClick = (i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 100);
  };

  const ActiveCard = CARDS[active];

  return (
    <section id="solutions" ref={ref} className="bg-white">
      <div className="h-px w-full bg-[#e5e7eb]" />

      <div className="section-padding">
        <div className="container-main">

          {/* Tab nav */}
          <motion.div className="flex flex-wrap gap-0 mb-12 border-b border-[#e5e7eb]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
            transition={{ duration: 0.5 }}>
            {TABS.map((tab, i) => (
              <button key={tab.id} onClick={() => handleTabClick(i)}
                className="relative px-6 py-4 text-sm font-semibold transition-colors duration-200 focus:outline-none"
                style={{ color: active === i ? "#0d2535" : "#9ca3af" }}>
                {tab.label}
                {active === i && !paused && inView && (
                  <motion.div
                    key={`${active}-progress`}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#3a6682]"
                    style={{ transformOrigin: "left", width: "100%" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: DURATION, ease: "linear" }}
                    onAnimationComplete={() => setActive((active + 1) % TABS.length)}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>

              {/* Left - copy */}
              <div className="flex flex-col justify-center" style={{ minHeight: CARD_HEIGHT }}>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#3a6682] mb-5">
                  {String(active + 1).padStart(2, "0")} / {TABS[active].label}
                </p>
                <h2 className="font-bold leading-tight text-[#0d2535]"
                  style={{ fontSize: "clamp(1.75rem,3.2vw,2.75rem)" }}>
                  {TABS[active].headline.split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </h2>
                <p className="mt-5 leading-relaxed text-[#4b5563]"
                  style={{ fontSize: "1.0625rem", maxWidth: "28rem" }}>
                  {TABS[active].body}
                </p>
              </div>

              {/* Right - card (fixed height) */}
              <div style={{ height: CARD_HEIGHT }}>
                <ActiveCard />
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
