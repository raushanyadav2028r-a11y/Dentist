"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, ChevronRight, MapPin, Navigation, ExternalLink, MessageCircle, Sparkles, Clock, IndianRupee } from "lucide-react";
import GoogleMap, { CLINIC_ADDRESS, CLINIC_NAME, DIRECTIONS_URL } from "@/components/ui/GoogleMap";
import { createAppointment } from "@/actions/admin";

const sectionLabel = "text-xs font-bold uppercase tracking-[0.14em] text-primary font-sans";

const services = [
  "Aesthetic Dentistry", "Orthodontics / Aligners", "Dental Implants",
  "Teeth Whitening", "Smile Makeover", "Root Canal Treatment",
  "Crowns & Bridges", "Pediatric Dentistry", "Emergency Care", "General Check-up",
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

function BookPageContent() {
  const searchParams = useSearchParams();

  // Read calculator data from URL params
  const calcTreatment = searchParams.get("selected_treatment") || "";
  const calcService = searchParams.get("service") || "";
  const calcCost = searchParams.get("cost") || "";
  const calcDuration = searchParams.get("duration") || "";
  const calcSource = searchParams.get("source") || "";
  const calcDoctor = searchParams.get("doctor") || "";
  const fromCalculator = calcSource === "calculator";
  const displayTreatment = calcTreatment || calcService;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: displayTreatment, date: "", time: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update form when URL params change
  useEffect(() => {
    if (displayTreatment) {
      setForm((prev) => ({ ...prev, service: displayTreatment }));
    }
  }, [displayTreatment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await createAppointment({
        full_name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        service: form.service || undefined,
        preferred_date: form.date || undefined,
        preferred_time: form.time || undefined,
        message: form.message || undefined,
        selected_treatment: calcTreatment || undefined,
        estimated_cost: calcCost || undefined,
        estimated_duration: calcDuration || undefined,
        source: fromCalculator ? "treatment_calculator" : "website",
      });
      if (result.error) {
        setSubmitError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    // Build WhatsApp message
    const waLines = [
      "Hello,",
      "",
      "I have submitted an appointment request through your website.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
    ];
    if (form.email) waLines.push(`Email: ${form.email}`);
    if (calcTreatment) waLines.push(`Selected Treatment: ${calcTreatment}`);
    if (form.service && form.service !== calcTreatment) waLines.push(`Service: ${form.service}`);
    if (calcCost) waLines.push(`Estimated Cost: ${calcCost}`);
    if (calcDuration) waLines.push(`Estimated Duration: ${calcDuration}`);
    if (calcDoctor) waLines.push(`Recommended Doctor: ${calcDoctor}`);
    if (form.date) waLines.push(`Preferred Date: ${form.date}`);
    if (form.time) waLines.push(`Preferred Time: ${form.time}`);
    if (form.message) waLines.push(`Message: ${form.message}`);
    if (fromCalculator) waLines.push("Source: Treatment Calculator");
    waLines.push("", "Please confirm my appointment.", "", "Thank you.");
    const waText = encodeURIComponent(waLines.join("\n"));
    const waUrl = `https://wa.me/918882353784?text=${waText}`;

    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center py-20">
          <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Your appointment request has been submitted successfully.</h1>
          <p className="text-white/60 text-lg mb-3">
            Thanks, <strong>{form.name || "there"}</strong>! We&apos;ve saved your appointment request.
          </p>
          <p className="text-white/50 text-base mb-10">
            Our team will confirm your slot for{" "}
            <strong>{displayTreatment || "your chosen service"}</strong>
            {form.date ? ` on ${form.date}` : ""} within <strong>2 hours</strong>.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#1faa59] text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.4)] active:scale-[0.97] transition-all duration-300 mb-6"
          >
            <MessageCircle size={22} fill="white" strokeWidth={0} />
            Continue on WhatsApp
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary px-8 py-3 rounded-full">Back to Home</Link>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ name:"",phone:"",email:"",service: displayTreatment,date:"",time:"",message:"" }); }}
              className="btn-outline-dark px-8 py-3 rounded-full"
            >
              Book Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section data-theme="dark" className="bg-navy py-16 text-white text-center relative overflow-hidden pt-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-max relative z-10">
          <Calendar size={36} className="mx-auto mb-4 text-sky-blue" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-white/60 text-lg">Free consultation · No obligation · Confirmed within 2 hours</p>
        </div>
      </section>

      {/* Treatment Summary from Calculator */}
      {fromCalculator && displayTreatment && (
        <section data-theme="dark" className="bg-[#050d14] border-b border-white/5 pb-12 pt-8 px-4">
          <div className="container-max max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4 pl-1">
              <Sparkles size={16} className="text-[#0d9488]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#0d9488]">From Treatment Calculator</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0d9488]/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">Selected Treatment</p>
                  <h3 className="text-xl font-bold text-white mb-1">{displayTreatment}</h3>
                  {calcDoctor && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                        <Sparkles size={10} className="text-[#0d9488]" />
                      </div>
                      <p className="text-sm font-medium text-white/70">{calcDoctor}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1 flex items-center gap-1.5">
                    <IndianRupee size={10} /> Est. Cost
                  </p>
                  <p className="text-lg font-bold text-[#0d9488]">{calcCost}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-1 flex items-center gap-1.5">
                    <Clock size={10} /> Est. Duration
                  </p>
                  <p className="text-lg font-bold text-white">{calcDuration}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Progress bar */}
      <div data-theme="light" className="bg-white/92 backdrop-blur-xl border-b border-border py-5 sticky top-[72px] z-40">
        <div className="container-max max-w-2xl">
          <div className="flex items-center gap-3">
            {(fromCalculator
              ? [{ n: 1, label: "Your Details" }, { n: 2, label: "Confirm" }]
              : [{ n: 1, label: "Your Details" }, { n: 2, label: "Service & Time" }, { n: 3, label: "Confirm" }]
            ).map(({ n, label }, i, arr) => (
              <React.Fragment key={n}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= n ? "bg-primary text-white" : "bg-surface-card text-navy/45"
                  }`}>
                    {step > n ? <CheckCircle size={16} /> : n}
                  </div>
                  <span className={`text-sm font-semibold hidden sm:block ${step >= n ? "text-navy" : "text-navy/40"}`}>{label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`flex-1 h-0.5 transition-all ${step > n ? "bg-primary" : "bg-border"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section data-theme="light" className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Step 1 — Your Details */}
            {step === 1 && (
              <div className="premium-card rounded-3xl p-8 md:p-12 space-y-6">
                <h2 className="text-2xl font-bold text-navy mb-2">Tell us about you</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="book-name">Full Name *</label>
                    <input id="book-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" className="form-field" />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="book-phone">Phone *</label>
                    <input id="book-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+91 ..." className="form-field" />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="book-email">Email Address</label>
                  <input id="book-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-field" />
                </div>

                {/* Read-only treatment info from calculator */}
                {fromCalculator && displayTreatment && (
                  <div className="bg-surface-card rounded-2xl p-5 border border-border space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Your Selected Treatment</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-navy/35 mb-0.5">Treatment</p>
                        <p className="text-sm font-semibold text-navy">{displayTreatment}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-navy/35 mb-0.5">Est. Cost</p>
                        <p className="text-sm font-bold text-primary">{calcCost}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-navy/35 mb-0.5">Est. Duration</p>
                        <p className="text-sm font-semibold text-navy">{calcDuration}</p>
                      </div>
                      {calcDoctor && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-navy/35 mb-0.5">Doctor</p>
                          <p className="text-sm font-semibold text-navy">{calcDoctor}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => { if (form.name && form.phone) setStep(fromCalculator ? 2 : 2); }}
                  disabled={!form.name || !form.phone}
                  className="btn-primary w-full py-4 rounded-2xl text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2 — Service & Time (skipped if from calculator) */}
            {!fromCalculator && step === 2 && (
              <div className="premium-card rounded-3xl p-8 md:p-12 space-y-6">
                <h2 className="text-2xl font-bold text-navy mb-2">Choose your service & time</h2>
                <div>
                  <label className="form-label" htmlFor="book-service">Service *</label>
                  <select id="book-service" name="service" required value={form.service} onChange={handleChange} className="form-field">
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="book-date">Preferred Date *</label>
                  <input id="book-date" name="date" type="date" required value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="form-field" />
                </div>
                <div>
                  <label className="form-label">Preferred Time</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((t) => (
                      <button key={t} type="button" onClick={() => setForm({ ...form, time: t })} className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${form.time === t ? "bg-primary text-white border-primary shadow-[0_8px_18px_rgba(14,107,112,0.16)]" : "border-border text-navy hover:border-primary/35 hover:bg-surface-dim"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="book-message">Message (optional)</label>
                  <textarea id="book-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Any additional information..." className="form-field resize-none" />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-4 rounded-2xl">Back</button>
                  <button type="button" onClick={() => { if (form.service && form.date) setStep(3); }} disabled={!form.service || !form.date} className="btn-primary flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                    Review <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Confirm step */}
            {((fromCalculator && step === 2) || (!fromCalculator && step === 3)) && (
              <div className="premium-card rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-navy mb-6">Review your appointment</h2>
                <div className="space-y-4 mb-8">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Phone", value: form.phone },
                    { label: "Email", value: form.email || "—" },
                    ...(fromCalculator && displayTreatment ? [{ label: "Treatment", value: displayTreatment }] : []),
                    ...(fromCalculator && calcCost ? [{ label: "Est. Cost", value: calcCost }] : []),
                    ...(fromCalculator && calcDuration ? [{ label: "Duration", value: calcDuration }] : []),
                    ...(fromCalculator && calcDoctor ? [{ label: "Doctor", value: calcDoctor }] : []),
                    { label: "Service", value: form.service || displayTreatment },
                    { label: "Date", value: form.date || "To be confirmed" },
                    { label: "Time", value: form.time || "Flexible" },
                    { label: "Message", value: form.message || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 py-3 border-b border-border last:border-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-navy/40 w-20 shrink-0">{label}</span>
                      <span className="text-navy text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Date/time picker for calculator flow */}
                {fromCalculator && (
                  <div className="space-y-4 mb-6 p-5 bg-surface-card rounded-2xl border border-border">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Choose your preferred date</p>
                    <div>
                      <label className="form-label" htmlFor="book-date-calc">Preferred Date *</label>
                      <input id="book-date-calc" name="date" type="date" required value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="form-field" />
                    </div>
                    <div>
                      <label className="form-label">Preferred Time</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((t) => (
                          <button key={t} type="button" onClick={() => setForm({ ...form, time: t })} className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${form.time === t ? "bg-primary text-white border-primary shadow-[0_8px_18px_rgba(14,107,112,0.16)]" : "border-border text-navy hover:border-primary/35 hover:bg-surface-dim"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="book-message-calc">Message (optional)</label>
                      <textarea id="book-message-calc" name="message" rows={2} value={form.message} onChange={handleChange} placeholder="Any additional information..." className="form-field resize-none" />
                    </div>
                  </div>
                )}

                <div className="bg-surface-card rounded-2xl p-5 border border-border mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Clinic Location</p>
                      <p className="text-sm font-semibold text-navy">{CLINIC_NAME}</p>
                      <p className="text-xs text-navy/50 mt-0.5">{CLINIC_ADDRESS}</p>
                      <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover mt-2 transition-colors">
                        <Navigation size={12} /> Get Directions <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-navy/40 mb-6">By submitting, you agree to receive a confirmation call or WhatsApp message from our team.</p>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(fromCalculator ? 1 : 2)} className="btn-secondary flex-1 py-4 rounded-2xl">Edit</button>
                  <button type="submit" className="btn-primary flex-1 py-4 rounded-2xl text-base" disabled={submitting || (fromCalculator && !form.date)}>
                    {submitting ? "Submitting..." : "Confirm Booking"}
                  </button>
                </div>
                {submitError && <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>}
              </div>
            )}
          </form>

          {/* Map section */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="mb-6">
              <span className={sectionLabel}>Find Us</span>
              <h2 className="text-2xl font-bold text-navy mt-1">Visit Our Clinic</h2>
              <p className="text-navy/50 text-sm mt-1">Conveniently located in the heart of New Delhi</p>
            </div>

            <GoogleMap alwaysVisible height="h-[300px] md:h-[400px]" showInfoCard={false} />

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-surface-card rounded-2xl border border-border">
              <div className="flex items-start gap-3 min-w-0">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy">{CLINIC_NAME}</p>
                  <p className="text-xs text-navy/50 truncate">{CLINIC_ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:text-primary-hover transition-colors whitespace-nowrap">
                  Open in Google Maps
                </a>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2 whitespace-nowrap">
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </div>

            <p className="text-xs text-navy/40 mt-5 text-center">
              Located in the heart of New Delhi. Free parking available.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </main>
    }>
      <BookPageContent />
    </Suspense>
  );
}
