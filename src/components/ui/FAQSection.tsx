"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import clinicConfig, { type FaqItem } from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FAQSection({ faqs }: { faqs?: FaqItem[] }) {
  const { t } = useTranslation();
  const items = faqs && faqs.length > 0 ? faqs : clinicConfig.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-[#0B1626] border-t border-white/5 relative overflow-hidden text-white">
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-3 inline-block">
              {t("faq.sectionLabel", "Frequently Asked Questions")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              {t("faq.heading", "Frequently Asked Questions")}
            </h2>
            <p className="text-platinum/80 text-base sm:text-lg">
              {t("faq.subheading", "Clear, honest answers to help you make informed decisions about your dental care.")}
            </p>
          </div>

          <div className="space-y-3.5">
            {items.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-teal-500/40 bg-white/[0.07] shadow-lg shadow-black/20"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-white pr-4 text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      openIndex === i
                        ? "bg-teal-600 border-teal-500 text-white"
                        : "border-white/20 text-teal-400 bg-white/5"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-platinum/90 leading-relaxed border-t border-white/10 pt-4 text-sm sm:text-base font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-teal-950/40 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Have a specific tooth question?</h4>
                <p className="text-xs text-platinum/70">Chat directly with our dental team on WhatsApp.</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${clinicConfig.whatsappNumber}?text=Hello%20doctor%2C%20I%20have%20a%20question%20regarding%20dental%20treatment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
