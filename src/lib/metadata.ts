import type { Metadata } from "next";

export const BASE_URL = "https://praxen-jerumed.ch";

type LocaleMeta = Record<string, { title: string; description: string }>;

export function createLayoutMetadata(path: string, translations: LocaleMeta) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const m = translations[locale] ?? translations.de;
    return createMetadata(m.title, m.description, path, locale);
  };
}
const SITE_NAME = "Praxen Jerumed";
const OG_IMAGE = `${BASE_URL}/praxen-jerumed.png`;

export function createMetadata(
  title: string,
  description: string,
  path: string = "",
  locale: string = "de"
): Metadata {
  const url = `${BASE_URL}/${locale}${path}`;
  const altLocale = locale === "de" ? "en" : "de";
  const altUrl = `${BASE_URL}/${altLocale}${path}`;

  return {
    // Bare title: the locale layout's template appends " | Praxen Jerumed" once.
    // The template is repeated here so nested pages (e.g. /team/[slug]) keep the
    // suffix instead of falling back to a bare title.
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
      locale: locale === "de" ? "de_CH" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: url,
      languages: {
        [locale === "de" ? "de-CH" : "en"]: url,
        [altLocale === "de" ? "de-CH" : "en"]: altUrl,
      },
    },
  };
}
