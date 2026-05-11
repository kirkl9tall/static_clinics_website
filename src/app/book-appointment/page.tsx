"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, ChevronLeft, MapPin, User, Calendar, Clock,
  ClipboardList, Stethoscope, CheckCircle2, Building2,
} from "lucide-react";
import { clinics } from "@/data/clinics";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import type { Clinic, Doctor, Service } from "@/types";

interface BookingForm {
  clinic: Clinic | null;
  service: Service | null;
  doctor: Doctor | null;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  notes: string;
}

const STEPS = [
  { id: 1, label: "Clinic",     icon: Building2 },
  { id: 2, label: "Service",    icon: Stethoscope },
  { id: 3, label: "Doctor",     icon: User },
  { id: 4, label: "Date & Time", icon: Calendar },
  { id: 5, label: "Your Info",  icon: ClipboardList },
  { id: 6, label: "Confirm",    icon: Check },
];

const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00"];

function getNext7Days() {
  const days = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      value: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-CH", { weekday: "short" }),
      label: d.toLocaleDateString("en-CH", { day: "numeric", month: "short" }),
    });
  }
  return days;
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-max mx-auto py-6 px-4 gap-1">
        {STEPS.map((step, idx) => {
          const done = current > step.id;
          const active = current === step.id;
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done ? "border-emerald-500 bg-emerald-500 text-white" : active ? "border-primary-500 bg-primary-500 text-white shadow-[0_0_0_4px_rgba(14,165,233,0.15)]" : "border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark-dim text-text-muted dark:text-text-dark-muted"}`}>
                  {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-primary-600 dark:text-primary-300" : done ? "text-emerald-600 dark:text-emerald-400" : "text-text-muted dark:text-text-dark-muted"}`}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`h-0.5 w-10 md:w-14 mx-1 mt-[-18px] rounded transition-colors duration-300 ${current > step.id ? "bg-emerald-400" : "bg-border-light dark:bg-border-dark"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SelectionCard({ isSelected, onClick, children }: { isSelected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-card-hover ${isSelected ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-card-hover" : "border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark-dim hover:border-primary-300 dark:hover:border-primary-700"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">{children}</div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}

function StepClinic({ selected, onSelect }: { selected: Clinic | null; onSelect: (c: Clinic | null) => void }) {
  const available = clinics.filter((c) => !c.isComingSoon);
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Choose a Clinic</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">Select a location or skip to see all available options.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {available.map((clinic) => (
          <SelectionCard key={clinic.id} isSelected={selected?.id === clinic.id} onClick={() => onSelect(selected?.id === clinic.id ? null : clinic)}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: clinic.accentColor }} />
              <span className="font-semibold text-text-primary dark:text-text-dark-primary text-sm">{clinic.shortName}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-muted dark:text-text-dark-muted">
              <MapPin className="w-3 h-3" />{clinic.city}
            </div>
          </SelectionCard>
        ))}
      </div>
    </div>
  );
}

function StepService({ selected, clinicFilter, onSelect }: { selected: Service | null; clinicFilter: Clinic | null; onSelect: (s: Service | null) => void }) {
  const filtered = clinicFilter ? services.filter((s) => s.clinicIds.includes(clinicFilter.id)) : services;
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Choose a Service</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
        {clinicFilter ? `Services available at ${clinicFilter.shortName}.` : "All available services across our network."}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((service) => (
          <SelectionCard key={service.id} isSelected={selected?.id === service.id} onClick={() => onSelect(selected?.id === service.id ? null : service)}>
            <p className="font-semibold text-text-primary dark:text-text-dark-primary text-sm">{service.name}</p>
            <p className="text-xs text-text-secondary dark:text-text-dark-secondary mt-1 line-clamp-2">{service.shortDescription}</p>
          </SelectionCard>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center py-8 text-text-muted dark:text-text-dark-muted">No services found for this clinic.</p>}
    </div>
  );
}

function StepDoctor({ selected, clinicFilter, onSelect }: { selected: Doctor | null; clinicFilter: Clinic | null; onSelect: (d: Doctor | null) => void }) {
  const filtered = clinicFilter ? doctors.filter((d) => d.clinicIds.includes(clinicFilter.id)) : doctors;
  const availColor: Record<Doctor["availability"], string> = {
    available: "text-emerald-600 dark:text-emerald-400",
    limited: "text-amber-600 dark:text-amber-400",
    unavailable: "text-red-500",
  };
  const availLabel: Record<Doctor["availability"], string> = { available: "Available", limited: "Limited slots", unavailable: "Unavailable" };
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Choose a Doctor</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
        {clinicFilter ? `Practitioners at ${clinicFilter.shortName}.` : "Our medical team across all locations."}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((doctor) => (
          <button
            key={doctor.id}
            type="button"
            disabled={doctor.availability === "unavailable"}
            onClick={() => onSelect(selected?.id === doctor.id ? null : doctor)}
            className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${doctor.availability === "unavailable" ? "opacity-50 cursor-not-allowed border-border-light dark:border-border-dark" : selected?.id === doctor.id ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-card-hover" : "border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark-dim hover:border-primary-300 hover:shadow-card-hover"}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {doctor.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-text-primary dark:text-text-dark-primary text-sm leading-tight">{doctor.name}</p>
                  {selected?.id === doctor.id && (
                    <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-text-muted dark:text-text-dark-muted mt-0.5">{doctor.specialty}</p>
                <p className={`text-xs mt-1 font-medium ${availColor[doctor.availability]}`}>{availLabel[doctor.availability]}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center py-8 text-text-muted dark:text-text-dark-muted">No doctors available for this clinic.</p>}
    </div>
  );
}

function StepDateTime({ date, time, onDateChange, onTimeChange }: { date: string; time: string; onDateChange: (d: string) => void; onTimeChange: (t: string) => void }) {
  const days = getNext7Days();
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Pick a Date & Time</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">Select your preferred appointment slot.</p>
      <div className="mb-8">
        <p className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" />Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button key={day.value} type="button" onClick={() => onDateChange(day.value)}
              className={`flex flex-col items-center px-4 py-3 rounded-2xl border-2 transition-all duration-200 min-w-[72px] flex-shrink-0 ${date === day.value ? "border-primary-500 gradient-primary text-white shadow-card-hover scale-105" : "border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark-dim text-text-primary dark:text-text-dark-primary hover:border-primary-300"}`}
            >
              <span className="text-xs font-medium uppercase tracking-wide opacity-80">{day.dayName}</span>
              <span className="text-lg font-bold mt-0.5">{day.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-3 flex items-center gap-2"><Clock className="w-4 h-4" />Time</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button key={slot} type="button" onClick={() => onTimeChange(slot)}
              className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${time === slot ? "border-primary-500 gradient-primary text-white shadow-card-hover" : "border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark-dim text-text-primary dark:text-text-dark-primary hover:border-primary-300"}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPatientInfo({ form, onChange, errors }: {
  form: BookingForm;
  onChange: (field: keyof BookingForm, value: string) => void;
  errors: Partial<Record<keyof BookingForm, string>>;
}) {
  const inputCls = (field: keyof BookingForm) =>
    `w-full px-4 py-3 rounded-xl border text-text-primary dark:text-text-dark-primary bg-surface dark:bg-surface-dark-dim placeholder:text-text-muted focus:outline-none transition-colors ${errors[field] ? "border-red-400 focus:border-red-500" : "border-border-light dark:border-border-dark focus:border-primary-400 dark:focus:border-primary-500"}`;

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Your Information</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">Please fill in your details so we can confirm your appointment.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { key: "firstName" as const, label: "First Name", type: "text", placeholder: "e.g. Max", required: true },
          { key: "lastName" as const, label: "Last Name", type: "text", placeholder: "e.g. Müller", required: true },
          { key: "dob" as const, label: "Date of Birth", type: "date", placeholder: "", required: false },
          { key: "phone" as const, label: "Phone", type: "tel", placeholder: "+41 79 123 45 67", required: true },
        ].map(({ key, label, type, placeholder, required }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1.5">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input type={type} placeholder={placeholder} value={form[key] as string}
              onChange={(e) => onChange(key, e.target.value)} className={inputCls(key)} />
            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1.5">Email <span className="text-red-500">*</span></label>
          <input type="email" placeholder="your@email.com" value={form.email}
            onChange={(e) => onChange("email", e.target.value)} className={inputCls("email")} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-1.5">Notes / Reason for Visit</label>
          <textarea rows={3} placeholder="Brief description of your concern..."
            value={form.notes} onChange={(e) => onChange("notes", e.target.value)}
            className={`${inputCls("notes")} resize-none`} />
        </div>
      </div>
    </div>
  );
}

function StepConfirm({ form, onConfirm, submitted }: { form: BookingForm; onConfirm: () => void; submitted: boolean }) {
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-elevated mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-text-primary dark:text-text-dark-primary">
          Appointment Requested!
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="text-text-secondary dark:text-text-dark-secondary mt-3 max-w-md">
          Our team will contact you within 24 hours to confirm. A confirmation will be sent to{" "}
          <span className="font-semibold text-primary-600 dark:text-primary-300">{form.email}</span>.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-8 p-6 rounded-2xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark text-left w-full max-w-sm">
          <p className="text-xs text-text-muted dark:text-text-dark-muted font-medium uppercase tracking-wide mb-3">Summary</p>
          <div className="space-y-2 text-sm">
            {form.clinic && <div className="flex justify-between gap-4"><span className="text-text-muted dark:text-text-dark-muted">Clinic</span><span className="font-medium text-text-primary dark:text-text-dark-primary text-right">{form.clinic.shortName}</span></div>}
            {form.service && <div className="flex justify-between gap-4"><span className="text-text-muted dark:text-text-dark-muted">Service</span><span className="font-medium text-text-primary dark:text-text-dark-primary text-right">{form.service.name}</span></div>}
            {form.doctor && <div className="flex justify-between gap-4"><span className="text-text-muted dark:text-text-dark-muted">Doctor</span><span className="font-medium text-text-primary dark:text-text-dark-primary text-right">{form.doctor.name}</span></div>}
            {form.date && <div className="flex justify-between gap-4"><span className="text-text-muted dark:text-text-dark-muted">Date</span><span className="font-medium text-text-primary dark:text-text-dark-primary text-right">{new Date(form.date + "T00:00:00").toLocaleDateString("en-CH", { weekday: "short", day: "numeric", month: "long" })}</span></div>}
            {form.time && <div className="flex justify-between gap-4"><span className="text-text-muted dark:text-text-dark-muted">Time</span><span className="font-medium text-text-primary dark:text-text-dark-primary">{form.time}</span></div>}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const summaryItems = [
    { icon: Building2, label: "Clinic", value: form.clinic?.shortName },
    { icon: Stethoscope, label: "Service", value: form.service?.name },
    { icon: User, label: "Doctor", value: form.doctor?.name },
    { icon: Calendar, label: "Date", value: form.date ? new Date(form.date + "T00:00:00").toLocaleDateString("en-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : null },
    { icon: Clock, label: "Time", value: form.time },
    { icon: User, label: "Patient", value: form.firstName && form.lastName ? `${form.firstName} ${form.lastName}` : null },
    { icon: ClipboardList, label: "Contact", value: form.phone || form.email },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary dark:text-text-dark-primary mb-2">Review & Confirm</h2>
      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">Please review your appointment details before confirming.</p>
      <div className="space-y-2 mb-8">
        {summaryItems.filter((i) => i.value).map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark">
            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary-500" />
            </div>
            <div className="flex-1 flex justify-between gap-4">
              <span className="text-sm text-text-muted dark:text-text-dark-muted">{label}</span>
              <span className="text-sm font-medium text-text-primary dark:text-text-dark-primary text-right">{value}</span>
            </div>
          </div>
        ))}
      </div>
      {form.notes && (
        <div className="p-4 rounded-xl bg-surface-dim dark:bg-surface-dark-dim border border-border-light dark:border-border-dark mb-6">
          <p className="text-xs text-text-muted dark:text-text-dark-muted font-medium mb-1">Notes</p>
          <p className="text-sm text-text-secondary dark:text-text-dark-secondary">{form.notes}</p>
        </div>
      )}
      <button type="button" onClick={onConfirm} className="w-full py-4 rounded-2xl gradient-primary text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-card-hover">
        Confirm Appointment
      </button>
      <p className="text-center text-xs text-text-muted dark:text-text-dark-muted mt-3">
        By confirming, you agree to our appointment policy. No payment is required now.
      </p>
    </div>
  );
}

function BookAppointmentInner() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [form, setForm] = useState<BookingForm>({
    clinic: null, service: null, doctor: null,
    date: "", time: "", firstName: "", lastName: "", dob: "", phone: "", email: "", notes: "",
  });

  useEffect(() => {
    const clinicSlug = searchParams.get("clinic");
    const serviceSlug = searchParams.get("service");
    const doctorSlug = searchParams.get("doctor");
    setForm((prev) => ({
      ...prev,
      clinic: clinicSlug ? (clinics.find((c) => c.slug === clinicSlug) ?? null) : prev.clinic,
      service: serviceSlug ? (services.find((s) => s.slug === serviceSlug) ?? null) : prev.service,
      doctor: doctorSlug ? (doctors.find((d) => d.slug === doctorSlug) ?? null) : prev.doctor,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep5 = () => {
    const errs: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 5 && !validateStep5()) return;
    setCurrentStep((s) => Math.min(s + 1, 6));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      {/* Header */}
      <div className="gradient-hero pt-20 pb-10 lg:pt-28">
        <div className="container-wide">
          <span className="inline-block mb-3 px-4 py-1.5 text-sm font-medium rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300">
            Online Booking
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-dark-primary tracking-tight">
            Book an Appointment
          </h1>
          <p className="mt-2 text-text-secondary dark:text-text-dark-secondary">
            Complete the steps below. Our team will confirm within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="max-w-4xl mx-auto">
          {/* Stepper */}
          {!submitted && (
            <div className="bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark rounded-3xl shadow-card mb-6 overflow-hidden">
              <Stepper current={currentStep} />
            </div>
          )}

          {/* Step content */}
          <div className="bg-white dark:bg-surface-dark-dim border border-border-light dark:border-border-dark rounded-3xl shadow-card p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {currentStep === 1 && <StepClinic selected={form.clinic} onSelect={(c) => setForm((p) => ({ ...p, clinic: c }))} />}
                {currentStep === 2 && <StepService selected={form.service} clinicFilter={form.clinic} onSelect={(s) => setForm((p) => ({ ...p, service: s }))} />}
                {currentStep === 3 && <StepDoctor selected={form.doctor} clinicFilter={form.clinic} onSelect={(d) => setForm((p) => ({ ...p, doctor: d }))} />}
                {currentStep === 4 && <StepDateTime date={form.date} time={form.time} onDateChange={(d) => updateField("date", d)} onTimeChange={(t) => updateField("time", t)} />}
                {currentStep === 5 && <StepPatientInfo form={form} onChange={updateField} errors={errors} />}
                {currentStep === 6 && <StepConfirm form={form} onConfirm={() => setSubmitted(true)} submitted={submitted} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {!submitted && (
              <div className={`flex mt-8 pt-6 border-t border-border-light dark:border-border-dark ${currentStep === 1 ? "justify-end" : "justify-between"}`}>
                {currentStep > 1 && (
                  <button type="button" onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border-light dark:border-border-dark text-text-secondary dark:text-text-dark-secondary hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 transition-all font-medium">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
                {currentStep < 6 && (
                  <button type="button" onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-card">
                    {currentStep === 5 ? "Review" : "Next"} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Help note */}
          {!submitted && (
            <p className="text-center text-xs text-text-muted dark:text-text-dark-muted mt-4">
              Need help? Call{" "}
              <a href="tel:0442240990" className="text-primary-500 hover:underline font-medium">044 244 09 90</a>
              {" "}or email{" "}
              <a href="mailto:info@jerumed.com" className="text-primary-500 hover:underline font-medium">info@jerumed.com</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookAppointmentInner />
    </Suspense>
  );
}
