import type { Metadata } from "next";
import Link from "next/link";
import { Star, MessageCircle, Calendar } from "lucide-react";
import clinicConfig from "@/config/clinic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Patient Reviews & Testimonials | ${clinicConfig.clinicName}`,
  description: `Read verified patient reviews for ${clinicConfig.clinicName} in ${clinicConfig.city}. 4.9+ star rated dental clinic for painless root canals, implants, aligners and teeth cleaning.`,
};

export default function TestimonialsPage() {
  const testimonials = clinicConfig.testimonials;
  const hasPlaceholders = testimonials.some((t) => t.isPlaceholder);

  return (
    <main className="min-h-screen bg-[#08121E] text-white pt-28 pb-20">
      {/* Hero */}
      <section className="section-padding pt-12 pb-14 text-center max-w-2xl mx-auto container-max">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="section-label">Patient Feedback</span>
          {hasPlaceholders && clinicConfig.showDemoBadge && (
            <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Sample Reviews
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
          Words from Our Patients
        </h1>
        <p className="text-platinum/80 text-base sm:text-lg font-sans">
          Real feedback and experiences shared by families who trust our dental care.
        </p>

        {clinicConfig.googleRating && (
          <div className="inline-flex items-center gap-3 mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white text-sm">{clinicConfig.googleRating} / 5.0</span>
            <span className="text-platinum/60 text-xs">
              from {clinicConfig.totalReviews || 400}+ Google Reviews
            </span>
          </div>
        )}
      </section>

      {/* Testimonials Grid */}
      <section className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                      <Star key={idx} size={15} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {t.treatment && (
                    <span className="text-[11px] font-semibold text-teal-300 bg-teal-500/15 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
                      {t.treatment}
                    </span>
                  )}
                </div>

                <p className="text-platinum/90 text-sm sm:text-base leading-relaxed italic mb-6 font-sans">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-teal-600/30 text-teal-300 font-bold flex items-center justify-center text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-platinum/60">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-white/15 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold font-display text-white mb-2">
            Experience Gentle Dental Care
          </h3>
          <p className="text-sm text-platinum/80 mb-6">
            Join hundreds of satisfied local families who trust {clinicConfig.clinicName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Calendar size={15} />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`https://wa.me/${clinicConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all"
            >
              <MessageCircle size={15} fill="white" strokeWidth={0} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
