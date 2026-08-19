import type { Metadata } from "next";
import "./audit.css";
import AuditLanding from "./AuditLanding";

export const metadata: Metadata = {
  title: "Free Meta Ads Audit — A+ Growth",
  description:
    "Your Meta ads might be leaking money. Get a free 15-minute audit from a team that's launched 300+ funnels — no obligation, honest verdict included.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free Meta Ads Audit — A+ Growth",
    description:
      "Find out exactly where your Meta ads budget is being wasted. Free, no obligation.",
    url: "https://www.weareaplus.net/meta-ads-audit",
  },
};

export default function MetaAdsAuditPage() {
  return <AuditLanding />;
}
