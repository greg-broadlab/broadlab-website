import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";

export const metadata = {
  title: "About — BroadLab",
  description:
    "Meet the team behind BroadLab — specialists across data, technology and media building the intelligence system for outcome-driven CTV.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <About />
      <Footer />
    </main>
  );
}
