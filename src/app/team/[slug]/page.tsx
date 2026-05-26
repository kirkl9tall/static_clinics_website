import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone, Mail, GraduationCap, BadgeCheck, Building2, MapPin, Calendar, ArrowRight, Globe } from "lucide-react";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import { clinics } from "@/data/clinics";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  return { title: doctor?.name ?? "Doctor", description: doctor?.bio };
}

function getInitials(name: string) {
  return name.split(" ").filter((w) => /[A-Za-z]/.test(w[0])).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

const availabilityConfig = {
  available: { label: "Available", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" },
  limited: { label: "Limited Slots", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" },
  unavailable: { label: "Unavailable", cls: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400" },
};

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const avail = availabilityConfig[doctor.availability] ?? availabilityConfig.available;
  const practicesClinics = doctor.clinicIds.map((id) => clinics.find((c) => c.id === id)).filter(Boolean) as typeof clinics;
  const otherDoctors = doctors.filter((d) => d.id !== doctor.id && d.specialty === doctor.specialty).slice(0, 3);
  const fallbackDoctors = doctors.filter((d) => d.id !== doctor.id).slice(0, 3);
  const relatedDoctors = otherDoctors.length > 0 ? otherDoctors : fallbackDoctors;

  return (
    <div className="min-h-screen">
      {/* Profile hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Avatar */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative w-48 md:w-full max-w-[240px]">
                <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-primary-400 to-emerald-500 flex items-center justify-center text-white font-bold text-5xl shadow-elevated">
                  {getInitials(doctor.name)}
                </div>
                <span className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold rounded-full border-2 border-white dark:border-surface-dark ${avail.cls} whitespace-nowrap`}>
                  {avail.label}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 pt-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark-primary mb-1">{doctor.name}</h1>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary italic mb-4">{doctor.title}</p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-6">
                {doctor.specialty}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-center">
                  <p className="text-2xl font-bold gradient-text">{doctor.languages.length}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted">Languages</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-center">
                  <p className="text-2xl font-bold gradient-text">{practicesClinics.length}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted">Clinic{practicesClinics.length !== 1 ? "s" : ""}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {doctor.languages.map((lang) => (
                  <span key={lang} className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-text-secondary dark:text-text-dark-secondary">
                    <Globe className="w-3 h-3" />{lang}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <a href={`tel:${doctor.phone}`} className="flex items-center gap-2 text-text-secondary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Phone className="w-4 h-4 text-primary-500" />{doctor.phone}
                </a>
                <a href={`mailto:${doctor.email}`} className="flex items-center gap-2 text-text-secondary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <Mail className="w-4 h-4 text-primary-500" />{doctor.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-500/10 dark:to-emerald-500/10 border border-primary-100 dark:border-primary-500/20">
                <div className="text-6xl text-primary-200 dark:text-primary-800 font-serif leading-none mb-2">&ldquo;</div>
                <p className="text-lg text-text-secondary dark:text-text-dark-secondary leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Education & Certifications */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                  <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary-500" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    {doctor.education.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                  <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-emerald-500" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {doctor.certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                        <BadgeCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Clinics + Book */}
            <div className="space-y-6">
              {practicesClinics.length > 0 && (
                <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card">
                  <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-500" />
                    Practices At
                  </h3>
                  <div className="space-y-3">
                    {practicesClinics.map((clinic) => (
                      <Link key={clinic.id} href={`/clinics/${clinic.slug}`} className="group block p-3 rounded-xl bg-surface-dim dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: clinic.accentColor }} />
                          <p className="font-medium text-text-primary dark:text-text-dark-primary text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{clinic.shortName}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted">
                          <MapPin className="w-3 h-3" />{clinic.address}, {clinic.city}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other doctors */}
      {relatedDoctors.length > 0 && (
        <section className="py-16 bg-white dark:bg-surface-dark">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-6">Other Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDoctors.map((d) => (
                <Link key={d.id} href={`/team/${d.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-dim dark:bg-surface-dark-dim hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-card transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {getInitials(d.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm leading-tight">{d.name}</p>
                    <p className="text-xs text-text-muted dark:text-text-dark-muted mt-0.5">{d.specialty}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
