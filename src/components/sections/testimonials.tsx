"use client";

import { useState } from "react";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeader from "@/components/shared/section-header";
import { testimonials } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("home.testimonials");
  const [current, setCurrent] = useState(0);
  const textMap: Record<string, string> = {
    "1": t("items.1"), "2": t("items.2"), "3": t("items.3"),
    "4": t("items.4"), "5": t("items.5"), "6": t("items.6"),
  };
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
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial, i) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-surface-dim dark:bg-surface-dark-dim rounded-3xl p-8 md:p-12 border border-border-light dark:border-border-dark text-center relative mx-auto">
                      <Quote className="w-10 h-10 text-primary-200 dark:text-primary-800 mx-auto mb-6" />
                      <p className="text-lg md:text-xl text-text-primary dark:text-text-dark-primary leading-relaxed mb-6 italic">
                        &ldquo;{textMap[testimonial.id]}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-4 h-4 ${n <= testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="font-semibold text-text-primary dark:text-text-dark-primary">{testimonial.name}</p>
                      <p className="text-sm text-text-muted dark:text-text-dark-muted">{testimonial.clinic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="p-2 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((testimonial, i) => (
                  <button
                    key={testimonial.id}
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
