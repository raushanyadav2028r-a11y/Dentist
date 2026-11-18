"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

export default function FloatingButtons() {
  const { t } = useTranslation();
  const settings = useClinicSettings();

  const clinicName = settings?.clinic_name || clinicConfig.clinicName;
  const phoneRaw = clinicConfig.phoneRaw;
  const whatsappDigits = clinicConfig.whatsappNumber;

  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = `https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(clinicName)}%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <>
      {/* ── Desktop Floating Buttons (Bottom Right) ── */}
      {visible && (
        <div
          className="fixed bottom-8 right-6 z-50 flex flex-col gap-3 items-end hidden md:flex animate-in"
          style={{ animationDelay: "0.2s" }}
        >
          {/* WhatsApp Action */}
          <div className="relative flex items-center gap-3">
            {showTooltip && (
              <div className="absolute right-16 bg-white shadow-xl rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 whitespace-nowrap border border-slate-200 animate-in">
                Chat on WhatsApp
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-slate-200 rotate-45" />
              </div>
            )}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20ba5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Chat on WhatsApp"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <MessageCircle size={28} fill="white" strokeWidth={0} />
            </a>
          </div>

          {/* Call Action */}
          <a
            href={`tel:${phoneRaw}`}
            className="w-14 h-14 rounded-2xl bg-[#0E6B70] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(14,107,112,0.3)] hover:bg-[#0c5c60] hover:shadow-[0_12px_28px_rgba(14,107,112,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Call clinic"
          >
            <Phone size={24} />
          </a>
        </div>
      )}

      {/* ── Mobile Sticky Bottom Bar (Visible on phones 360px+) ── */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in">
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-3 gap-2">
              {/* Call Now */}
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-semibold border border-white/10 transition-all text-center"
              >
                <Phone size={15} className="text-teal-400 shrink-0" />
                <span>Call Now</span>
              </a>

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white text-xs font-semibold shadow-md shadow-[#25D366]/20 transition-all text-center"
              >
                <MessageCircle size={15} fill="white" strokeWidth={0} className="shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* Book Appointment */}
              <Link
                href="/book"
                className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[#00B894] hover:bg-[#00a383] active:scale-95 text-[#071321] text-xs font-extrabold shadow-md shadow-[#00B894]/25 transition-all text-center"
              >
                <Calendar size={15} className="shrink-0" />
                <span>Book</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
