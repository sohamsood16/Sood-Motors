import type { Metadata } from "next";
import "@fontsource/big-shoulders-display/500";
import "@fontsource/big-shoulders-display/600";
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/ibm-plex-sans/400";
import "@fontsource/ibm-plex-sans/500";
import "@fontsource/ibm-plex-sans/600";
import "@fontsource/ibm-plex-mono/400";
import "@fontsource/ibm-plex-mono/500";
import "./globals.css";
import { business } from "@/lib/business";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const siteUrl = "https://soodmotorsdetailingstudio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Premium Car Detailing in Kurukshetra`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  keywords: [
    "car detailing Kurukshetra",
    "ceramic coating Kurukshetra",
    "paint correction Haryana",
    "PPF Kurukshetra",
    "car detailing studio Pipli",
    business.name,
  ],
  authors: [{ name: business.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} | Premium Car Detailing in Kurukshetra`,
    description: business.description,
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Premium Car Detailing in Kurukshetra`,
    description: business.description,
    images: ["/images/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: business.name,
  image: `${siteUrl}/images/og-cover.svg`,
  telephone: business.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.line1}, ${business.address.line2}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "IN",
  },
  url: siteUrl,
  sameAs: [business.instagramUrl],
  openingHoursSpecification: business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-ink text-bone antialiased">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
