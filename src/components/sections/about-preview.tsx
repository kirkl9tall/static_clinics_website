"use client";

import { Link } from "@/navigation";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { Shield, Award, Users, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPreview() {
  const t = useTranslations("home.about");

  const values = [
    { icon: Shield, titleKey: "trust", color: "bg-primary-600" },
    { icon: Award, titleKey: "competence", color: "bg-emerald-500" },
    { icon: Users, titleKey: "access", color: "bg-violet-500" },
    { icon: Star, titleKey: "care", color: "bg-rose-500" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-surface-dark">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <ScrollReveal>
            <div>
              <SectionHeader
                badge={t("badge")}
                title={t("title")}
                highlight={t("titleHighlight")}
                subtitle={t("description")}
                align="left"
              />
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 border-2 border-primary-200 dark:border-primary-700 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all mt-6"
              >
                {t("cta")}
              </Link>
            </div>
          </ScrollReveal>

          {/* Right – Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.titleKey} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                    {t(`values.${v.titleKey}.title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                    {t(`values.${v.titleKey}.description` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
