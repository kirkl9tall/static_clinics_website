import { Clinic, OpeningHours } from "@/types";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;
const CLOSED = { open: "", close: "", isClosed: true } as const;

function schedule(hours: Partial<Record<typeof DAYS[number], { open: string; close: string }>>): OpeningHours[] {
  return DAYS.map((day) => ({ day, ...(hours[day] ?? CLOSED) }));
}

const h = (open: string, close: string) => ({ open, close });

function weekdays(open: string, close: string): OpeningHours[] {
  const hh = h(open, close);
  return schedule({ Monday: hh, Tuesday: hh, Wednesday: hh, Thursday: hh, Friday: hh });
}

function weekdaysSat(open: string, close: string): OpeningHours[] {
  const hh = h(open, close);
  return schedule({ Monday: hh, Tuesday: hh, Wednesday: hh, Thursday: hh, Friday: hh, Saturday: hh });
}

function allDay(): OpeningHours[] {
  const hh = h("00:00", "23:59");
  return schedule({ Monday: hh, Tuesday: hh, Wednesday: hh, Thursday: hh, Friday: hh, Saturday: hh, Sunday: hh });
}

function defineClinic(data: Omit<Clinic, "country" | "isComingSoon"> & { isComingSoon?: boolean }): Clinic {
  return { country: "Switzerland", isComingSoon: false, ...data };
}

const LOC_BADENERSTR = {
  address: "Badenerstrasse 621",
  city: "Zürich",
  zip: "8048",
  coordinates: { lat: 47.3886, lng: 8.4882 },
};

const LOC_BAARERSTR = {
  address: "Baarerstrasse 82",
  city: "Zug",
  zip: "6300",
  phone: "044 244 09 90",
  coordinates: { lat: 47.166, lng: 8.5159 },
};

export const clinics: Clinic[] = [
  defineClinic({
    id: "seefeld",
    slug: "hausarztpraxis-seefeld",
    name: "Hausarztpraxis Seefeld",
    shortName: "Praxis Seefeld",
    description: "Ihre vertraute Hausarztpraxis im Herzen von Zürich Seefeld – umfassende Grundversorgung mit persönlicher Betreuung.",
    longDescription: "Die Hausarztpraxis Seefeld ist seit über 15 Jahren für die Bevölkerung im Seefeld tätig. Unser Team erfahrener Allgemeinmediziner bietet umfassende medizinische Leistungen in moderner, einladender Umgebung – von Routineuntersuchungen bis zur Akutversorgung.",
    category: "general-practice",
    address: "Seefeldstrasse 187",
    city: "Zürich",
    zip: "8008",
    phone: "044 422 24 13",
    email: "praxis-seefeld@hin.ch",
    website: "https://www.praxis-seefeld.ch/",
    image: "/images/clinic-seefeld.jpg",
    logo: "/jeru5.webp",
    services: ["Allgemeinmedizin", "Vorsorgeuntersuchungen", "Impfungen", "Labor", "Kleinchirurgie", "Röntgen"],
    openingHours: weekdays("09:00", "18:00"),
    coordinates: { lat: 47.3565, lng: 8.5568 },
    accentColor: "#0ea5e9",
  }),
  defineClinic({
    id: "duebendorf",
    slug: "hausarztpraxis-duebendorf",
    name: "Hausarztpraxis Dübendorf",
    shortName: "Praxis Dübendorf",
    description: "Moderne Hausarztpraxis in Dübendorf mit Familienmedizin, Notfallbehandlungen und Präventivmedizin.",
    longDescription: "Unsere Praxis in Dübendorf verbindet langjährige medizinische Erfahrung mit modernster Technologie. Wir sind spezialisiert auf Familienmedizin und bieten ein breites Leistungsspektrum – von Routineuntersuchungen bis zur Notfallversorgung.",
    category: "general-practice",
    address: "Leepuntstrasse 5",
    city: "Dübendorf",
    zip: "8600",
    phone: "044 820 10 20",
    email: "praxis-duebendorf@hin.ch",
    website: "https://www.hausarztpraxis-duebendorf.ch/",
    image: "/images/clinic-duebendorf.jpg",
    logo: "/jeru2.jpeg",
    services: ["Allgemeinmedizin", "Notfallversorgung", "Präventivmedizin", "Labor", "EKG", "Spirometrie"],
    openingHours: schedule({
      Monday: h("09:00", "17:00"),
      Tuesday: h("09:00", "17:00"),
      Wednesday: h("09:00", "12:30"),
      Thursday: h("09:00", "17:00"),
      Friday: h("09:00", "12:30"),
    }),
    coordinates: { lat: 47.3972, lng: 8.6186 },
    accentColor: "#10b981",
  }),
  defineClinic({
    id: "altstetten",
    slug: "hausarztpraxis-altstetten",
    name: "Hausarztpraxis Altstetten",
    shortName: "Praxis Altstetten",
    description: "Umfassende Grundversorgung in Zürich Altstetten – mit erweitertem Angebot inkl. Röntgen und Apotheke vor Ort.",
    longDescription: "Im dynamischen Quartier Altstetten bieten wir umfassende Grundversorgung mit erweiterten diagnostischen Möglichkeiten. Unsere Apotheke und Röntgenanlage vor Ort ermöglichen eine schnelle und effiziente Patientenversorgung.",
    category: "general-practice",
    ...LOC_BADENERSTR,
    phone: "044 244 09 99",
    email: "praxis-altstetten@hin.ch",
    website: "https://praxis-altstetten.ch/",
    image: "/images/clinic-altstetten.jpg",
    logo: "/jeru1.jpeg",
    services: ["Allgemeinmedizin", "Röntgen", "Apotheke", "Labor", "Impfungen", "Reisemedizin"],
    openingHours: weekdaysSat("09:30", "18:00"),
    accentColor: "#0ea5e9",
  }),
  defineClinic({
    id: "winterthur",
    slug: "hausarztpraxis-winterthur",
    name: "Hausarztpraxis Winterthur",
    shortName: "Praxis Winterthur",
    description: "Qualitätsmedizin im Herzen von Winterthur – persönliche Betreuung mit moderner Diagnostik.",
    longDescription: "Unsere Praxis in Winterthur bietet hochwertige Familienmedizin in einer herzlichen, professionellen Atmosphäre. Wir legen grossen Wert auf langfristige Patientenbeziehungen und eine auf den Einzelnen abgestimmte Betreuung.",
    category: "general-practice",
    address: "Eichgutstrasse 1",
    city: "Winterthur",
    zip: "8400",
    phone: "052 212 35 36",
    email: "praxis-winterthur@hin.ch",
    website: "https://www.hausarztpraxis-winterthur.ch/",
    image: "/images/clinic-winterthur.jpg",
    logo: "/jeru2.jpeg",
    services: ["Allgemeinmedizin", "Vorsorgeuntersuchungen", "Chronische Erkrankungen", "Labor", "EKG"],
    openingHours: schedule({
      Monday: h("09:00", "18:00"),
      Tuesday: h("09:00", "18:00"),
      Thursday: h("09:00", "18:00"),
    }),
    coordinates: { lat: 47.4997, lng: 8.7278 },
    accentColor: "#10b981",
  }),
  defineClinic({
    id: "wald",
    slug: "hausarztpraxis-wald",
    name: "Hausarztpraxis Felsenau",
    shortName: "Praxis Wald",
    description: "Gemeinschaftsnahe Hausarztpraxis in Wald – niederschwellige Versorgung in einem herzlichen Umfeld.",
    longDescription: "Die Praxis Felsenau in Wald bietet einen persönlichen Ansatz in der Gesundheitsversorgung in entspannter, gemeinschaftsorientierter Atmosphäre. Unser Team legt den Fokus auf Prävention und das Wohlbefinden jedes einzelnen Patienten.",
    category: "general-practice",
    address: "Rosenthalstrasse 7A",
    city: "Wald",
    zip: "8636",
    phone: "055 246 18 55",
    email: "praxis-felsenau@hin.ch",
    website: "https://praxis-felsenau.ch",
    image: "/images/clinic-wald.jpg",
    logo: "/jeru3.jpeg",
    services: ["Allgemeinmedizin", "Prävention", "Impfungen", "Labor", "Gesundheitsberatung"],
    openingHours: schedule({
      Monday: h("09:00", "17:30"),
      Wednesday: h("09:00", "18:00"),
      Thursday: h("09:00", "17:30"),
      Friday: h("09:00", "17:30"),
    }),
    coordinates: { lat: 47.2776, lng: 8.9134 },
    accentColor: "#059669",
  }),
  defineClinic({
    id: "medesthec",
    slug: "medesthec",
    name: "MedEsthec",
    shortName: "MedEsthec",
    description: "Premium ästhetische Medizin in Zürich – Wissenschaft und Kunstfertigkeit für natürliche, elegante Ergebnisse.",
    longDescription: "MedEsthec ist unser Premium-Zentrum für ästhetische Medizin mit modernsten Behandlungen zur Schönheit und Verjüngung. Unser Spezialistenteam verbindet medizinische Expertise mit künstlerischem Blick für natürliche, stilvolle Resultate.",
    category: "beauty-aesthetic",
    address: "Seefeldstrasse 187",
    city: "Zürich",
    zip: "8008",
    phone: "044 244 09 90",
    email: "info@medesthec.ch",
    website: "https://med-esthec.ch/",
    image: "/images/clinic-medesthec.jpg",
    logo: "/jeru4.jpeg",
    services: ["Botox", "Filler", "Hautverjüngung", "Lasertherapie", "Körperformung", "PRP-Therapie"],
    openingHours: schedule({
      Wednesday: h("14:00", "18:00"),
      Friday: h("14:00", "18:00"),
      Saturday: h("10:00", "18:00"),
    }),
    coordinates: { lat: 47.3565, lng: 8.5568 },
    accentColor: "#d946ef",
  }),
  defineClinic({
    id: "beauty-altstetten",
    slug: "schoenheitspraxis-altstetten",
    name: "Schönheitspraxis Altstetten",
    shortName: "Beauty Altstetten",
    description: "Ästhetik- und Schönheitszentrum in Zürich Altstetten – breites Angebot an kosmetischen und Verjüngungsbehandlungen.",
    longDescription: "Unsere Schönheitspraxis in Altstetten bietet ein umfangreiches Portfolio ästhetischer Behandlungen in luxuriöser, entspannter Atmosphäre – von nicht-invasiven Hautbehandlungen bis zu fortgeschrittenen kosmetischen Verfahren.",
    category: "beauty-aesthetic",
    ...LOC_BADENERSTR,
    phone: "044 244 09 90",
    email: "beauty-altstetten@jerumed.com",
    website: "#",
    image: "/images/clinic-beauty.jpg",
    logo: "",
    services: ["Gesichtsbehandlungen", "Hautpflege", "Anti-Aging", "Wellnessmassage", "Schönheitsberatung"],
    openingHours: schedule({
      Monday: h("09:00", "18:00"),
      Tuesday: h("09:00", "18:00"),
      Wednesday: h("09:00", "18:00"),
      Thursday: h("09:00", "19:00"),
      Friday: h("09:00", "17:00"),
    }),
    isComingSoon: true,
    accentColor: "#ec4899",
  }),
  defineClinic({
    id: "naturheilmedizin",
    slug: "naturheilmedizin-altstetten",
    name: "Naturheilmedizin Altstetten",
    shortName: "Natural Medicine",
    description: "Ganzheitliches Naturheilzentrum mit komplementären Therapien und integrativem Gesundheitsansatz.",
    longDescription: "Unser Naturheilzentrum verbindet traditionelle Heilmethoden mit modernem medizinischem Wissen. Wir bieten ein umfassendes Angebot komplementärer Therapien zur Unterstützung der natürlichen Selbstheilungskräfte und ganzheitlichen Gesundheitsförderung.",
    category: "natural-medicine",
    ...LOC_BADENERSTR,
    phone: "044 244 09 90",
    email: "naturheil@jerumed.com",
    website: "#",
    image: "/images/clinic-natural.jpg",
    logo: "",
    services: ["Akupunktur", "Phytotherapie", "Naturheilkunde", "Homöopathie", "Ernährungsberatung"],
    openingHours: weekdays("09:00", "17:00"),
    isComingSoon: true,
    accentColor: "#22c55e",
  }),
  defineClinic({
    id: "urohealth",
    slug: "urohealth",
    name: "UroHealth Center",
    shortName: "UroHealth",
    description: "Spezialisiertes Urologiezentrum mit umfassender urologischer Versorgung und modernster Technologie.",
    longDescription: "UroHealth ist unser spezialisiertes Urologiezentrum mit einem vollständigen Leistungsangebot in der Urologie. Unsere erfahrenen Urologen setzen modernste Technologie für Diagnose und Behandlung ein.",
    category: "urology",
    ...LOC_BAARERSTR,
    email: "urohealth@jerumed.com",
    website: "https://swissurohealth.ch/",
    image: "/images/clinic-uro.jpg",
    logo: "/swisurohealth.png",
    services: ["Urologische Beratung", "Prostatabehandlung", "Nierensteinbehandlung", "Blasengesundheit", "Männergesundheit"],
    openingHours: schedule({
      Monday: h("08:00", "17:00"),
      Tuesday: h("08:00", "17:00"),
      Wednesday: h("08:00", "17:00"),
      Thursday: h("08:00", "17:00"),
      Friday: h("08:00", "16:00"),
    }),
    accentColor: "#6366f1",
  }),
  defineClinic({
    id: "jerumed-shop",
    slug: "jerumed-shop",
    name: "Jerumed Medical Shop",
    shortName: "Jerumed Shop",
    description: "Online-Medizinshop mit Pharmaprodukten, Gesundheitsbedarf und Wellnessartikeln für die ganze Schweiz.",
    longDescription: "Der Jerumed Shop ist Ihre vertrauenswürdige Online-Adresse für Pharmaprodukte, Medizinbedarf und Wellnessartikel. Wir bieten eine kuratierte Auswahl hochwertiger Gesundheitsprodukte mit bequemer Lieferung in der ganzen Schweiz.",
    category: "medical-shop",
    ...LOC_BAARERSTR,
    email: "shop@jerumed.com",
    website: "https://www.jerumed.com/",
    image: "/images/clinic-shop.jpg",
    logo: "/jerumed_shop.png",
    services: ["Pharmazeutika", "Medizinbedarf", "Wellnessprodukte", "Nahrungsergänzung", "Körperpflege"],
    openingHours: allDay(),
    accentColor: "#f59e0b",
  }),
];

export function getClinicBySlug(slug: string): Clinic | undefined {
  return clinics.find((c) => c.slug === slug);
}

export function getClinicsByCategory(category: string): Clinic[] {
  return clinics.filter((c) => c.category === category);
}

export function getClinicsByCity(city: string): Clinic[] {
  return clinics.filter((c) => c.city === city);
}

export const clinicCategories = [
  { value: "general-practice", label: "Hausarztpraxis" },
  { value: "beauty-aesthetic", label: "Ästhetik & Schönheit" },
  { value: "laboratory", label: "Labor" },
  { value: "pharmacy", label: "Apotheke" },
  { value: "telemedicine", label: "Telemedizin" },
  { value: "urology", label: "Urologie" },
  { value: "wellness", label: "Wellness" },
  { value: "medical-shop", label: "Medizinshop" },
  { value: "specialized", label: "Fachklinik" },
  { value: "natural-medicine", label: "Naturheilmedizin" },
];

export const cities = [...new Set(clinics.map((c) => c.city))];
