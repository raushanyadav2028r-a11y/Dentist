"use client";

import { QrCode, CreditCard, Percent, FileCheck, ShieldCheck } from "lucide-react";
import clinicConfig from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";

export default function PaymentSection() {
  const { t } = useTranslation();
  const info = clinicConfig.paymentInfo;

  return (
    <section className="section-padding bg-[#07101B] border-t border-white/5 relative overflow-hidden text-white">
      <div className="container-max relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-label mb-3 inline-block">
            {t("payment.sectionLabel", "Convenient Payment Options")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t("payment.heading", "Affordable Care with Easy EMI")}
          </h2>
          <p className="text-platinum/80 text-base sm:text-lg">
            {t(
              "payment.subheading",
              "We believe quality dental healthcare should be accessible to every family with zero financial stress."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. UPI */}
          <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
              <QrCode size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              {t("payment.upiTitle", "All UPI Apps Accepted")}
            </h3>
            <p className="text-xs text-platinum/75 leading-relaxed flex-1 font-sans">
              {t(
                "payment.upiDesc",
                "Instant, contactless payments via Google Pay, PhonePe, Paytm, BHIM and QR Code scan at clinic reception."
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>GPay • PhonePe • Paytm</span>
            </div>
          </div>

          {/* 2. Cards */}
          <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              {t("payment.cardsTitle", "Debit & Credit Cards")}
            </h3>
            <p className="text-xs text-platinum/75 leading-relaxed flex-1 font-sans">
              {t(
                "payment.cardsDesc",
                "All major Visa, MasterCard, and RuPay cards accepted via secure POS terminal with zero surcharge."
              )}
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Visa • MasterCard • RuPay</span>
            </div>
          </div>

          {/* 3. EMI */}
          <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
              <Percent size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              {t("payment.emiTitle", "0% Interest EMI Available")}
            </h3>
            <p className="text-xs text-platinum/75 leading-relaxed flex-1 font-sans">
              {info.emiDetails ||
                t(
                  "payment.emiDesc",
                  "Easy monthly installment plans on credit cards & Bajaj Finserv for implants, braces, and smile makeovers."
                )}
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>No-Cost EMI Options</span>
            </div>
          </div>

          {/* 4. Insurance & Documentation */}
          <div className="rounded-3xl p-6 bg-white/[0.04] border border-white/10 hover:border-teal-500/40 transition-all flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 mb-5">
              <FileCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              {t("payment.insuranceTitle", "Insurance & Reimbursement")}
            </h3>
            <p className="text-xs text-platinum/75 leading-relaxed flex-1 font-sans">
              {info.insuranceCashless ||
                t(
                  "payment.insuranceDesc",
                  "Detailed itemized receipts, doctor certificates, and X-ray records provided for seamless mediclaim reimbursement."
                )}
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Itemized GST Bills</span>
            </div>
          </div>
        </div>

        {/* Honest Pricing Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Transparent Treatment Estimates</h4>
              <p className="text-xs text-platinum/80">
                You will receive a clear explanation and written estimate of costs before treatment starts.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${clinicConfig.whatsappNumber}?text=Hello%20doctor%2C%20what%20is%20the%20approximate%20cost%20for%20dental%20treatment%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
          >
            Get Price Estimate on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
