"use client";

import { ShieldCheck, Scan, ReceiptText, HeartPulse } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: t("whyUs.sterilizationTitle", "100% Autoclave Sterilization"),
      description: t(
        "whyUs.sterilizationDesc",
        "4-step hospital-grade sterilization with single-use disposable kits for complete hygiene and patient safety."
      ),
    },
    {
      icon: Scan,
      title: t("whyUs.technologyTitle", "Modern Diagnostic Equipment"),
      description: t(
        "whyUs.technologyDesc",
        "Low-radiation digital X-rays and intra-oral cameras to show you exact dental conditions with total transparency."
      ),
    },
    {
      icon: ReceiptText,
      title: t("whyUs.transparentTitle", "Honest & Transparent Pricing"),
      description: t(
        "whyUs.transparentDesc",
        "No hidden charges. Clear, printed treatment estimates shared and discussed before any procedure begins."
      ),
    },
    {
      icon: HeartPulse,
      title: t("whyUs.gentleTitle", "Gentle & Caring Approach"),
      description: t(
        "whyUs.gentleDesc",
        "We prioritize your comfort with modern rotary instruments and gentle local anesthesia for a smooth experience."
      ),
    },
  ];

  return (
    <section className="section-padding bg-[#07101B] relative overflow-hidden text-white border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-label mb-3 inline-block">
            {t("whyUs.sectionLabel", "Why Families Trust Us")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t("whyUs.heading", "Safe, Hygienic & Patient-First Care")}
          </h2>
          <p className="text-platinum/80 text-base sm:text-lg">
            {t(
              "whyUs.subheading",
              "We follow strict Dental Council of India hygiene protocols to ensure a safe, peaceful dental visit."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6 sm:p-7 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon size={26} className="text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-platinum/75 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
