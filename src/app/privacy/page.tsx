import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Broadlab",
  description: "How Broadlab collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#0d2535] pt-32 pb-16">
        <div className="container-main">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8fb3c8] mb-4">Legal</p>
          <h1 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Privacy Policy
          </h1>
          <p className="text-[#8fb3c8] mt-3 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">

          <Section title="1. Who we are">
            <p>Broadlab (&ldquo;Broadlab&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the data controller responsible for your personal data. We operate from 2nd Floor, 12 Macklin Street, London WC2B 5NF, United Kingdom.</p>
            <p>You can contact us about data protection matters at <a href="mailto:info@broadlab.tv" className="text-[#3a6682] hover:underline">info@broadlab.tv</a>.</p>
          </Section>

          <Section title="2. What information we collect">
            <p>We collect personal information in the following ways:</p>
            <SubHeading>Contact enquiries</SubHeading>
            <p>When you submit a contact form on our website, we collect your name, email address, company name, and the content of your message.</p>
            <SubHeading>Website analytics</SubHeading>
            <p>We use Google Tag Manager to collect anonymised information about how visitors use our website, including pages visited, time spent on site, and general location (country/city level). This data does not identify you personally.</p>
            <SubHeading>Cookies</SubHeading>
            <p>We use cookies to remember your preferences and to support analytics. See our <a href="/cookies" className="text-[#3a6682] hover:underline">Cookie Policy</a> for full details.</p>
          </Section>

          <Section title="3. How we use your information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your enquiries and communicate with you about our services</li>
              <li>Understand how our website is being used so we can improve it</li>
              <li>Comply with our legal obligations</li>
              <li>Send you relevant information about Broadlab services where you have expressed interest or we have a legitimate business reason to do so</li>
            </ul>
          </Section>

          <Section title="4. Legal basis for processing">
            <p>Under UK GDPR, we rely on the following legal bases:</p>
            <SubHeading>Legitimate interests</SubHeading>
            <p>We process contact form submissions and conduct B2B marketing communications on the basis of legitimate interests — our interest in responding to genuine business enquiries and marketing our services to relevant professionals. See our <a href="/legitimate-interest" className="text-[#3a6682] hover:underline">Legitimate Interest statement</a> for more detail.</p>
            <SubHeading>Consent</SubHeading>
            <p>We use analytics cookies only where you have given your consent via our cookie banner. You may withdraw consent at any time using the Cookie Preferences link in the footer.</p>
            <SubHeading>Legal obligation</SubHeading>
            <p>We may process your data where required by law.</p>
          </Section>

          <Section title="5. How long we keep your data">
            <p>We retain contact form submissions for up to 24 months from the date of receipt, after which they are deleted. If you become a client, relevant communications may be retained for the duration of the business relationship and for a period of 6 years thereafter in line with standard business record-keeping requirements.</p>
            <p>Analytics data is retained in accordance with Google&apos;s standard retention settings (typically 14 months).</p>
          </Section>

          <Section title="6. Sharing your data">
            <p>We do not sell your personal data. We share data only with trusted service providers who process it on our behalf:</p>
            <ul>
              <li><strong>Amazon Web Services (AWS SES)</strong> — used to deliver emails generated from our contact form. AWS processes data in accordance with the EU-US Data Privacy Framework.</li>
              <li><strong>Google (Tag Manager / Analytics)</strong> — used for website analytics. Data is anonymised and processed in accordance with Google&apos;s privacy terms.</li>
            </ul>
            <p>We may also disclose your data where required by law or to protect our legal rights.</p>
          </Section>

          <Section title="7. Your rights">
            <p>Under UK GDPR, you have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data</li>
              <li><strong>Erasure</strong> — request deletion of your data in certain circumstances</li>
              <li><strong>Restriction</strong> — ask us to restrict processing of your data</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:info@broadlab.tv" className="text-[#3a6682] hover:underline">info@broadlab.tv</a>. We will respond within 30 days.</p>
            <p>You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#3a6682] hover:underline">ico.org.uk</a>.</p>
          </Section>

          <Section title="8. International transfers">
            <p>Some of our service providers (including AWS and Google) may process data outside the UK or EEA. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.</p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>We may update this Privacy Policy from time to time. The date at the top of this page reflects when it was last revised. Continued use of our website following any changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact us">
            <p>For any questions about this policy or how we handle your data:</p>
            <p>
              <strong>Broadlab</strong><br />
              2nd Floor, 12 Macklin Street<br />
              London WC2B 5NF<br />
              United Kingdom<br />
              <a href="mailto:info@broadlab.tv" className="text-[#3a6682] hover:underline">info@broadlab.tv</a>
            </p>
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
      <div className="flex flex-col gap-3 text-[#4b5563] leading-relaxed text-[0.9375rem] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_strong]:text-[#0d2535] [&_a]:text-[#3a6682]">
        {children}
      </div>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-[#0d2535] mt-2">{children}</p>;
}
