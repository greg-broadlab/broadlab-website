import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legitimate Interest Assessment | Broadlab",
  description: "Broadlab UK Limited's Legitimate Interest Assessment for Special Purposes under TCF v2.2.",
};

export default function LegitimateInterest() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#0d2535] pt-32 pb-16">
        <div className="container-main">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8fb3c8] mb-4">Legal</p>
          <h1 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Legitimate Interest Assessment
          </h1>
          <p className="text-[#8fb3c8] mt-3 text-sm">Broadlab UK Limited (LIA)</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">

          <Section title="Purpose">
            <p>This Legitimate Interest Assessment (LIA) outlines Broadlab UK Limited&apos;s justification for processing personal data under the legal basis of Legitimate Interest for the Special Purposes defined in the IAB Europe Transparency and Consent Framework (TCF) v2.2.</p>
          </Section>

          <Section title="Overview">
            <p>Broadlab only relies on Legitimate Interest for the following TCF Special Purposes:</p>
            <ul>
              <li><strong>Special Purpose 1:</strong> Ensure security, prevent and detect fraud, and fix errors</li>
              <li><strong>Special Purpose 2:</strong> Deliver and present advertising and content (non-personalised)</li>
              <li><strong>Special Purpose 3:</strong> Save and communicate privacy choices</li>
            </ul>
            <p>All standard purposes (e.g. personalised ads, profiling, analytics) are processed strictly under Consent.</p>
          </Section>

          <Section title="Part 1: Purpose Test">
            <p>We process personal data for Special Purposes 1–3 in order to:</p>
            <ul>
              <li>Maintain the security, integrity, and availability of our systems</li>
              <li>Prevent fraudulent or malicious activity</li>
              <li>Ensure reliable delivery of non-personalised advertising</li>
              <li>Respect and communicate user privacy choices and consent preferences across platforms</li>
            </ul>
            <p>These purposes are essential to the functioning of our services and digital advertising infrastructure.</p>
          </Section>

          <Section title="Part 2: Necessity Test">
            <p>The processing activities involved are necessary because:</p>
            <ul>
              <li>Fraud prevention and error resolution require logging technical identifiers (e.g. IP address, headers)</li>
              <li>Basic delivery of non-targeted content requires minimal device or network-level data</li>
              <li>Saving and passing TCF consent strings is required to comply with privacy laws and framework policies</li>
            </ul>
            <p>The data processed is limited to what is strictly needed and is not used for tracking, profiling, or targeting.</p>
          </Section>

          <Section title="Part 3: Balancing Test">
            <p>We have assessed the potential impact on users and concluded that:</p>
            <ul>
              <li>The processing is non-intrusive and limited to technical identifiers</li>
              <li>It does not involve sensitive categories of data</li>
              <li>It is necessary to provide essential services and ensure transparency</li>
              <li>Strong safeguards are in place to protect personal data, including:
                <ul className="mt-1.5">
                  <li>Encryption in transit</li>
                  <li>Access controls and audit logs</li>
                  <li>Pseudonymisation or truncation of IPs where applicable</li>
                </ul>
              </li>
            </ul>
            <p>Users can object to this processing via Consent Management Platforms.</p>
          </Section>

          <Section title="Conclusion">
            <p>The legitimate interests pursued by Broadlab for Special Purposes 1–3 are not overridden by the rights and freedoms of individuals. We therefore conclude that processing under Legitimate Interest for these purposes is justified and proportionate.</p>
            <p>This LIA will be reviewed annually or whenever there is a material change in our processing activities.</p>
          </Section>

          <Section title="Contact">
            <p>
              <strong>Broadlab UK Limited</strong><br />
              Email: <a href="mailto:privacy@broadlab.tv" className="text-[#3a6682] hover:underline">privacy@broadlab.tv</a><br />
              1st Floor Gallery Court, 28 Arcadia Avenue<br />
              London, N3 2FG<br />
              United Kingdom<br />
              Company Number: 14585427
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
