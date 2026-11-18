"use client";

import Link from "next/link";
import { MessageCircle, Phone, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";
import { useClinicSettings, type ClinicSettings } from "@/contexts/ClinicSettingsContext";

export default function Footer({ settings }: { settings?: ClinicSettings | null }) {
  const { t } = useTranslation();
  const s = useClinicSettings();

  const clinicName = s?.clinic_name || clinicConfig.clinicName;
  const shortName = clinicConfig.shortName || "DC";
  const phone = s?.phone || clinicConfig.phone;
  const whatsappDigits = clinicConfig.whatsappNumber;
  const fullAddress = s?.address || clinicConfig.fullAddress;
  const currentYear = new Date().getFullYear();

  // Top 5 treatments from config for footer links
  const featuredTreatments = clinicConfig.treatments.slice(0, 6);

  return (
    <footer className="bg-[#08121E] border-t border-white/10 pt-16 pb-28 md:pb-12 text-white">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center">
                <span className="text-teal-300 font-bold text-sm">{shortName}</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {clinicName}
              </span>
            </Link>
            <p className="text-platinum/80 text-sm leading-relaxed mb-6 font-sans">
              {clinicConfig.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold mb-6">
              <ShieldCheck size={16} />
              <span>DCI Registered Dental Specialists</span>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              {t("hero.bookConsultation", "Book Appointment")}
            </Link>
          </div>

          {/* Treatments Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-5">
              {t("footer.treatments", "Key Treatments")}
            </h4>
            <ul className="space-y-3">
              {featuredTreatments.map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/services#${treatment.slug}`}
                    className="text-platinum/80 hover:text-white transition-colors text-sm flex items-center justify-between group"
                  >
                    <span>{treatment.title}</span>
                    {treatment.startingPrice && (
                      <span className="text-[11px] text-teal-300/80 group-hover:text-teal-300">
                        ₹{treatment.startingPrice.toLocaleString("en-IN")}+
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings & Working Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-5 flex items-center gap-2">
              <Clock size={14} />
              <span>{t("location.timings", "Clinic Timings")}</span>
            </h4>
            <div className="space-y-3 text-sm text-platinum/80 font-sans">
              <div>
                <span className="font-semibold text-white block text-xs uppercase tracking-wide text-teal-300 mb-1">
                  {t("location.weekdays", "Mon – Sat")}
                </span>
                <p>{clinicConfig.timings.weekdays}</p>
              </div>
              <div>
                <span className="font-semibold text-white block text-xs uppercase tracking-wide text-teal-300 mb-1">
                  {t("location.sunday", "Sunday")}
                </span>
                <p>{clinicConfig.timings.sunday}</p>
              </div>
              {clinicConfig.timings.emergencyNote && (
                <div className="pt-2 border-t border-white/10 text-xs text-amber-300/90 font-medium">
                  {clinicConfig.timings.emergencyNote}
                </div>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-5">
              {t("footer.contact", "Contact & Location")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-platinum/80 text-sm">
                <MapPin size={18} className="text-teal-400 shrink-0 mt-0.5" />
                <a
                  href={clinicConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {fullAddress}
                </a>
              </li>
              <li className="flex items-center gap-3 text-platinum/80 text-sm">
                <Phone size={18} className="text-teal-400 shrink-0" />
                <a href={`tel:${clinicConfig.phoneRaw}`} className="hover:text-white transition-colors font-medium">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-platinum/80 text-sm">
                <MessageCircle size={18} className="text-teal-400 shrink-0" />
                <a
                  href={`https://wa.me/${whatsappDigits}?text=Hello%20${encodeURIComponent(clinicName)}%2C%20I%20would%20like%20to%20inquire%20about%20dental%20treatment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Demo Badge */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-platinum/60">
          <p>
            © {currentYear} {clinicName}. {t("footer.allRights", "All rights reserved.")}
          </p>

          {clinicConfig.showDemoBadge ? (
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span>{t("footer.demoNotice", "Template design by")}</span>
              <a
                href={clinicConfig.developer.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-semibold"
              >
                {clinicConfig.developer.name}
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-platinum/40">
              <Heart size={12} className="text-teal-400" />
              <span>Serving Smiles with Care</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
