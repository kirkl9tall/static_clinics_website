import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle, MapPin, Phone, ArrowRight, Stethoscope, Heart, FlaskConical, Wind, ScanLine, Sparkles, Pill, Shield, Siren, Droplets, Leaf, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import { clinics } from "@/data/clinics";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

const iconMap: Record<string, LucideIcon> = { Stethoscope, Heart, FlaskConical, Wind, ScanLine, Sparkles, Pill, Shield, Siren, Droplets, Leaf, Zap };

function toKey(id: string) {
  return id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  const t = await getTranslations({ locale, namespace: "services" });
  const key = toKey(service.id);
  const name = t(`items.${key}.name`);
  const description = t(`items.${key}.shortDescription`);
  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Praxen Jerumed`,
      description,
      images: [{ url: "/praxen-jerumed.webp", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://praxen-jerumed.ch/${locale}/services/${slug}`,
      languages: {
        "de-CH": `https://praxen-jerumed.ch/de/services/${slug}`,
        "en": `https://praxen-jerumed.ch/en/services/${slug}`,
        "x-default": `https://praxen-jerumed.ch/de/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: { readonly params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const key = toKey(service.id);

  const name = t(`items.${key}.name`);
  const shortDescription = t(`items.${key}.shortDescription`);
  const longDescription = t(`items.${key}.longDescription`);
  const features = t.raw(`items.${key}.features`) as string[];

  const Icon = iconMap[service.icon] ?? Stethoscope;
  const availableClinics = clinics.filter((c) => service.clinicIds.includes(c.id));
  const related = services.filter((s) => s.id !== service.id && s.category === service.category).slice(0, 3);
  const fallbackRelated = services.filter((s) => s.id !== service.id).slice(0, 3);
  const relatedServices = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="min-h-screen">
      <JsonLd data={serviceSchema({ name, slug: service.slug, longDescription, features })} />
      <JsonLd data={breadcrumbSchema(locale, [
        { name: "Home", path: "" },
        { name: t("hero.titleHighlight"), path: "/services" },
        { name: name, path: `/services/${service.slug}` },
      ])} />
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-white dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark capitalize">
                  {t(`categories.${service.category}`)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-3">
                {name}
              </h1>
              <p className="text-xl text-text-secondary dark:text-text-dark-secondary max-w-2xl">{shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                <h2 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-4">{t("detail.about")}</h2>
                <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed text-lg">{longDescription}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-6">{t("detail.included")}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
                      <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-text-primary dark:text-text-dark-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card">
                <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-2">
                  {availableClinics.length} {availableClinics.length === 1 ? t("detail.clinic") : t("detail.clinics")}
                </h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted mb-4">{t("detail.offeredAt")}</p>
                <div className="space-y-2">
                  {availableClinics.map((clinic) => (
                    <div key={clinic.id} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: clinic.accentColor }} />
                      <span className="text-text-primary dark:text-text-dark-primary font-medium">{clinic.shortName}</span>
                      <span className="text-text-muted dark:text-text-dark-muted">·</span>
                      <span className="text-text-muted dark:text-text-dark-muted">{clinic.city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Clinics */}
      <section className="py-16 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-8">{t("detail.whereToFind")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableClinics.map((clinic) => (
              <Link key={clinic.id} href={`/clinics/${clinic.slug}`} className="group block p-5 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: clinic.accentColor }}>
                    {clinic.shortName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{clinic.shortName}</p>
                    <p className="text-xs text-text-muted dark:text-text-dark-muted">{clinic.city}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-text-muted dark:text-text-dark-muted">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{clinic.address}</div>
                  <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{clinic.phone}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 mt-3 group-hover:gap-2 transition-all">
                  {t("detail.viewClinic")} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white dark:bg-surface-dark">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-6">{t("detail.related")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => {
                const RelIcon = iconMap[rel.icon] ?? Stethoscope;
                const relKey = toKey(rel.id);
                return (
                  <Link key={rel.id} href={`/services/${rel.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-dim dark:bg-surface-dark-dim hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-card transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                      <RelIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">{t(`items.${relKey}.name`)}</p>
                      <p className="text-xs text-text-muted dark:text-text-dark-muted line-clamp-1 mt-0.5">{t(`items.${relKey}.shortDescription`)}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
