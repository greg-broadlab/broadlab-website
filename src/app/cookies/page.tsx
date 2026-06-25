import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Broadlab",
  description: "How Broadlab uses cookies and how to manage your preferences.",
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#0d2535] pt-32 pb-16">
        <div className="container-main">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8fb3c8] mb-4">Legal</p>
          <h1 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Cookie Policy
          </h1>
          <p className="text-[#8fb3c8] mt-3 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">

          <Section title="1. What are cookies">
            <p>Cookies are small text files placed on your device when you visit a website. They allow the website to remember your actions and preferences over time, so you don&apos;t have to re-enter them whenever you return.</p>
            <p>Cookies are widely used to make websites work, or work more efficiently, and to provide information to website owners.</p>
          </Section>

          <Section title="2. Cookies we use">
            <p>We use a small number of cookies, grouped into two categories:</p>

            <CookieTable
              heading="Essential cookies"
              description="These cookies are necessary for the website to function and cannot be switched off. They are set in response to actions you take, such as setting your cookie preferences."
              cookies={[
                {
                  name: "Broadlab_consent",
                  purpose: "Stores your cookie consent decision so we do not ask again on future visits.",
                  duration: "1 year",
                  type: "First-party",
                },
              ]}
            />

            <CookieTable
              heading="Analytics cookies"
              description="These cookies help us understand how visitors interact with our website. All data is anonymised and aggregated — we cannot identify you individually. These cookies are only set with your consent."
              cookies={[
                {
                  name: "_ga, _ga_*",
                  purpose: "Google Analytics — tracks page views, session duration, and general usage patterns to help us improve the site.",
                  duration: "Up to 2 years",
                  type: "Third-party (Google)",
                },
                {
                  name: "_gtm_*",
                  purpose: "Google Tag Manager — manages the loading of analytics and other tags on the site.",
                  duration: "Session",
                  type: "Third-party (Google)",
                },
              ]}
            />
          </Section>

          <Section title="3. Cookies we do not use">
            <p>We do not use:</p>
            <ul>
              <li>Advertising or retargeting cookies</li>
              <li>Social media tracking cookies</li>
              <li>Any cookies that identify you personally without your explicit consent</li>
            </ul>
          </Section>

          <Section title="4. Managing your cookie preferences">
            <p>When you first visit our website, you will be shown a cookie banner asking for your consent to analytics cookies. You can accept or decline at that point.</p>
            <p>You can change your preferences at any time using the <strong>Cookie Preferences</strong> link in the footer of any page. Clicking it will reset your consent and show the banner again.</p>
            <p>You can also control cookies through your browser settings. Most browsers allow you to:</p>
            <ul>
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
            </ul>
            <p>Note that blocking all cookies may affect the functionality of some websites, including this one.</p>
            <p>For more information on managing cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#3a6682] hover:underline">allaboutcookies.org</a>.</p>
          </Section>

          <Section title="5. Third-party services">
            <p>We use Google Tag Manager (GTM ID: GTM-MDP5K93S) to manage analytics on our site. When you consent to analytics cookies, Google may also process data in accordance with their own privacy terms. You can learn more at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3a6682] hover:underline">policies.google.com/privacy</a>.</p>
          </Section>

          <Section title="6. Changes to this policy">
            <p>We may update this Cookie Policy from time to time to reflect changes in technology or regulation. The date at the top of this page indicates when it was last revised.</p>
          </Section>

          <Section title="7. Contact us">
            <p>If you have questions about our use of cookies, please contact us at <a href="mailto:info@broadlab.tv" className="text-[#3a6682] hover:underline">info@broadlab.tv</a>.</p>
          </Section>

        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 pb-10 border-b border-[#e5e7eb] last:border-0">
      <h2 className="text-[#0d2535] font-bold text-xl mb-4">{title}</h2>
      <div className="flex flex-col gap-4 text-[#4b5563] leading-relaxed text-[0.9375rem] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_strong]:text-[#0d2535]">
        {children}
      </div>
    </div>
  );
}

function CookieTable({ heading, description, cookies }: {
  heading: string;
  description: string;
  cookies: { name: string; purpose: string; duration: string; type: string }[];
}) {
  return (
    <div className="mt-2">
      <p className="font-semibold text-[#0d2535] mb-1">{heading}</p>
      <p className="text-sm mb-3">{description}</p>
      <div className="rounded-xl border border-[#e5e7eb] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              <th className="text-left px-4 py-3 font-semibold text-[#0d2535] text-xs uppercase tracking-wide">Cookie</th>
              <th className="text-left px-4 py-3 font-semibold text-[#0d2535] text-xs uppercase tracking-wide">Purpose</th>
              <th className="text-left px-4 py-3 font-semibold text-[#0d2535] text-xs uppercase tracking-wide">Duration</th>
              <th className="text-left px-4 py-3 font-semibold text-[#0d2535] text-xs uppercase tracking-wide">Type</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((c, i) => (
              <tr key={i} className="border-b border-[#f3f4f6] last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-[#3a6682] align-top">{c.name}</td>
                <td className="px-4 py-3 text-[#4b5563] align-top">{c.purpose}</td>
                <td className="px-4 py-3 text-[#6b7280] align-top whitespace-nowrap">{c.duration}</td>
                <td className="px-4 py-3 text-[#6b7280] align-top whitespace-nowrap">{c.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
