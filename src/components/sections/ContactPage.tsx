"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

// ─── Contact ───────────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; company: string; reason: string };
const EMPTY: FormState = { name: "", email: "", company: "", reason: "" };

export default function ContactPage() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm]     = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Honeypot — populated by bots, invisible to humans
  const [honeypot, setHoneypot] = useState("");

  function set(key: keyof FormState) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("sent");
        setForm(EMPTY);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: "#f0f8fb" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-main relative z-10 section-padding w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — details */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#3aaece]">
              Talk to BroadLab
            </p>
            <h1
              className="font-bold text-[#0d2535] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Let&apos;s see if we&apos;re<br />the right fit.
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-[#4b5563]">
              Tell us about your brand and what you&apos;re trying to achieve.
              We&apos;ll come back to you within one business day.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <a
                href="mailto:info@broadlab.tv"
                className="text-sm font-medium text-[#3aaece] transition-opacity hover:opacity-70"
              >
                info@broadlab.tv
              </a>

              <div className="h-px w-12" style={{ background: "rgba(58,174,206,0.3)" }} />

              <address className="not-italic text-sm leading-relaxed text-[#6b7280]">
                Unit 5, 2nd Floor<br />
                The Market Exchange<br />
                12 Macklin Street<br />
                London WC2B 5NF<br />
                United Kingdom
              </address>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="rounded-2xl p-8 sm:p-10 bg-white shadow-[0_4px_40px_rgba(13,37,53,0.08)]"
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
                  {/* Honeypot — hidden from humans, traps bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                  />
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
                  {status === "error" && (
                    <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: status === "sending" ? "#9ca3af" : "#10657f", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "error" ? 1 : undefined }}
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
