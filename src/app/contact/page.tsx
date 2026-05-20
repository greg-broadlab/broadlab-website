import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";

export const metadata = {
  title: "About — BroadLab",
  description:
    "BroadLab is a specialist CTV partner combining consultancy, AI-powered technology and named human expertise to turn CTV into an accountable growth engine.",
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
