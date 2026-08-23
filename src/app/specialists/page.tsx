import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicSpecialists } from "@/lib/public-data";

// Static + ISR. Admin edits call revalidatePath('/specialists') to refresh.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Specialists | Celestia Smiles – Meet Your Dental Team",
  description: "Meet the certified dental specialists at Celestia Smiles — orthodontists, cosmetic dentists, endodontists, implant experts, and more.",
};

// Fallback data (used if DB returns empty)
const fallbackSpecialists = [
  {
    name: "Dr. Julian Hayes",
    role: "Lead Orthodontist",
    education: "BDS, MDS (Orthodontics)",
    experience: "14 years",
    specialties: ["Invisalign Provider", "Digital Orthodontics"],
    languages: "English, Hindi",
    clinic_days: "Monday, Wednesday, Friday",
    bio: "Founding specialist with a patient-first approach and artistry in smile design.",
    image_src: "/stitch_male_doctor.webp",
    gender: "male",
  },
];

export default async function SpecialistsPage() {
  const { data: dbSpecialists } = await getPublicSpecialists();
  const specialists = (dbSpecialists && dbSpecialists.length > 0) ? dbSpecialists : fallbackSpecialists;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section data-theme="dark" className="section-padding bg-gradient-to-b from-navy via-navy to-surface-dim pt-28">
        <div className="container-max text-center">
          <span className="section-label mb-4 inline-block">Our Team</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
            Meet the minds<br />behind your smile
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Board-certified specialists united by a single passion: transforming smiles and changing lives.
          </p>
        </div>
      </section>

      {/* Specialists Grid */}
      <section data-theme="light" className="section-padding bg-surface-dim">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialists.map((s: Record<string, unknown>, i: number) => {
              const name = s.name as string;
              const specialties = (s.specialties as string[]) || [];
              return (
                <div
                  key={name}
                  className="group premium-card premium-card-hover rounded-3xl overflow-hidden animate-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
{/* Photo */}
                    <div className="relative h-[280px] bg-surface-card overflow-hidden">
                      <Image
                        src={(s.image_src as string) || "/stitch_male_doctor.webp"}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="text-white font-bold text-xl">{name}</div>
                      <div className="text-sky-blue text-xs font-semibold uppercase tracking-widest mt-1">{s.role as string}</div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-7">
                    {s.bio ? <p className="text-navy/60 text-sm leading-relaxed mb-6">{s.bio as string}</p> : null}

                    <div className="space-y-3 mb-6">
                      {s.education ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-navy/35 mb-1">Education</div>
                          <div className="text-sm text-navy/70">{s.education as string}</div>
                        </div>
                      ) : null}
                      {s.experience ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-navy/35 mb-1">Experience</div>
                          <div className="text-sm text-navy/70">{s.experience as string}</div>
                        </div>
                      ) : null}
                      {s.languages ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-navy/35 mb-1">Languages</div>
                          <div className="text-sm text-navy/70">{s.languages as string}</div>
                        </div>
                      ) : null}
                      {s.clinic_days ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest text-navy/35 mb-1">Clinic Days</div>
                          <div className="text-sm text-navy/70">{s.clinic_days as string}</div>
                        </div>
                      ) : null}
                    </div>

                    {specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {specialties.map((sp) => (
                          <span
                            key={sp}
                            className="bg-surface-card text-navy text-xs font-semibold px-3 py-1.5 rounded-full border border-border"
                          >
                            {sp}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link href="/book" className="btn-primary w-full text-center py-3 rounded-2xl block text-sm">
                      Book with {name.split(" ")[0]}
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
          <h2 className="text-4xl font-bold mb-4">Ready to meet your specialist?</h2>
          <p className="text-white/60 mb-8 text-lg">Book a free consultation and let our experts create your personalized treatment plan.</p>
          <Link href="/book" className="btn-inverse">
            Book Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
