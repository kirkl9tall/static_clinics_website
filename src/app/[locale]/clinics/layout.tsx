import { createLayoutMetadata } from "@/lib/metadata";

export const generateMetadata = createLayoutMetadata("/clinics", {
  de: {
    title: "Unsere Praxen",
    description: "Entdecken Sie alle Praxen im Jerumed-Netzwerk – Hausarztpraxen in Zürich, Dübendorf, Winterthur und Wald sowie Spezialpraxen für Urologie und ästhetische Medizin.",
  },
  en: {
    title: "Our Clinics",
    description: "Explore all clinics in the Jerumed network – GP practices in Zürich, Dübendorf, Winterthur and Wald, plus specialist centres for urology and aesthetic medicine.",
  },
});

export default function ClinicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
