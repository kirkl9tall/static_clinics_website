"use client";

import { useState, useMemo } from "react";
import { Stethoscope, Mail } from "lucide-react";
import { services, serviceCategories } from "@/data/services";
import ServiceCard from "@/components/cards/service-card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("services");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return services;
    return services.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
            <Stethoscope className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{t("hero.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
            {t("hero.title")} <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all" ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
            >
              {t("filterAll")}
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-500/10 dark:to-emerald-500/10 border border-primary-100 dark:border-primary-500/20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-text-dark-primary mb-3">
              {t("cta.title")}
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary mb-6 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white gradient-primary rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
