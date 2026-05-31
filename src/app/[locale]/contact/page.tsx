"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle, Building2 } from "lucide-react";
import { clinics } from "@/data/clinics";
import { useTranslations } from "next-intl";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: "044 244 09 90",
    href: "tel:+41442440990",
    color: "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400",
  },
  {
    icon: Mail,
    title: "Email",
    value: "jerumed@hin.ch",
    href: "mailto:jerumed@hin.ch",
    color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "Baarerstrasse 82, 6300 Zug",
    href: "#",
    color: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
];

const subjects = ["General Inquiry", "Appointment Request", "Medical Question", "Feedback", "Careers", "Other"];
const activeClinics = clinics.filter((c) => !c.isComingSoon);

export default function ContactPage() {
  const t = useTranslations("common");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <div className="bg-rose-600 text-white py-3">
        <div className="container-wide flex items-center justify-center gap-3 text-sm font-medium">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{t("emergencyMessage")} <a href="tel:+41442440990" className="font-bold underline">{t("emergencyPhone")}</a></span>
        </div>
      </div>

      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-text-dark-primary mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-dark-secondary leading-relaxed">
              Our team is here to help. Reach out with any questions, appointment requests, or feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white dark:bg-surface-dark">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark-dim shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-text-muted dark:text-text-dark-muted mb-1">{card.title}</p>
                  <p className="font-semibold text-text-primary dark:text-text-dark-primary">{card.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-surface-dim dark:bg-surface-dark-dim">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-6">Send Us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary dark:text-text-dark-secondary">
                    Thank you for reaching out. Our team will get back to you within 1 business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary placeholder:text-text-muted focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary placeholder:text-text-muted focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+41 ..."
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary placeholder:text-text-muted focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">Subject *</label>
                      <select
                        id="contact-subject"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors"
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-primary dark:text-text-dark-primary placeholder:text-text-muted focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-white gradient-primary rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hours */}
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-text-primary dark:text-text-dark-primary">General Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Thursday", hours: "08:00 – 18:00" },
                    { day: "Friday", hours: "08:00 – 17:00" },
                    { day: "Saturday", hours: "09:00 – 12:00" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-text-secondary dark:text-text-dark-secondary">{row.day}</span>
                      <span className={row.hours === "Closed" ? "text-rose-500" : "font-medium text-text-primary dark:text-text-dark-primary"}>{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinic locations */}
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-text-primary dark:text-text-dark-primary">Our Locations</h3>
                </div>
                <div className="space-y-3">
                  {activeClinics.map((clinic) => (
                    <div key={clinic.id} className="flex items-start gap-2 text-sm pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: clinic.accentColor }} />
                      <div>
                        <p className="font-medium text-text-primary dark:text-text-dark-primary">{clinic.shortName}</p>
                        <p className="text-text-muted dark:text-text-dark-muted">{clinic.address}, {clinic.city}</p>
                        <a href={`tel:${clinic.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">{clinic.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
