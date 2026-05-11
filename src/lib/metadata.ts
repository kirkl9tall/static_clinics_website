import type { Metadata } from "next";

const BASE_URL = "https://www.jerumed.com";
const SITE_NAME = "Praxen Jerumed";

export function createMetadata(title: string, description: string, path: string = ""): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: { canonical: url },
  };
}
