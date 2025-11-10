import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.amirgomez.com'),
  title: "AG - Digital Marketing Specialist | $35M+ Generated with Campaigns",
  description: "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization. 10 years experience, 100+ successful funnels, 450% average ROI.",
  keywords: ["digital marketing", "google ads", "facebook advertising", "email marketing", "conversion optimization", "marketing consultant", "ROI optimization", "PPC management"],
  authors: [{ name: "Amir Gomez" }],
  creator: "Amir Gomez",
  publisher: "Amir Gomez",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.amirgomez.com",
    siteName: "AG - Digital Marketing Specialist",
    title: "AG - Digital Marketing Specialist | $35M+ Generated with Campaigns",
    description: "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization. 10 years experience, 100+ successful funnels, 450% average ROI.",
    images: [
      {
        url: "/amir-profile.jpg",
        width: 800,
        height: 800,
        alt: "Amir Gomez - Digital Marketing Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AG - Digital Marketing Specialist | $35M+ Generated with Campaigns",
    description: "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization.",
    images: ["/amir-profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
