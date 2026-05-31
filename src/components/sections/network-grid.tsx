"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { clinics } from "@/data/clinics";
import { MapPin, ArrowUpRight, ExternalLink, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function NetworkGrid() {
  const t = useTranslations("home.network");
  const tc = useTranslations("common");
  const td = useTranslations("clinics.descriptions");

  return (
    <section className="py-24 lg:py-32 bg-surface-dim dark:bg-surface-dark-dim">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            highlight={t("titleHighlight")}
            subtitle={t("subtitle")}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic, i) => (
            <ScrollReveal key={clinic.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300",
                  "hover:shadow-card-hover hover:border-primary-200 dark:hover:border-primary-700"
                )}
              >
                <div className="h-1 w-full" style={{ background: clinic.accentColor }} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark flex items-center justify-center overflow-hidden flex-shrink-0">
                        {clinic.logo ? (
                          <Image
                            src={clinic.logo}
                            alt={`Logo – ${clinic.name}`}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full p-1"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-text-muted" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {clinic.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {clinic.city}
                        </div>
                      </div>
                    </div>
                    {clinic.isComingSoon && (
                      <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                        {tc("comingSoon")}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-4 line-clamp-2">
                    {td(clinic.id as Parameters<typeof td>[0])}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {clinic.services.slice(0, 3).map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-text-dark-secondary rounded-lg">
                        {s}
                      </span>
                    ))}
                    {clinic.services.length > 3 && (
                      <span className="px-2.5 py-1 text-[11px] font-medium text-text-muted dark:text-text-dark-muted">
                        +{clinic.services.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                    <Link
                      href={`/clinics/${clinic.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors"
                    >
                      {tc("learnMore")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    {clinic.website && clinic.website !== "#" && (
                      <a
                        href={clinic.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-dark-secondary hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all whitespace-nowrap"
                        aria-label={`Visit ${clinic.name} website`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
