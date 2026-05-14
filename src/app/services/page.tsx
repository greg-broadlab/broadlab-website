import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";

export const metadata = {
  title: "Services — BroadLab",
  description:
    "The BroadLab system applied to your category — Financial Services, Retail/DTC, Automotive, and Streaming & Entertainment.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Services />
      <Footer />
    </main>
  );
}
