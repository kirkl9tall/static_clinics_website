"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { Clinic } from "@/types";

interface ClinicCardProps {
  clinic: Clinic;
  index?: number;
}

export default function ClinicCard({ clinic, index = 0 }: ClinicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark-dim overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: clinic.accentColor }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0"
            style={{ backgroundColor: clinic.accentColor }}>
            {clinic.shortName[0]}
          </div>
          {clinic.isComingSoon && (
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
              Coming Soon
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {clinic.name}
        </h3>
        <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-4 line-clamp-2">
          {clinic.description}
        </p>

        {/* Location & Phone */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-dark-muted">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary-500" />
            <span>{clinic.address}, {clinic.city}</span>
          </div>
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-2 text-sm text-text-muted dark:text-text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary-500" />
            <span>{clinic.phone}</span>
          </a>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {clinic.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300"
            >
              {service}
            </span>
          ))}
          {clinic.services.length > 3 && (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-muted dark:text-text-dark-muted">
              +{clinic.services.length - 3} more
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <Link
            href={`/clinics/${clinic.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl hover:shadow-lg hover:shadow-primary-500/20 transition-all"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
          {clinic.website && clinic.website !== "#" && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold rounded-xl border border-border-light dark:border-border-dark text-text-secondary dark:text-text-dark-secondary hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
              aria-label={`Visit ${clinic.name} website`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
