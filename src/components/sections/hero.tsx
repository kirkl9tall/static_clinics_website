"use client";

import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Building2, Shield, Heart, Stethoscope, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";

const floatingCards = [
  { icon: Stethoscope, labelKey: "Hausarztmedizin", color: "bg-primary-500", delay: 0 },
  { icon: Heart, labelKey: "Kardiologie", color: "bg-rose-500", delay: 0.2 },
  { icon: FlaskConical, labelKey: "Labor", color: "bg-emerald-500", delay: 0.4 },
  { icon: Shield, labelKey: "Prävention", color: "bg-violet-500", delay: 0.6 },
];

export default function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-200/20 to-emerald-200/20 dark:from-primary-800/10 dark:to-emerald-800/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-700/50 rounded-full mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {t("badge")}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary leading-[1.1] mb-6">
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/clinics"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white gradient-primary rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Building2 className="w-5 h-5" />
                {t("ctaSecondary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 flex-wrap">
              {["FMH Certified", "Swiss Quality", "6 Locations"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central circle */}
              <div className="absolute inset-[15%] rounded-full gradient-primary opacity-10 dark:opacity-5 blur-2xl" />
              <div className="absolute inset-[20%] rounded-full border-2 border-primary-300 dark:border-primary-800 opacity-60" />
              <div className="absolute inset-[30%] rounded-full bg-white/70 dark:bg-gradient-to-br dark:from-primary-900/20 dark:to-emerald-900/20 border border-primary-200 dark:border-primary-800 backdrop-blur-sm" />

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-3xl bg-white dark:bg-surface-dark-dim flex items-center justify-center shadow-2xl border border-primary-100 dark:border-border-dark p-4">
                  <Image
                    src="/nobakjerumed.png"
                    alt="Praxen Jerumed"
                    width={140}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                    priority
                  />
                </div>
              </div>

              {/* Floating service cards */}
              {floatingCards.map((card, i) => {
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
                ];
                return (
                  <motion.div
                    key={card.labelKey}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + card.delay }}
                    className={`absolute ${positions[i]} bg-white dark:bg-surface-dark-dim rounded-2xl px-4 py-3 shadow-xl border border-primary-200 dark:border-border-dark flex items-center gap-3 min-w-[160px]`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary dark:text-text-dark-primary">
                      {card.labelKey}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
