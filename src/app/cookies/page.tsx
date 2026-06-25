import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookiePolicyContent from "./CookiePolicyContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Broadlab",
  description: "How Broadlab uses cookies and how to manage your preferences.",
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-[#0d2535] pt-32 pb-16">
        <div className="container-main">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8fb3c8] mb-4">Legal</p>
          <h1 className="text-white font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Cookie Policy
          </h1>
          <p className="text-[#8fb3c8] mt-3 text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <div className="container-main py-16">
        <div className="max-w-3xl">
          <CookiePolicyContent />
        </div>
      </div>

      <Footer />
    </main>
  );
}
