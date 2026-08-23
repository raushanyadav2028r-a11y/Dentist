"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/components/home/HomeView";

const fallbackFaqs: FaqItem[] = [
  { id: "f1", q: "Does the treatment involve any discomfort?", a: "We use the latest techniques including computer-guided anesthesia and laser dentistry to make treatments virtually painless." },
  { id: "f2", q: "How long does laser whitening last?", a: "Professional whitening results typically last 1–3 years depending on diet and lifestyle." },
  { id: "f3", q: "Do you offer emergency appointments?", a: "Yes. We reserve dedicated slots daily for clients requiring immediate attention." },
];

export default function FAQSection({ faqs = fallbackFaqs }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section data-theme="dark" className="section-padding bg-navy border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-electric-blue/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-block">Common Inquiries</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-platinum text-lg">
              Clarity precedes confidence. Here are the answers to our most common inquiries.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`dark-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-sky-blue/30 bg-white/[0.09]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue/50 focus-visible:ring-inset"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-display font-semibold text-white pr-4 text-lg md:text-xl">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      openIndex === i ? "bg-primary border-primary text-white" : "border-white/20 text-sky-blue"
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-platinum leading-relaxed border-t border-white/10 pt-4 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
