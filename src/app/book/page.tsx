"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import BookingSection from "@/components/ui/BookingSection";
import GoogleMap from "@/components/ui/GoogleMap";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";

function BookContent() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "";
  const defaultDoctor = searchParams.get("doctor") || "";
  const { t } = useTranslation();

  return (
    <div className="pt-28 pb-16 bg-[#08121E] min-h-screen text-white">
      <div className="container-max">
        {/* Top Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
            <ShieldCheck size={14} />
            <span>{clinicConfig.clinicName} • {clinicConfig.city}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
            {t("booking.heading", "Book Your Dental Appointment")}
          </h1>
          <p className="text-platinum/80 text-sm sm:text-base font-sans">
            {t(
              "booking.subheading",
              "Schedule your consultation with our experienced dental team. Confirm on WhatsApp or we will call you back."
            )}
          </p>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-2">
            <Phone size={15} className="text-teal-400" />
            <a href={`tel:${clinicConfig.phoneRaw}`} className="text-white hover:text-teal-300 font-semibold">
              {clinicConfig.phone}
            </a>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-2">
            <MessageCircle size={15} className="text-[#25D366]" />
            <a
              href={`https://wa.me/${clinicConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#25D366] font-semibold"
            >
              WhatsApp Support
            </a>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center gap-2">
            <Clock size={15} className="text-teal-400" />
            <span className="text-platinum/80">{clinicConfig.timings.weekdays}</span>
          </div>
        </div>

        {/* Interactive Booking Form Component */}
        <BookingSection
          defaultService={defaultService}
          defaultDoctor={defaultDoctor}
          className="pt-0 pb-12"
        />

        {/* Clinic Location & Map */}
        <div className="max-w-3xl mx-auto mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-4">
            <MapPin size={16} />
            <span>Clinic Location</span>
          </div>
          <p className="text-sm text-platinum/90 mb-4">{clinicConfig.fullAddress}</p>
          <GoogleMap height="h-[300px]" />
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08121E]" />}>
      <BookContent />
    </Suspense>
  );
}
