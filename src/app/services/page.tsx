import type { Metadata } from "next";
import Link from "next/link";
import {
  Smile, AlignCenter, Landmark, Sparkles, Scissors,
  Star, Zap, Shield, Baby, Heart, Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getAllServices } from "@/lib/public-data";

// Static + ISR. Admin edits call revalidatePath('/services') to refresh.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dental Services | Celestia Smiles – Full Treatment Range",
  description: "Explore all dental services at Celestia Smiles: cosmetic dentistry, orthodontics, implants, whitening, root canals, emergency care and more.",
};

// Icon name → Lucide component mapping
const iconMap: Record<string, LucideIcon> = {
  Smile, AlignCenter, Landmark, Sparkles, Scissors,
  Star, Zap, Shield, Baby, Heart, Check,
};

// Fallback hardcoded data (used if DB returns empty)
const fallbackServices = [
  {
    id: "aesthetic-dentistry",
    slug: "aesthetic-dentistry",
    icon: "Smile",
    title: "Aesthetic Dentistry",
    tagline: "Beauty through precision.",
    description: "Cosmetic bonding, contouring and advanced smile design tailored to your facial geometry.",
    benefits: ["Natural-looking results", "Minimal tooth preparation", "Single-visit options", "Long-lasting materials"],
    duration: "1–3 visits",
    aftercare: "Regular polishing every 6 months. Avoid hard or staining foods for 48 hours.",
  },
];

export default async function ServicesPage() {
  const { data: dbServices } = await getAllServices();
  const services = (dbServices && dbServices.length > 0) ? dbServices : fallbackServices;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section data-theme="dark" className="section-padding bg-gradient-to-b from-navy via-navy to-surface-dim pt-28">
        <div className="container-max text-center">
          <span className="section-label mb-4 inline-block">Our Services</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
            Expert care for<br />every smile
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            A full spectrum of dental treatments — each tailored to elevate your health, confidence, and natural beauty.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s: Record<string, unknown>) => {
              const Icon = iconMap[s.icon as string] || Sparkles;
              const benefits = (s.benefits as string[]) || [];
              return (
                <div
                  key={s.id as string}
                  id={(s.slug as string) || (s.id as string)}
                  className="group premium-card premium-card-hover rounded-3xl overflow-hidden scroll-mt-28"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-surface-card border border-border group-hover:bg-sky-blue/25 flex items-center justify-center shrink-0 transition-colors">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <h2 className="font-bold text-navy text-2xl mb-1">{s.title as string}</h2>
                        {s.tagline ? <p className="text-primary text-sm font-semibold italic">{s.tagline as string}</p> : null}
                      </div>
                    </div>
                    {s.description ? <p className="text-navy/60 text-base leading-relaxed mb-6">{s.description as string}</p> : null}

                    {benefits.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {benefits.map((b) => (
                          <div key={b} className="flex items-start gap-2 text-sm text-navy/70">
                            <Check size={15} className="text-primary mt-0.5 shrink-0" />
                            {b}
                          </div>
                        ))}
                      </div>
                    )}

                    {s.duration ? (
                      <div className="flex items-center gap-6 py-4 border-t border-border mb-5">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-0.5">Duration</div>
                          <div className="text-sm font-bold text-navy">{s.duration as string}</div>
                        </div>
                      </div>
                    ) : null}

                    {s.aftercare ? (
                      <div className="bg-surface-dim rounded-2xl p-4 mb-6 border border-border">
                        <div className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-1">Aftercare</div>
                        <p className="text-navy/60 text-xs leading-relaxed">{s.aftercare as string}</p>
                      </div>
                    ) : null}

                    <Link href="/book" className="btn-primary w-full text-center py-3.5 rounded-2xl block text-sm">
                      Book Consultation
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="section-padding bg-navy text-white text-center">
        <div className="container-max max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/60 mb-8 text-lg">Book a free consultation and let our experts guide you to the perfect treatment.</p>
          <Link href="/book" className="btn-inverse">
            Book Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
