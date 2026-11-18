import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";

interface FooterSettings {
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  clinic_name?: string | null;
}

const footerLinks = {
  treatments: [
    { label: "Smile Makeover", href: "/services#smile-makeover" },
    { label: "Dental Implants", href: "/services#implants" },
    { label: "Invisalign / Aligners", href: "/services#orthodontics" },
    { label: "Teeth Whitening", href: "/services#whitening" },
    { label: "Porcelain Veneers", href: "/services#aesthetic-dentistry" },
  ],
  clinic: [
    { label: "Our Story", href: "/about" },
    { label: "The Specialists", href: "/specialists" },
    { label: "Patient Transformations", href: "/testimonials" },
    { label: "Book Appointment", href: "/book" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer({ settings }: { settings?: FooterSettings | null }) {
  const phone = settings?.phone || "+1 888 235 3784";
  const whatsapp = settings?.whatsapp || "918882353784";

  return (
    <footer className="bg-navy border-t border-white/5 pt-20 pb-28 md:pb-10">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Celestia <span className="text-sky-blue font-medium">Smiles</span>
              </span>
            </Link>
            <p className="text-platinum text-sm leading-relaxed mb-6">
              Experience the future of aesthetic dentistry. World-class expertise delivered in an environment of absolute serenity.
            </p>
            <Link href="/book" className="btn-primary text-sm py-2.5 px-5 inline-block">
              Book Consultation
            </Link>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-6">Treatments</h4>
            <ul className="space-y-4">
              {footerLinks.treatments.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-platinum hover:text-white transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-6">Clinic</h4>
            <ul className="space-y-4">
              {footerLinks.clinic.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-platinum hover:text-white transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-6">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-platinum text-sm">
                <MapPin size={18} className="text-sky-blue shrink-0 mt-0.5" />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    settings?.address
                      ? [settings.address, settings.city, settings.country].filter(Boolean).join(", ")
                      : "422 Serenity Avenue, Suite 900, Beverly Hills, CA 90210"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings?.address || "422 Serenity Avenue, Suite 900"}<br />
                  {settings?.city ? `${settings.city}${settings?.country ? `, ${settings.country}` : ""}` : "Beverly Hills, CA 90210"}
                </a>
              </li>
              <li className="flex items-center gap-4 text-platinum text-sm">
                <Phone size={18} className="text-sky-blue shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-4 text-platinum text-sm">
                <MessageCircle size={18} className="text-sky-blue shrink-0" />
                <a href={`https://wa.me/${whatsapp.replace(/\D/g,"")}`} className="hover:text-white transition-colors">WhatsApp Chat</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-platinum/50 text-sm">
            © {new Date().getFullYear()} Celestia Smiles. Est. 2009. All rights reserved.
          </p>
          <Link href="/contact" className="text-platinum/50 hover:text-white/80 transition-colors text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
