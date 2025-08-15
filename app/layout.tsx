import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amir Gomez - Digital Marketing Specialist",
  description: "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization.",
  keywords: ["digital marketing", "google ads", "facebook advertising", "email marketing", "conversion optimization", "marketing consultant"],
  openGraph: {
    title: "Amir Gomez - Digital Marketing Specialist",
    description: "Digital marketing specialist helping businesses grow through Google Ads, Facebook advertising, email marketing, and conversion optimization.",
    url: "https://amirgomez-com.vercel.app",
    siteName: "Amir Gomez",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
