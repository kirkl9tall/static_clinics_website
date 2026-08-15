import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      // Old WordPress German-language pages
      { source: '/wiederaufnahme-regel-praxisbetrieb', destination: '/de/news', permanent: true },
      { source: '/stellenangebot', destination: '/de/about', permanent: true },
      { source: '/freie-stellen', destination: '/de/about', permanent: true },
      { source: '/roentgenanlage-erneuert', destination: '/de/news', permanent: true },
      { source: '/uber-uns', destination: '/de/about', permanent: true },
      { source: '/kontakt', destination: '/de/contact', permanent: true },
      { source: '/praxis-team', destination: '/de/team', permanent: true },
      { source: '/faqs', destination: '/de', permanent: true },
      { source: '/doctor/dr-jamil-dipl-arztin-allgemeinmedizin-fmh', destination: '/de/team', permanent: true },

      // Additional old WordPress pages likely indexed by Google
      { source: '/doctor/:slug*', destination: '/de/team', permanent: true },
      { source: '/aerzte', destination: '/de/team', permanent: true },
      { source: '/arzte', destination: '/de/team', permanent: true },
      { source: '/leistungen', destination: '/de/services', permanent: true },
      { source: '/praxis', destination: '/de/clinics', permanent: true },
      { source: '/standorte', destination: '/de/clinics', permanent: true },
      { source: '/galerie', destination: '/de/gallery', permanent: true },
      { source: '/impressum', destination: '/de', permanent: true },
      { source: '/datenschutz', destination: '/de', permanent: true },
      { source: '/termin', destination: '/de/book-appointment', permanent: true },
      { source: '/termin-buchen', destination: '/de/book-appointment', permanent: true },
      { source: '/news', destination: '/de/news', permanent: true },
      { source: '/aktuelles', destination: '/de/news', permanent: true },

      // WordPress system URLs (catch-all patterns)
      { source: '/wp-content/:path*', destination: '/de', permanent: true },
      { source: '/wp-admin/:path*', destination: '/de', permanent: true },
      { source: '/wp-includes/:path*', destination: '/de', permanent: true },
      { source: '/wp-login.php', destination: '/de', permanent: true },
      { source: '/wp-json/:path*', destination: '/de', permanent: true },
      { source: '/feed', destination: '/de', permanent: true },
      { source: '/feed/:path*', destination: '/de', permanent: true },
      { source: '/xmlrpc.php', destination: '/de', permanent: true },
      { source: '/category/:path*', destination: '/de/news', permanent: true },
      { source: '/tag/:path*', destination: '/de/news', permanent: true },
      { source: '/page/:path*', destination: '/de', permanent: true },
      { source: '/author/:path*', destination: '/de/team', permanent: true },
      { source: '/attachment/:path*', destination: '/de', permanent: true },

      // Common old page patterns without locale prefix
      { source: '/about', destination: '/de/about', permanent: true },
      { source: '/services', destination: '/de/services', permanent: true },
      { source: '/clinics', destination: '/de/clinics', permanent: true },
      { source: '/team', destination: '/de/team', permanent: true },
      { source: '/contact', destination: '/de/contact', permanent: true },
      { source: '/gallery', destination: '/de/gallery', permanent: true },
      { source: '/book-appointment', destination: '/de/book-appointment', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
