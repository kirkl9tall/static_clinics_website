"use client";

import { useState, useMemo } from "react";
import { Newspaper } from "lucide-react";
import { articles } from "@/data/articles";
import NewsCard from "@/components/cards/news-card";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "health-tips", label: "Health Tips" },
  { value: "careers", label: "Careers" },
  { value: "updates", label: "Updates" },
  { value: "research", label: "Research" },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const featured = useMemo(() => articles.find((a) => a.isFeatured) ?? null, []);
  const filtered = useMemo(() => {
    if (activeFilter === "all") return articles.filter((a) => !a.isFeatured);
    return articles.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
              <Newspaper className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Latest from Praxen Jerumed</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
              News & <span className="gradient-text">Health Insights</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
              Stay up to date with healthcare news, practice updates, career opportunities, and expert health tips from our network.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && activeFilter === "all" && (
        <section className="py-12 bg-surface-dim dark:bg-surface-dark-dim">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />
              <span className="text-sm font-semibold uppercase tracking-widest text-text-muted dark:text-text-dark-muted">Featured Story</span>
              <div className="h-px flex-1 bg-border-light dark:bg-border-dark" />
            </div>
            <NewsCard article={featured} featured />
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="py-12 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === value ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center py-16 text-text-muted dark:text-text-dark-muted">No articles found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
