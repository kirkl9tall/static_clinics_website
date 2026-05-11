"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";

type GalleryCat = "all" | "clinics" | "laboratories" | "treatment" | "waiting" | "equipment";

interface GalleryItem {
  id: string;
  category: Exclude<GalleryCat, "all">;
  clinic: string;
  gradient: string;
  span: 1 | 2;
  label: string;
}

const galleryItems: GalleryItem[] = [
  { id: "1",  category: "clinics",      clinic: "Praxis Seefeld",    gradient: "from-primary-400 to-emerald-400",  span: 2, label: "Reception & Entrance" },
  { id: "2",  category: "treatment",    clinic: "Praxis Seefeld",    gradient: "from-primary-500 to-primary-700",  span: 1, label: "Consultation Room" },
  { id: "3",  category: "laboratories", clinic: "Praxis Dübendorf",  gradient: "from-emerald-400 to-emerald-600",  span: 1, label: "In-house Laboratory" },
  { id: "4",  category: "waiting",      clinic: "Praxis Altstetten", gradient: "from-sky-400 to-primary-500",      span: 2, label: "Patient Waiting Area" },
  { id: "5",  category: "equipment",    clinic: "Praxis Dübendorf",  gradient: "from-teal-400 to-emerald-500",     span: 1, label: "ECG Equipment" },
  { id: "6",  category: "clinics",      clinic: "Praxis Winterthur", gradient: "from-primary-300 to-sky-500",      span: 1, label: "Building Exterior" },
  { id: "7",  category: "treatment",    clinic: "MedEsthec",         gradient: "from-fuchsia-400 to-pink-500",     span: 2, label: "Aesthetic Treatment Suite" },
  { id: "8",  category: "laboratories", clinic: "Praxis Altstetten", gradient: "from-emerald-300 to-teal-500",     span: 1, label: "Blood Analysis Station" },
  { id: "9",  category: "equipment",    clinic: "Praxis Altstetten", gradient: "from-primary-600 to-indigo-600",   span: 1, label: "Digital X-Ray Suite" },
  { id: "10", category: "waiting",      clinic: "MedEsthec",         gradient: "from-pink-300 to-fuchsia-400",     span: 1, label: "Luxury Lounge" },
  { id: "11", category: "clinics",      clinic: "Praxis Wald",       gradient: "from-emerald-500 to-green-700",    span: 1, label: "Clinic Entrance" },
  { id: "12", category: "treatment",    clinic: "Praxis Winterthur", gradient: "from-sky-300 to-primary-400",      span: 2, label: "Minor Surgery Room" },
  { id: "13", category: "equipment",    clinic: "Praxis Seefeld",    gradient: "from-indigo-400 to-primary-500",   span: 1, label: "Spirometry Equipment" },
  { id: "14", category: "laboratories", clinic: "Praxis Winterthur", gradient: "from-teal-300 to-emerald-600",     span: 1, label: "Rapid Diagnostics Lab" },
  { id: "15", category: "waiting",      clinic: "Praxis Dübendorf",  gradient: "from-primary-200 to-sky-400",      span: 2, label: "Family Waiting Zone" },
  { id: "16", category: "clinics",      clinic: "MedEsthec",         gradient: "from-rose-300 to-pink-500",        span: 1, label: "Aesthetic Clinic Interior" },
  { id: "17", category: "treatment",    clinic: "Praxis Wald",       gradient: "from-green-400 to-emerald-600",    span: 1, label: "General Consultation" },
  { id: "18", category: "equipment",    clinic: "MedEsthec",         gradient: "from-fuchsia-300 to-violet-500",   span: 1, label: "Laser Treatment Device" },
  { id: "19", category: "waiting",      clinic: "Praxis Altstetten", gradient: "from-sky-200 to-primary-300",      span: 1, label: "Children&apos;s Corner" },
  { id: "20", category: "clinics",      clinic: "Praxis Dübendorf",  gradient: "from-emerald-400 to-primary-500",  span: 2, label: "Modern Practice Overview" },
];

const filters: { value: GalleryCat; label: string }[] = [
  { value: "all", label: "All" },
  { value: "clinics", label: "Clinics" },
  { value: "laboratories", label: "Laboratories" },
  { value: "treatment", label: "Treatment Rooms" },
  { value: "waiting", label: "Waiting Areas" },
  { value: "equipment", label: "Equipment" },
];

const badgeColors: Record<Exclude<GalleryCat, "all">, string> = {
  clinics: "bg-primary-500/80 text-white",
  laboratories: "bg-emerald-500/80 text-white",
  treatment: "bg-sky-500/80 text-white",
  waiting: "bg-indigo-500/80 text-white",
  equipment: "bg-teal-500/80 text-white",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCat>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeFilter === "all" ? galleryItems : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300">
            Our Spaces
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
            Our Clinics & <span className="gradient-text">Facilities</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
            Modern, welcoming spaces designed for your comfort and the best possible care experience.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f.value ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="py-12 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3 md:gap-4"
            >
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span === 2 ? "row-span-2" : "row-span-1"}`}
                  onClick={() => setLightbox(item)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <p className="text-white font-semibold text-sm md:text-base leading-tight">{item.label}</p>
                    <p className="text-white/75 text-xs mt-0.5">{item.clinic}</p>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm ${badgeColors[item.category]}`}>
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-text-muted dark:text-text-dark-muted">No images in this category.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br ${lightbox.gradient} h-[50vh] md:h-[60vh]`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className={`self-start mb-3 px-3 py-1 rounded-full text-xs font-medium capitalize ${badgeColors[lightbox.category]}`}>
                  {lightbox.category}
                </span>
                <h3 className="text-white text-2xl font-bold">{lightbox.label}</h3>
                <p className="text-white/75 mt-1">{lightbox.clinic}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
