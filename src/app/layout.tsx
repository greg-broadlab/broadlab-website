import type { Metadata } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Broadlab | Outcome-Driven Addressable TV",
  description:
    "Broadlab simplifies the complex world of Addressable TV, giving brands and agencies a single, optimised solution to maximise outcomes through our proprietary, household-based ID graph.",
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Broadlab | Outcome-Driven Addressable TV",
    description:
      "Access over 18 million UK households through premium publishers. AI-driven campaign optimisation, custom audiences, and holistic reporting.",
    url: "https://broadlab.tv",
    siteName: "Broadlab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, plusJakarta.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
