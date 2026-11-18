import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  startingPrice?: number;
  duration?: string;
  href?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  startingPrice,
  duration,
  href = "/services",
  delay = 0,
}: ServiceCardProps) {
  return (
    <div
      className="group rounded-3xl p-7 flex flex-col h-full bg-white/[0.04] border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.07] transition-all duration-300 animate-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-13 h-13 rounded-2xl bg-teal-500/15 border border-teal-500/25 group-hover:bg-teal-500/25 flex items-center justify-center transition-colors shadow-inner">
          <Icon size={24} className="text-teal-400 group-hover:scale-105 transition-transform" />
        </div>
        {startingPrice ? (
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-platinum/60 block font-semibold">
              Starting from
            </span>
            <span className="text-sm font-bold text-teal-300">
              ₹{startingPrice.toLocaleString("en-IN")}
            </span>
          </div>
        ) : null}
      </div>

      <h3 className="font-display font-semibold text-white text-xl sm:text-2xl mb-2 leading-tight">
        {title}
      </h3>

      {duration && (
        <span className="text-xs text-platinum/60 mb-3 block font-medium">
          ⏱ {duration}
        </span>
      )}

      <p className="text-platinum/80 text-sm leading-relaxed flex-1 mb-6 font-sans">
        {description}
      </p>

      <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors uppercase tracking-wider group/btn"
        >
          <span>View Details</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
        <Link
          href={`/book?service=${encodeURIComponent(title)}`}
          className="text-xs bg-white/10 hover:bg-teal-600 text-white font-semibold px-3 py-1.5 rounded-full transition-all"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
