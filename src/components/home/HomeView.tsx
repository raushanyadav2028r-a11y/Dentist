"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Phone,
  Smile,
  AlignCenter,
  Landmark,
  Sparkles,
  Scan,
  Bot,
  Layers,
  FlaskConical,
  Star as StarIcon,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import ServiceCard from "@/components/ui/ServiceCard";
import SpecialistCard from "@/components/ui/SpecialistCard";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import FAQSection from "@/components/ui/FAQSection";
import { createContactInquiry } from "@/actions/admin";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

// Below-the-fold, interactivity-heavy section. Lazy-loaded so its (large)
// slider + animation code is fetched as a separate chunk after first paint.
const BeforeAfterSection = dynamic(
  () => import("@/components/ui/BeforeAfterSection"),
  {
    ssr: true,
    loading: () => (
      <section className="section-padding bg-navy border-y border-white/5" />
    ),
  }
);

const iconMap: Record<string, LucideIcon> = {
  Smile, AlignCenter, Landmark, Sparkles, Scan, Bot, Layers, FlaskConical,
};

const techItems = [
  { icon: Scan, title: "3D Cone Beam Imaging", desc: "Ultra-low radiation 3D imaging for precise treatment planning." },
  { icon: Bot, title: "AI Smile Simulation", desc: "Digital simulation of your results before treatment begins." },
  { icon: Layers, title: "Robotic Ceramic Milling", desc: "In-house CAD/CAM studio for same-day precision restorations." },
  { icon: FlaskConical, title: "Laser Dentistry", desc: "Minimally invasive, suture-free soft tissue sculpting." },
];

export type FaqItem = { id: string; q: string; a: string };

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center pt-28 pb-12 lg:pt-32 lg:pb-24 overflow-hidden bg-navy">
      {/* Subtle Cinematic Lighting - reduced size and blur for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-blue/8 rounded-full blur-[60px] pointer-events-none" />

      <div className="container-max w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="animate-in" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.1] mb-6 lg:mb-8 font-display">
                Precision <br />
                <span className="text-sky-blue italic font-medium">Meets Perfection.</span>
              </h1>
            </div>

            <div className="animate-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-platinum text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-12 font-sans">
                Experience the future of aesthetic dentistry. World-class expertise delivered in an environment of absolute serenity.
              </p>
            </div>

            <div className="animate-in hero-buttons-wrapper flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start" style={{ animationDelay: "0.3s" }}>
              <Link href="/book" className="hero-primary-btn btn-primary flex items-center justify-center gap-3">
                Begin Your Transformation
              </Link>
              <Link href="/services" className="hero-secondary-btn btn-outline-dark flex items-center justify-center gap-3">
                Explore The Clinic
              </Link>
            </div>
          </div>

          {/* Right: Floating 3D Tooth */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0 animate-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] animate-float">
              <Image
                src="/teeth.webp"
                alt="Glossy 3D Molar Render"
                fill
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 450px, (min-width: 640px) 350px, 280px"
                className="object-contain drop-shadow-[0_0_32px_rgba(14,107,112,0.2)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile-only Stats Grid (visible below lg) */}
        <div className="lg:hidden mt-12">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "15+ Years Excellence" },
              { label: "17 Global Specialists" },
              { label: "5,000+ Masterpieces" },
              { label: "Zero-Pain Protocol" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl py-5 px-4 text-center border-t border-white/20 animate-in" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <p className="text-white font-semibold tracking-wide text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Metrics (desktop only — mobile version is inside hero) ─────────────
function TrustMetrics() {
  return (
    <section data-theme="dark" className="hidden lg:block relative z-20 -mt-16 container-max">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "15+ Years Excellence" },
          { label: "17 Global Specialists" },
          { label: "5,000+ Masterpieces" },
          { label: "Zero-Pain Protocol" },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl py-6 px-4 text-center border-t border-white/20 animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <p className="text-white font-semibold tracking-wide text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Services (The Halo List) ──────────────────────────────────────────────────
function HaloServices({ data }: { data: Record<string, unknown>[] }) {
  const items = data.length > 0 ? data : [
    { title: "Veneers & Aesthetics", description: "Ultrathin porcelain enhancements hand-crafted to match your unique facial geometry.", icon: "Smile", href: "/services#aesthetic-dentistry" },
    { title: "Invisible Orthodontics", description: "Clear aligner systems that invisibly correct your bite and alignment.", icon: "AlignCenter", href: "/services#orthodontics" },
    { title: "Implantology", description: "Titanium-grade restorations that perfectly mimic natural tooth function.", icon: "Landmark", href: "/services#implants" },
    { title: "Laser Whitening", description: "Advanced laser treatments for immediate, sensitivity-free brightening.", icon: "Sparkles", href: "/services#whitening" },
  ];
  return (
    <section data-theme="dark" id="services" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-electric-blue/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="container-max relative z-10">
        <div className="text-center mb-20 animate-in">
          <span className="section-label mb-4 inline-block">The Halo List</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display">
            Bespoke Dental Artistry
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {items.map((s: Record<string, unknown>, i: number) => {
            const Icon = iconMap[s.icon as string] || Sparkles;
            return (
              <ServiceCard
                key={s.id as string || s.title as string}
                title={s.title as string}
                description={s.description as string}
                icon={Icon}
                href={`/services#${s.slug as string || (s.title as string).toLowerCase().replace(/\s+/g, "-")}`}
                delay={i * 0.1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Specialists Section ──────────────────────────────────────────────────────
function SpecialistsSection({ data }: { data: Record<string, unknown>[] }) {
  const items = data.length > 0 ? data : [
    { name: "Dr. Julian Hayes", role: "Lead Aesthetic Architect", specialty: "Cosmetic Dentistry", bio: "Pioneering minimally invasive techniques to preserve natural tooth structure while achieving flawless symmetry.", image: "/stitch_male_doctor.webp" },
    { name: "Dr. Elena Rostova", role: "Master Orthodontist", specialty: "Invisalign Platinum Provider", bio: "Internationally recognized for her precision in digital orthodontic planning and rapid alignment.", image: "/stitch_female_doctor.webp" },
  ];
  return (
    <section data-theme="dark" id="specialists" className="section-padding bg-navy-light relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 animate-in">
          <div>
            <span className="section-label mb-4 inline-block">Our Team</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display">
              Masters of Their Craft
            </h2>
          </div>
          <Link href="/specialists" className="btn-outline-dark text-sm">
            View the collective
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((s: Record<string, unknown>, i: number) => (
            <SpecialistCard
              key={s.name as string}
              name={s.name as string}
              role={s.role as string}
              specialty={s.specialty as string}
              bio={s.bio as string}
              image={s.image_src as string || s.image as string || "/stitch_male_doctor.webp"}
              delay={i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials (Masonry) ────────────────────────────────────────────────────
function TestimonialsSection({ data }: { data: Record<string, unknown>[] }) {
  const items = data.length > 0 ? data : [
    { name: "Sarah M.", role: "CEO", treatment: "Smile Makeover", quote: "I expected a dental appointment. I received a masterpiece.", rating: 5 },
    { name: "Rohan V.", role: "Entrepreneur", treatment: "Implants", quote: "The zero-pain protocol is real. A completely serene experience.", rating: 5 },
    { name: "Priya S.", role: "Architect", treatment: "Veneers", quote: "They didn't just fix my teeth; they designed a smile that fits my face perfectly.", rating: 5 },
  ];
  return (
    <section data-theme="dark" id="testimonials" className="section-padding bg-navy relative overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-20 animate-in">
          <span className="section-label mb-4 inline-block">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display">
            In Their Words
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t: Record<string, unknown>, i: number) => (
            <div
              key={t.id as string || t.name as string}
              className="glass-card rounded-3xl p-10 border-t border-white/20 hover:border-electric-blue/40 transition-colors animate-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex gap-1 mb-8">
                {Array.from({ length: (t.rating as number) || 5 }).map((_, idx) => (
                  <StarIcon key={idx} size={16} className="text-sky-blue fill-sky-blue" />
                ))}
              </div>
              <p className="text-white text-lg leading-relaxed italic mb-8 font-display">
                &ldquo;{t.quote as string}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center text-white font-bold">
                  {(t.name as string).charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name as string}</div>
                  <div className="text-xs text-platinum uppercase tracking-widest mt-1">{t.role as string}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Technology Section ────────────────────────────────────────────────────────
function TechSection() {
  return (
    <section data-theme="dark" className="section-padding bg-navy-light border-y border-white/5 overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-6 animate-in">
            {techItems.map((item) => (
              <div
                key={item.title}
                className="dark-card rounded-2xl p-8 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.24)]"
              >
                <item.icon size={32} className="text-sky-blue mb-6 group-hover:text-electric-blue transition-colors" />
                <h4 className="font-bold text-white mb-3 leading-tight">{item.title}</h4>
                <p className="text-platinum text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-in" style={{ animationDelay: "0.2s" }}>
            <span className="section-label mb-4 inline-block">The Clinical Advantage</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-display">
              Engineered for Comfort.
            </h2>
            <p className="text-platinum text-lg leading-relaxed mb-10">
              We&apos;ve replaced traditional dentistry with a suite of digital precision tools—from AI-powered diagnosis to robotically-milled ceramics—eliminating guesswork and maximizing artistry.
            </p>
            <Link href="/about" className="btn-secondary inline-block">
              Discover Our Facility
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Strip ────────────────────────────────────────────────────────────
function ContactStrip({ serviceNames = [] }: { serviceNames?: string[] }) {
  const settings = useClinicSettings();
  const phone = settings?.phone || "+1 888 235 3784";
  const whatsapp = settings?.whatsapp || "+918882353784";
  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappDigits = whatsapp.replace(/\D/g, "");

  const treatmentOptions = serviceNames.length > 0
    ? serviceNames
    : ["Veneers & Aesthetics", "Invisible Orthodontics", "Implantology", "Laser Whitening"];

  const [contactForm, setContactForm] = useState({ full_name: "", phone: "", service: "", preferred_date: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState("");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setContactForm({ ...contactForm, phone: digits });
      if (digits.length > 0 && digits.length < 10) {
        setPhoneError(`Please enter a valid 10-digit mobile number. (${digits.length}/10)`);
      } else if (digits.length === 10) {
        setPhoneError("");
      } else {
        setPhoneError("");
      }
    } else {
      setContactForm({ ...contactForm, [name]: value });
    }
  };

  const isPhoneValid = contactForm.phone.length === 10;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.full_name.trim() || !isPhoneValid) {
      if (!isPhoneValid && contactForm.phone.length > 0) {
        setPhoneError("Please enter a valid 10-digit mobile number.");
      }
      return;
    }
    setContactSubmitting(true);
    setContactError(null);
    try {
      const result = await createContactInquiry({
        full_name: contactForm.full_name,
        phone: contactForm.phone,
        service: contactForm.service || undefined,
        preferred_date: contactForm.preferred_date || undefined,
        message: contactForm.message || undefined,
      });
      if (result.error) {
        setContactError(result.error);
      } else {
        setContactSubmitted(true);
      }
    } catch {
      setContactError("Failed to submit. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section data-theme="dark" id="contact" className="section-padding bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-electric-blue/5 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-in">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
              Book Your<br />Consultation
            </h2>
            <p className="text-platinum text-lg mb-10 max-w-md leading-relaxed">
              A private consultation with our specialist team is the first step toward your smile transformation. We&apos;ll take the time to understand your goals and create a personalized treatment plan tailored to you.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Phone size={20} className="text-sky-blue" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-platinum mb-1">Direct Line</div>
                  <a href={`tel:+${phoneDigits}`} className="text-white text-lg font-medium hover:text-sky-blue transition-colors">{phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Calendar size={20} className="text-sky-blue" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-platinum mb-1">Concierge</div>
                  <a href={`https://wa.me/${whatsappDigits}`} className="text-white text-lg font-medium hover:text-sky-blue transition-colors">WhatsApp Chat</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-10 md:p-14 border border-white/10 animate-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-white mb-8">Book Your Consultation</h3>
            {contactSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Request Received!</h4>
                <p className="text-white/60 text-sm mb-6">Our team will contact you within 2 hours.</p>
                <button onClick={() => { setContactSubmitted(false); setContactForm({ full_name: "", phone: "", service: "", preferred_date: "", message: "" }); setPhoneError(""); }} className="btn-outline-dark text-sm px-6 py-2.5">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input type="text" name="full_name" required placeholder="Full Name" value={contactForm.full_name} onChange={handleContactChange} className="ghost-input" autoComplete="name" />
                  </div>
                  <div>
                    <input type="tel" name="phone" required inputMode="numeric" pattern="[0-9]{10}" maxLength={10} placeholder="Mobile Number (10 digits)" value={contactForm.phone} onChange={handleContactChange} className="ghost-input" autoComplete="tel" />
                    {phoneError && <p className="text-red-400 text-xs mt-2">{phoneError}</p>}
                  </div>
                </div>
                <div>
                  <select name="service" value={contactForm.service} onChange={handleContactChange} className="ghost-input [&>option]:bg-navy [&>option]:text-white">
                    <option value="">Select Treatment Interest</option>
                    {treatmentOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <input type="date" name="preferred_date" value={contactForm.preferred_date} onChange={handleContactChange} className="ghost-input" />
                </div>
                <div>
                  <textarea name="message" rows={3} placeholder="Message (optional)" value={contactForm.message} onChange={handleContactChange} className="ghost-input resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={contactSubmitting || !contactForm.full_name.trim() || !isPhoneValid}>
                  {contactSubmitting ? "Submitting..." : "Schedule Consultation"}
                </button>
                {contactError && <p className="text-red-400 text-sm text-center">{contactError}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomeView({
  services,
  specialists,
  testimonials,
  faqs,
}: {
  services: Record<string, unknown>[];
  specialists: Record<string, unknown>[];
  testimonials: Record<string, unknown>[];
  faqs: FaqItem[];
}) {
  const serviceNames = services.map((s) => String(s.title));

  return (
    <main className="min-h-screen bg-navy text-white">
        <HeroSection />
        <TrustMetrics />
        <HaloServices data={services} />

        <SpecialistsSection data={specialists} />

        <BeforeAfterSection />
        <TestimonialsSection data={testimonials} />
        <WhyChooseUs />
        <TechSection />
        <FAQSection faqs={faqs} />
        <ContactStrip serviceNames={serviceNames} />
      </main>
  );
}
