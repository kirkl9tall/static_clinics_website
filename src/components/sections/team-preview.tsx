"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { doctors } from "@/data/doctors";
import { Globe, Award, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function TeamPreview() {
  const t = useTranslations("home.team");
  const tc = useTranslations("common");
  const featured = doctors.slice(0, 6);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((doc, i) => (
            <ScrollReveal key={doc.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-52 bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 overflow-hidden">
                  {doc.image ? (
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {doc.name.charAt(0)}{doc.name.split(" ").pop()?.charAt(0)}
                    </div>
                  )}
                  <div className={cn(
                    "absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                    doc.availability === "available"
                      ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                  )}>
                    {doc.availability === "available" ? tc("available") : tc("limited")}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-0.5 mb-3">{doc.specialty}</p>

                  <div className="space-y-2 text-xs text-text-muted dark:text-text-dark-muted mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5" />
                      <span>{tc("yearsExperience", { years: doc.experience })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{doc.languages.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/team/${doc.slug}`}
                      className="w-full text-center px-3 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors"
                    >
                      {tc("profile")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {t("cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
