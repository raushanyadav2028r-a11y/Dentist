import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Calendar, ArrowRight } from "lucide-react";
import clinicConfig from "@/config/clinic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Our Dental Doctors & Specialists | ${clinicConfig.clinicName}`,
  description: `Meet the experienced dentists at ${clinicConfig.clinicName} in ${clinicConfig.city}. Dedicated BDS and MDS specialists in root canals, implants, braces, aligners & smile design.`,
};

export default function SpecialistsPage() {
  const doctors = clinicConfig.doctors;

  return (
    <main className="min-h-screen bg-[#08121E] text-white pt-28 pb-20">
      {/* Hero */}
      <section className="section-padding pt-12 pb-14 text-center max-w-2xl mx-auto container-max">
        <span className="section-label mb-3 inline-block">Medical Team</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
          Meet Your Dental Specialists
        </h1>
        <p className="text-platinum/80 text-base sm:text-lg font-sans">
          Certified BDS and MDS doctors dedicated to saving natural teeth and providing gentle, transparent dental care for you and your family.
        </p>
      </section>

      {/* Specialists Grid */}
      <section className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {doctors.map((doctor) => {
            const resolvedImage = doctor.photo || "/stitch_male_doctor.webp";

            return (
              <div
                key={doctor.name}
                className="rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col sm:flex-row"
              >
                {/* Doctor Photo */}
                <div className="sm:w-2/5 relative h-72 sm:h-auto overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={resolvedImage}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent sm:hidden" />
                  {doctor.experienceYears && (
                    <div className="absolute bottom-3 left-3 bg-teal-900/90 backdrop-blur-sm border border-teal-500/30 text-teal-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <Award size={13} className="text-teal-400" />
                      <span>{doctor.experienceYears}+ Years Exp.</span>
                    </div>
                  )}
                </div>

                {/* Doctor Details */}
                <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
                      {doctor.specialization}
                    </div>

                    <h2 className="font-display text-2xl font-bold text-white mb-1">
                      {doctor.name}
                    </h2>

                    <p className="text-xs font-semibold text-teal-300 mb-2">
                      {doctor.qualification}
                    </p>

                    {doctor.regNo && (
                      <div className="flex items-center gap-1.5 text-[11px] text-platinum/60 font-mono mb-4">
                        <ShieldCheck size={13} className="text-teal-400" />
                        <span>Reg. No: {doctor.regNo}</span>
                      </div>
                    )}

                    <p className="text-platinum/80 text-sm leading-relaxed mb-6 font-sans">
                      {doctor.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <Link
                      href={`/book?doctor=${encodeURIComponent(doctor.name)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <Calendar size={14} />
                      <span>Consult with {doctor.name.split(" ")[1] || doctor.name}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appointment Banner */}
        <div className="p-8 rounded-3xl bg-teal-950/40 border border-teal-500/30 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold font-display text-white mb-2">
            Schedule a Consultation
          </h3>
          <p className="text-sm text-platinum/80 mb-6">
            Prior booking ensures zero wait time and dedicated attention for your dental consultation.
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
              href={`tel:${clinicConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all"
            >
              <span>Call {clinicConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
