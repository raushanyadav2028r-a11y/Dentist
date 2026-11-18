"use client";

import { createContext, useContext, useState } from "react";
import clinicConfig from "@/config/clinic";

export interface ClinicSettings {
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

const defaultSettings: ClinicSettings = {
  clinic_name: clinicConfig.clinicName,
  phone: clinicConfig.phone,
  whatsapp: clinicConfig.whatsappNumber,
  email: clinicConfig.email,
  address: clinicConfig.fullAddress,
  city: clinicConfig.city,
  country: "India",
  postal_code: clinicConfig.pincode,
  hours_weekday: clinicConfig.timings.weekdays,
  hours_sunday: clinicConfig.timings.sunday,
  map_embed_url: clinicConfig.googleMapsEmbedUrl,
};

const ClinicSettingsContext = createContext<ClinicSettings>(defaultSettings);

export function ClinicSettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: ClinicSettings | null;
}) {
  const [settings] = useState<ClinicSettings>({
    ...defaultSettings,
    ...(initialSettings || {}),
  });

  return (
    <ClinicSettingsContext.Provider value={settings}>
      {children}
    </ClinicSettingsContext.Provider>
  );
}

export function useClinicSettings(): ClinicSettings {
  return useContext(ClinicSettingsContext);
}
