"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { testimonials } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("home.testimonials");
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

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
          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-dim dark:bg-surface-dark-dim rounded-3xl p-8 md:p-12 border border-border-light dark:border-border-dark text-center relative"
              >
                <Quote className="w-10 h-10 text-primary-200 dark:text-primary-800 mx-auto mb-6" />
                <p className="text-lg md:text-xl text-text-primary dark:text-text-dark-primary leading-relaxed mb-6 italic">
                  &ldquo;{t(`items.${testimonials[current].id}` as Parameters<typeof t>[0])}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonials[current].rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="font-semibold text-text-primary dark:text-text-dark-primary">{testimonials[current].name}</p>
                <p className="text-sm text-text-muted dark:text-text-dark-muted">{testimonials[current].clinic}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="p-2 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary-500 w-6" : "bg-gray-300 dark:bg-gray-600"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" aria-label="Next testimonial">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
