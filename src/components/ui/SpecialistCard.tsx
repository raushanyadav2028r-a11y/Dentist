import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Calendar, ArrowRight } from "lucide-react";

interface SpecialistCardProps {
  name: string;
  role?: string;
  qualification?: string;
  specialty?: string;
  experienceYears?: number;
  regNo?: string;
  image?: string;
  bio: string;
  delay?: number;
}

export default function SpecialistCard({
  name,
  role,
  qualification,
  specialty,
  experienceYears,
  regNo,
  image,
  bio,
  delay = 0,
}: SpecialistCardProps) {
  const resolvedImage =
    image && !image.includes("dentist.png")
      ? image
      : image?.includes("female") || /elena|sophia|neha|priya|anita|pooja/i.test(name)
      ? "/stitch_female_doctor.webp"
      : "/stitch_male_doctor.webp";

  return (
    <div
      className="group rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all duration-300 animate-in flex flex-col sm:flex-row h-full"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Doctor Image */}
      <div className="sm:w-2/5 relative h-72 sm:h-auto overflow-hidden bg-slate-900 shrink-0">
        <Image
          src={resolvedImage}
          alt={name}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent sm:hidden" />
        {experienceYears && (
          <div className="absolute bottom-3 left-3 bg-teal-900/90 backdrop-blur-sm border border-teal-500/30 text-teal-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Award size={13} className="text-teal-400" />
            <span>{experienceYears}+ Years Exp.</span>
          </div>
        )}
      </div>

      {/* Doctor Details */}
      <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Specialty Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            {specialty || role || "Dental Surgeon"}
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-1">
            {name}
          </h3>

          {qualification && (
            <p className="text-xs font-semibold text-teal-300 mb-2">
              {qualification}
            </p>
          )}

          {regNo && (
            <div className="flex items-center gap-1.5 text-[11px] text-platinum/60 font-mono mb-4">
              <ShieldCheck size={13} className="text-teal-400" />
              <span>Reg: {regNo}</span>
            </div>
          )}

          <p className="text-platinum/80 text-sm leading-relaxed mb-6 font-sans">
            {bio}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <Link
            href={`/book?doctor=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-teal-300 transition-colors group/btn"
          >
            <Calendar size={14} />
            <span>Book Consultation</span>
            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
