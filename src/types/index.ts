// ─── Clinic / Subsidiary ───────────────────────────────────
export interface Clinic {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  category: ClinicCategory;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  logo: string;
  services: string[];
  openingHours: OpeningHours[];
  coordinates: { lat: number; lng: number };
  isComingSoon: boolean;
  accentColor: string;
}

export type ClinicCategory =
  | "general-practice"
  | "beauty-aesthetic"
  | "laboratory"
  | "pharmacy"
  | "telemedicine"
  | "urology"
  | "wellness"
  | "medical-shop"
  | "specialized"
  | "natural-medicine";

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

// ─── Doctor ────────────────────────────────────────────────
export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  certifications: string[];
  languages: string[];
  experience: number;
  bio: string;
  image: string;
  clinicIds: string[];
  availability: "available" | "limited" | "unavailable";
  education: string[];
  phone: string;
  email: string;
}

// ─── Service ───────────────────────────────────────────────
export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  category: ServiceCategory;
  image: string;
  clinicIds: string[];
  features: string[];
}

export type ServiceCategory =
  | "general"
  | "diagnostics"
  | "cardiology"
  | "pulmonology"
  | "radiology"
  | "laboratory"
  | "beauty"
  | "pharmacy"
  | "preventive"
  | "emergency"
  | "longevity";

// ─── Article ───────────────────────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  image: string;
  author: string;
  authorImage: string;
  publishedAt: string;
  tags: string[];
  isFeatured: boolean;
}

export type ArticleCategory =
  | "news"
  | "health-tips"
  | "careers"
  | "updates"
  | "research";

// ─── FAQ ───────────────────────────────────────────────────
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | "appointments"
  | "insurance"
  | "locations"
  | "services"
  | "emergency";

// ─── Testimonial ───────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  clinic: string;
  date: string;
  avatar: string;
}

// ─── Navigation ────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

// ─── Gallery ───────────────────────────────────────────────
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "clinic" | "laboratory" | "treatment" | "waiting" | "equipment";
  clinic?: string;
}
