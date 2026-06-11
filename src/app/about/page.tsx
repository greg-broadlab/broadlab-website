import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";

export const metadata = {
  title: "About - Broadlab",
  description:
    "Broadlab is an intelligence system for outcome-driven TV - combining audience data, AI-powered optimisation, and closed-loop measurement to turn CTV into a measurable growth channel.",
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
