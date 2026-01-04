import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Klinik Gigi Senyum Sejahtera - Perawatan Gigi Profesional",
    template: "%s | Klinik Gigi Senyum Sejahtera",
  },
  description:
    "Klinik gigi terpercaya dengan teknologi modern. Layanan scaling, tambal gigi, behel, bleaching, dan cabut gigi dengan dokter berpengalaman. Booking online mudah & cepat!",
  keywords: [
    "klinik gigi",
    "dokter gigi",
    "perawatan gigi",
    "scaling gigi",
    "tambal gigi",
    "behel gigi",
    "bleaching gigi",
    "cabut gigi",
    "booking dokter gigi",
    "klinik gigi jakarta",
  ],
  authors: [{ name: "Klinik Gigi Senyum Sejahtera" }],
  creator: "Klinik Gigi Senyum Sejahtera",
  publisher: "Klinik Gigi Senyum Sejahtera",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Klinik Gigi Senyum Sejahtera - Perawatan Gigi Profesional",
    description:
      "Wujudkan senyum impianmu! Perawatan gigi dengan teknologi modern dalam suasana nyaman. Booking online sekarang!",
    url: "/",
    siteName: "Klinik Gigi Senyum Sejahtera",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Klinik Gigi Senyum Sejahtera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Gigi Senyum Sejahtera",
    description: "Perawatan gigi profesional dengan teknologi modern. Booking online mudah!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Klinik Gigi Senyum Sejahtera",
              description:
                "Klinik gigi terpercaya dengan teknologi modern dan dokter berpengalaman",
              url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
              telephone: "+62-21-1234567",
              email: "info@dentalclinic.id",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Kesehatan No. 123",
                addressLocality: "Jakarta Selatan",
                addressRegion: "DKI Jakarta",
                postalCode: "12345",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.2088,
                longitude: 106.8456,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              priceRange: "Rp 300.000 - Rp 5.000.000",
              image: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/og-image.jpg`,
              sameAs: [
                "https://www.instagram.com/klinikgigisenyumsejahtera",
                "https://www.facebook.com/klinikgigisenyumsejahtera",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Layanan Gigi",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Scaling Gigi",
                      description: "Pembersihan karang gigi secara menyeluruh",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Tambal Gigi",
                      description: "Perbaikan gigi berlubang dengan bahan estetik",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Pemasangan Behel",
                      description: "Perawatan ortodonti untuk merapikan susunan gigi",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased text-gray-900 bg-gray-50`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
