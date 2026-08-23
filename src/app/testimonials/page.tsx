import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { getPublicTestimonials } from "@/lib/public-data";
import TestimonialsFilter from "@/components/ui/TestimonialsFilter";

// Static + ISR. Admin edits call revalidatePath('/testimonials') to refresh.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Patient Testimonials | Celestia Smiles – Real Stories, Real Smiles",
  description: "Read real patient testimonials from Celestia Smiles — smile makeovers, implants, whitening, and more.",
};

// Fallback data (used if DB returns empty)
const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Sarah M.",
    role: "CEO",
    treatment_slug: "smile-makeover",
    treatment_label: "Smile Makeover",
    rating: 5,
    review_date: "March 2024",
    quote: "I expected a dental appointment. I received a masterpiece. The attention to detail is unparalleled.",
  },
];

export default async function TestimonialsPage() {
  const { data: dbTestimonials } = await getPublicTestimonials();
  const testimonials = (dbTestimonials && dbTestimonials.length > 0) ? dbTestimonials : fallbackTestimonials;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section data-theme="dark" className="section-padding bg-navy text-white relative overflow-hidden pt-28">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 blur-[80px] rounded-full pointer-events-none" />
        <div className="container-max text-center relative z-10">
          <span className="text-sky-blue text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block">Patient Stories</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Real Stories.<br />Real Smiles.
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-lg">
            Nothing speaks louder than those who&apos;ve experienced visible transformation firsthand.
          </p>
          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 mt-8 glass-card-dark rounded-2xl px-6 py-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-white/50 text-sm">from {testimonials.length}+ reviews</span>
          </div>
        </div>
      </section>

      {/* Client-side filter + grid */}
      <TestimonialsFilter testimonials={testimonials as never} />

      {/* CTA */}
      <section data-theme="light" className="section-padding bg-surface-dim text-center">
        <div className="container-max max-w-2xl">
          <h2 className="text-4xl font-bold text-navy mb-4">Ready to write your own story?</h2>
          <p className="text-navy/55 mb-8 text-lg">Join hundreds of patients who chose Celestia Smiles.</p>
          <Link href="/book" className="btn-primary inline-block px-10 py-4 rounded-full text-base">
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
