import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

const meta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Kontakt",
    description: "Kontaktieren Sie Praxen Jerumed – erreichen Sie uns per Telefon, E-Mail oder besuchen Sie eine unserer Praxen in Zürich, Dübendorf, Winterthur oder Wald.",
  },
  en: {
    title: "Contact",
    description: "Contact Praxen Jerumed – reach us by phone, email or visit one of our practices in Zürich, Dübendorf, Winterthur or Wald.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;
  return createMetadata(m.title, m.description, "/contact", locale);
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
