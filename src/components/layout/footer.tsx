"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { clinics } from "@/data/clinics";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-wide pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-6">
              <Image
                src="/nobakjerumed.png"
                alt="Praxen Jerumed"
                width={180}
                height={54}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{t("description")}</p>
            <div className="space-y-3 text-sm">
              <a href="tel:+41442440990" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4 text-primary-500" /> 044 244 09 90
              </a>
              <a href="mailto:info@jerumed.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Mail className="w-4 h-4 text-primary-500" /> info@jerumed.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" /> Baarerstrasse 82, 6300 Zug
              </div>
            </div>
          </div>

          {/* Our Network */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">{t("clinics.title")}</h3>
            <ul className="space-y-3">
              {clinics.slice(0, 7).map((clinic) => (
                <li key={clinic.id}>
                  <Link href={`/clinics/${clinic.slug}` as "/clinics/[slug]"} className="text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-1 group">
                    {clinic.shortName}
                    {clinic.isComingSoon && <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">Soon</span>}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">{t("links.title")}</h3>
            <ul className="space-y-3">
              {([
                { key: "about", href: "/about" },
                { key: "services", href: "/services" },
                { key: "team", href: "/team" },
                { key: "bookAppointment", href: "/book-appointment" },
                { key: "news", href: "/news" },
                { key: "gallery", href: "/gallery" },
                { key: "contact", href: "/contact" },
              ] as const).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">{t("contact.title")}</h3>
            <div className="space-y-2 text-sm mb-8">
              <div className="flex justify-between"><span>Mo – Do</span><span className="text-white">08:00 – 18:00</span></div>
              <div className="flex justify-between"><span>Freitag</span><span className="text-white">08:00 – 17:00</span></div>
              <div className="flex justify-between"><span>Samstag</span><span className="text-white">09:00 – 12:00</span></div>
              <div className="flex justify-between"><span>Sonntag</span><span className="text-red-400">Geschlossen</span></div>
            </div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t("newsletter.title")}</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button type="submit" className="px-4 py-2.5 gradient-primary text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all">
                {t("newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Praxen Jerumed. {t("copyright")}</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-300 transition-colors">{t("privacy")}</Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">{t("imprint")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
