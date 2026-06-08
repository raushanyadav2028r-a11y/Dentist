"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import ServiceCard from "@/components/ui/ServiceCard";
import SpecialistCard from "@/components/ui/SpecialistCard";
import BeforeAfterSection from "@/components/ui/BeforeAfterSection";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import FAQSection from "@/components/ui/FAQSection";
import { getPublicServices, getPublicSpecialists, getPublicTestimonials } from "@/actions/admin";
import { useClinicSettings } from "@/contexts/ClinicSettingsContext";

const iconMap: Record<string, LucideIcon> = {
  Smile, AlignCenter, Landmark, Sparkles, Scan, Bot, Layers, FlaskConical,
};

const techItems = [
  { icon: Scan, title: "3D Cone Beam Imaging", desc: "Ultra-low radiation 3D imaging for precise treatment planning." },
  { icon: Bot, title: "AI Smile Simulation", desc: "Digital simulation of your results before treatment begins." },
  { icon: Layers, title: "Robotic Ceramic Milling", desc: "In-house CAD/CAM studio for same-day precision restorations." },
  { icon: FlaskConical, title: "Laser Dentistry", desc: "Minimally invasive, suture-free soft tissue sculpting." },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section data-theme="dark" className="relative min-h-screen flex items-center pt-28 pb-12 lg:pt-32 lg:pb-24 overflow-hidden bg-navy">
      {/* Cinematic Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-max w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.1] mb-6 lg:mb-8 font-display"
            >
              Precision <br />
              <span className="text-sky-blue italic font-medium">Meets Perfection.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-platinum text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-12 font-sans"
            >
              Experience the future of aesthetic dentistry. World-class expertise delivered in an environment of absolute serenity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-buttons-wrapper flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              <Link href="/book" className="hero-primary-btn btn-primary flex items-center justify-center gap-3">
                Begin Your Transformation
              </Link>
              <Link href="/services" className="hero-secondary-btn btn-outline-dark flex items-center justify-center gap-3">
                Explore The Clinic
              </Link>
            </motion.div>
          </div>

          {/* Right: Floating 3D Tooth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] animate-float">
              <Image
                src="/teeth.png"
                alt="Glossy 3D Molar Render"
                fill
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 450px, (min-width: 640px) 350px, 280px"
                className="object-contain drop-shadow-[0_0_42px_rgba(14,107,112,0.26)]"
                priority
              />
            </div>
          </motion.div>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-card rounded-2xl py-5 px-4 text-center border-t border-white/20"
              >
                <p className="text-white font-semibold tracking-wide text-sm">{stat.label}</p>
              </motion.div>
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card rounded-2xl py-6 px-4 text-center border-t border-white/20"
          >
            <p className="text-white font-semibold tracking-wide text-sm md:text-base">{stat.label}</p>
          </motion.div>
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
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container-max relative z-10">
        <div className="text-center mb-20">
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
    { name: "Dr. Julian Hayes", role: "Lead Aesthetic Architect", specialty: "Cosmetic Dentistry", bio: "Pioneering minimally invasive techniques to preserve natural tooth structure while achieving flawless symmetry.", image: "/stitch_male_doctor.png" },
    { name: "Dr. Elena Rostova", role: "Master Orthodontist", specialty: "Invisalign Platinum Provider", bio: "Internationally recognized for her precision in digital orthodontic planning and rapid alignment.", image: "/stitch_female_doctor.png" },
  ];
  return (
    <section data-theme="dark" id="specialists" className="section-padding bg-navy-light relative overflow-hidden">
      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
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
              image={s.image_src as string || s.image as string || "/stitch_male_doctor.png"}
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
        <div className="text-center mb-20">
          <span className="section-label mb-4 inline-block">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display">
            In Their Words
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t: Record<string, unknown>, i: number) => (
            <motion.div
              key={t.id as string || t.name as string}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-3xl p-10 border-t border-white/20 hover:border-electric-blue/40 transition-colors"
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
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {techItems.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5, boxShadow: "0 18px 36px rgba(0,0,0,0.24)" }}
                className="dark-card rounded-2xl p-8 transition-all duration-300 group"
              >
                <item.icon size={32} className="text-sky-blue mb-6 group-hover:text-electric-blue transition-colors" />
                <h4 className="font-bold text-white mb-3 leading-tight">{item.title}</h4>
                <p className="text-platinum text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
          </motion.div>
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

  return (
    <section data-theme="dark" id="contact" className="section-padding bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-electric-blue/5 pointer-events-none" />
      
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
              Your Masterpiece<br />Awaits.
            </h2>
            <p className="text-platinum text-lg mb-10 max-w-md leading-relaxed">
              Reserve your private consultation today and step into the future of aesthetic dentistry.
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
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-card rounded-3xl p-10 md:p-14 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Request an Invitation</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input type="text" placeholder="Full Name" className="ghost-input" />
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" className="ghost-input" />
                </div>
              </div>
              <div>
                <select className="ghost-input [&>option]:bg-navy [&>option]:text-white">
                  <option value="">Select Treatment Interest</option>
                  {treatmentOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [dbServices, setDbServices] = useState<Record<string, unknown>[]>([]);
  const [dbSpecialists, setDbSpecialists] = useState<Record<string, unknown>[]>([]);
  const [dbTestimonials, setDbTestimonials] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    getPublicServices().then(({ data }) => { if (data && data.length > 0) setDbServices(data as Record<string, unknown>[]); });
    getPublicSpecialists().then(({ data }) => { if (data && data.length > 0) setDbSpecialists(data as Record<string, unknown>[]); });
    getPublicTestimonials().then(({ data }) => { if (data && data.length > 0) setDbTestimonials(data as Record<string, unknown>[]); });
  }, []);

  return (
    <main className="min-h-screen bg-navy text-white">
      <HeroSection />
      <TrustMetrics />
      <HaloServices data={dbServices} />
      
      <SpecialistsSection data={dbSpecialists} />
      
      <BeforeAfterSection />
      <TestimonialsSection data={dbTestimonials} />
      <WhyChooseUs />
      <TechSection />
      <FAQSection />
      <ContactStrip serviceNames={dbServices.map(s => String(s.title))} />
    </main>
  );
}
