import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PHProvider } from "@/providers/PostHogProvider";
import PostHogPageView from "@/providers/PostHogPageView";
import { Suspense } from "react";
import { validateExcursionData } from "@/lib/data-validator";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ViewportBadge from "@/components/dev/ViewportBadge";
import ThemeScript from "@/components/theme/ThemeScript";

// Run data validation in development
if (process.env.NODE_ENV === "development") {
  validateExcursionData();
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.syrentravel.com"),
  title: "Syren | Private Journeys & Bespoke Experiences",
  description: "Private journeys curated with precision.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Syren | Private Journeys & Bespoke Experiences",
    description: "Experience the extraordinary with Syren's curated private journeys...",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Syren",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syren | Private Journeys & Bespoke Experiences",
    description: "Experience the extraordinary with Syren's curated private journeys...",
    images: ["/og-image.jpg"],
    creator: "@syren_egypt",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <PHProvider>
            <Suspense>
              <PostHogPageView />
            </Suspense>
            <Navbar />
            <main id="main-content" role="main" className="pt-20">
              {children}
            </main>
            <Footer />
            <ViewportBadge />
          </PHProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
