"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, Stethoscope, Heart, FlaskConical, Wind, ScanLine, Sparkles, Pill, Shield, Siren, Droplets, Leaf, Zap } from "lucide-react";
import { Service } from "@/types";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Heart,
  FlaskConical,
  Wind,
  ScanLine,
  Sparkles,
  Pill,
  Shield,
  Siren,
  Droplets,
  Leaf,
  Zap,
};

function toTranslationKey(id: string) {
  return id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

interface ServiceCardProps {
  readonly service: Service;
  readonly index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const t = useTranslations("services");
  const td = useTranslations("services.detail");
  const Icon = iconMap[service.icon] ?? Stethoscope;
  const key = toTranslationKey(service.id);

  const name = t(`items.${key}.name`);
  const shortDescription = t(`items.${key}.shortDescription`);
  const features = t.raw(`items.${key}.features`) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl p-6 bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>

      {/* Name */}
      <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {name}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-4 line-clamp-2 flex-1">
        {shortDescription}
      </p>

      {/* Category + Clinic count */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-muted dark:text-text-dark-muted capitalize">
          {t(`categories.${service.category}`)}
        </span>
        <span className="text-xs text-text-muted dark:text-text-dark-muted">
          {service.clinicIds.length} {service.clinicIds.length === 1 ? td("clinic") : td("clinics")}
        </span>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          >
            <CheckCircle className="w-2.5 h-2.5" />
            {feature}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/services/${service.slug}`}
        className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl hover:shadow-lg hover:shadow-primary-500/20 transition-all"
      >
        {td("learnMore")} <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
