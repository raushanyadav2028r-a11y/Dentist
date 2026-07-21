"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ClinicSettingsProvider } from "@/contexts/ClinicSettingsContext";

// Fixed-position, animation-driven UI. Lazy-loaded so its framer-motion code
// is fetched as a separate chunk after initial hydration.
const FloatingButtons = dynamic(
  () => import("@/components/ui/FloatingButtons"),
  { ssr: true }
);

interface ClinicSettings {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  hours_weekday?: string;
  hours_saturday?: string;
  hours_sunday?: string;
}

export default function PublicChrome({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: ClinicSettings | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ClinicSettingsProvider initialSettings={initialSettings}>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer settings={initialSettings} />}
      {!isAdmin && <FloatingButtons />}
    </ClinicSettingsProvider>
  );
}
