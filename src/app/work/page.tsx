import type { Metadata } from "next";
import WorkPageClient from "@/components/sections/WorkPage";

export const metadata: Metadata = {
  title: "Our Work — BroadLab",
  description:
    "Case studies from Lloyds Banking Group, Lenovo, and DAZN — real results from outcome-driven CTV campaigns built on the BroadLab system.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}
