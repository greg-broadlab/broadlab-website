import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";

export const metadata = {
  title: "Contact - Broadlab",
  description:
    "Get in touch with Broadlab. Talk to us about CTV strategy, the Broadlab system, or how outcome-driven TV investment could work for your business.",
};

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  );
}
