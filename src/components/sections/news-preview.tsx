"use client";

import { Link } from "@/navigation";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { articles } from "@/data/articles";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function NewsPreview() {
  const t = useTranslations("home.news");
  const tc = useTranslations("common");
  const locale = useLocale();
  const latest = articles.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-surface-dim dark:bg-surface-dark-dim">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeader
            badge={t("badge")}
            title={t("title")}
            highlight={t("titleHighlight")}
            subtitle={t("subtitle")}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 0.1}>
              <Link href={`/news/${article.slug}`}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="group bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted">
                        <Clock className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString(locale === "de" ? "de-CH" : "en-GB", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary line-clamp-2 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-3 transition-all">
                      {tc("readMore")} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {t("cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
