import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Broadlab",
  description: "How Broadlab UK Limited processes personal data as a data vendor under the IAB Europe TCF v2.2.",
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
          <p className="text-[#8fb3c8] mt-3 text-sm">Last updated: 2nd October 2025</p>
          <p className="text-[#8fb3c8] mt-1 text-sm">Privacy Notice – Broadlab UK Limited (as a Data Vendor)</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">

          <div className="mb-10 pb-10 border-b border-[#e5e7eb]">
            <p className="text-[#4b5563] leading-relaxed text-[0.9375rem]">
              This Privacy Notice explains how Broadlab UK Limited (&ldquo;Broadlab&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) processes personal data as a data vendor, under the instructions of data controllers such as advertisers, publishers (including CTV publishers), or media agencies.
            </p>
            <p className="text-[#4b5563] leading-relaxed text-[0.9375rem] mt-3 italic">
              Broadlab is a registered vendor under the IAB Europe Transparency and Consent Framework (TCF) v2.2.
            </p>
            <p className="text-[#4b5563] leading-relaxed text-[0.9375rem] mt-2">
              <strong className="text-[#0d2535]">TCF Vendor ID:</strong> 1448
            </p>
          </div>

          <Section title="Who We Are">
            <p>Broadlab UK Limited is a Connected TV (CTV) advertising data vendor based in the United Kingdom. We provide services to advertising clients and partners, including:</p>
            <ul>
              <li>Data enrichment and audience segmentation</li>
              <li>Campaign analytics and measurement</li>
              <li>Delivery of personalised and non-personalised advertising</li>
              <li>Integration with platforms such as the Microsoft Universal Pixel and Amazon Ads Pixel</li>
            </ul>
            <p>We do not determine the means or purposes of the data we process independently. Instead, we act under instruction from data controllers—including CTV publishers, advertisers, and media agencies—who determine the legal basis and purposes of processing, and who are responsible for obtaining user consent where required.</p>
          </Section>

          <Section title="Our Legal Basis for Processing">
            <p>Under the TCF v2.2 framework, Broadlab only processes personal data:</p>
            <ul>
              <li>Where a valid legal basis of <strong>Consent</strong> has been provided by a data controller</li>
              <li>For <strong>specific purposes</strong> declared in the Global Vendor List (GVL)</li>
            </ul>
            <p>We do <strong>not rely on Legitimate Interest</strong> for standard advertising purposes (e.g., personalised ads, audience profiles, performance measurement). We <strong>do</strong> rely on Legitimate Interest <strong>only</strong> for certain Special Purposes as defined below.</p>
            <SubHeading>Purposes Processed on the Basis of Consent:</SubHeading>
            <ul>
              <li>Purpose 1: Store and/or access information on a device</li>
              <li>Purpose 2: Use limited data to select advertising</li>
              <li>Purpose 3: Create a personalised ads profile</li>
              <li>Purpose 4: Select personalised ads</li>
              <li>Purpose 7: Measure ad performance</li>
              <li>Purpose 9: Generate audience insights</li>
              <li>Purpose 10: Develop and improve products</li>
            </ul>
            <SubHeading>Special Purposes Processed on the Basis of Legitimate Interest:</SubHeading>
            <ul>
              <li>Special Purpose 1: Ensure security, prevent and detect fraud, and fix errors</li>
              <li>Special Purpose 2: Deliver and present advertising and content (non-personalised)</li>
              <li>Special Purpose 3: Save and communicate privacy choices</li>
            </ul>
            <p>Users may object to processing under Legitimate Interest via a Consent Management Platform (CMP) where supported.</p>
          </Section>

          <Section title="What Personal Data We Process">
            <p>We may process the following categories of personal data:</p>
            <ul>
              <li>Mobile Advertising IDs (GAID, IDFA)</li>
              <li>Cookie IDs</li>
              <li>IP addresses (truncated or hashed, where applicable)</li>
              <li>Device information (browser type, OS, model)</li>
              <li>Location data (derived from IP or with consent via GPS)</li>
              <li>Advertising engagement and event data</li>
            </ul>
            <p>Broadlab does not knowingly process personal data relating to children under 16 years of age or any special-category data (such as health, political or biometric information).</p>
          </Section>

          <Section title="Purposes of Processing">
            <p>We process this data for the following reasons:</p>
            <ul>
              <li>Storing and/or accessing information on a device</li>
              <li>Creating and applying audience profiles</li>
              <li>Delivering ads (personalised or not)</li>
              <li>Measuring advertising performance</li>
              <li>Performing market research and generating insights</li>
              <li>Developing and improving advertising products</li>
            </ul>
          </Section>

          <Section title="Features and Special Features">
            <SubHeading>Features Used:</SubHeading>
            <ul>
              <li>Feature 1: Match and combine offline data sources</li>
              <li>Feature 2: Link different devices</li>
            </ul>
            <SubHeading>Special Features:</SubHeading>
            <ul>
              <li>Special Feature 1: Use precise geolocation data</li>
              <li>Special Feature 2: Actively scan device characteristics for identification</li>
            </ul>
            <p>These are only activated with appropriate user consent.</p>
          </Section>

          <Section title="Website Cookies and Tracking">
            <p>Our website (<a href="https://broadlab.tv" className="text-[#3a6682] hover:underline">https://broadlab.tv</a>) uses a range of cookies and tracking technologies, as disclosed in our <a href="/cookies" className="text-[#3a6682] hover:underline">Cookie Policy</a>:</p>
            <ul>
              <li><strong>Functional cookies:</strong> Necessary for site operation (e.g., Jetpack, WordPress, Complianz)</li>
              <li><strong>Statistical cookies:</strong> Anonymous site usage metrics (e.g., Automattic/Jetpack tk_ai)</li>
              <li><strong>Marketing cookies:</strong> Used in embedded services (e.g., Google Maps, Google Fonts)</li>
            </ul>
            <p>Consent is managed via our live Consent Management Platform (CMP), which appears when you first visit the site. You may update your preferences at any time via the CMP interface.</p>
            <p>In addition, when advertisers use conversion tracking pixels (e.g., from Microsoft or Innovid) as part of campaign delivery, those third-party platforms may drop cookies or device identifiers on advertiser-owned websites. These are operated by the respective third-party vendors and governed by their own privacy policies. Broadlab does not operate these cookies; however, we may receive limited data collected via them (such as IP addresses or event-level identifiers) through the reporting tools provided by third-party platforms like Microsoft or Innovid.</p>
          </Section>

          <Section title="Data Sharing and Recipients">
            <p>We may receive data from, or share data with:</p>
            <ul>
              <li>Supply-side platforms (SSPs)</li>
              <li>Demand-side platforms (DSPs)</li>
              <li>Ad exchanges</li>
              <li>Ad verification and measurement vendors</li>
              <li>Cloud infrastructure providers (e.g., AWS)</li>
            </ul>
            <p>All transfers occur under encrypted transmission and access controls.</p>
          </Section>

          <Section title="International Data Transfers">
            <p>Where personal data is transferred outside the UK or EEA, we ensure safeguards are in place, including:</p>
            <ul>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>UK International Data Transfer Agreement (IDTA)</li>
              <li>Vendor-specific data protection addenda</li>
            </ul>
          </Section>

          <Section title="Data Retention">
            <p>We retain personal data only as long as necessary for its purpose:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f3f7fa]">
                    <th className="text-left px-4 py-3 text-[#0d2535] font-semibold border border-[#e5e7eb]">Purpose</th>
                    <th className="text-left px-4 py-3 text-[#0d2535] font-semibold border border-[#e5e7eb]">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Device storage, basic access", "Up to 13 months"],
                    ["Personalised ads (3, 4)", "Up to 13 months"],
                    ["Ad performance measurement", "180 days (event-level), 13 months (aggregate)"],
                    ["Insights & product dev", "6–13 months depending on controller"],
                    ["Special Purposes (1–3)", "Up to 180 days"],
                  ].map(([purpose, period]) => (
                    <tr key={purpose} className="even:bg-[#fafafa]">
                      <td className="px-4 py-3 text-[#4b5563] border border-[#e5e7eb]">{purpose}</td>
                      <td className="px-4 py-3 text-[#4b5563] border border-[#e5e7eb]">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Security Measures">
            <p>We maintain industry-standard protections including:</p>
            <ul>
              <li>Data encryption (in transit and at rest)</li>
              <li>Role-based access control</li>
              <li>Secure storage via ISO/IEC 27001 certified platforms (e.g., AWS)</li>
              <li>Access control, activity logging and a documented incident response procedure aligned with ISO 27001 standards</li>
            </ul>
          </Section>

          <Section title="Your Rights and Choices">
            <p>Depending on your jurisdiction, you may have rights under GDPR, UK DPA, CCPA, or similar laws, including:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Restrict or object to processing</li>
              <li>Withdraw consent</li>
              <li>Opt out of personalised advertising</li>
            </ul>
            <p>To exercise your rights, use the CMP available on the site or contact us at: <a href="mailto:privacy@broadlab.tv" className="text-[#3a6682] hover:underline">privacy@broadlab.tv</a></p>
            <p>Further information about Broadlab&apos;s governance, security and data protection measures can be found in the Broadlab Privacy and Data Protection Compliance Programme, available to clients on request.</p>
          </Section>

          <Section title="Contact Information">
            <p>
              <strong>Broadlab UK Limited</strong><br />
              1st Floor Gallery Court, 28 Arcadia Avenue<br />
              London, N3 2FG<br />
              United Kingdom<br />
              Company Number: 14585427<br />
              Email: <a href="mailto:privacy@broadlab.tv" className="text-[#3a6682] hover:underline">privacy@broadlab.tv</a><br />
              Data Protection Officer: Brian Jentz (<a href="mailto:brian.jentz@broadlab.tv" className="text-[#3a6682] hover:underline">brian.jentz@broadlab.tv</a>)
            </p>
          </Section>

          <Section title="Policy Updates">
            <p>We review this policy regularly and update it to reflect changes in our operations, legal obligations, or registration status under the TCF. Last reviewed: 2nd October 2025.</p>
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
