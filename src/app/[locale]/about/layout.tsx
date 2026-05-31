import { createLayoutMetadata } from "@/lib/metadata";

export const generateMetadata = createLayoutMetadata("/about", {
  de: {
    title: "Über uns",
    description: "Praxen Jerumed – ein wachsendes Netzwerk von Arztpraxen in der Schweiz mit dem Ziel, hochwertige, patientenorientierte Medizin in der Region zugänglich zu machen.",
  },
  en: {
    title: "About Us",
    description: "Praxen Jerumed – a growing network of medical practices in Switzerland dedicated to providing high-quality, patient-centred healthcare across the region.",
  },
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
