import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Phone, Mail, GraduationCap, BadgeCheck, Building2, MapPin, ArrowRight, Globe } from "lucide-react";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import { clinics } from "@/data/clinics";
import { JsonLd, doctorSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: "Doctor" };
  const td = await getTranslations({ locale, namespace: "doctors" });
  const seoTitle = td.has(`${doctor.id}.seoTitle`) ? td(`${doctor.id}.seoTitle`) : `${doctor.name} | Praxen Jerumed`;
  const seoDesc = td.has(`${doctor.id}.seoDesc`) ? td(`${doctor.id}.seoDesc`) : doctor.bio;
  return {
    title: seoTitle,
    description: seoDesc,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: doctor.image ? [{ url: doctor.image, width: 800, height: 1000 }] : [{ url: "/praxen-jerumed.webp" }],
    },
    alternates: {
      canonical: `https://praxen-jerumed.ch/${locale}/team/${slug}`,
      languages: {
        "de-CH": `https://praxen-jerumed.ch/de/team/${slug}`,
        "en": `https://praxen-jerumed.ch/en/team/${slug}`,
        "x-default": `https://praxen-jerumed.ch/de/team/${slug}`,
      },
    },
  };
}

function getInitials(name: string) {
  return name.split(" ").filter((w) => /[A-Za-z]/.test(w[0])).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

const availabilityCls = {
  available: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
  limited: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
  unavailable: "bg-gray-100 text-gray-600 dark:bg-surface-dark-bright dark:text-text-dark-secondary",
};

const knownDoctorIds = new Set(["abuawad", "rodriguez", "kassar", "zahran", "alsaaydeh", "fiknete", "bachtsetzis"]);

export default async function DoctorPage({ params }: { readonly params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const t = await getTranslations("team.profile");
  const td = await getTranslations("doctors");

  const titleMap: Record<string, string> = {
    abuawad: td("abuawad.title"), rodriguez: td("rodriguez.title"), kassar: td("kassar.title"),
    zahran: td("zahran.title"), alsaaydeh: td("alsaaydeh.title"), fiknete: td("fiknete.title"),
    bachtsetzis: td("bachtsetzis.title"),
  };
  const bioMap: Record<string, string> = {
    abuawad: td("abuawad.bio"), rodriguez: td("rodriguez.bio"), kassar: td("kassar.bio"),
    zahran: td("zahran.bio"), alsaaydeh: td("alsaaydeh.bio"), fiknete: td("fiknete.bio"),
    bachtsetzis: td("bachtsetzis.bio"),
  };
  const specialtyMap: Record<string, string> = {
    abuawad: td("abuawad.specialty"), rodriguez: td("rodriguez.specialty"), kassar: td("kassar.specialty"),
    zahran: td("zahran.specialty"), alsaaydeh: td("alsaaydeh.specialty"), fiknete: td("fiknete.specialty"),
    bachtsetzis: td("bachtsetzis.specialty"),
  };

  const availLabel = t(doctor.availability as "available" | "limited" | "unavailable");
  const availCls = availabilityCls[doctor.availability] ?? availabilityCls.available;
  const doctorTitle = titleMap[doctor.id] ?? doctor.title;
  const doctorBio = bioMap[doctor.id] ?? doctor.bio;
  const doctorSpecialty = specialtyMap[doctor.id] ?? doctor.specialty;

  const practicesClinics = doctor.clinicIds
    .map((id) => clinics.find((c) => c.id === id))
    .filter((c): c is (typeof clinics)[number] => c !== undefined);
  const otherDoctors = doctors.filter((d) => d.id !== doctor.id && d.specialty === doctor.specialty).slice(0, 3);
  const fallbackDoctors = doctors.filter((d) => d.id !== doctor.id).slice(0, 3);
  const relatedDoctors = otherDoctors.length > 0 ? otherDoctors : fallbackDoctors;

  return (
    <div className="min-h-screen">
      <JsonLd data={doctorSchema(doctor)} />
      <JsonLd data={breadcrumbSchema(locale, [
        { name: "Home", path: "" },
        { name: "Team", path: "/team" },
        { name: doctor.name, path: `/team/${doctor.slug}` },
      ])} />
      {/* Profile hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Photo */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative w-48 md:w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={`Profilfoto – ${doctor.name}, ${doctorTitle}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 192px, 280px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary-600">
                    {getInitials(doctor.name)}
                  </div>
                )}
                <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold rounded-full border border-white/50 whitespace-nowrap ${availCls}`}>
                  {availLabel}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 pt-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark-primary mb-1">{doctor.name}</h1>
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary italic mb-4 whitespace-pre-line">{doctorTitle}</p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-6">
                {doctorSpecialty}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-center">
                  <p className="text-2xl font-bold gradient-text">{doctor.languages.length}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted">{t("languages")}</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-center">
                  <p className="text-2xl font-bold gradient-text">{practicesClinics.length}</p>
                  <p className="text-xs text-text-muted dark:text-text-dark-muted">{t("clinics")}</p>
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
                <p className="text-lg text-text-secondary dark:text-text-dark-secondary leading-relaxed">{doctorBio}</p>
              </div>

              {/* Education & Certifications */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                  <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary-500" />
                    {t("education")}
                  </h3>
                  <div className="space-y-3">
                    {doctor.education.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                  <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    {t("certifications")}
                  </h3>
                  <div className="space-y-3">
                    {doctor.certifications.map((cert) => (
                      <div key={cert} className="flex items-start gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                        <BadgeCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
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
                    {t("practicesAt")}
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
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-6">{t("otherSpecialists")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDoctors.map((d) => (
                <Link key={d.id} href={`/team/${d.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-dim dark:bg-surface-dark-dim hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-card transition-all">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 flex-shrink-0">
                    {d.image ? (
                      <Image src={d.image} alt={`Profilfoto – ${d.name}`} fill className="object-cover object-top" sizes="48px" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-sm font-bold text-primary-600">{getInitials(d.name)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm leading-tight">{d.name}</p>
                    <p className="text-xs text-text-muted dark:text-text-dark-muted mt-0.5">
                      {specialtyMap[d.id] ?? d.specialty}
                    </p>
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
