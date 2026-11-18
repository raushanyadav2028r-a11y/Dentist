"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ClinicSettingsProvider, type ClinicSettings } from "@/contexts/ClinicSettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const FloatingButtons = dynamic(
  () => import("@/components/ui/FloatingButtons"),
  { ssr: true }
);

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
    <LanguageProvider>
      <ClinicSettingsProvider initialSettings={initialSettings}>
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer settings={initialSettings} />}
        {!isAdmin && <FloatingButtons />}
      </ClinicSettingsProvider>
    </LanguageProvider>
  );
}
