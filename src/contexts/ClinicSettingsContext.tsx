"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getPublicClinicSettings } from "@/actions/admin";

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

const ClinicSettingsContext = createContext<ClinicSettings | null>(null);

export function ClinicSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ClinicSettings | null>(null);

  useEffect(() => {
    getPublicClinicSettings().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <ClinicSettingsContext.Provider value={settings}>
      {children}
    </ClinicSettingsContext.Provider>
  );
}

export function useClinicSettings() {
  return useContext(ClinicSettingsContext);
}
