// Renders a <script type="application/ld+json"> tag for structured data.
// Pass any valid schema.org object as `data`.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Pre-built schemas ────────────────────────────────────────────────────────

const BASE_URL = "https://praxen-jerumed.ch";

/** Site-wide Organization schema — include in the root layout or home page. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Praxen Jerumed",
  url: BASE_URL,
  logo: `${BASE_URL}/praxen-jerumed.png`,
  description:
    "Praxen Jerumed ist ein Netzwerk von Fachpraxen in der Schweiz – Hausarztmedizin, ästhetische Medizin, Labor und mehr.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CH",
    addressRegion: "Zürich",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+41-44-244-09-90",
    contactType: "customer service",
    availableLanguage: ["German", "English", "Arabic"],
  },
  sameAs: ["https://praxen-jerumed.ch"],
};

/** LocalBusiness / MedicalClinic schema for a single clinic. */
export function clinicSchema(clinic: {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  openingHours: { day: string; open: string; close: string; isClosed?: boolean }[];
}) {
  const hours = clinic.openingHours
    .filter((h) => !h.isClosed && h.open && h.close)
    .map((h) => `${h.day.slice(0, 2)} ${h.open}-${h.close}`);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    url: `${BASE_URL}/de/clinics/${clinic.slug}`,
    description: clinic.description,
    telephone: clinic.phone,
    email: clinic.email,
    image: `${BASE_URL}/praxen-jerumed.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      postalCode: clinic.zip,
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.coordinates.lat,
      longitude: clinic.coordinates.lng,
    },
    openingHours: hours,
    parentOrganization: { "@type": "MedicalOrganization", name: "Praxen Jerumed" },
  };
}

/** MedicalProcedure schema for a single service. */
export function serviceSchema(service: {
  name: string;
  slug: string;
  longDescription: string;
  features: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    url: `${BASE_URL}/de/services/${service.slug}`,
    description: service.longDescription,
    howPerformed: service.features.join(", "),
    provider: { "@type": "MedicalOrganization", name: "Praxen Jerumed" },
  };
}

/** Person schema for a doctor profile. */
export function doctorSchema(doctor: {
  name: string;
  slug: string;
  title: string;
  specialty: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    url: `${BASE_URL}/de/team/${doctor.slug}`,
    jobTitle: doctor.title,
    medicalSpecialty: doctor.specialty,
    description: doctor.bio,
    image: doctor.image,
    email: doctor.email,
    telephone: doctor.phone,
    worksFor: { "@type": "MedicalOrganization", name: "Praxen Jerumed" },
  };
}
