import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.amirgomez.com'),
  title: "A+ Growth — Demand Calibration | Paid Media, Funnels & Analytics",
  description: "A+ Growth turns scattered paid media, funnels and analytics into one clean acquisition signal. 10 years, 300+ funnels across the US, Europe and LatAm — calibrate demand before you scale spend.",
  keywords: ["demand generation", "paid media", "growth marketing", "acquisition", "funnels", "conversion optimization", "marketing analytics", "UGC", "SEO", "PPC management"],
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
    siteName: "A+ Growth",
    title: "A+ Growth — Demand Calibration | Paid Media, Funnels & Analytics",
    description: "A+ Growth turns scattered paid media, funnels and analytics into one clean acquisition signal. 10 years, 300+ funnels across the US, Europe and LatAm — calibrate demand before you scale spend.",
    images: [
      {
        url: "/amir-profile.jpg",
        width: 800,
        height: 800,
        alt: "Amir Gómez — A+ Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A+ Growth — Demand Calibration | Paid Media, Funnels & Analytics",
    description: "A+ Growth turns scattered paid media, funnels and analytics into one clean acquisition signal. Calibrate demand before you scale spend.",
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
        {/* Google Tag Manager - Load immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HKRKM7F');`,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2175265989671046');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2175265989671046&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5HKRKM7F"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
