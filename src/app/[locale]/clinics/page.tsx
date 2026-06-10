"use client";

import { useState, useMemo } from "react";
import { Building2, MapPin, Users } from "lucide-react";
import { clinics, cities } from "@/data/clinics";
import ClinicCard from "@/components/cards/clinic-card";
import { useTranslations } from "next-intl";

export default function ClinicsPage() {
  const t = useTranslations("clinics");
  const td = useTranslations("clinics.descriptions");
  const [selectedCity, setSelectedCity] = useState("all");

  const filtered = useMemo(() => {
    return clinics.filter((c) => selectedCity === "all" || c.city === selectedCity);
  }, [selectedCity]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{t("hero.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
              {t("hero.title")} <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-8">
              {t("network.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              {([
                { icon: Building2, label: t("network.stats.praxen") },
                { icon: MapPin,     label: t("network.stats.staedte") },
                { icon: Users,      label: t("network.stats.specialists") },
              ] as const).map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark-dim rounded-full border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary dark:text-text-dark-secondary shadow-card">
                  <Icon className="w-4 h-4 text-primary-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm">
        <div className="container-wide py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="city-filter" className="text-sm font-medium text-text-muted dark:text-text-dark-muted">{t("filter.city")}:</label>
              <select
                id="city-filter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1.5 text-sm rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary focus:outline-none focus:border-primary-400"
              >
                <option value="all">{t("filter.allCities")}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
<span className="ml-auto text-sm text-text-muted dark:text-text-dark-muted">
              {filtered.length === 1 ? t("filter.foundSingle") : t("filter.found", { count: filtered.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((clinic, i) => (
                <ClinicCard key={clinic.id} clinic={clinic} index={i} descriptionOverride={td(clinic.id as Parameters<typeof td>[0])} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <Building2 className="w-12 h-12 text-text-muted dark:text-text-dark-muted mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-text-secondary dark:text-text-dark-secondary mb-2">{t("filter.noMatch")}</p>
              <p className="text-sm text-text-muted dark:text-text-dark-muted">{t("filter.noMatchHint")}</p>
              <button
                onClick={() => setSelectedCity("all")}
                className="mt-4 px-5 py-2.5 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors"
              >
                {t("filter.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
