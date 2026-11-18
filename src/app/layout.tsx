import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicChrome from "@/components/PublicChrome";
import { getPublicClinicSettings } from "@/lib/public-data";
import clinicConfig from "@/config/clinic";

export const revalidate = 3600;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(clinicConfig.seo.siteUrl || "https://sharmasdentalcare.com"),
  title: clinicConfig.seo.title,
  description: clinicConfig.seo.description,
  keywords: clinicConfig.seo.keywords,
  openGraph: {
    title: clinicConfig.seo.title,
    description: clinicConfig.seo.description,
    type: "website",
    url: clinicConfig.seo.siteUrl,
    images: [
      {
        url: clinicConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: clinicConfig.clinicName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clinicConfig.seo.title,
    description: clinicConfig.seo.description,
    images: [clinicConfig.seo.ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clinicSettings = (await getPublicClinicSettings()).data;

  const clinicName = clinicSettings?.clinic_name || clinicConfig.clinicName;
  const clinicPhone = clinicSettings?.phone || clinicConfig.phone;
  const fullAddress = clinicSettings?.address || clinicConfig.fullAddress;
  const city = clinicSettings?.city || clinicConfig.city;
  const postalCode = clinicSettings?.postal_code || clinicConfig.pincode;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
    name: clinicName,
    description: clinicConfig.seo.description,
    telephone: clinicPhone,
    email: clinicConfig.email,
    url: clinicConfig.seo.siteUrl,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
    address: {
      "@type": "PostalAddress",
      streetAddress: fullAddress,
      addressLocality: clinicConfig.area,
      addressRegion: city,
      postalCode: postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.5034",
      longitude: "73.8052",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "13:00",
      },
    ],
    aggregateRating: clinicConfig.googleRating
      ? {
          "@type": "AggregateRating",
          ratingValue: clinicConfig.googleRating,
          reviewCount: clinicConfig.totalReviews || 100,
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        style={
          {
            "--brand-primary": clinicConfig.theme.primaryColor,
            "--brand-accent": clinicConfig.theme.accentColor,
            "--brand-navy": clinicConfig.theme.darkNavy,
          } as React.CSSProperties
        }
      >
        <PublicChrome initialSettings={clinicSettings}>
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
