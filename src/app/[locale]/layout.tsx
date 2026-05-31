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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Praxen Jerumed – Ihr Gesundheitsnetzwerk in der Schweiz",
    template: "%s | Praxen Jerumed",
  },
  description: "Praxen Jerumed ist ein Netzwerk von Fachpraxen in der Schweiz – Hausarztmedizin, ästhetische Medizin, Labor und mehr.",
  keywords: ["Hausarzt Zürich", "Hausarzt Dübendorf", "Hausarzt Winterthur", "Hausarzt Wald", "Praxen Jerumed", "Arztpraxis Schweiz", "Urologie Zug", "Ästhetische Medizin Zürich", "Allgemeinmedizin", "Felsenau Wald"],
  authors: [{ name: "Praxen Jerumed" }],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Praxen Jerumed",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Praxen Jerumed" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "de-CH": `${BASE_URL}/de`,
      "en":    `${BASE_URL}/en`,
    },
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
