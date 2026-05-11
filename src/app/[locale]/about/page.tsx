"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Network, MapPin, Users, Building2, Award } from "lucide-react";
import SectionHeader from "@/components/shared/section-header";
import AnimatedCounter from "@/components/shared/animated-counter";

const values = [
  {
    icon: Heart,
    title: "Patient-First",
    description: "Every decision we make centers on the well-being, dignity, and experience of our patients.",
    color: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We maintain the highest standards of clinical practice, continuously improving through education and innovation.",
    color: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Embracing modern technology and evidence-based medicine to deliver better outcomes for every patient.",
    color: "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400",
  },
  {
    icon: Network,
    title: "Integration",
    description: "Our network model ensures seamless coordination between specialists, clinics, and services across Switzerland.",
    color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const timeline = [
  { year: "2008", title: "Founded Hausarztpraxis Seefeld", description: "Opened our first clinic in the heart of Zürich Seefeld, establishing the foundation of the Jerumed healthcare philosophy." },
  { year: "2012", title: "Expanded to Dübendorf", description: "Bringing comprehensive primary care to the growing community of Dübendorf with modern facilities." },
  { year: "2015", title: "Opened Altstetten Location", description: "Extended our reach into Zürich Altstetten with an in-house pharmacy and expanded diagnostic capabilities." },
  { year: "2018", title: "Launched MedEsthec", description: "Introduced premium aesthetic medicine services to complement our clinical network." },
  { year: "2020", title: "Winterthur Clinic Opened", description: "Continued growing during challenging times, expanding quality healthcare access to Winterthur." },
  { year: "2024", title: "10+ Clinics Across Switzerland", description: "Today our network spans over 10 clinics, serving 25,000+ patients with 50+ specialist physicians." },
];

const stats = [
  { value: 10, suffix: "+", label: "Clinics", icon: Building2 },
  { value: 50, suffix: "+", label: "Specialists", icon: Users },
  { value: 25, suffix: "K+", label: "Patients", icon: Heart },
  { value: 6, suffix: "", label: "Cities", icon: MapPin },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-24 lg:py-32">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-500/10 rounded-full mb-6">
              <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary dark:text-text-dark-primary leading-tight mb-6">
              About{" "}
              <span className="gradient-text">Praxen Jerumed</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
              For over 15 years, we have been building a healthcare ecosystem that puts patients at its centre — growing from a single practice into Switzerland's most integrated medical network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-primary-500/10 dark:to-emerald-500/10 border border-primary-100 dark:border-primary-500/20"
            >
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-4">Our Mission</h2>
              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed text-lg">
                To deliver accessible, high-quality, and integrated healthcare to communities across Switzerland — through a network of expert physicians, modern facilities, and a genuine commitment to patient well-being.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-primary-50 dark:from-emerald-500/10 dark:to-primary-500/10 border border-emerald-100 dark:border-emerald-500/20"
            >
              <div className="w-12 h-12 rounded-2xl gradient-emerald flex items-center justify-center text-white mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-4">Our Vision</h2>
              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed text-lg">
                To become Switzerland's most trusted and comprehensive healthcare network — setting new standards for patient experience, clinical quality, and integrated care delivery across every region we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <SectionHeader
            badge="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide every interaction, every decision, and every step of patient care."
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${value.color}`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary dark:text-text-dark-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <SectionHeader
            badge="Our Journey"
            title="Building a Healthcare Legacy"
            subtitle="Key milestones in the growth of the Praxen Jerumed network."
            center
          />
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-emerald-400 opacity-30" />

              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Year circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {item.year}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <h3 className="font-bold text-text-primary dark:text-text-dark-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-600 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-20 bg-white dark:bg-surface-dark">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark-primary mb-4">
              The People Behind Our Care
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-dark-secondary max-w-xl mx-auto mb-8">
              Our network is only as strong as the dedicated physicians and staff who bring it to life every day.
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-8 py-4 text-white gradient-primary rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" />
              Meet Our Team
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
