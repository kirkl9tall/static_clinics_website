import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/book-appointment/"],
    },
    sitemap: "https://praxen-jerumed.ch/sitemap.xml",
  };
}
