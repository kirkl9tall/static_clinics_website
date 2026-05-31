import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

const meta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Unsere Praxen",
    description: "Entdecken Sie alle Praxen im Jerumed-Netzwerk – Hausarztpraxen in Zürich, Dübendorf, Winterthur und Wald sowie Spezialpraxen für Urologie und ästhetische Medizin.",
  },
  en: {
    title: "Our Clinics",
    description: "Explore all clinics in the Jerumed network – GP practices in Zürich, Dübendorf, Winterthur and Wald, plus specialist centres for urology and aesthetic medicine.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;
  return createMetadata(m.title, m.description, "/clinics", locale);
}

export default function ClinicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
