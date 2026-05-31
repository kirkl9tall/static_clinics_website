"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Doctor } from "@/types";
import { useTranslations } from "next-intl";


function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

interface DoctorCardProps {
  readonly doctor: Doctor;
  readonly index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const td = useTranslations("doctors");
  const tc = useTranslations("common");
  const titleMap: Record<string, string> = {
    abuawad: td("abuawad.title"),
    rodriguez: td("rodriguez.title"),
    kassar: td("kassar.title"),
    muhamad: td("muhamad.title"),
    alsaaydeh: td("alsaaydeh.title"),
    fiknete: td("fiknete.title"),
    bachtsetzis: td("bachtsetzis.title"),
  };
  const title = titleMap[doctor.id] ?? doctor.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 overflow-hidden">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-400">
            {getInitials(doctor.name)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base text-text-primary dark:text-text-dark-primary mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
          {doctor.name}
        </h3>
        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-3 line-clamp-2">
          {title}
        </p>

<div className="flex flex-wrap gap-1.5 mb-4">
          {doctor.languages.slice(0, 3).map((lang) => (
            <span key={lang} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-white/10 text-text-muted dark:text-text-dark-muted">
              {lang}
            </span>
          ))}
        </div>

        <Link
          href={`/team/${doctor.slug}`}
          className="w-full py-2 text-xs font-semibold rounded-xl border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-center"
        >
          {tc("profile")}
        </Link>
      </div>
    </motion.div>
  );
}
