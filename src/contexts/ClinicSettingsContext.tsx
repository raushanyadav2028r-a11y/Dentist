"use client";

import { createContext, useContext, useState } from "react";

interface ClinicSettings {
  clinic_name?: string;
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
  map_embed_url?: string;
}

const ClinicSettingsContext = createContext<ClinicSettings | null>(null);

export function ClinicSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: ClinicSettings | null;
}) {
  // Seeded from the server (see RootLayout) so clinic info is present on the
  // very first render — no client-side fetch, no flash of fallback content.
  const [settings] = useState<ClinicSettings | null>(initialSettings ?? null);

  return (
    <ClinicSettingsContext.Provider value={settings}>
      {children}
    </ClinicSettingsContext.Provider>
  );
}

export function useClinicSettings() {
  return useContext(ClinicSettingsContext);
}
