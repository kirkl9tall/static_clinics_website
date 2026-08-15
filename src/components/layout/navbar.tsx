"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, Link } from "@/navigation";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";

const navRoutes = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  {
    key: "clinics", href: "/clinics",
    children: [
      { href: "/clinics", labelKey: "allClinics", desc: "Zürich · Dübendorf · Winterthur · Wald" },
      { href: "/clinics/hausarztpraxis-seefeld", labelKey: "Hausarztpraxis Seefeld", desc: "Seefeldstrasse 187, Zürich" },
      { href: "/clinics/hausarztpraxis-duebendorf", labelKey: "Hausarztpraxis Dübendorf", desc: "Leepuntstrasse 5, Dübendorf" },
      { href: "/clinics/hausarztpraxis-altstetten", labelKey: "Hausarztpraxis Altstetten", desc: "Badenerstrasse 621, Zürich" },
      { href: "/clinics/hausarztpraxis-winterthur", labelKey: "Hausarztpraxis Winterthur", desc: "Eichgutstrasse 1, Winterthur" },
      { href: "/clinics/hausarztpraxis-wald", labelKey: "Hausarztpraxis Felsenau", desc: "Wald" },
    ],
  },
  {
    key: "services", href: "/services",
    children: [
      { href: "/services", labelKey: "Alle Leistungen", desc: "" },
      { href: "/services/herzuntersuchung", labelKey: "Herzuntersuchung (EKG)", desc: "" },
      { href: "/services/labor", labelKey: "Labor & Diagnostik", desc: "" },
      { href: "/services/aesthetische-medizin", labelKey: "Ästhetische Medizin", desc: "" },
      { href: "/services/eisenmangel", labelKey: "Eisenmangel-Therapie", desc: "" },
    ],
  },
  { key: "team", href: "/team" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("nav");
  const navMap: Record<string, string> = {
    home: t("home"), about: t("about"), clinics: t("clinics"),
    services: t("services"), team: t("team"), contact: t("contact"),
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary-700 text-white text-sm">
        <div className="container-wide flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+41442440990" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              044 244 09 90
            </a>
            <a href="mailto:jerumed@hin.ch" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              jerumed@hin.ch
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-primary-500 rounded-lg overflow-hidden">
              <button
                onClick={() => switchLocale("de")}
                className={cn("px-3 py-1 text-xs font-medium transition-colors", locale === "de" ? "bg-white text-primary-700" : "text-primary-200 hover:text-white")}
                aria-label="Deutsch"
              >
                DE
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={cn("px-3 py-1 text-xs font-medium transition-colors", locale === "en" ? "bg-white text-primary-700" : "text-primary-200 hover:text-white")}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled ? "glass-strong shadow-lg" : "bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm"
        )}
      >
        <nav className="container-wide flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label={locale === "de" ? "Praxen Jerumed Startseite" : "Praxen Jerumed Homepage"}
          >
            <Image
              src="/praxen-jerumed.webp"
              alt="Praxen Jerumed – Ihr Gesundheitsnetzwerk in der Schweiz"
              width={200}
              height={60}
              sizes="200px"
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navRoutes.map((item) => (
              <div
                key={item.href}
                className="relative group"
                role="none"
                onMouseEnter={() => item.children && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href as "/"}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1",
                    pathname === item.href
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10"
                      : "text-text-primary dark:text-text-dark-secondary hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-white/5"
                  )}
                >
                  {navMap[item.key] ?? item.key}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.children && (
                  <div
                    className={cn(
                      "absolute top-full left-0 mt-1 w-72 bg-white dark:bg-surface-dark-dim rounded-2xl shadow-elevated border border-border-light dark:border-border-dark p-2 z-50 transition-all duration-200 origin-top",
                      activeDropdown === item.key ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href as "/"}
                        className="block px-4 py-3 rounded-xl text-sm hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors group"
                      >
                        <span className="font-medium text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {child.labelKey}
                        </span>
                        {child.desc && (
                          <span className="block text-xs text-text-muted dark:text-text-dark-muted mt-0.5">{child.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile language toggle */}
            <div className="lg:hidden flex items-center gap-1 border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
              <button onClick={() => switchLocale("de")} className={cn("px-2 py-1 text-xs font-medium transition-colors", locale === "de" ? "bg-primary-500 text-white" : "text-text-muted")} aria-label="Deutsch">DE</button>
              <button onClick={() => switchLocale("en")} className={cn("px-2 py-1 text-xs font-medium transition-colors", locale === "en" ? "bg-primary-500 text-white" : "text-text-muted")} aria-label="English">EN</button>
            </div>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? (locale === "de" ? "Menü schließen" : "Close menu") : (locale === "de" ? "Menü öffnen" : "Open menu")}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[64px] z-40 bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[70vh] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="container-wide py-6 space-y-2 overflow-y-auto max-h-[70vh]">
          {navRoutes.map((item, i) => (
            <div key={item.href} className="animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}>
              <Link
                href={item.href as "/"}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-500/10"
                    : "text-text-primary dark:text-text-dark-primary hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                {navMap[item.key] ?? item.key}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href as "/"} className="block px-4 py-2 text-sm text-text-primary dark:text-text-dark-secondary hover:text-primary-600 rounded-lg">
                      {child.labelKey}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
