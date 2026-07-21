"use client";

import { useState, useEffect, useRef, useCallback, useTransition } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavTheme = "dark" | "light";

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const defaultTheme: NavTheme = isHomePage ? "dark" : "light";

  const [navTheme, setNavTheme] = useState<NavTheme>(defaultTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [, startTransition] = useTransition();

  // Reset state on route change
  useEffect(() => {
    startTransition(() => {
      setIsMobileMenuOpen(false);
      setNavTheme(isHomePage ? "dark" : "light");
    });
  }, [pathname, isHomePage, startTransition]);

  // Scroll listener for compact mode
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // IntersectionObserver to detect active section theme
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = document.querySelectorAll<HTMLElement>("section[data-theme], div[data-theme]");
    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const theme = visible[0].target.getAttribute("data-theme") as NavTheme | null;
          if (theme === "dark" || theme === "light") {
            setNavTheme(theme);
          }
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observerRef.current!.observe(section));
  }, []);

  useEffect(() => {
    const timer = setTimeout(setupObserver, 100);
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname, setupObserver]);

  const isDark = navTheme === "dark";

  const navLinks: NavLink[] = [
    { name: "Treatments", href: "/services", icon: Sparkles },
    { name: "Our Experts", href: "/specialists", icon: Stethoscope },
    { name: "Transformations", href: "/testimonials", icon: Star },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  function toggleDrawer() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function closeDrawer() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {/* ── Navbar pill ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between max-w-[1220px] mx-auto rounded-full backdrop-blur-[20px] ${
          isScrolled ? "mt-2 px-5 sm:px-6 md:px-10 lg:px-12 py-2.5" : "mt-4 px-5 sm:px-6 md:px-10 lg:px-12 py-3.5"
        } ${
          isDark
            ? "border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
            : "border border-black/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: isDark ? "rgba(10, 20, 35, 0.85)" : "rgba(255, 255, 255, 0.85)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
            isDark
              ? "bg-white/10 border border-white/20"
              : "bg-teal-700/10 border border-teal-700/20"
          }`}>
            <span className={`font-bold text-sm ${isDark ? "text-white" : "text-teal-700"}`} style={{ transition: "color 0.3s ease" }}>
              CS
            </span>
          </div>
          <span className={`text-xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-[#0B1D3A]"
          }`} style={{ transition: "color 0.3s ease" }}>
            Celestia{" "}
            <span className={`font-medium ${isDark ? "text-sky-blue" : "text-teal-700"}`} style={{ transition: "color 0.3s ease" }}>
              Smiles
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 ${
                isDark
                  ? "text-white hover:text-white/80 focus-visible:ring-offset-slate-900"
                  : "text-[#0B1D3A] hover:text-teal-700 focus-visible:ring-offset-white"
              }`}
              style={{ transition: "color 0.3s ease" }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-[0_8px_20px_rgba(13,148,136,0.25)] hover:shadow-[0_10px_24px_rgba(13,148,136,0.3)] active:scale-[0.98] transition-all duration-300"
          >
            Schedule Consultation
          </Link>
        </div>

        {/* ── Animated Hamburger ── */}
        <button
          className={`md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 ${
            isMobileMenuOpen ? "hamburger-open" : ""
          }`}
          onClick={toggleDrawer}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-line ${isDark ? "bg-white" : "bg-[#0B1D3A]"}`} />
          <span className={`hamburger-line ${isDark ? "bg-white" : "bg-[#0B1D3A]"}`} />
          <span className={`hamburger-line ${isDark ? "bg-white" : "bg-[#0B1D3A]"}`} />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <>
        {/* Overlay */}
        <div
          className={`drawer-overlay ${isMobileMenuOpen ? "drawer-overlay-open" : ""}`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div className={`drawer-panel ${isMobileMenuOpen ? "drawer-panel-open" : ""}`}>
          {/* Ambient glow orbs */}
          <div className="drawer-glow-top" />
          <div className="drawer-glow-bottom" />

          {/* Close button */}
          <button
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          {/* Content */}
          <div className="relative z-10 flex flex-col min-h-full px-5 pt-20 pb-8">
            {/* Brand */}
            <div className="drawer-link mb-8">
              <div className="flex items-center gap-3 pl-2">
                <div className="w-9 h-9 rounded-full bg-teal-600/15 border border-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-400 font-bold text-xs">CS</span>
                </div>
                <div>
                  <span className="text-white font-bold text-base">Celestia Smiles</span>
                  <p className="text-white/35 text-[11px] font-medium tracking-wide">Premium Dental Studio</p>
                </div>
              </div>
            </div>

            {/* Nav links with icons and stagger */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeDrawer}
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

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA at bottom */}
            <div className="drawer-link mt-8">
              <Link
                href="/book"
                onClick={closeDrawer}
                className="drawer-cta-btn"
              >
                <CalendarDays size={18} />
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
