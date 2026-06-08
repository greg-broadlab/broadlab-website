import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsHero from "@/components/sections/SolutionsHero";
import SolutionsTabs from "@/components/sections/SolutionsTabs";
import BCAPSpotlight from "@/components/sections/BCAPSpotlight";
import AgentsSection from "@/components/sections/AgentsSection";
import SolutionsCTA from "@/components/sections/SolutionsCTA";

export const metadata = {
  title: "Solutions — BroadLab",
  description: "The technology stack that makes BroadLab different. AI and proprietary data built in from the ground up.",
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SolutionsHero />
      <SolutionsTabs />
      <BCAPSpotlight />
      <AgentsSection />
      <SolutionsCTA />
      <Footer />
    </main>
  );
}
