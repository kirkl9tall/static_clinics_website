"use client";

import { useState } from "react";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { faqs, faqCategories } from "@/data/faqs";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations("home.faq");
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? faqs.slice(0, 6) : faqs.filter((f) => f.category === activeCategory).slice(0, 6);

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-surface-dark">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            highlight={t("titleHighlight")}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl transition-colors",
                activeCategory === "all"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-text-dark-secondary hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              All
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-xl transition-colors capitalize",
                  activeCategory === cat
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-text-dark-secondary hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((faq, i) => (
            <ScrollReveal key={faq.id} delay={i * 0.05}>
              <div className="border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-text-primary dark:text-text-dark-primary pr-4">{faq.question}</span>
                  <ChevronDown className={cn("w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200", openId === faq.id && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
