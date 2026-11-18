"use client";

import { Phone, MessageCircle, MapPin, Clock, Mail, ShieldCheck } from "lucide-react";
import GoogleMap from "@/components/ui/GoogleMap";
import BookingSection from "@/components/ui/BookingSection";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

export default function ContactPage() {
  const { t } = useTranslation();
  const s = useClinicSettings();

  const clinicName = s?.clinic_name || clinicConfig.clinicName;
  const phone = s?.phone || clinicConfig.phone;
  const fullAddress = s?.address || clinicConfig.fullAddress;
  const whatsappDigits = clinicConfig.whatsappNumber;

  return (
    <div className="pt-28 pb-16 bg-[#08121E] min-h-screen text-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <ShieldCheck size={14} />
            <span>{clinicConfig.area}, {clinicConfig.city}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
            {t("location.heading", "Contact & Clinic Location")}
          </h1>
          <p className="text-platinum/80 text-sm sm:text-base font-sans">
            {t(
              "location.subheading",
              "We are here to answer your dental queries. Visit us, call directly, or book your consultation online."
            )}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Address */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Clinic Address</h3>
              <p className="text-xs text-platinum/80 leading-relaxed font-sans mb-4">
                {fullAddress}
              </p>
            </div>
            <a
              href={clinicConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors uppercase tracking-wider"
            >
              <span>Get Directions</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Call & WhatsApp</h3>
              <div className="space-y-2 text-xs text-platinum/80 font-sans mb-4">
                <p>
                  <strong className="text-white">Call:</strong>{" "}
                  <a href={`tel:${clinicConfig.phoneRaw}`} className="text-teal-300 font-semibold hover:underline">
                    {phone}
                  </a>
                </p>
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a href={`mailto:${clinicConfig.email}`} className="text-teal-300 hover:underline">
                    {clinicConfig.email}
                  </a>
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(clinicName)}%2C%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline uppercase tracking-wider"
            >
              <MessageCircle size={14} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Timings */}
          <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                {t("location.timings", "Working Hours")}
              </h3>
              <div className="space-y-1.5 text-xs text-platinum/80 font-sans mb-4">
                <p>
                  <strong className="text-teal-300">{t("location.weekdays", "Mon – Sat")}:</strong>{" "}
                  {clinicConfig.timings.weekdays}
                </p>
                <p>
                  <strong className="text-teal-300">{t("location.sunday", "Sunday")}:</strong>{" "}
                  {clinicConfig.timings.sunday}
                </p>
              </div>
            </div>
            {clinicConfig.timings.emergencyNote && (
              <span className="text-[11px] text-amber-300 font-medium">
                {clinicConfig.timings.emergencyNote}
              </span>
            )}
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-16">
          <GoogleMap height="h-[380px] sm:h-[440px]" />
        </div>

        {/* Booking Section */}
        <BookingSection className="pt-0 pb-0" />
      </div>
    </div>
  );
}
