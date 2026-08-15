"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Network, MapPin, Users, Building2, Award } from "lucide-react";
import SectionHeader from "@/components/shared/section-header";
import AnimatedCounter from "@/components/shared/animated-counter";
import { useTranslations } from "next-intl";

const valueIcons = [Heart, Star, Zap, Network];
const valueColors = [
  "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400",
  "bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400",
  "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400",
  "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
];
const valueKeys = ["patientFirst", "excellence", "innovation", "integration"] as const;

const timelineYears = ["2008", "2012", "2015", "2018", "2020", "2024"] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  const stats = [
    { value: 5, suffix: "", label: t("timeline.2024.title").split(" ")[0] + " Praxen", icon: Building2 },
    { value: 50, suffix: "+", label: "Spezialisten", icon: Users },
    { value: 25, suffix: "K+", label: "Patienten", icon: Heart },
    { value: 5, suffix: "", label: "Städte", icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-24 lg:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
              <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{t("hero.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary leading-tight mb-6">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-500/10 dark:to-emerald-500/10 border border-primary-100 dark:border-primary-500/20"
            >
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-4">{t("mission.title")}</h2>
              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed text-lg">
                {t("mission.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-primary-50 dark:from-emerald-500/10 dark:to-primary-500/10 border border-emerald-100 dark:border-emerald-500/20"
            >
              <div className="w-12 h-12 rounded-2xl gradient-emerald flex items-center justify-center text-white mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-4">{t("vision.title")}</h2>
              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed text-lg">
                {t("vision.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <SectionHeader
            badge={t("values.badge")}
            title={t("values.title")}
            subtitle={t("values.subtitle")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${valueColors[i]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary mb-2">{t(`values.${key}.title`)}</h3>
                  <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">{t(`values.${key}.description`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <SectionHeader
            badge={t("timeline.badge")}
            title={t("timeline.title")}
            subtitle={t("timeline.subtitle")}
          />
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-emerald-400 opacity-30" />
              {timelineYears.map((year, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {year}
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-1">{t(`timeline.${year}.title`)}</h3>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">{t(`timeline.${year}.description`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark-primary mb-4">
              {t("teamCta.title")}
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-dark-secondary max-w-xl mx-auto mb-8">
              {t("teamCta.subtitle")}
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-8 py-4 text-white gradient-primary rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" />
              {t("teamCta.button")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
