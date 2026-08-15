import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://praxen-jerumed.ch";
const OG_IMAGE = `${BASE_URL}/praxen-jerumed.webp`;

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${BASE_URL}/#organization`,
  "name": "Praxen Jerumed",
  "url": BASE_URL,
  "logo": `${BASE_URL}/og-image.jpg`,
  "description":
    "Das Jerumed-Ärztenetwerk: Allgemeinmedizin, Urologie & Ästhetik in Zürich, Dübendorf, Winterthur & Wald. Neue Patienten willkommen.",
  "areaServed": {
    "@type": "State",
    "name": "Zürich"
  },
  "sameAs": [
    "https://hausarztpraxis-winterthur.ch",
    "https://hausarztpraxis-duebendorf.ch",
    "https://praxis-altstetten.ch",
    "https://praxis-seefeld.ch"
  ]
};

// WebSite Schema
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "Praxen Jerumed",
  "url": BASE_URL,
  "inLanguage": "de-CH",
  "publisher": { "@id": `${BASE_URL}/#organization` }
};

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": BASE_URL
    }
  ]
};

export const metadata = {
  title: "Praxen Jerumed – Ihr Hausarzt-Netzwerk in Zürich, Dübendorf & Winterthur",
  description:
    "Das Jerumed-Ärztenetwerk: Allgemeinmedizin, Urologie & Ästhetik in Zürich, Dübendorf, Winterthur & Wald. Neue Patienten willkommen. Jetzt Praxis finden!",
  keywords: [
    "Hausarzt-Netzwerk Zürich", "Ärzte-Netzwerk Schweiz", "Praxen Jerumed",
    "Hausarzt Zürich", "Hausarzt Dübendorf", "Hausarzt Winterthur",
    "Allgemeinmedizin Zürich", "Urologie Zürich", "Ästhetische Medizin Zürich",
    "Arztpraxis Zürich", "Arztpraxis Dübendorf", "Arztpraxis Winterthur",
    "Neue Patienten Zürich", "Dr. Awad Abuawad", "Dr. Fedi Farah"
  ],
  metadataBase: new URL("https://praxen-jerumed.ch"),
  openGraph: {
    type: "website",
    url: "https://praxen-jerumed.ch",
    siteName: "Praxen Jerumed – Ärzte-Netzwerk Schweiz",
    title: "Praxen Jerumed – Hausarzt-Netzwerk Zürich, Dübendorf, Winterthur & Wald",
    description:
      "Jerumed vereint erstklassige Hausarztpraxen in der ganzen Zürich-Region. Dr. Awad Abuawad, Dr. Fedi Farah und ihr Team freuen sich auf Sie.",
    locale: "de_CH",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Praxen Jerumed – Hausarzt-Netzwerk Schweiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxen Jerumed | Hausarzt-Netzwerk Zürich Region",
    description:
      "Allgemeinmedizin, Urologie & Ästhetik in der Zürich-Region. Ihr Arzt-Netzwerk mit mehreren Standorten.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="z3OLeLUaMrksSq2OZ8wzXIPLrnGSQ73qp5HFz1NvFb8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KPC0BHN8ZE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KPC0BHN8ZE');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
