"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Phone,
  MessageCircle,
  Star as StarIcon,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Smile,
  Activity,
  Heart,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";
import ServiceCard from "@/components/ui/ServiceCard";
import SpecialistCard from "@/components/ui/SpecialistCard";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import PaymentSection from "@/components/ui/PaymentSection";
import FAQSection from "@/components/ui/FAQSection";
import GoogleMap from "@/components/ui/GoogleMap";
import BookingSection from "@/components/ui/BookingSection";

const BeforeAfterSection = dynamic(
  () => import("@/components/ui/BeforeAfterSection"),
  {
    ssr: true,
    loading: () => (
      <section className="section-padding bg-[#091424] border-t border-white/5" />
    ),
  }
);

const iconMap: Record<string, LucideIcon> = {
  Shield: ShieldCheck,
  Sparkles,
  Smile,
  Activity,
  Heart,
};

export type FaqItem = { id: string; q: string; a: string };

// ─── 1. Hero Section ─────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useTranslation();
  const phone = clinicConfig.phone;
  const phoneRaw = clinicConfig.phoneRaw;
  const whatsappDigits = clinicConfig.whatsappNumber;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-14 lg:pt-36 lg:pb-20 overflow-hidden bg-[#0A1424] text-white">
      {/* Background ambient medical glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-max w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trusted local badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold mb-6 animate-in">
              <ShieldCheck size={16} className="text-teal-400" />
              <span>{clinicConfig.area}, {clinicConfig.city} • {t("hero.trustedTag", "Trusted Dental Care in Your Neighborhood")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-5 font-display tracking-tight">
              {clinicConfig.clinicName.split("Smile")[0]}
              <span className="text-teal-400">
                {clinicConfig.clinicName.includes("Smile") ? "Smile " : ""}
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-platinum/90 font-normal mt-2">
                {clinicConfig.tagline}
              </span>
            </h1>

            <p className="text-platinum/85 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-sans">
              Experienced BDS & MDS specialists offering painless root canals, permanent dental implants, clear aligners, and family dental checkups at honest prices.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center lg:justify-start items-center mb-8">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#00B894] hover:bg-[#00a383] text-[#071321] text-sm sm:text-base font-extrabold px-7 py-3.5 rounded-full shadow-[0_8px_24px_rgba(0,184,148,0.32)] active:scale-95 transition-all duration-200"
              >
                <Calendar size={18} />
                <span>{t("hero.bookConsultation", "Book Appointment")}</span>
              </Link>

              <a
                href={`https://wa.me/${whatsappDigits}?text=Hello%20doctor%2C%20I%20would%20like%20to%20consult%20at%20${encodeURIComponent(clinicConfig.clinicName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm sm:text-base font-bold px-7 py-3.5 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.25)] active:scale-95 transition-all duration-200"
              >
                <MessageCircle size={18} fill="white" strokeWidth={0} />
                <span>{t("hero.chatWhatsapp", "WhatsApp Karein")}</span>
              </a>

              <a
                href={`tel:${phoneRaw}`}
                className="hidden xl:inline-flex items-center justify-center gap-2 text-white/80 hover:text-white px-4 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-sm font-semibold transition-all"
              >
                <Phone size={15} className="text-teal-400" />
                <span>{phone}</span>
              </a>
            </div>

            {/* Quick checkmarks */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-platinum/75 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-400" />
                Painless & Gentle Care
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-400" />
                100% Autoclave Sterilized
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-400" />
                0% Interest EMI
              </span>
            </div>
          </div>

          {/* Right Hero Graphic */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">
              <Image
                src="/teeth.webp"
                alt="Healthy 3D Molar"
                fill
                sizes="(min-width: 1024px) 420px, 320px"
                className="object-contain drop-shadow-[0_0_36px_rgba(20,184,166,0.35)] animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Trust Strip (Stats & Verified Ratings) ────────────────────────────────
function TrustStrip() {
  const { t } = useTranslation();

  const stats = [
    clinicConfig.googleRating && {
      icon: StarIcon,
      value: `${clinicConfig.googleRating} ★`,
      label: `${clinicConfig.totalReviews || 400}+ ${t("trust.reviews", "Google Reviews")}`,
      link: clinicConfig.socialLinks.googleReviews,
    },
    clinicConfig.yearsOfExperience && {
      icon: Award,
      value: `${clinicConfig.yearsOfExperience}+ Years`,
      label: t("trust.experience", "Clinical Experience"),
    },
    clinicConfig.patientsTreated && {
      icon: Users,
      value: clinicConfig.patientsTreated,
      label: t("trust.patients", "Happy Smiles Restored"),
    },
    {
      icon: ShieldCheck,
      value: "Hospital Grade",
      label: t("trust.gentleCare", "Autoclave Sterilization"),
    },
  ].filter(Boolean) as { icon: LucideIcon; value: string; label: string; link?: string }[];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 container-max">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const CardContent = (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-center shadow-lg hover:border-teal-500/40 transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 text-teal-400 font-bold text-lg sm:text-2xl mb-1 font-display">
                <Icon size={18} className="text-teal-400 shrink-0" />
                <span>{stat.value}</span>
              </div>
              <p className="text-platinum/80 text-xs sm:text-sm font-medium font-sans">
                {stat.label}
              </p>
            </div>
          );

          if (stat.link) {
            return (
              <a
                key={i}
                href={stat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-[1.02] transition-transform"
              >
                {CardContent}
              </a>
            );
          }

          return <div key={i}>{CardContent}</div>;
        })}
      </div>
    </section>
  );
}

// ─── 3. Indian Dental Treatments ─────────────────────────────────────────────
function TreatmentsSection({ treatments }: { treatments: typeof clinicConfig.treatments }) {
  const { t } = useTranslation();
  const items = treatments && treatments.length > 0 ? treatments : clinicConfig.treatments;

  return (
    <section id="services" className="section-padding bg-[#0A1424] text-white relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-label mb-3 inline-block">
            {t("treatments.sectionLabel", "Our Treatments")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t("treatments.heading", "Complete Dental Solutions")}
          </h2>
          <p className="text-platinum/80 text-base sm:text-lg">
            {t(
              "treatments.subheading",
              "Gentle, modern, and affordable dental care tailored for you and your family."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((treatment, i) => {
            const Icon = iconMap[treatment.iconName] || Sparkles;
            return (
              <ServiceCard
                key={treatment.slug}
                title={treatment.title}
                description={treatment.description}
                icon={Icon}
                startingPrice={treatment.startingPrice}
                duration={treatment.duration}
                href={`/services#${treatment.slug}`}
                delay={i * 0.05}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Specialists Section ──────────────────────────────────────────────────
function DoctorsSection({ doctors }: { doctors: typeof clinicConfig.doctors }) {
  const { t } = useTranslation();
  const items = doctors && doctors.length > 0 ? doctors : clinicConfig.doctors;

  return (
    <section id="specialists" className="section-padding bg-[#08121E] text-white border-t border-white/5 relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <span className="section-label mb-3 inline-block">
              {t("doctors.sectionLabel", "Our Specialists")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
              {t("doctors.heading", "Meet Your Dental Doctors")}
            </h2>
            <p className="text-platinum/80 text-sm sm:text-base mt-2 max-w-xl">
              {t(
                "doctors.subheading",
                "Qualified, experienced dentists dedicated to patient comfort and healthy natural smiles."
              )}
            </p>
          </div>
          <Link
            href="/specialists"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-teal-400 hover:text-teal-300 border border-teal-500/30 px-4 py-2.5 rounded-full hover:bg-teal-500/10 transition-all"
          >
            <span>View All Doctors</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((doctor, i) => (
            <SpecialistCard
              key={doctor.name}
              name={doctor.name}
              qualification={doctor.qualification}
              specialty={doctor.specialization}
              experienceYears={doctor.experienceYears}
              regNo={doctor.regNo}
              bio={doctor.bio}
              image={doctor.photo}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Testimonials Section ─────────────────────────────────────────────────
function TestimonialsSection({ testimonials }: { testimonials: typeof clinicConfig.testimonials }) {
  const { t } = useTranslation();
  const items = testimonials && testimonials.length > 0 ? testimonials : clinicConfig.testimonials;
  const hasPlaceholders = items.some((item) => item.isPlaceholder);

  return (
    <section id="testimonials" className="section-padding bg-[#0A1424] text-white border-t border-white/5 relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="section-label">
              {t("testimonials.sectionLabel", "Patient Feedback")}
            </span>
            {hasPlaceholders && clinicConfig.showDemoBadge && (
              <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                {t("testimonials.sampleBadge", "Sample Reviews")}
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t("testimonials.heading", "Words from Our Patients")}
          </h2>
          <p className="text-platinum/80 text-base sm:text-lg">
            {t(
              "testimonials.subheading",
              "Real experiences shared by patients who trust us with their dental health."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="rounded-3xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, idx) => (
                    <StarIcon key={idx} size={15} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-platinum/90 text-sm leading-relaxed italic mb-6 font-sans">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-teal-600/30 text-teal-300 font-bold flex items-center justify-center text-sm shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-platinum/60">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Location, Map & Timings Section ───────────────────────────────────────
function LocationSection() {
  const { t } = useTranslation();

  return (
    <section id="location" className="section-padding bg-[#07101B] border-t border-white/5 text-white relative">
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5">
            <span className="section-label mb-3 inline-block">
              {t("location.sectionLabel", "Visit Us")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              {t("location.heading", "Clinic Location & Timings")}
            </h2>

            <div className="space-y-6 text-sm text-platinum/85 font-sans mb-8">
              <div className="flex items-start gap-3.5">
                <MapPin size={20} className="text-teal-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block text-sm mb-1">
                    {clinicConfig.clinicName}
                  </span>
                  <p className="leading-relaxed">{clinicConfig.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock size={20} className="text-teal-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="font-bold text-white block text-sm mb-1">
                    {t("location.timings", "Clinic Hours")}
                  </span>
                  <p>
                    <strong className="text-teal-300">{t("location.weekdays", "Mon – Sat")}:</strong>{" "}
                    {clinicConfig.timings.weekdays}
                  </p>
                  <p>
                    <strong className="text-teal-300">{t("location.sunday", "Sunday")}:</strong>{" "}
                    {clinicConfig.timings.sunday}
                  </p>
                  {clinicConfig.timings.emergencyNote && (
                    <p className="text-xs text-amber-300 font-medium pt-1">
                      {clinicConfig.timings.emergencyNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone size={20} className="text-teal-400 shrink-0" />
                <div>
                  <span className="text-xs text-platinum/60 block">Direct Line</span>
                  <a
                    href={`tel:${clinicConfig.phoneRaw}`}
                    className="text-white hover:text-teal-300 font-bold transition-colors"
                  >
                    {clinicConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={clinicConfig.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MapPin size={15} />
                <span>{t("location.getDirections", "Get Directions")}</span>
              </a>
              <a
                href={`tel:${clinicConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
              >
                <Phone size={15} className="text-teal-400" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-7">
            <GoogleMap height="h-[360px] sm:h-[420px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main HomeView Page Orchestrator ─────────────────────────────────────────
export default function HomeView({
  services = [],
  specialists = [],
  testimonials = [],
  faqs = [],
}: {
  services?: Record<string, unknown>[];
  specialists?: Record<string, unknown>[];
  testimonials?: Record<string, unknown>[];
  faqs?: FaqItem[];
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#08121E]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Treatments Section */}
      <TreatmentsSection treatments={clinicConfig.treatments} />

      {/* 4. Why Choose Us (Autoclave Sterilization & Hygiene) */}
      <WhyChooseUs />

      {/* 5. Doctors Section */}
      <DoctorsSection doctors={clinicConfig.doctors} />

      {/* 6. Before / After Gallery (Hides if empty) */}
      <BeforeAfterSection />

      {/* 7. Patient Testimonials */}
      <TestimonialsSection testimonials={clinicConfig.testimonials} />

      {/* 8. Pricing & Payment Info (UPI, Cards, 0% EMI) */}
      <PaymentSection />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Location, Timings & Google Map */}
      <LocationSection />

      {/* 11. Interactive Booking Form */}
      <BookingSection />
    </div>
  );
}
