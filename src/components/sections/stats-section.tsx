"use client";

import AnimatedCounter from "@/components/shared/animated-counter";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { Building2, Users, HeartPulse, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("home.stats");

  const stats = [
    { icon: Building2, value: 10, suffix: "+", labelKey: "clinics", color: "text-primary-300" },
    { icon: Users, value: 50, suffix: "+", labelKey: "specialists", color: "text-emerald-300" },
    { icon: HeartPulse, value: 25, suffix: "K+", labelKey: "patients", color: "text-rose-300" },
    { icon: MapPin, value: 15, suffix: "+", labelKey: "years", color: "text-violet-300" },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="container-wide relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-blue-100 font-medium">{t(stat.labelKey as Parameters<typeof t>[0])}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
