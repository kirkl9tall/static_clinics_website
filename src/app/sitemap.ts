import { MetadataRoute } from "next";
import { clinics } from "@/data/clinics";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";

const BASE_URL = "https://praxen-jerumed.ch";
const LOCALES = ["de", "en"] as const;

function urls(path: string, priority: number, changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    ...urls("",            1.0,  "weekly"),
    ...urls("/about",      0.8,  "monthly"),
    ...urls("/services",   0.9,  "weekly"),
    ...urls("/clinics",    0.9,  "weekly"),
    ...urls("/team",       0.8,  "monthly"),
    ...urls("/contact",    0.7,  "monthly"),
    ...urls("/gallery",    0.6,  "monthly"),
  ];

  const clinicPages = clinics
    .filter((c) => !c.isComingSoon)
    .flatMap((c) => urls(`/clinics/${c.slug}`, 0.85, "monthly"));

  const servicePages = services.flatMap((s) =>
    urls(`/services/${s.slug}`, 0.8, "monthly")
  );

  const doctorPages = doctors.flatMap((d) =>
    urls(`/team/${d.slug}`, 0.7, "monthly")
  );

  return [...staticPages, ...clinicPages, ...servicePages, ...doctorPages];
}
