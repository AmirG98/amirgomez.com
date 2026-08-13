import type { Metadata } from "next";
import "./referral.css";
import bodyHtml from "./body";

const OG_IMAGE = "https://www.weareaplus.net/amir-profile.jpg";

export const metadata: Metadata = {
  title: "A+ Growth — Referral Partners",
  description:
    "Earn up to USD 2,000 for every business you introduce that becomes an A+ Growth client. You make the introduction — we handle everything else.",
  openGraph: {
    title: "A+ Growth — Referral Partners",
    description:
      "Earn up to USD 2,000 for every business you introduce that becomes an A+ Growth client.",
    url: "https://www.weareaplus.net/referral-partners",
    images: [{ url: OG_IMAGE, width: 800, height: 800, alt: "Amir Gomez — A+ Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A+ Growth — Referral Partners",
    description:
      "Earn up to USD 2,000 for every business you introduce that becomes an A+ Growth client.",
    images: [OG_IMAGE],
  },
};

export default function ReferralPartnersPage() {
  return <div className="rp" dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
