import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Globe, Clock, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { clinics, getClinicBySlug } from "@/data/clinics";
import { getDoctorsByClinic } from "@/data/doctors";
import { JsonLd, clinicSchema } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) return { title: "Clinic" };
  return {
    title: clinic.name,
    description: clinic.description,
    openGraph: {
      title: `${clinic.name} | Praxen Jerumed`,
      description: clinic.description,
      images: [{ url: clinic.logo || "/praxen-jerumed.png", width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://praxen-jerumed.ch/de/clinics/${slug}` },
  };
}

function getInitials(name: string) {
  return name.split(" ").filter((w) => /[A-Za-z]/.test(w[0])).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

export default async function ClinicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) notFound();

  const clinicDoctors = getDoctorsByClinic(clinic.id);
  const otherClinics = clinics.filter((c) => c.id !== clinic.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <JsonLd data={clinicSchema(clinic)} />
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-white dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark">
              {clinic.city}
            </span>
            {clinic.isComingSoon && (
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                Coming Soon
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
            {clinic.name}
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary max-w-2xl mb-6">{clinic.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-text-dark-muted">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary-500" />{clinic.address}, {clinic.zip} {clinic.city}</span>
            <a href={`tel:${clinic.phone}`} className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Phone className="w-4 h-4 text-primary-500" />{clinic.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: description + services */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                <h2 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-4">About This Practice</h2>
                <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">{clinic.longDescription}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {clinic.services.map((service) => (
                    <span
                      key={service}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 text-primary-700 dark:text-primary-300"
                      style={{ borderColor: clinic.accentColor + "40" }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opening hours */}
              <div>
                <h2 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  Opening Hours
                </h2>
                <div className="rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
                  {clinic.openingHours.map((hours) => (
                    <div key={hours.day} className="flex justify-between items-center px-5 py-3 border-b border-border-light dark:border-border-dark last:border-0 odd:bg-surface-dim dark:odd:bg-surface-dark-dim">
                      <span className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary w-28">{hours.day}</span>
                      {hours.isClosed ? (
                        <span className="text-sm text-rose-500 font-medium">Closed</span>
                      ) : (
                        <span className="text-sm font-medium text-text-primary dark:text-text-dark-primary">{hours.open} – {hours.close}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card">
                <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <a href={`tel:${clinic.phone}`} className="flex items-center gap-3 text-text-secondary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {clinic.phone}
                  </a>
                  <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 text-text-secondary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {clinic.email}
                  </a>
                  {clinic.website !== "#" && (
                    <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <Globe className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      Visit Website
                    </a>
                  )}
                  <div className="flex items-start gap-3 text-text-secondary dark:text-text-dark-secondary">
                    <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span>{clinic.address}<br />{clinic.zip} {clinic.city}, {clinic.country}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${clinic.isComingSoon ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${clinic.isComingSoon ? "bg-amber-500" : "bg-emerald-500"}`} />
                    {clinic.isComingSoon ? "Opening Soon" : "Currently Active"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      {clinicDoctors.length > 0 && (
        <section className="py-16 bg-surface-dim dark:bg-surface-dark-dim">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-8">Doctors at This Practice</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {clinicDoctors.map((doctor) => (
                <Link key={doctor.id} href={`/team/${doctor.slug}`} className="block p-5 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 group text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {getInitials(doctor.name)}
                  </div>
                  <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm leading-tight">{doctor.name}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted mt-1">{doctor.specialty}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold rounded-full ${doctor.availability === "available" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : doctor.availability === "limited" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                    {doctor.availability === "available" ? "Available" : doctor.availability === "limited" ? "Limited" : "Unavailable"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other clinics */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-6">Other Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherClinics.map((other) => (
              <Link key={other.id} href={`/clinics/${other.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-dim dark:bg-surface-dark-dim hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-card transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: other.accentColor }}>
                  {other.shortName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">{other.shortName}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted">{other.city}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-text-muted dark:text-text-dark-muted group-hover:text-primary-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
