"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Doctor } from "@/types";
import { cn } from "@/lib/utils";

const availabilityConfig = {
  available: {
    label: "Verfügbar",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
  limited: {
    label: "Begrenzt",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  },
  unavailable: {
    label: "Nicht verfügbar",
    cls: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const avail = availabilityConfig[doctor.availability] ?? availabilityConfig.available;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
    >
      {/* Photo */}
      <div className="relative h-56 bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 overflow-hidden">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-400">
            {getInitials(doctor.name)}
          </div>
        )}
        <span className={cn(
          "absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold rounded-full border border-white/50",
          avail.cls
        )}>
          {avail.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-text-primary dark:text-text-dark-primary mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
          {doctor.name}
        </h3>
        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-3 line-clamp-2">
          {doctor.title}
        </p>

        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 mb-3 w-fit">
          {doctor.experience} Jahre Erfahrung
        </span>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {doctor.languages.slice(0, 3).map((lang) => (
            <span key={lang} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-muted dark:text-text-dark-muted">
              {lang}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/team/${doctor.slug}`}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center"
          >
            Profil
          </Link>
          <Link
            href={`/book-appointment?doctor=${doctor.slug}`}
            className="flex-1 py-2 text-xs font-semibold rounded-xl text-white gradient-primary hover:shadow-md hover:shadow-primary-500/20 transition-all flex items-center justify-center gap-1"
          >
            <Calendar className="w-3 h-3" /> Buchen
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
