// Renders a <script type="application/ld+json"> tag for structured data.
// Pass any valid schema.org object as `data`.
export function JsonLd({ data }: { readonly data: Record<string, unknown> }) {
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
  "@id": "https://praxen-jerumed.ch/#organization",
  "name": "Praxen Jerumed",
  "legalName": "Praxen Jerumed AG",
  "url": "https://praxen-jerumed.ch",
  "logo": "https://praxen-jerumed.ch/logo.png",
  "image": "https://praxen-jerumed.ch/og-image.jpg",
  "description": "Das Jerumed-Netzwerk vereint Hausarztpraxen in Dübendorf, Winterthur, Zürich-Altstetten, Zürich-Seefeld und Wald. Allgemeinmedizin, Urologie und Ästhetische Medizin in der ganzen Zürich-Region.",
  "telephone": "+41 44 244 09 90",
  "email": "info@praxen-jerumed.ch",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Zürich",
    "addressCountry": "CH"
  },
  "areaServed": [
    { "@type": "City", "name": "Dübendorf" },
    { "@type": "City", "name": "Winterthur" },
    { "@type": "City", "name": "Zürich" },
    { "@type": "City", "name": "Wald" }
  ],
  "medicalSpecialty": [
    "General Practice",
    "Urology",
    "Aesthetic Medicine",
    "Preventive Medicine"
  ],
  "employee": [
    {
      "@type": "Physician",
      "name": "Dr. Awad Abuawad",
      "jobTitle": "Gründer & Hausarzt",
      "url": "https://praxen-jerumed.ch/team/dr-awad-abuawad",
      "sameAs": "https://med-esthec.ch/team/dr-abuawad"
    },
    {
      "@type": "Physician",
      "name": "Dr. Fedi Farah",
      "jobTitle": "Hausarzt Dübendorf",
      "url": "https://praxen-jerumed.ch/team/dr-fedi-farah"
    }
  ],
  "subOrganization": [
    {
      "@type": "MedicalClinic",
      "@id": "https://hausarztpraxis-duebendorf.ch/#clinic",
      "name": "Hausarztpraxis Dübendorf",
      "url": "https://hausarztpraxis-duebendorf.ch",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dübendorf",
        "postalCode": "8600",
        "addressCountry": "CH"
      }
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://hausarztpraxis-winterthur.ch/#clinic",
      "name": "Hausarztpraxis Winterthur",
      "url": "https://hausarztpraxis-winterthur.ch",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Eichgutstrasse 1",
        "addressLocality": "Winterthur",
        "postalCode": "8400",
        "addressCountry": "CH"
      }
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://praxis-altstetten.ch/#clinic",
      "name": "Hausarztpraxis Zürich Altstetten",
      "url": "https://praxis-altstetten.ch",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Badenerstrasse 621",
        "addressLocality": "Zürich",
        "postalCode": "8048",
        "addressCountry": "CH"
      }
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://praxis-seefeld.ch/#clinic",
      "name": "Hausarztpraxis Zürich Seefeld",
      "url": "https://praxis-seefeld.ch",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zürich",
        "postalCode": "8008",
        "addressCountry": "CH"
      }
    },
    {
      "@type": "MedicalClinic",
      "name": "Hausarztpraxis Wald",
      "url": "https://praxen-jerumed.ch/praxis-wald",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wald",
        "addressCountry": "CH"
      }
    }
  ],
  "sameAs": [
    "https://jerumed.com",
    "https://med-esthec.ch"
  ]
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
    image: `${BASE_URL}/praxen-jerumed.webp`,
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

/** BreadcrumbList schema for inner pages. */
export function breadcrumbSchema(
  locale: string,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}/${locale}${crumb.path}`,
    })),
  };
}
