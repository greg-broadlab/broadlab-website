import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SystemHero from "@/components/sections/SystemHero";
import HowWeWork from "@/components/sections/HowWeWork";
import ProofSection from "@/components/sections/ProofSection";

export const metadata = {
  title: "The System — BroadLab",
  description:
    "The BroadLab System: four connected components — Audience Graph, Outcome Measurement, Optimisation Engine, and Compounding Intelligence.",
};

export default function SystemPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SystemHero />
      <HowWeWork />
      <ProofSection />
      <Footer />
    </main>
  );
}
