"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  treatment_slug: string | null;
  treatment_label: string | null;
  rating: number;
  review_date: string | null;
  quote: string;
};

const filters = [
  { id: "all", label: "All Reviews" },
  { id: "whitening", label: "Whitening" },
  { id: "braces", label: "Aligners/Braces" },
  { id: "implants", label: "Implants" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "family", label: "Family" },
  { id: "smile-makeover", label: "Smile Makeover" },
];

export default function TestimonialsFilter({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? testimonials
    : testimonials.filter((r) => r.treatment_slug === activeFilter);

  return (
    <>
      {/* Filters */}
      <section data-theme="light" className="py-6 bg-white/92 backdrop-blur-xl border-b border-border sticky top-[72px] z-40">
        <div className="container-max">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeFilter === f.id
                    ? "bg-primary text-white shadow-[0_8px_18px_rgba(14,107,112,0.18)]"
                    : "bg-white border border-border text-navy hover:border-primary/35 hover:bg-surface-dim"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="premium-card premium-card-hover rounded-3xl p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-navy/70 italic text-base leading-relaxed mb-6 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-blue/35 flex items-center justify-center text-navy font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm">{r.name}</div>
                      <div className="text-xs text-navy/40">{r.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {r.treatment_label && <div className="text-xs font-semibold text-primary">{r.treatment_label}</div>}
                    {r.review_date && <div className="text-xs text-navy/30">{r.review_date}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-navy/40 font-semibold">
              No reviews found for this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
