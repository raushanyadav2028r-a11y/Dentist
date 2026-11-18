import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Handshake, Heart, Microscope, Sparkles, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Celestia Smiles – Premium Dental Clinic",
  description: "Learn about Celestia Smiles — our mission, our story, and our patient-first philosophy. 15+ years of premium dental excellence.",
};

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Precision", desc: "Every treatment plan is blueprinted with clinical exactness and artistic vision." },
    { icon: Heart, title: "Empathy", desc: "We listen first. Your concerns guide our approach, every visit." },
    { icon: FileText, title: "Transparency", desc: "Full cost breakdown and treatment roadmap before we begin — always." },
    { icon: Sparkles, title: "Excellence", desc: "We never cut corners. World-class materials, world-class outcomes." },
    { icon: Microscope, title: "Innovation", desc: "Continuously updated with the latest dental technologies and techniques." },
    { icon: Handshake, title: "Partnership", desc: "We see patients as partners in their own oral health journey, not cases." },
  ];

  const timeline = [
    { year: "2009", event: "Celestia Smiles founded with a focus on minimally invasive aesthetic dentistry." },
    { year: "2012", event: "Expanded to a multidisciplinary team of board-certified cosmetic and orthodontic specialists." },
    { year: "2015", event: "Introduced low-radiation 3D cone-beam imaging and digital smile design protocols." },
    { year: "2018", event: "Opened our in-house robotic CAD/CAM ceramic studio for same-day precision restorations." },
    { year: "2021", event: "Pioneered AI-assisted facial symmetry simulation and gentle zero-pain anaesthesia." },
    { year: "2024", event: "Surpassed 5,000 custom smile transformations with a 98% patient satisfaction rating." },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section data-theme="dark" className="section-padding bg-gradient-to-b from-navy via-navy to-surface-dim pt-28 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-blue/25 blur-[80px] rounded-full pointer-events-none" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4 inline-block">Our Story</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Redefining what<br />dental care<br />
                <span className="italic font-medium text-sky-blue">can feel like.</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Founded with a single mission: to create a dental experience so exceptional that patients look forward to their visits. Today, Celestia Smiles is an acclaimed destination for bespoke cosmetic smile design and restorative excellence.
              </p>
              <Link href="/book" className="btn-primary inline-block px-8 py-4 rounded-full text-base">
                Book a Free Consultation
              </Link>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-elevated bg-gradient-to-br from-sky-blue/20 via-navy to-electric-blue/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-white/70 shadow-card">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[["15+", "Years"], ["5k+", "Smiles"], ["98%", "Satisfaction"]].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-2xl font-bold text-navy">{v}</div>
                      <div className="text-xs text-navy/50 font-semibold">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section data-theme="light" className="section-padding bg-white">
        <div className="container-max max-w-4xl mx-auto text-center">
          <span className="section-label mb-4 inline-block">Our Mission</span>
          <blockquote className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-8">
            &ldquo;Not all smiles need fixing.<br />Some need vision.&rdquo;
          </blockquote>
          <p className="text-navy/55 text-lg leading-relaxed">
            We believe every patient deserves a dental experience that is gentle, transparent, and truly transformative. Our goal isn&apos;t just healthy teeth — it&apos;s the confidence that comes from loving your smile.
          </p>
        </div>
      </section>

      {/* Values */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="text-center mb-14">
            <span className="section-label mb-3 inline-block">Our Values</span>
            <h2 className="text-4xl font-bold text-navy">What drives us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="premium-card premium-card-hover rounded-3xl p-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-card border border-border flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-navy text-xl mb-3">{v.title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="text-center mb-14">
            <span className="section-label mb-3 inline-block">Our Journey</span>
            <h2 className="text-4xl font-bold text-navy">Milestones that matter</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative border-l-2 border-border pl-8 space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md" />
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{item.year}</div>
                  <p className="text-navy/70 text-base">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="section-padding bg-navy text-white text-center">
        <div className="container-max max-w-2xl">
          <h2 className="text-4xl font-bold mb-5">Ready to become part of our story?</h2>
          <p className="text-white/60 mb-8 text-lg">Join 5,000+ patients who chose Celestia Smiles.</p>
          <Link href="/book" className="btn-inverse">
            Schedule a Free Visit
          </Link>
        </div>
      </section>
    </main>
  );
}
