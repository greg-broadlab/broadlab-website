import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SystemHero from "@/components/sections/SystemHero";
import HowWeWork from "@/components/sections/HowWeWork";
import AudienceGraphSection from "@/components/sections/AudienceGraphSection";
import MeasurementSection from "@/components/sections/MeasurementSection";
import OptimisationSection from "@/components/sections/OptimisationSection";
import LearningSection from "@/components/sections/LearningSection";
import SystemCTA from "@/components/sections/SystemCTA";

export const metadata = {
  title: "The System - Broadlab",
  description:
    "The Broadlab System: four connected components - Audience Graph, Outcome Measurement, Optimisation Engine, and Compounding Intelligence.",
};

export default function SystemPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SystemHero />
      <HowWeWork />
      <AudienceGraphSection />
      <MeasurementSection />
      <OptimisationSection />
      <LearningSection />
      <SystemCTA />
      <Footer />
    </main>
  );
}
