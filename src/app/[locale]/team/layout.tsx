import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

const meta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Unser Ärzteteam",
    description: "Lernen Sie unsere erfahrenen Ärztinnen und Ärzte kennen – Allgemeinmedizin, Urologie und ästhetische Medizin im Netzwerk Praxen Jerumed.",
  },
  en: {
    title: "Our Medical Team",
    description: "Meet our experienced physicians – general medicine, urology and aesthetic medicine across the Praxen Jerumed network.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;
  return createMetadata(m.title, m.description, "/team", locale);
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
