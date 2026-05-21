"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Awards ────────────────────────────────────────────────────────────────────
// PLACEHOLDER — first entry confirmed. Remaining are templates.

const AWARDS = [
  {
    body:      "Thinkbox TV Planning Awards",
    category:  "Best use of Addressability",
    campaign:  "BroadLab for Scottish Widows",
    year:      "2025",
    status:    "Shortlisted",
    confirmed: true,
  },
  {
    body:      "Placeholder",
    category:  "",
    campaign:  "",
    year:      "",
    status:    "Placeholder",
    confirmed: false,
  },
  {
    body:      "Placeholder",
    category:  "",
    campaign:  "",
    year:      "",
    status:    "Placeholder",
    confirmed: false,
  },
] as const;

// ─── Intro ─────────────────────────────────────────────────────────────────────

function IntroSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#f0f8fb" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-main relative z-10 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece] mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          <h1
            className="font-bold leading-tight text-[#0d2535]"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
          >
            {["The intelligence layer", "for outcome-driven TV."].map((line, i) => (
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

          <motion.p
            className="mt-6 text-[1.0625rem] leading-relaxed text-[#4b5563] max-w-xl mx-auto"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.55 }}
          >
            Specialists across data, technology, supply and measurement — working as one connected system.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─── Industry Recognition ──────────────────────────────────────────────────────

function RecognitionSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "white" }}>
      <div className="h-px w-full" style={{ background: "#e5e7eb" }} />
      <div className="section-padding">
        <div className="container-main">

          <div className="mb-12">
            <motion.p
              className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-4 text-[#3aaece]"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              Industry recognition
            </motion.p>
            <motion.h2
              className="font-bold text-[#0d2535]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Recognised for what we build.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(58,174,206,0.12)" }}>
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                className="bg-white flex flex-col gap-5 p-8"
                style={{
                  borderTop: `3px solid ${award.confirmed ? "#3aaece" : "rgba(58,174,206,0.2)"}`,
                  opacity: award.confirmed ? 1 : 0.45,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? (award.confirmed ? 1 : 0.45) : 0, y: inView ? 0 : 20 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center justify-between">
                  {award.confirmed ? (
                    <div
                      className="flex items-center justify-center rounded px-2.5 py-1.5"
                      style={{ background: "#f0f8fb", border: "1px solid rgba(58,174,206,0.2)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/thinkbox.png" alt="Thinkbox" style={{ height: 20, width: "auto" }} />
                    </div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.43.59 3.435L7 8.75l-3.09 1.75.59-3.435L2 4.635l3.455-.545L7 1z"
                        fill="rgba(58,174,206,0.3)" />
                    </svg>
                  )}
                  <span
                    className="text-[0.625rem] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-1"
                    style={{
                      color:      award.confirmed ? "#3aaece" : "rgba(58,174,206,0.35)",
                      background: award.confirmed ? "rgba(58,174,206,0.1)" : "rgba(58,174,206,0.04)",
                    }}
                  >
                    {award.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  <p className="font-bold text-[#0d2535] leading-snug" style={{ fontSize: "0.9375rem" }}>
                    {award.body}
                  </p>
                  <p className="text-sm text-[#6b7280]">{award.category}</p>
                </div>

                <div className="pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #e5e7eb" }}>
                  <p className="text-xs" style={{ color: award.confirmed ? "#3aaece" : "#d1d5db" }}>
                    {award.campaign}
                  </p>
                  <p className="text-xs font-semibold tabular-nums text-[#9ca3af]">{award.year}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Form helpers ──────────────────────────────────────────────────────────────

const inputBase = "w-full rounded-lg px-4 py-3 text-sm text-[#0d2535] outline-none transition-all duration-200";
const inputDefault = { background: "white", border: "1px solid #e5e7eb" };
const inputFocused = { background: "white", border: "1px solid rgba(58,174,206,0.6)", boxShadow: "0 0 0 3px rgba(58,174,206,0.08)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#6b7280]">{label}</label>
      {children}
    </div>
  );
}

function FocusInput({ type = "text", name, value, onChange, placeholder }: {
  type?: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} name={name} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className={inputBase}
      style={focused ? { ...inputDefault, ...inputFocused } : inputDefault}
    />
  );
}

function FocusTextarea({ name, value, onChange, placeholder }: {
  name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name} value={value} rows={4} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className={inputBase + " resize-none leading-relaxed"}
      style={focused ? { ...inputDefault, ...inputFocused } : inputDefault}
    />
  );
}

// ─── Book a call ───────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; company: string; reason: string };
const EMPTY: FormState = { name: "", email: "", company: "", reason: "" };

function BookACall() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm]     = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set(key: keyof FormState) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => { setStatus("sent"); setForm(EMPTY); }, 800);
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden" style={{ background: "#f0f8fb" }}>
      <div className="h-px w-full" style={{ background: "rgba(58,174,206,0.2)" }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-main relative z-10 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — heading */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece]">
              Talk to BroadLab
            </p>
            <h2
              className="font-bold text-[#0d2535] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Let&apos;s see if we&apos;re<br />the right fit.
            </h2>
            <p className="text-[1.0625rem] leading-relaxed text-[#4b5563]">
              Tell us about your brand and what you&apos;re trying to achieve.
              We&apos;ll come back to you within one business day.
            </p>
            <a
              href="mailto:hello@broadlab.tv"
              className="text-sm font-medium text-[#3aaece] transition-opacity hover:opacity-70 mt-2"
            >
              hello@broadlab.tv
            </a>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            className="rounded-2xl p-8 sm:p-10 bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center text-center gap-5 py-8"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(58,174,206,0.1)" }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M4 11l5 5L18 6" stroke="#3aaece" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1.5 text-[#0d2535]">Message sent.</p>
                    <p className="text-sm leading-relaxed text-[#6b7280] max-w-xs">
                      We&apos;ll be in touch within one business day.
                    </p>
                  </div>
                  <button onClick={() => setStatus("idle")} className="text-xs font-semibold text-[#9ca3af]">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your name">
                      <FocusInput name="name" value={form.name} onChange={set("name")} placeholder="Jane Smith" />
                    </Field>
                    <Field label="Email address">
                      <FocusInput type="email" name="email" value={form.email} onChange={set("email")} placeholder="jane@brand.com" />
                    </Field>
                  </div>
                  <Field label="Company">
                    <FocusInput name="company" value={form.company} onChange={set("company")} placeholder="Your brand or agency" />
                  </Field>
                  <Field label="What are you trying to achieve?">
                    <FocusTextarea name="reason" value={form.reason} onChange={set("reason")} placeholder="Tell us the outcome you're working towards and where CTV fits in..." />
                  </Field>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: status === "sending" ? "#9ca3af" : "#10657f", cursor: status === "sending" ? "not-allowed" : "pointer" }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                          <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                          <path d="M6.5 1.5A5 5 0 0 1 11.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                          <path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <IntroSection />
      <RecognitionSection />
      <BookACall />
    </>
  );
}
