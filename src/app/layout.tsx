import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { WebVitals } from "@/components/performance";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klinik Gigi Senyum Sejahtera",
  description: "Perawatan gigi berkualitas dengan dokter berpengalaman dan teknologi modern",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-background dark:bg-background-dark transition-colors`}>
        <Providers>
          <WebVitals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
