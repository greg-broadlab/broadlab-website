import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/sections/ContactPage";

export const metadata = {
  title: "Contact — BroadLab",
  description:
    "Get in touch with BroadLab. Tell us the outcome you need to move and we'll map the system to your brand.",
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
