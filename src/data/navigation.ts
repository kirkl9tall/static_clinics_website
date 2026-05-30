import { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Our Network",
    href: "/clinics",
    children: [
      { label: "All Clinics", href: "/clinics", description: "Browse our complete network" },
      { label: "Hausarztpraxis Seefeld", href: "/clinics/hausarztpraxis-seefeld", description: "Zürich" },
      { label: "Hausarztpraxis Dübendorf", href: "/clinics/hausarztpraxis-duebendorf", description: "Dübendorf" },
      { label: "Hausarztpraxis Altstetten", href: "/clinics/hausarztpraxis-altstetten", description: "Zürich" },
      { label: "Hausarztpraxis Felsenau", href: "/clinics/hausarztpraxis-wald", description: "Wald" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services", description: "Complete service overview" },
      { label: "General Medicine", href: "/services/general-medicine" },
      { label: "Cardiology", href: "/services/cardiology" },
      { label: "Laboratory", href: "/services/laboratory" },
      { label: "Beauty & Aesthetics", href: "/services/beauty-treatments" },
    ],
  },
  { label: "Team", href: "/team" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
