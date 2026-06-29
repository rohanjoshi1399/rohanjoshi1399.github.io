import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import { personalInfo } from "@/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://rohanjoshi1399.github.io";
const SITE_TITLE = "Rohan Joshi | Software Engineer, AI/ML & Distributed Systems";
const SITE_DESCRIPTION =
  "Software engineer with 4+ years building data analytics and AI systems on AWS, including RAG, multi-agent AI, and distributed systems. Currently pursuing an M.S. in Computer Science at Northeastern.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Rohan Joshi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rohan Joshi",
    "Software Engineer",
    "AI/ML Engineer",
    "RAG",
    "Multi-Agent AI",
    "Distributed Systems",
    "Backend Engineer",
    "AWS",
    "Northeastern University",
  ],
  authors: [{ name: "Rohan Joshi", url: SITE_URL }],
  creator: "Rohan Joshi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rohan Joshi | Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    // Static /og.png (in public/) rather than a dynamic opengraph-image route:
    // GitHub Pages serves extensionless files as application/octet-stream, which
    // LinkedIn/Facebook reject as share images. A real .png guarantees image/png.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

// JSON-LD structured data so search engines (and recruiters' tools) understand
// who this is. Rendered into the static HTML at build time.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: SITE_URL,
  email: `mailto:${personalInfo.email}`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Northeastern University" },
    { "@type": "CollegeOrUniversity", name: "BITS Pilani" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Retrieval-Augmented Generation",
    "Distributed Systems",
    "Cloud Infrastructure",
    "AWS",
  ],
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T5610SDMCK"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T5610SDMCK');
          `}
        </Script>

      </body>
    </html>
  );
}
