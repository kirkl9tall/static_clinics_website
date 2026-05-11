"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Article } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const categoryConfig: Record<string, { label: string; badgeCls: string; gradientFrom: string; gradientTo: string; emoji: string }> = {
  news: { label: "News", badgeCls: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300", gradientFrom: "from-blue-100", gradientTo: "to-primary-100 dark:from-blue-900/30 dark:to-primary-900/30", emoji: "📰" },
  "health-tips": { label: "Health Tips", badgeCls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300", gradientFrom: "from-emerald-100", gradientTo: "to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30", emoji: "💊" },
  careers: { label: "Careers", badgeCls: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300", gradientFrom: "from-purple-100", gradientTo: "to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30", emoji: "💼" },
  updates: { label: "Updates", badgeCls: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300", gradientFrom: "from-amber-100", gradientTo: "to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30", emoji: "🔬" },
  research: { label: "Research", badgeCls: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300", gradientFrom: "from-indigo-100", gradientTo: "to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30", emoji: "🔍" },
};

function getCat(category: string) {
  return categoryConfig[category] ?? { label: category, badgeCls: "bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300", gradientFrom: "from-primary-100", gradientTo: "to-emerald-100", emoji: "📄" };
}

interface NewsCardProps {
  article: Article;
  index?: number;
  featured?: boolean;
}

function RegularCard({ article }: { article: Article }) {
  const cat = getCat(article.category);
  const dateStr = format(new Date(article.publishedAt), "MMM d, yyyy");

  return (
    <Link href={`/news/${article.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group h-full flex flex-col rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
      >
        {/* Image placeholder */}
        <div className={cn("h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden flex-shrink-0", cat.gradientFrom, cat.gradientTo)}>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/20" />
          <span className="text-5xl relative z-10">{cat.emoji}</span>
        </div>

        <div className="p-5 flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full", cat.badgeCls)}>
              {cat.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted">
              <Calendar className="w-3 h-3" />{dateStr}
            </span>
          </div>

          <h3 className="font-semibold text-base text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary line-clamp-2 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-text-muted dark:text-text-dark-muted">
            <User className="w-3.5 h-3.5" /><span>{article.author}</span>
          </div>

          {article.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {article.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium rounded bg-surface-dim dark:bg-surface-dark-dim text-text-muted dark:text-text-dark-muted">
                  <Tag className="w-2.5 h-2.5" />{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all mt-1">
            Read More <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  const cat = getCat(article.category);
  const dateStr = format(new Date(article.publishedAt), "MMMM d, yyyy");

  return (
    <Link href={`/news/${article.slug}`} className="block">
      <motion.article
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="group flex flex-col md:flex-row rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark overflow-hidden shadow-elevated hover:shadow-card-hover transition-shadow"
      >
        <div className={cn("md:w-2/5 min-h-60 md:min-h-80 bg-gradient-to-br flex items-center justify-center relative overflow-hidden", cat.gradientFrom, cat.gradientTo)}>
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/20" />
          <span className="text-8xl relative z-10">{cat.emoji}</span>
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 dark:bg-surface-dark/90 text-text-primary dark:text-text-dark-primary rounded-full">
            Featured
          </span>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={cn("px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full", cat.badgeCls)}>
              {cat.label}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-muted dark:text-text-dark-muted">
              <Calendar className="w-3.5 h-3.5" />{dateStr}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h2>
          <p className="text-base text-text-secondary dark:text-text-dark-secondary line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 text-sm text-text-muted dark:text-text-dark-muted">
            <User className="w-4 h-4" /><span>{article.author}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-3 transition-all">
            Read Full Article <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function NewsCard({ article, index = 0, featured = false }: NewsCardProps) {
  if (featured) return <FeaturedCard article={article} />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="h-full"
    >
      <RegularCard article={article} />
    </motion.div>
  );
}
