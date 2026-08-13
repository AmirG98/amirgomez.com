import type { Metadata } from "next";
import StartClient from "./StartClient";

const OG_IMAGE = "https://www.weareaplus.net/amir-profile.jpg";

export const metadata: Metadata = {
  title: "A+ Growth — Start referring",
  description:
    "The honest step-by-step of the A+ Growth referral program: how an intro turns into a paid commission, and how to start with one email.",
  openGraph: {
    title: "A+ Growth — Start referring",
    description:
      "The honest step-by-step: how an intro turns into a paid commission, and how to start with one email.",
    url: "https://www.weareaplus.net/referral-partners/start",
    images: [{ url: OG_IMAGE, width: 800, height: 800, alt: "Amir Gómez — A+ Growth" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A+ Growth — Start referring",
    description:
      "The honest step-by-step: how an intro turns into a paid commission, and how to start with one email.",
    images: [OG_IMAGE],
  },
};

export default function ReferralStartPage() {
  return <StartClient />;
}
