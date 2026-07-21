import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  delay?: number;
}

export default function ServiceCard({ title, description, icon: Icon, href = "/services", delay = 0 }: ServiceCardProps) {
  return (
    <div
      className="group dark-card glass-card-hover rounded-3xl p-8 flex flex-col h-full animate-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/6 border border-white/10 group-hover:bg-primary/18 flex items-center justify-center mb-6 transition-colors shadow-inner">
        <Icon size={24} className="text-sky-blue group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-white text-2xl mb-3 leading-tight">{title}</h3>
      <p className="text-platinum text-sm leading-relaxed flex-1 mb-8">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-bold text-sky-blue hover:text-white transition-colors uppercase tracking-widest mt-auto group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue/50 focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
      >
        Discover 
        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
      </Link>
    </div>
  );
}
