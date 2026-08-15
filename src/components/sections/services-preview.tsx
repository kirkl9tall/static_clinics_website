"use client";

import { Link } from "@/navigation";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { services } from "@/data/services";
import { ArrowRight, Stethoscope, ScanLine, Heart, Wind, FlaskConical, Sparkles, Pill, Shield, Siren, Droplets, Leaf, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, ScanLine, Heart, Wind, FlaskConical, Sparkles, Pill, Shield, Siren, Droplets, Leaf, Zap,
};

function toKey(id: string) {
  return id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

export default function ServicesPreview() {
  const t = useTranslations("home.services");
  const ts = useTranslations("services");

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-surface-dark">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeader
            badge={t("badge")}
            title="Von Ästhetischer Medizin bis Longevity – das Jerumed-Spektrum an einem Ort"
            subtitle={t("subtitle")}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            const key = toKey(service.id);
            return (
              <ScrollReveal key={service.id} delay={i * 0.05}>
                <Link href={`/services/${service.slug}`}>
                  <div
                    className="group p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 text-center h-full"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-sm text-text-primary dark:text-text-dark-primary mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {ts(`items.${key}.name`)}
                    </h3>
                    <p className="text-xs text-text-muted dark:text-text-dark-muted line-clamp-2 leading-relaxed">
                      {ts(`items.${key}.shortDescription`)}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/services"
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
