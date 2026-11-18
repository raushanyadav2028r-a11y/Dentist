"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

export default function FloatingButtons() {
  const s = useClinicSettings();
  const phone = s?.phone || "+1 888 235 3784";
  const whatsapp = s?.whatsapp || s?.phone || "+1 888 235 3784";
  const whatsappDigits = whatsapp.replace(/\D/g, "");
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Desktop Floating Buttons — bottom right */}
      {visible && (
        <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-3 items-end hidden md:flex animate-in" style={{ animationDelay: "0.3s" }}>
          {/* WhatsApp Button */}
          <div className="relative flex items-center gap-3">
            {showTooltip && (
              <div className="absolute right-16 bg-white shadow-elevated rounded-2xl px-4 py-3 text-sm font-semibold text-navy whitespace-nowrap border border-border animate-in">
                Chat on WhatsApp
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-border rotate-45" />
              </div>
            )}
            <a
              href={`https://wa.me/${whatsappDigits}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Celestia%20Smiles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-whatsapp text-white flex items-center justify-center shadow-[0_10px_26px_rgba(31,170,89,0.32)] hover:bg-whatsapp-dark hover:shadow-[0_14px_34px_rgba(31,170,89,0.38)] transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Chat on WhatsApp"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <MessageCircle size={26} fill="white" strokeWidth={0} />
            </a>
          </div>

          {/* Call Button */}
          <a
            href={`tel:${phone}`}
            className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center shadow-[0_10px_26px_rgba(11,18,32,0.3)] hover:bg-primary hover:shadow-[0_14px_34px_rgba(14,107,112,0.28)] transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Call us"
          >
            <Phone size={22} />
          </a>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in" style={{ animationDelay: "0.3s" }}>
          {/* Gradient fade top edge */}
          <div className="h-6 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
          {/* Bar */}
          <div className="bg-slate-900/80 backdrop-blur-lg border-t border-white/10 px-4 pt-3 pb-6">
            <div className="flex gap-3">
              <a
                href={`tel:${phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-white/[0.08] border border-white/15 text-white py-3.5 rounded-full text-sm font-medium cursor-pointer hover:bg-white/[0.14] active:scale-95 transition-all duration-200"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/${whatsappDigits}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3.5 rounded-full text-sm font-medium cursor-pointer shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-all duration-200"
              >
                <MessageCircle size={16} fill="white" strokeWidth={0} />
                WhatsApp
              </a>
              <a
                href="/book"
                className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3.5 rounded-full text-sm font-medium cursor-pointer shadow-lg shadow-teal-500/25 hover:bg-teal-500 active:scale-95 transition-all duration-200"
              >
                <Calendar size={16} />
                Book
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
