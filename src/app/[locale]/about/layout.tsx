import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

const meta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Über uns",
    description: "Praxen Jerumed – ein wachsendes Netzwerk von Arztpraxen in der Schweiz mit dem Ziel, hochwertige, patientenorientierte Medizin in der Region zugänglich zu machen.",
  },
  en: {
    title: "About Us",
    description: "Praxen Jerumed – a growing network of medical practices in Switzerland dedicated to providing high-quality, patient-centred healthcare across the region.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;
  return createMetadata(m.title, m.description, "/about", locale);
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
