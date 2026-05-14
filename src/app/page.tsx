import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyCTV from "@/components/sections/WhyCTV";
import TheSystem from "@/components/sections/TheSystem";
import HowWeWork from "@/components/sections/HowWeWork";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyCTV />
      <TheSystem />
      <HowWeWork />
      <FinalCTA />
      <Footer />
    </main>
  );
}
