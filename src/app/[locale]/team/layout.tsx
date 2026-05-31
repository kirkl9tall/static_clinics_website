import { createLayoutMetadata } from "@/lib/metadata";

export const generateMetadata = createLayoutMetadata("/team", {
  de: {
    title: "Unser Ärzteteam",
    description: "Lernen Sie unsere erfahrenen Ärztinnen und Ärzte kennen – Allgemeinmedizin, Urologie und ästhetische Medizin im Netzwerk Praxen Jerumed.",
  },
  en: {
    title: "Our Medical Team",
    description: "Meet our experienced physicians – general medicine, urology and aesthetic medicine across the Praxen Jerumed network.",
  },
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
