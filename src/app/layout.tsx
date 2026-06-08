import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicChrome from "@/components/PublicChrome";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Celestia Smiles | Premium Dental Clinic",
  description:
    "Advanced cosmetic, orthodontic, and restorative dentistry designed for comfort, confidence, and long-lasting results. Book your consultation today.",
  keywords: [
    "dentist",
    "cosmetic dentist",
    "dental implants",
    "teeth whitening",
    "orthodontics",
    "Invisalign",
    "smile makeover",
    "premium dental clinic",
  ],
  openGraph: {
    title: "Celestia Smiles | Premium Dental Clinic",
    description: "Not all smiles need fixing. Some need vision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Celestia Smiles",
              description: "Premium dental clinic offering cosmetic, orthodontic, and restorative dentistry.",
              telephone: "+1-888-235-3784",
              address: {
                "@type": "PostalAddress",
                streetAddress: "422 Serenity Avenue, Suite 900",
                addressLocality: "New Delhi",
                addressRegion: "DL",
                postalCode: "110001",
                addressCountry: "IN",
              },
              openingHours: ["Mo-Fr 09:00-19:00", "Sa 10:00-15:00"],
              priceRange: "$$$$",
            }),
          }}
        />
      </head>
      <body>
        <PublicChrome>
          {children}
        </PublicChrome>
      </body>
    </html>
  );
}
