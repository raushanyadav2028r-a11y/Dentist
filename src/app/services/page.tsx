import type { Metadata } from "next";
import Link from "next/link";
import {
  Smile,
  Shield,
  Sparkles,
  Activity,
  Heart,
  Check,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clinicConfig from "@/config/clinic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Dental Treatments & Pricing | ${clinicConfig.clinicName} ${clinicConfig.city}`,
  description: `Explore all dental treatments at ${clinicConfig.clinicName}: Root canals, dental implants, teeth cleaning, braces, aligners & smile design. Affordable rates starting from ₹${clinicConfig.treatments[0]?.startingPrice || 999}.`,
};

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Sparkles,
  Smile,
  Activity,
  Heart,
};

export default function ServicesPage() {
  const treatments = clinicConfig.treatments;

  return (
    <main className="min-h-screen bg-[#08121E] text-white pt-28 pb-20">
      {/* Hero */}
      <section className="section-padding pt-12 pb-16">
        <div className="container-max text-center max-w-2xl mx-auto">
          <span className="section-label mb-3 inline-block">Complete Dental Care</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
            Treatments & Honest Pricing
          </h1>
          <p className="text-platinum/80 text-base sm:text-lg font-sans">
            Advanced dental care with gentle techniques and transparent pricing. 0% Interest EMI available on major procedures.
          </p>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => {
            const Icon = iconMap[treatment.iconName] || Sparkles;
            return (
              <div
                key={treatment.slug}
                id={treatment.slug}
                className="rounded-3xl p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400">
                      <Icon size={24} />
                    </div>
                    {treatment.startingPrice && (
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-platinum/60 block font-semibold">
                          Starting from
                        </span>
                        <span className="text-base font-bold text-teal-300">
                          ₹{treatment.startingPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  <h2 className="font-display font-semibold text-white text-2xl mb-2">
                    {treatment.title}
                  </h2>

                  {treatment.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-platinum/60 mb-4 font-medium">
                      <Clock size={13} className="text-teal-400" />
                      <span>{treatment.duration}</span>
                    </div>
                  )}

                  <p className="text-platinum/80 text-sm leading-relaxed mb-6 font-sans">
                    {treatment.description}
                  </p>

                  {/* Benefits */}
                  {treatment.benefits && treatment.benefits.length > 0 && (
                    <ul className="space-y-2 mb-6 pt-4 border-t border-white/10">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-platinum/90">
                          <Check size={14} className="text-teal-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                  <Link
                    href={`/book?service=${encodeURIComponent(treatment.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Calendar size={14} />
                    <span>Book {treatment.title.split(" ")[0]} Consultation</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 border border-white/15 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold font-display text-white mb-2">
            Not sure which treatment you need?
          </h3>
          <p className="text-sm text-platinum/80 mb-6">
            Visit our clinic for an initial checkup and digital X-ray. Our senior dentists will inspect your oral health and guide you with honest advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all"
            >
              <Calendar size={15} />
              <span>Book Checkup Appointment</span>
            </Link>
            <a
              href={`https://wa.me/${clinicConfig.whatsappNumber}?text=Hello%20doctor%2C%20I%20need%20advice%20on%20which%20dental%20treatment%20is%20right%20for%20me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all"
            >
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
