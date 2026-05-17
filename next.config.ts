import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://static.hotjar.com https://script.hotjar.com https://*.hotjar.com https://www.clarity.ms https://*.clarity.ms https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://widget.trustpilot.com https://*.trustpilot.com https://invitejs.trustpilot.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://ssl.google-analytics.com https://stats.g.doubleclick.net https://region1.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://www.clarity.ms https://c.bing.com https://*.hotjar.com https://vc.hotjar.io https://api.brevo.com https://*.supabase.co https://api.indexnow.org https://www.google.com https://api.trustpilot.com https://*.trustpilot.com",
      "frame-src 'self' https://www.google.com https://*.hotjar.com https://widget.trustpilot.com https://*.trustpilot.com",
      "worker-src 'self' blob:",
      "media-src 'self' blob: https:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/static/chunks/:path*.css",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
      {
        source: "/_next/static/css/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
