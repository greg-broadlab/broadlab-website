import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Solutions from "@/components/sections/Solutions";

export const metadata = {
  title: "Solutions — BroadLab",
  description:
    "What working with BroadLab looks like — campaign objectives, the five-step engagement model, and sectors we work in.",
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Solutions />
      <Footer />
    </main>
  );
}
