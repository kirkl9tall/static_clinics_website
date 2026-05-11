"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Mail } from "lucide-react";
import { doctors, specialties } from "@/data/doctors";
import DoctorCard from "@/components/cards/doctor-card";

export default function TeamPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const filtered = useMemo(() => {
    if (selectedSpecialty === "all") return doctors;
    return doctors.filter((d) => d.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
            <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Our Physicians</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary mb-4">
            Meet Our <span className="gradient-text">Medical Team</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
            Expert physicians committed to your health and well-being. Each specialist brings years of training and genuine care to every consultation.
          </p>
        </div>
      </section>

      {/* Specialty filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="container-wide py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedSpecialty("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpecialty === "all" ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
            >
              All Specialties
            </button>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpecialty === spec ? "gradient-primary text-white shadow-md" : "bg-surface-dim dark:bg-surface-dark-dim text-text-secondary dark:text-text-dark-secondary border border-border-light dark:border-border-dark hover:border-primary-300"}`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-text-muted dark:text-text-dark-muted">
              No doctors found for this specialty.
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-emerald-600 text-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Are You a Healthcare Professional?</h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            Join our growing network of physicians and specialists. Work in modern, well-equipped clinics with a supportive team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-primary-50 transition-all hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
