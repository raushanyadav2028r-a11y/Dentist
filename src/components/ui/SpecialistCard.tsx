"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SpecialistCardProps {
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  delay?: number;
}

export default function SpecialistCard({
  name,
  role,
  specialty,
  image,
  bio,
  delay = 0,
}: SpecialistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group dark-card glass-card-hover rounded-3xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Half */}
        <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Content Half */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-navy-light/70">
          <div className="inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-sky-blue text-xs font-bold uppercase tracking-[0.15em] mb-4 w-fit">
            {specialty}
          </div>
          <h3 className="font-display text-3xl font-semibold text-white mb-2">{name}</h3>
          <p className="text-electric-blue font-medium mb-6">{role}</p>
          <div className="w-12 h-px bg-white/20 mb-6"></div>
          <p className="text-platinum text-sm leading-relaxed mb-8">
            {bio}
          </p>
          <button className="text-white text-sm font-bold uppercase tracking-widest hover:text-sky-blue transition-colors w-fit flex items-center gap-2 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue/50 focus-visible:ring-offset-4 focus-visible:ring-offset-navy">
            Read Profile
            <svg className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
