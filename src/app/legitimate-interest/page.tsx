import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legitimate Interest | Broadlab",
  description: "How and why Broadlab relies on legitimate interest as a lawful basis for processing personal data.",
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
            Legitimate Interest
          </h1>
          <p className="text-[#8fb3c8] mt-3 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">

          <Section title="What is legitimate interest?">
            <p>Under UK GDPR, &ldquo;legitimate interests&rdquo; is one of six lawful bases that organisations can rely on to process personal data. It applies when processing is necessary for genuine business purposes and those interests are not overridden by the rights and interests of the individuals whose data is being used.</p>
            <p>To rely on legitimate interests, organisations must carry out a three-part test — purpose, necessity, and balancing — to ensure the processing is fair and proportionate.</p>
          </Section>

          <Section title="How Broadlab uses legitimate interest">
            <p>Broadlab relies on legitimate interests as a lawful basis for the following processing activities:</p>

            <Card
              title="Responding to contact enquiries"
              items={[
                { label: "Purpose", value: "When someone submits a contact form on our website, we process their name, email address, company, and message in order to respond to their enquiry." },
                { label: "Necessity", value: "Processing this information is necessary to provide a meaningful response. We could not fulfil the purpose without it." },
                { label: "Balancing", value: "Individuals who submit an enquiry reasonably expect to be contacted in response. The data collected is limited to what is needed, the processing is transparent, and individuals can request deletion at any time." },
              ]}
            />

            <Card
              title="B2B marketing communications"
              items={[
                { label: "Purpose", value: "We may contact business professionals who have expressed interest in our services or who work in roles where our services are genuinely relevant (e.g. CMOs, media directors, agency planners)." },
                { label: "Necessity", value: "Direct outreach to relevant professionals is a proportionate way to bring our services to the attention of those who may benefit from them." },
                { label: "Balancing", value: "Our marketing targets businesses and business professionals in a B2B context, not consumers. We do not purchase contact lists. We communicate infrequently and provide a clear opt-out in every communication. Recipients can object at any time." },
              ]}
            />
          </Section>

          <Section title="Your right to object">
            <p>You have the right to object to processing based on legitimate interests at any time. If you object, we will stop processing your data for that purpose unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms — or if processing is necessary for the establishment, exercise, or defence of legal claims.</p>
            <p>To object, or to request that we stop contacting you, please email us at <a href="mailto:info@broadlab.tv" className="text-[#3a6682] hover:underline">info@broadlab.tv</a> with the subject line &ldquo;Data objection&rdquo;. We will respond within 30 days.</p>
          </Section>

          <Section title="Further information">
            <p>For more detail on how we handle your personal data, including your full rights under UK GDPR, please see our <a href="/privacy" className="text-[#3a6682] hover:underline">Privacy Policy</a>.</p>
            <p>You also have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#3a6682] hover:underline">ico.org.uk</a>.</p>
          </Section>

          <Section title="Contact us">
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
      <div className="flex flex-col gap-4 text-[#4b5563] leading-relaxed text-[0.9375rem] [&_strong]:text-[#0d2535]">
        {children}
      </div>
    </div>
  );
}

function Card({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div className="bg-[#f9fafb] px-5 py-3 border-b border-[#e5e7eb]">
        <p className="font-semibold text-[#0d2535] text-sm">{title}</p>
      </div>
      <div className="divide-y divide-[#f3f4f6]">
        {items.map((item) => (
          <div key={item.label} className="px-5 py-4 flex gap-4">
            <span className="text-xs font-bold uppercase tracking-wide text-[#3a6682] w-20 shrink-0 pt-0.5">{item.label}</span>
            <p className="text-sm text-[#4b5563] leading-relaxed">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
