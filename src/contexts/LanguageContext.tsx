"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import clinicConfig from "@/config/clinic";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import gu from "@/locales/gu.json";
import mr from "@/locales/mr.json";

export type SupportedLanguage = "en" | "hi" | "gu" | "mr";

const translations: Record<SupportedLanguage, Record<string, any>> = {
  en,
  hi,
  gu,
  mr,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string, fallback?: string) => string;
  enabledLanguages: SupportedLanguage[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: (clinicConfig.languages?.defaultLanguage as SupportedLanguage) || "en",
  setLanguage: () => {},
  t: (path: string, fallback?: string) => fallback || path,
  enabledLanguages: (clinicConfig.languages?.enabled as SupportedLanguage[]) || ["en", "hi"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const defaultLang = (clinicConfig.languages?.defaultLanguage as SupportedLanguage) || "en";
  const enabled = (clinicConfig.languages?.enabled as SupportedLanguage[]) || ["en", "hi"];

  const [language, setLanguageState] = useState<SupportedLanguage>(defaultLang);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("clinic_language") as SupportedLanguage;
      if (stored && enabled.includes(stored)) {
        setLanguageState(stored);
      }
    } catch {
      // LocalStorage access restricted / SSR
    }
  }, [enabled]);

  const setLanguage = (lang: SupportedLanguage) => {
    if (enabled.includes(lang)) {
      setLanguageState(lang);
      try {
        localStorage.setItem("clinic_language", lang);
      } catch {
        // Ignore
      }
    }
  };

  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallbackVal: any = translations.en;
        for (const fbKey of keys) {
          if (fallbackVal && typeof fallbackVal === "object" && fbKey in fallbackVal) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackVal === "string" ? fallbackVal : fallback || path;
      }
    }

    return typeof current === "string" ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, enabledLanguages: enabled }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
