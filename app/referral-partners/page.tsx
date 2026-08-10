import type { Metadata } from "next";
import "./referral.css";
import bodyHtml from "./body";

export const metadata: Metadata = {
  title: "A+ Growth — Referral Partners",
  description:
    "Earn up to USD 2,000 for every business you introduce that becomes an A+ Growth client. You make the introduction — we handle everything else.",
  openGraph: {
    title: "A+ Growth — Referral Partners",
    description:
      "Earn up to USD 2,000 for every business you introduce that becomes an A+ Growth client.",
  },
};

export default function ReferralPartnersPage() {
  return <div className="rp" dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
