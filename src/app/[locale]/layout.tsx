import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://praxen-jerumed.ch";
const OG_IMAGE = `${BASE_URL}/praxen-jerumed.png`;

const siteMeta = {
  de: {
    title: "Praxen Jerumed – Ihr Hausarzt-Netzwerk in Zürich, Dübendorf & Winterthur",
    description: "Das Jerumed-Ärztenetzwerk: Allgemeinmedizin, Urologie & Ästhetik in Zürich, Dübendorf, Winterthur & Wald. Neue Patienten willkommen. Jetzt Praxis finden!",
    keywords: ["Hausarzt Zürich", "Hausarzt Dübendorf", "Hausarzt Winterthur", "Hausarzt Wald", "Praxen Jerumed", "Arztpraxis Schweiz", "Urologie Zug", "Ästhetische Medizin Zürich", "Allgemeinmedizin", "Felsenau Wald"],
    ogLocale: "de_CH",
  },
  en: {
    title: "Praxen Jerumed – Your Family Doctor Network in Zurich, Dübendorf & Winterthur",
    description: "The Jerumed physician network: general medicine, urology & aesthetic medicine in Zurich, Dübendorf, Winterthur & Wald. New patients welcome – find your practice today!",
    keywords: ["family doctor Zurich", "GP Dübendorf", "doctor Winterthur", "doctor Wald", "Praxen Jerumed", "medical practice Switzerland", "urology", "aesthetic medicine Zurich", "general medicine", "English speaking doctor Zurich"],
    ogLocale: "en_US",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = siteMeta[locale as keyof typeof siteMeta] ?? siteMeta.de;

  return {
    metadataBase: new URL(BASE_URL),
    // The suffix is applied here only — the root layout deliberately defines no
    // template, otherwise every sub-page title got the site name twice.
    title: {
      default: m.title,
      template: "%s | Praxen Jerumed",
    },
    description: m.description,
    keywords: [...m.keywords],
    authors: [{ name: "Praxen Jerumed" }],
    openGraph: {
      type: "website",
      url: `${BASE_URL}/${locale}`,
      siteName: "Praxen Jerumed",
      title: m.title,
      description: m.description,
      locale: m.ogLocale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Praxen Jerumed" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "de-CH": `${BASE_URL}/de`,
        "en":    `${BASE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
