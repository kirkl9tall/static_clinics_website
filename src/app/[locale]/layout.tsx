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

export const metadata: Metadata = {
  title: {
    default: "Praxen Jerumed – Ihr Gesundheitsnetzwerk in der Schweiz",
    template: "%s | Praxen Jerumed",
  },
  description: "Praxen Jerumed ist ein Netzwerk von Fachpraxen in der Schweiz – Hausarztmedizin, ästhetische Medizin, Labor und mehr.",
  keywords: ["Hausarzt", "Praxis", "Zürich", "Schweiz", "Jerumed", "Medesthec", "Winterthur", "Altstetten"],
  authors: [{ name: "Praxen Jerumed" }],
  openGraph: {
    type: "website",
    url: "https://praxen-jerumed.ch",
    siteName: "Praxen Jerumed",
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
