import { createLayoutMetadata } from "@/lib/metadata";

export const generateMetadata = createLayoutMetadata("/contact", {
  de: {
    title: "Kontakt",
    description: "Kontaktieren Sie Praxen Jerumed – erreichen Sie uns per Telefon, E-Mail oder besuchen Sie eine unserer Praxen in Zürich, Dübendorf, Winterthur oder Wald.",
  },
  en: {
    title: "Contact",
    description: "Contact Praxen Jerumed – reach us by phone, email or visit one of our practices in Zürich, Dübendorf, Winterthur or Wald.",
  },
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
