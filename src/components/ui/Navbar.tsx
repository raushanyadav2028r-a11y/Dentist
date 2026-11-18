"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  X,
  Sparkles,
  Stethoscope,
  Star,
  Mail,
  CalendarDays,
  Phone,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clinicConfig from "@/config/clinic";
import { useTranslation, type SupportedLanguage } from "@/contexts/LanguageContext";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, setLanguage, enabledLanguages } = useTranslation();
  const settings = useClinicSettings();

  const isDark = true;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const clinicName = settings?.clinic_name || clinicConfig.clinicName;
  const shortName = clinicConfig.shortName || "DC";
  const phone = settings?.phone || clinicConfig.phone;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks: NavLink[] = [
    { name: t("nav.treatments", "Treatments"), href: "/services", icon: Sparkles },
    { name: t("nav.doctors", "Specialists"), href: "/specialists", icon: Stethoscope },
    { name: t("nav.transformations", "Smile Stories"), href: "/testimonials", icon: Star },
    { name: t("nav.about", "About Us"), href: "/about", icon: Sparkles },
    { name: t("nav.contact", "Contact & Map"), href: "/contact", icon: Mail },
  ];

  const languageLabels: Record<SupportedLanguage, string> = {
    en: "English",
    hi: "हिन्दी",
    gu: "ગુજરાતી",
    mr: "मराठी",
  };

  return (
    <>
      {/* ── Navbar pill ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between max-w-[1240px] mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? "mt-2 px-4 sm:px-6 md:px-8 py-2.5 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
            : "mt-3 sm:mt-4 px-4 sm:px-6 md:px-8 py-3 border border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(18px) saturate(180%)",
          backdropFilter: "blur(18px) saturate(180%)",
          backgroundColor: "rgba(11, 22, 38, 0.88)",
        }}
      >
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-600/20 border border-teal-500/30 group-hover:scale-105 transition-all duration-300">
            <span className="font-bold text-sm text-teal-300">
              {shortName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
              {clinicName}
            </span>
            <span className="text-[11px] text-teal-400/80 hidden sm:inline-block font-medium">
              {clinicConfig.city}, {clinicConfig.state}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-teal-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg px-1 py-0.5"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          {enabledLanguages.length > 1 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all"
                aria-label="Change Language"
                aria-expanded={isLangMenuOpen}
              >
                <Globe size={13} className="text-teal-400" />
                <span>{language.toUpperCase()}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-900 border border-white/15 shadow-xl py-1.5 z-50 animate-in">
                  {enabledLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors flex items-center justify-between ${
                        language === lang
                          ? "bg-teal-600/30 text-teal-300 font-bold"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <span>{languageLabels[lang]}</span>
                      {language === lang && <span className="text-teal-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Call Link (Desktop) */}
          <a
            href={`tel:${clinicConfig.phoneRaw}`}
            className="hidden xl:flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 px-3 py-2 rounded-full transition-all"
          >
            <Phone size={13} className="text-teal-400" />
            <span className="font-semibold">{phone}</span>
          </a>

          {/* Book Appointment CTA */}
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center justify-center bg-[#00B894] hover:bg-[#00a383] text-[#071321] text-xs md:text-sm font-extrabold px-4 md:px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(0,184,148,0.3)] hover:shadow-[0_6px_20px_rgba(0,184,148,0.4)] active:scale-[0.98] transition-all duration-200"
          >
            {t("nav.bookAppointment", "Book Appointment")}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              isMobileMenuOpen ? "hamburger-open" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line bg-white" />
            <span className="hamburger-line bg-white" />
            <span className="hamburger-line bg-white" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`drawer-overlay ${isMobileMenuOpen ? "drawer-overlay-open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div className={`drawer-panel ${isMobileMenuOpen ? "drawer-panel-open" : ""}`}>
        <button
          className="drawer-close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 flex flex-col min-h-full px-5 pt-16 pb-8">
          {/* Drawer Header */}
          <div className="drawer-link mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center">
                <span className="text-teal-300 font-bold text-sm">{shortName}</span>
              </div>
              <div>
                <span className="text-white font-bold text-base leading-tight block">
                  {clinicName}
                </span>
                <p className="text-teal-400/80 text-xs font-medium">
                  {clinicConfig.area}, {clinicConfig.city}
                </p>
              </div>
            </div>
          </div>

          {/* Language selector in drawer */}
          {enabledLanguages.length > 1 && (
            <div className="mb-6 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-white/50 mb-2 font-medium flex items-center gap-1.5">
                <Globe size={13} className="text-teal-400" />
                Select Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {enabledLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      language === lang
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="drawer-link drawer-menu-item"
                >
                  <span className="drawer-menu-item-icon">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1">{link.name}</span>
                  <ChevronRight size={16} className="drawer-menu-item-chevron" />
                </Link>
              );
            })}
          </div>

          <div className="flex-1" />

          {/* Drawer Call & Book CTAs */}
          <div className="flex flex-col gap-3 mt-6">
            <a
              href={`tel:${clinicConfig.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-semibold hover:bg-white/15 transition-all"
            >
              <Phone size={16} className="text-teal-400" />
              Call {phone}
            </a>
            <Link
              href="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="drawer-cta-btn justify-center"
            >
              <CalendarDays size={18} />
              {t("nav.bookAppointment", "Book Appointment")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
