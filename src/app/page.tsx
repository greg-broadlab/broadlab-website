import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import OurWork from "@/components/sections/OurWork";
import WhyUnderperforms from "@/components/sections/WhyUnderperforms";
import Positioning from "@/components/sections/Positioning";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <OurWork />
      <WhyUnderperforms />
      <Positioning />
      <FinalCTA />
      <Footer />
    </main>
  );
}
