"use client";

import Image from "next/image";
import Link from "next/link";

function CookiePreferences() {
  function resetConsent() {
    document.cookie = "broadlab_consent=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    window.location.reload();
  }
  return (
    <button
      onClick={resetConsent}
      className="text-xs text-[#9ca3af] hover:text-[#4b5563] transition-colors duration-200"
    >
      Cookie Preferences
    </button>
  );
}

const footerLinks = [
  { label: "Home",     href: "/" },
  { label: "System",   href: "/system" },
  { label: "Solutions", href: "/solutions" },
  { label: "Our Work",  href: "/work" },
  { label: "Our Team", href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Legitimate Interest", href: "/legitimate-interest" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/broadlab-logo-darktext.png"
              alt="Broadlab"
              width={200}
              height={48}
              className="h-10 w-auto mb-1"
            />
            <p className="text-[#6b7280] text-sm mt-4 leading-relaxed max-w-xs">
              Powering the next generation of Outcome-Driven Addressable TV.
              Simplifying the complex. Maximising outcomes.
            </p>
            <a
              href="https://www.linkedin.com/company/broadlabtv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[#9ca3af] hover:text-[#0d2535] transition-colors duration-200"
              aria-label="Broadlab LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-[#9ca3af] uppercase tracking-widest mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] hover:text-[#0d2535] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs text-[#9ca3af] uppercase tracking-widest mb-5">
              Office
            </p>
            <address className="not-italic text-sm text-[#4b5563] leading-relaxed">
              Unit 5, 2nd Floor
              <br />
              The Market Exchange
              <br />
              12 Macklin Street
              <br />
              London WC2B 5NF
              <br />
              United Kingdom
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e5e7eb] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9ca3af]">
            © {new Date().getFullYear()} Broadlab. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[#9ca3af] hover:text-[#4b5563] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <CookiePreferences />
          </div>
        </div>
      </div>
    </footer>
  );
}
