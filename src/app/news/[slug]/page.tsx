import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import { articles, getArticleBySlug } from "@/data/articles";

export const dynamic = 'force-dynamic';

const categoryConfig: Record<string, { label: string; badgeCls: string; heroCls: string }> = {
  news: { label: "News", badgeCls: "bg-blue-500/20 text-blue-100", heroCls: "from-blue-900 via-primary-900 to-slate-900" },
  "health-tips": { label: "Health Tips", badgeCls: "bg-emerald-500/20 text-emerald-100", heroCls: "from-emerald-900 via-teal-900 to-slate-900" },
  careers: { label: "Careers", badgeCls: "bg-purple-500/20 text-purple-100", heroCls: "from-purple-900 via-violet-900 to-slate-900" },
  updates: { label: "Updates", badgeCls: "bg-amber-500/20 text-amber-100", heroCls: "from-amber-900 via-orange-900 to-slate-900" },
  research: { label: "Research", badgeCls: "bg-indigo-500/20 text-indigo-100", heroCls: "from-indigo-900 via-blue-900 to-slate-900" },
};

const categoryEmoji: Record<string, string> = {
  news: "📰",
  "health-tips": "💊",
  careers: "💼",
  updates: "🔬",
  research: "🔍",
};

function getCat(category: string) {
  return categoryConfig[category] ?? { label: category, badgeCls: "bg-primary-500/20 text-primary-100", heroCls: "from-primary-900 to-slate-900" };
}

function getInitials(name: string) {
  return name.split(" ").filter((w) => /[A-Za-z]/.test(w[0])).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

export default async function ArticlePage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCat(article.category);
  const dateStr = format(new Date(article.publishedAt), "MMMM d, yyyy");

  const related = [
    ...articles.filter((a) => a.id !== article.id && a.category === article.category),
    ...articles.filter((a) => a.id !== article.id && a.category !== article.category),
  ].slice(0, 3);

  const paragraphs = article.content.split("\n").map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className={`relative py-20 lg:py-28 bg-gradient-to-br ${cat.heroCls} overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        <div className="container-wide relative z-10">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${cat.badgeCls}`}>
              {cat.label}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/60">
              <Calendar className="w-3.5 h-3.5" />{dateStr}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
              {getInitials(article.author)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{article.author}</p>
              <p className="text-xs text-white/60">Author</p>
            </div>
          </div>
          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-5">
              {article.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-white/10 text-white/80">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body + Sidebar */}
      <section className="py-16 lg:py-24 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Article body */}
            <article className="lg:col-span-2">
              <div className="space-y-5">
                {paragraphs.map((para) => (
                  <p key={para} className="text-lg leading-relaxed text-text-secondary dark:text-text-dark-secondary">
                    {para}
                  </p>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Author */}
              <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark-dim p-6 shadow-card">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-text-dark-muted mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {getInitials(article.author)}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary dark:text-text-dark-primary">{article.author}</p>
                    <p className="text-sm text-text-muted dark:text-text-dark-muted capitalize mt-0.5">
                      {article.category} contributor
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark-dim p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-text-dark-muted mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark">
                        <Tag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark-dim p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-text-dark-muted mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <Link key={rel.id} href={`/news/${rel.slug}`} className="group flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-dim dark:bg-surface-dark flex items-center justify-center text-lg flex-shrink-0">
                          {categoryEmoji[rel.category] ?? "📄"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary dark:text-text-dark-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted mt-1">
                            <User className="w-3 h-3" />
                            {rel.author}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
