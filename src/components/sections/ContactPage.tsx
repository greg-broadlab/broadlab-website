"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Enquiry types ─────────────────────────────────────────────────────────────


// ─── Input components ──────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "#9ca3af" }}>
        {label}{required && <span style={{ color: "#3aaece" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg px-4 py-3 text-sm text-[#0a3b4b] outline-none transition-all duration-200";
const inputStyle = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
};
const inputFocusStyle = {
  border: "1px solid rgba(58,174,206,0.6)",
  background: "white",
  boxShadow: "0 0 0 3px rgba(58,174,206,0.08)",
};

function Input({
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
      className={inputClass}
      style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
    />
  );
}

function Textarea({
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputClass + " resize-none leading-relaxed"}
      style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
    />
  );
}


// ─── Contact form ──────────────────────────────────────────────────────────────

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  query: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  query: "",
};

function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function set(key: keyof FormState) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-start gap-5 rounded-2xl p-10"
        style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
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
          <h3 className="font-bold text-lg mb-2" style={{ color: "#0a3b4b" }}>
            Message received.
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
            Thanks for getting in touch. Someone from the BroadLab team will
            come back to you within one business day.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold"
          style={{ color: "#3aaece" }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" required>
          <Input name="firstName" value={form.firstName} onChange={set("firstName")} placeholder="Jane" />
        </Field>
        <Field label="Last name" required>
          <Input name="lastName" value={form.lastName} onChange={set("lastName")} placeholder="Smith" />
        </Field>
      </div>

      {/* Company + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company">
          <Input name="company" value={form.company} onChange={set("company")} placeholder="Acme Media" />
        </Field>
        <Field label="Email" required>
          <Input type="email" name="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone">
        <Input type="tel" name="phone" value={form.phone} onChange={set("phone")} placeholder="+44 7700 000000" />
      </Field>

      {/* Query */}
      <Field label="What are you looking to achieve?" required>
        <Textarea
          name="query"
          value={form.query}
          onChange={set("query")}
          rows={6}
          placeholder="Tell us about your brand, the outcome you're trying to drive, and where you are currently with CTV..."
        />
      </Field>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm" style={{ color: "#ef4444" }}>
          Something went wrong — please try again or email greg.brenner@broadlab.tv directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200"
        style={{
          background: status === "sending" ? "#9ca3af" : "#0a3b4b",
          cursor: status === "sending" ? "not-allowed" : "pointer",
        }}
      >
        {status === "sending" ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send message
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

    </form>
  );
}

// ─── Info panel ────────────────────────────────────────────────────────────────

function InfoPanel({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-8">

      {/* What to expect */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em]" style={{ color: "#3aaece" }}>
          What happens next
        </p>
        {[
          { n: "01", text: "We review your message and your brand's context" },
          { n: "02", text: "A member of the team responds within one business day" },
          { n: "03", text: "We schedule a call to map the methodology to your outcome" },
        ].map((step) => (
          <div key={step.n} className="flex items-start gap-4">
            <span
              className="font-bold shrink-0 leading-none mt-0.5"
              style={{ fontSize: "0.6875rem", color: "rgba(58,174,206,0.5)", letterSpacing: "0.08em" }}
            >
              {step.n}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{step.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="h-px" style={{ background: "#e5e7eb" }} />

      {/* Consultation note */}
      <motion.div
        className="flex flex-col gap-3 rounded-xl p-6"
        style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em]" style={{ color: "#3aaece" }}>
          Book a consultation
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
          Prefer to jump straight onto a call? Direct consultation booking
          is coming soon — in the meantime, send a message and we&apos;ll
          get a time in the diary.
        </p>
        {/* Calendly button — wire up once account is created */}
        <button
          disabled
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold mt-1 cursor-not-allowed"
          style={{
            color: "#9ca3af",
            border: "1px solid #e5e7eb",
            background: "white",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <rect x="1" y="2.5" width="11" height="9.5" rx="1.5" stroke="#d1d5db" strokeWidth="1.3" />
            <path d="M4 1v3M9 1v3M1 5.5h11" stroke="#d1d5db" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Coming soon
        </button>
      </motion.div>

      {/* Divider */}
      <div className="h-px" style={{ background: "#e5e7eb" }} />

      {/* Direct contact */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em]" style={{ color: "#9ca3af" }}>
          Direct contact
        </p>
        <a
          href="mailto:hello@broadlab.tv"
          className="text-sm font-medium transition-opacity duration-200 hover:opacity-70"
          style={{ color: "#10657f" }}
        >
          hello@broadlab.tv
        </a>
      </motion.div>

    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: "#0a3b4b" }}>
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
            background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 20%, rgba(10,59,75,0.85) 100%)",
          }}
        />
        <div className="container-main relative z-10">
          <motion.h1
            className="font-bold leading-tight text-white"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            Let&apos;s talk.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md leading-relaxed"
            style={{ fontSize: "1.0625rem", color: "rgba(234,246,251,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            Tell us what outcome you need to move. We&apos;ll tell you exactly
            how BroadLab would build the system around it.
          </motion.p>
        </div>
      </section>

      {/* Form + info */}
      <section ref={ref} style={{ background: "white" }}>
        <div className="section-padding">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-20">

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ delay: 0.1, duration: 0.65 }}
              >
                <ContactForm />
              </motion.div>

              {/* Info panel */}
              <InfoPanel inView={inView} />

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
