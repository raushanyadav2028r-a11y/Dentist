"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";

interface BookingSectionProps {
  defaultService?: string;
  defaultDoctor?: string;
  className?: string;
  id?: string;
}

const timeSlots = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
  "05:00 PM – 06:00 PM",
  "06:00 PM – 07:00 PM",
  "07:00 PM – 08:00 PM",
  "08:00 PM – 09:00 PM",
];

export default function BookingSection({
  defaultService = "",
  defaultDoctor = "",
  className = "",
  id = "book",
}: BookingSectionProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: defaultService || clinicConfig.treatments[0]?.title || "",
    date: "",
    timeSlot: timeSlots[0],
    message: defaultDoctor ? `Consultation with ${defaultDoctor}` : "",
    honeypot: "", // Bot trap
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);

  const cleanPhone = (val: string) => val.replace(/\D/g, "");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = cleanPhone(raw).slice(0, 10);
    setForm({ ...form, phone: digits });

    if (digits.length > 0 && (!/^[6-9]/.test(digits) || digits.length < 10)) {
      setPhoneError(t("booking.errorPhone", "Please enter a valid 10-digit Indian mobile number."));
    } else {
      setPhoneError(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent, openWhatsappImmediately: boolean = false) => {
    e.preventDefault();

    // 1. Validation
    if (!form.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const digits = cleanPhone(form.phone);
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setPhoneError(t("booking.errorPhone", "Please enter a valid 10-digit Indian mobile number."));
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: digits,
          email: form.email.trim() || undefined,
          treatment: form.treatment,
          date: form.date,
          timeSlot: form.timeSlot,
          message: form.message.trim() || undefined,
          honeypot: form.honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to book appointment.");
      }

      setSuccess(true);
      setWaLink(data.whatsappUrl);

      // Open WhatsApp immediately if requested or on mobile
      if (openWhatsappImmediately && data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: any) {
      // Fallback: If network or API fails, still allow direct WhatsApp appointment
      const fallbackWaText = encodeURIComponent(
        `*New Appointment Request - ${clinicConfig.clinicName}*\nName: ${form.name}\nPhone: +91 ${digits}\nTreatment: ${form.treatment}\nDate: ${form.date}\nTime: ${form.timeSlot}\nNotes: ${form.message}`
      );
      const fallbackUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${fallbackWaText}`;
      setWaLink(fallbackUrl);
      setSuccess(true);

      if (openWhatsappImmediately) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setLoading(false);
    }
  };

  // Min date = today
  const todayDateString = new Date().toISOString().split("T")[0];

  return (
    <section id={id} className={`section-padding bg-[#08121E] text-white relative overflow-hidden ${className}`}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="section-label mb-3 inline-block">
              {t("booking.sectionLabel", "Schedule Visit")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              {t("booking.heading", "Book Your Dental Appointment")}
            </h2>
            <p className="text-platinum/80 text-base sm:text-lg">
              {t(
                "booking.subheading",
                "Fill out the quick form below. You can immediately confirm on WhatsApp or our reception will call you back."
              )}
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <div className="rounded-3xl p-8 sm:p-10 bg-teal-950/60 border border-teal-500/40 text-center animate-in shadow-xl">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                {t("booking.successTitle", "Appointment Request Received!")}
              </h3>
              <p className="text-platinum/85 text-sm sm:text-base max-w-lg mx-auto mb-8 font-sans">
                {t(
                  "booking.successDesc",
                  "Thank you! Your appointment request has been registered. For immediate priority booking, please send the pre-filled message on WhatsApp below."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold shadow-lg shadow-[#25D366]/25 transition-all"
                  >
                    <MessageCircle size={18} fill="white" strokeWidth={0} />
                    <span>Open in WhatsApp</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      treatment: clinicConfig.treatments[0]?.title || "",
                      date: "",
                      timeSlot: timeSlots[0],
                      message: "",
                      honeypot: "",
                    });
                  }}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form
              onSubmit={(e) => handleSubmit(e, false)}
              className="rounded-3xl p-6 sm:p-10 bg-white/[0.04] border border-white/10 shadow-2xl relative"
            >
              {/* Spam Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-2.5">
                  <AlertCircle size={18} className="text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User size={13} className="text-teal-400" />
                    <span>{t("booking.fullName", "Full Name")} *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("booking.fullNamePlaceholder", "e.g. Ramesh Patel")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-teal-400 focus:bg-white/10 text-white placeholder-white/30 text-sm outline-none transition-all"
                  />
                </div>

                {/* 2. Indian Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Phone size={13} className="text-teal-400" />
                    <span>{t("booking.phone", "Mobile Number")} *</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl bg-white/10 border border-r-0 border-white/15 text-white/70 text-xs font-semibold">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder={t("booking.phonePlaceholder", "98765 43210")}
                      maxLength={10}
                      className={`w-full px-4 py-3 rounded-r-xl bg-white/5 border text-white placeholder-white/30 text-sm outline-none transition-all ${
                        phoneError
                          ? "border-red-400 bg-red-950/20"
                          : "border-white/15 focus:border-teal-400 focus:bg-white/10"
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[11px] text-red-400 mt-1 font-medium">{phoneError}</p>
                  )}
                </div>

                {/* 3. Treatment Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2">
                    {t("booking.treatment", "Select Treatment")} *
                  </label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 focus:border-teal-400 text-white text-sm outline-none transition-all"
                  >
                    {clinicConfig.treatments.map((tr) => (
                      <option key={tr.slug} value={tr.title} className="bg-slate-900 text-white">
                        {tr.title} {tr.startingPrice ? `(₹${tr.startingPrice.toLocaleString("en-IN")}+)` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar size={13} className="text-teal-400" />
                    <span>{t("booking.date", "Preferred Date")}</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={todayDateString}
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-teal-400 text-white text-sm outline-none transition-all [color-scheme:dark]"
                  />
                </div>

                {/* 5. Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock size={13} className="text-teal-400" />
                    <span>{t("booking.timeSlot", "Time Slot")}</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 focus:border-teal-400 text-white text-sm outline-none transition-all"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-slate-900 text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail size={13} className="text-teal-400" />
                    <span>{t("booking.email", "Email (Optional)")}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-teal-400 text-white placeholder-white/30 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* 7. Notes / Message (Optional) */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-platinum/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText size={13} className="text-teal-400" />
                  <span>{t("booking.message", "Describe Issue or Notes (Optional)")}</span>
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t(
                    "booking.messagePlaceholder",
                    "e.g., toothache in lower molar, want teeth whitening, etc."
                  )}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-teal-400 text-white placeholder-white/30 text-sm outline-none transition-all resize-none"
                />
              </div>

              {/* Notice */}
              <div className="mb-6 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 font-medium">
                ℹ️ <strong>Please note:</strong> This form registers an appointment request. Our clinic reception will call or message on WhatsApp to confirm your exact appointment slot.
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Option A: Direct Confirm on WhatsApp */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold shadow-lg shadow-[#25D366]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <MessageCircle size={18} fill="white" strokeWidth={0} />
                  <span>{t("booking.whatsappBtn", "Book & Confirm on WhatsApp")}</span>
                </button>

                {/* Option B: Standard Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#00B894] hover:bg-[#00a383] text-[#071321] text-sm font-extrabold shadow-lg shadow-[#00B894]/25 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading && <Loader2 size={16} className="animate-spin text-[#071321]" />}
                  <span>{loading ? t("booking.submitting", "Submitting...") : t("booking.submitBtn", "Book Appointment")}</span>
                </button>
              </div>

              {/* Trust assurance */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-platinum/60 text-center">
                <ShieldCheck size={14} className="text-teal-400" />
                <span>Your contact details are strictly confidential. No spam guaranteed.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
