"use client";

import { Link } from "@/navigation";
import { ArrowRight, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const HeroOrbital = dynamic(() => import("./hero-orbital"), { ssr: false });

export default function Hero() {
  const t = useTranslations("home.hero");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative overflow-hidden gradient-hero min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-200/20 to-emerald-200/20 dark:from-primary-800/10 dark:to-emerald-800/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-700/50 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary leading-[1.1] mb-6">
              Praxen Jerumed – Ihr Hausarzt-Netzwerk in Zürich, Dübendorf, Winterthur & Wald
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

            <div className="flex items-center gap-6 flex-wrap">
              {["FMH Certified", "Swiss Quality", "5 Locations"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual — 3D orbiting ring */}
          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700 delay-200 fill-mode-both">
             {isDesktop && <HeroOrbital />}
          </div>

        </div>
      </div>
    </section>
  );
}
