import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FooterGate from "@/components/layout/FooterGate";
import { PHProvider } from "@/providers/PostHogProvider";
import PostHogPageView from "@/providers/PostHogPageView";
import { Suspense } from "react";
import { validateExcursionData } from "@/lib/data-validator";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ViewportBadge from "@/components/dev/ViewportBadge";
import PerfSafe from "@/components/dev/PerfSafe";
import ThemeScript from "@/components/theme/ThemeScript";
import Script from "next/script";
import FloatingWhatsAppFab from "@/components/ui/FloatingWhatsAppFab";

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
  title: {
    default: "Syren | Egypt Travel Agency — Events, Tours & Curated Experiences",
    template: "%s | Syren Egypt",
  },
  description:
    "Syren is Egypt's premier travel agency. Discover curated journeys, international music events, private tours, and bespoke experiences across Cairo, the Nile, and the Red Sea.",
  keywords: [
    "Egypt travel agency",
    "travel to Egypt",
    "Egypt tours",
    "Egypt events",
    "music festivals Egypt",
    "Zamna Egypt",
    "Egypt travel packages",
    "luxury Egypt travel",
    "Cairo tours",
    "Red Sea travel",
    "Nile cruise",
    "Egypt experiences",
    "Gulf travelers Egypt",
    "Europe to Egypt travel",
    "Latin America Egypt",
  ],
  authors: [{ name: "Syren Travel" }],
  creator: "Syren Travel",
  publisher: "Syren Travel",
  metadataBase: new URL("https://www.syrentravel.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.syrentravel.com",
    siteName: "Syren Travel",
    title: "Syren | Egypt's Premier Travel Agency",
    description: "Curated journeys, international events, and bespoke experiences across Egypt.",
    images: [{ url: "/images/hero/luxury.jpg", width: 1200, height: 630, alt: "Syren Egypt Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syren | Egypt Travel Agency",
    description: "Curated journeys, international events, and bespoke experiences across Egypt.",
    images: ["/images/hero/luxury.jpg"],
  },
  verification: {
    google: "3tE6l_Fv-kIBJbdwkoUurFucRjhTB9n3EW3mqaz9Pe0",
    other: {
      "msvalidate.01": "F32E61A423FC78949146A9DD314145CE",
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preload" as="image" href="/images/hero/luxury.jpg" fetchPriority="high" />
        <Script id="perf-safe-before" strategy="beforeInteractive">
          {(`
            (function(){
              try{
                if(typeof window!=='undefined'){
                  var host=window.location&&window.location.hostname;
                  var isDev=host==='localhost'||host==='127.0.0.1';
                  if(isDev){
                    var perf=window.performance;
                    if(perf&&typeof perf.measure==='function'){
                      var orig=perf.measure.bind(perf);
                      perf.measure=function(){
                        try{ return orig.apply(perf,arguments); }
                        catch(e){ console.warn('[PerfSafe/beforeInteractive] Suppressed Performance.measure error:', e); return undefined; }
                      };
                    }
                  }
                }
              }catch(_){}
            })();
          `)}
        </Script>
        <script
          id="perf-safe-head"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(typeof window!=='undefined'){var host=window.location&&window.location.hostname;var isDev=host==='localhost'||host==='127.0.0.1';if(isDev){var perf=window.performance;if(perf&&typeof perf.measure==='function'){var orig=perf.measure.bind(perf);perf.measure=function(){try{return orig.apply(perf,arguments);}catch(e){console.warn('[PerfSafe/head] Suppressed Performance.measure error:',e);return undefined;}}}}}}catch(_){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Syren Travel",
              url: "https://www.syrentravel.com",
              logo: "https://www.syrentravel.com/syren-logo.svg.png",
              description:
                "Luxury curated Egypt travel experiences for discerning global travelers.",
            }),
          }}
        />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//static.hotjar.com" />
        <link rel="preconnect" href="https://api.brevo.com" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <PHProvider>
            <PerfSafe />
            <Suspense>
              <PostHogPageView />
            </Suspense>
            <Navbar />
            <main id="main-content" role="main" className="pt-20">
              {children}
            </main>
            <FooterGate />
            <ViewportBadge />
          </PHProvider>
        </ThemeProvider>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vt8xkvfec3");
          `}
        </Script>
        <Script
          id="ga4-lib"
          src="https://www.googletagmanager.com/gtag/js?id=G-119ZX0583F"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-119ZX0583F', { page_path: window.location.pathname });
          `}
        </Script>
        <Script
          id="trustpilot-invite"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
              a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
              f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js','tp');
              tp('register', 'ykdaMze3aKsQ6s8m');
            `
          }}
        />
        <Script
          id="trustpilot-widget"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
        <FloatingWhatsAppFab />
      </body>
    </html>
  );
}
