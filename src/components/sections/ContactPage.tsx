"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Form inputs ───────────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-lg px-4 py-3 text-sm text-[#0a3b4b] outline-none transition-all duration-200";
const inputDefault = { background: "#f9fafb", border: "1px solid #e5e7eb" };
const inputFocused = {
  background: "white",
  border: "1px solid rgba(58,174,206,0.6)",
  boxShadow: "0 0 0 3px rgba(58,174,206,0.08)",
};

function FocusInput({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputBase}
      style={focused ? { ...inputDefault, ...inputFocused } : inputDefault}
    />
  );
}

function FocusTextarea({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      rows={5}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputBase + " resize-none leading-relaxed"}
      style={focused ? { ...inputDefault, ...inputFocused } : inputDefault}
    />
  );
}

// ─── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  const [booked, setBooked] = useState(false);

  if (booked) {
    return (
      <motion.div
        className="flex flex-col items-center text-center gap-5 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(58,174,206,0.12)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 11l5 5L18 6" stroke="#3aaece" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1.5" style={{ color: "#0a3b4b" }}>All set.</h3>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6b7280" }}>
            Your message is sent and a call is booked. We look forward to speaking with you.
          </p>
        </div>
        <button onClick={onReset} className="text-xs font-semibold" style={{ color: "#9ca3af" }}>
          Back to contact
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-7"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      {/* Confirmation */}
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: "rgba(58,174,206,0.12)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 9l4 4L15 5" stroke="#3aaece" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-base mb-1" style={{ color: "#0a3b4b" }}>Message sent.</p>
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            We&apos;ll be in touch within one business day.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: "#e5e7eb" }} />

      {/* Book a call CTA */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: "#0a3b4b" }}>
            Want to talk sooner?
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            Book a time directly in our calendar and we&apos;ll show you exactly
            how BroadLab applies to your brand.
          </p>
        </div>

        {/* Calendly placeholder — swap href once account is live */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setBooked(true); }}
          className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ background: "#0a3b4b" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="white" strokeWidth="1.3" />
            <path d="M4 1v2.5M10 1v2.5M1 5.5h12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Book a time to chat
        </a>

        <button
          onClick={onReset}
          className="text-xs font-medium transition-opacity hover:opacity-60"
          style={{ color: "#9ca3af" }}
        >
          No thanks — we&apos;ll be in touch
        </button>
      </div>
    </motion.div>
  );
}

// ─── Contact form ──────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; message: string };
const EMPTY: FormState = { name: "", email: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
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
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SuccessState onReset={() => setStatus("idle")} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FocusInput name="name" value={form.name} onChange={set("name")} placeholder="Your name" />
            <FocusInput type="email" name="email" value={form.email} onChange={set("email")} placeholder="Email address" />
          </div>
          <FocusTextarea
            name="message"
            value={form.message}
            onChange={set("message")}
            placeholder="Tell us about your brand and what you're trying to achieve with CTV..."
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{
              background: status === "sending" ? "#9ca3af" : "#0a3b4b",
              cursor: status === "sending" ? "not-allowed" : "pointer",
            }}
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
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center" style={{ background: "#0a3b4b" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,174,206,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(7,28,42,0.65) 100%)",
        }}
      />

      <div className="container-main relative z-10 w-full section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — context */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            <div>
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#3aaece" }}>
                Get in touch
              </p>
              <h1
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(2.25rem,4.5vw,3.75rem)" }}
              >
                Let&apos;s build something
                <span style={{ color: "#3aaece" }}> that works.</span>
              </h1>
              <p className="mt-5 leading-relaxed" style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.55)" }}>
                Send us your question or tell us about your brand — we&apos;ll
                come back to you within one business day.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-5">
              {[
                { n: "01", text: "We review your message and your brand's context" },
                { n: "02", text: "A member of the team responds within one business day" },
                { n: "03", text: "We map the BroadLab system to your specific outcome" },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.55 }}
                >
                  <span
                    className="shrink-0 font-bold tabular-nums mt-0.5"
                    style={{ fontSize: "0.6875rem", color: "rgba(58,174,206,0.5)", letterSpacing: "0.08em" }}
                  >
                    {step.n}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(234,246,251,0.5)" }}>
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Direct email */}
            <motion.div
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                Direct contact
              </p>
              <a
                href="mailto:hello@broadlab.tv"
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "rgba(58,174,206,0.75)" }}
              >
                hello@broadlab.tv
              </a>
            </motion.div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            className="rounded-2xl p-8 sm:p-10"
            style={{ background: "white" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
