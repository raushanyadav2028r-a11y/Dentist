"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, CheckCircle } from "lucide-react";
import GoogleMap from "@/components/ui/GoogleMap";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";
import { createContactInquiry } from "@/actions/admin";

const services = [
  "Aesthetic Dentistry", "Orthodontics / Aligners", "Dental Implants",
  "Teeth Whitening", "Smile Makeover", "Root Canal Treatment",
  "Crowns & Bridges", "Pediatric Dentistry", "Emergency Care", "General Check-up",
];

export default function ContactPage() {
  const s = useClinicSettings();
  const phone = s?.phone || "+18882353784";
  const whatsapp = s?.whatsapp || "918882353784";
  const whatsappDigits = whatsapp.replace(/\D/g, "");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "", service: "", preferred_date: "", message: ""
  });

  const validatePhone = (p: string) => {
    const digits = p.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const isPhoneValid = validatePhone(form.phone);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleaned = value.replace(/[^0-9+\s\-()]/g, "").slice(0, 20);
      setForm({ ...form, phone: cleaned });
      const digits = cleaned.replace(/\D/g, "");
      if (digits.length > 0 && digits.length < 7) {
        setPhoneError("Please enter a valid phone number with area/country code.");
      } else {
        setPhoneError("");
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !isPhoneValid) {
      if (!isPhoneValid && form.phone.length > 0) {
        setPhoneError("Please enter a valid 10-digit mobile number.");
      }
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await createContactInquiry({
        full_name: form.full_name,
        phone: form.phone,
        email: form.email || undefined,
        service: form.service || undefined,
        preferred_date: form.preferred_date || undefined,
        message: form.message || undefined,
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

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section data-theme="dark" className="section-padding bg-gradient-to-b from-navy via-navy to-surface-dim pt-28">
        <div className="container-max text-center">
          <span className="section-label mb-4 inline-block">Contact Us</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Let&apos;s start your<br />smile journey
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-lg">
            Book a free consultation, ask a question, or get directions. We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Quick contact strip */}
      <section data-theme="dark" className="py-8 bg-navy text-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-0.5">Call Us</div>
                <div className="font-bold">{phone}</div>
              </div>
            </a>
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-0.5">WhatsApp</div>
                <div className="font-bold">{whatsapp}</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-0.5">Hours</div>
                <div className="font-bold">{s?.hours_weekday || "Mon–Fri 9am–7pm"} · {s?.hours_saturday || "Sat 10am–3pm"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content: form + info */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="premium-card rounded-3xl p-6 sm:p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-5" />
                  <h2 className="text-3xl font-bold text-navy mb-3">Message Received!</h2>
                  <p className="text-navy/60 text-base mb-8">
                    Thanks! Our team will contact you within 2 hours to confirm your appointment.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ full_name:"",phone:"",email:"",service:"",preferred_date:"",message:"" }); setPhoneError(""); }}
                    className="btn-secondary px-8 py-3 rounded-full"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-navy mb-2">Book an Appointment</h2>
                  <p className="text-navy/50 text-sm mb-8">
                    Fill in the form and we&apos;ll get back to you within 2 hours.
                  </p>
                  <form id="appointment-form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label" htmlFor="contact-name">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="full_name"
                          type="text"
                          required
                          value={form.full_name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="form-field"
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="contact-phone">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000 or 0412 345 678"
                          className="form-field"
                          autoComplete="tel"
                        />
                        {phoneError && <p className="text-red-500 text-xs mt-1.5">{phoneError}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-email">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="form-field"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-service">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="form-field"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-date">
                        Preferred Date
                      </label>
                      <input
                        id="contact-date"
                        name="preferred_date"
                        type="date"
                        value={form.preferred_date}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-message">
                        Message (optional)
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Anything you'd like us to know..."
                        className="form-field resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-base rounded-2xl"
                      disabled={submitting || !form.full_name.trim() || !isPhoneValid}
                    >
                      {submitting ? "Submitting..." : "Send Appointment Request"}
                    </button>
                    {submitError && (
                      <p className="text-red-500 text-sm text-center">{submitError}</p>
                    )}
                    <p className="text-xs text-center text-navy/30">
                      We&apos;ll confirm within 2 hours. Your info is kept private.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Info column */}
            <div className="flex flex-col gap-6">
              {/* Address card */}
              <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-elevated">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Find Us</h3>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, label: "Address", value: s?.address ? `${s.address}\n${[s.city, s.country].filter(Boolean).join(", ")}` : "422 Serenity Avenue, Suite 900\nBeverly Hills, CA 90210, USA" },
                      { icon: Phone, label: "Phone", value: s?.phone || "+1 888 235 3784" },
                      { icon: MessageCircle, label: "WhatsApp", value: s?.whatsapp || "+1 888 235 3784" },
                      { icon: Clock, label: "Hours", value: [s?.hours_weekday, s?.hours_saturday, s?.hours_sunday].filter(Boolean).join("\n") || "Mon–Fri: 9am – 7pm\nSaturday: 10am – 3pm\nSunday: Closed" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-4">
                        <Icon size={18} className="text-sky-blue shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-sky-blue/80 mb-0.5">{label}</div>
                          <div className="text-white/70 text-sm whitespace-pre-line">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <GoogleMap height="h-[300px]" />

              {/* Quick WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsappDigits}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Celestia%20Smiles.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base"
              >
                <MessageCircle size={22} fill="white" strokeWidth={0} />
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
