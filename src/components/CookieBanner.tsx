"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function updateGTMConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "consent_update",
    analytics_storage:       granted ? "granted" : "denied",
    ad_storage:              granted ? "granted" : "denied",
    functionality_storage:   granted ? "granted" : "denied",
    personalization_storage: granted ? "granted" : "denied",
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("broadlab_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
    if (consent === "accepted") updateGTMConsent(true);
  }, []);

  function accept() {
    setCookie("broadlab_consent", "accepted", 365);
    updateGTMConsent(true);
    setVisible(false);
  }

  function decline() {
    setCookie("broadlab_consent", "declined", 365);
    updateGTMConsent(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="bg-white border-t border-[#e5e7eb]"
            style={{ boxShadow: "0 -4px 32px rgba(13,37,53,0.08)" }}
          >
            <div className="container-main py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(58,174,206,0.1)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="#3aaece" strokeWidth="1.3" />
                      <path d="M7 6v3.5M7 4v.5" stroke="#3aaece" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4b5563] max-w-xl">
                    We use cookies to understand how visitors use our site and to improve your experience.{" "}
                    <Link href="/cookies" className="text-[#3aaece] hover:underline font-medium">
                      Cookie Policy
                    </Link>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={decline}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-[#4b5563] hover:text-[#0d2535] transition-colors duration-200"
                    style={{ border: "1px solid #e5e7eb" }}
                  >
                    Decline
                  </button>
                  <button
                    onClick={accept}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#10657f" }}
                  >
                    Accept
                  </button>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
