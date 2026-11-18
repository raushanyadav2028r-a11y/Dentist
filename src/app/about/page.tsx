import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Heart,
  Microscope,
  Sparkles,
  Target,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  Phone,
} from "lucide-react";
import clinicConfig from "@/config/clinic";
import WhyChooseUs from "@/components/ui/WhyChooseUs";

export const metadata: Metadata = {
  title: `About Us | ${clinicConfig.clinicName} – ${clinicConfig.city}`,
  description: `Learn about ${clinicConfig.clinicName} in ${clinicConfig.area}, ${clinicConfig.city}. Dedicated team of BDS & MDS dental surgeons committed to gentle, hygienic, and affordable family dental care.`,
};

export default function AboutPage() {
  const estYear = clinicConfig.yearEstablished || 2014;
  const expYears = clinicConfig.yearsOfExperience || 12;

  const values = [
    {
      icon: ShieldCheck,
      title: "100% Hygiene & Sterilization",
      desc: "Autoclave sterilization and single-use disposable kits for each patient, ensuring zero cross-contamination.",
    },
    {
      icon: Heart,
      title: "Gentle & Compassionate Care",
      desc: "We understand dental anxiety. Our doctors listen patiently and use gentle anesthesia techniques.",
    },
    {
      icon: FileText,
      title: "Transparent & Honest Pricing",
      desc: "Clear printed estimates shared upfront before treatment begins. No hidden costs or surprise bills.",
    },
    {
      icon: Target,
      title: "Tooth Preservation First",
      desc: "Our priority is always saving your natural teeth through modern rotary root canals and restorative fillings.",
    },
    {
      icon: Microscope,
      title: "Modern Diagnostic Equipment",
      desc: "Low-radiation digital X-rays and intra-oral cameras to show you exact dental conditions clearly.",
    },
    {
      icon: Sparkles,
      title: "Family Friendly Environment",
      desc: "From toddlers getting their first dental checkup to grandparents needing comfortable dentures.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#08121E] text-white pt-28 pb-20">
      {/* Hero */}
      <section className="section-padding pt-12 pb-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="section-label mb-3 inline-block">Our Mission</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                Quality Dental Healthcare <br />
                <span className="text-teal-400">with Integrity & Warmth.</span>
              </h1>
              <p className="text-platinum/85 text-base sm:text-lg leading-relaxed mb-6 font-sans">
                Established in {estYear}, {clinicConfig.clinicName} was founded with a clear purpose: to provide the local community with modern, painless dental care at honest and affordable prices.
              </p>
              <p className="text-platinum/80 text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Our team of experienced BDS & MDS specialists combines cutting-edge dental technology with a warm, patient-first approach. We treat every patient with the same dedication and respect we would offer our own family.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href={`tel:${clinicConfig.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all"
                >
                  <Phone size={16} className="text-teal-400" />
                  <span>Call {clinicConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-8 bg-white/[0.04] border border-white/10 shadow-xl space-y-6">
                <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-4">
                  Why Families Choose Us
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-display">
                      {expYears}+
                    </div>
                    <div className="text-xs text-platinum/70 font-medium">Years Experience</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-display">
                      {clinicConfig.patientsTreated || "10,000+"}
                    </div>
                    <div className="text-xs text-platinum/70 font-medium">Patients Treated</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-display">
                      {clinicConfig.googleRating || "4.9"} ★
                    </div>
                    <div className="text-xs text-platinum/70 font-medium">Google Rating</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 mb-1 font-display">
                      100%
                    </div>
                    <div className="text-xs text-platinum/70 font-medium">Sterilized Kits</div>
                  </div>
                </div>
                <p className="text-xs text-platinum/70 italic text-center pt-2">
                  Serving {clinicConfig.area}, {clinicConfig.city} and nearby communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container-max mb-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="section-label mb-2 inline-block">Our Principles</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">
            Our Core Patient Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-3xl p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">{v.title}</h3>
                <p className="text-xs text-platinum/80 leading-relaxed font-sans">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Hygiene Section */}
      <WhyChooseUs />
    </main>
  );
}
