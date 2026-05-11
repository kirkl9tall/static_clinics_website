"use client";

import { Link } from "@/navigation";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("home.contact");

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-700 dark:from-primary-800 dark:via-primary-900 dark:to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZTOS4zMTQgMTIgMzYgMTJzLTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="container-wide relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t("title")} <span className="text-emerald-300">{t("titleHighlight")}</span>
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <a href="tel:+41442440990" className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-primary-200">{t("callUs")}</p>
                <p className="text-white font-semibold">044 244 09 90</p>
              </div>
            </a>
            <a href="mailto:info@jerumed.com" className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-primary-200">{t("emailUs")}</p>
                <p className="text-white font-semibold">info@jerumed.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-primary-200">{t("visitUs")}</p>
                <p className="text-white font-semibold">{t("locations")}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("bookCta")} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              {t("contactCta")}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
