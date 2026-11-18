"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clinicConfig, { type BeforeAfterItem } from "@/config/clinic";
import { useTranslation } from "@/contexts/LanguageContext";

const imageSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

function SliderCard({ item }: { item: BeforeAfterItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const clippedWidth = Math.max(sliderPos, 1);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setSliderPos(pos);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updateSlider(e.clientX);
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };
  const onTouchStart = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setSliderPos((pos) => Math.max(pos - 5, 0));
    if (e.key === "ArrowRight") setSliderPos((pos) => Math.min(pos + 5, 100));
  };

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-lg"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`${item.title} before and after comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
      >
        {/* After image (full) */}
        <div className="absolute inset-0">
          <Image
            src={item.afterImage}
            alt="After treatment"
            fill
            sizes={imageSizes}
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          <span className="absolute top-3 right-3 bg-teal-900/80 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            AFTER
          </span>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0" style={{ width: `${10000 / clippedWidth}%` }}>
            <Image
              src={item.beforeImage}
              alt="Before treatment"
              fill
              sizes={imageSizes}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          <span className="absolute top-3 left-3 bg-slate-800/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            BEFORE
          </span>
        </div>

        {/* Drag line & handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-teal-600 shadow-lg flex items-center justify-center border border-white/30 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 18l-6-6 6-6M16 18l6-6-6-6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center px-2">
        <h4 className="font-display font-semibold text-white text-lg mb-1 leading-snug">
          {item.title}
        </h4>
        {item.duration && (
          <p className="text-xs text-teal-400/90 font-medium">{item.duration}</p>
        )}
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const { t } = useTranslation();
  const cases = clinicConfig.beforeAfter;

  // If before/after items are empty, hide section completely
  if (!cases || cases.length === 0) {
    return null;
  }

  const hasPlaceholders = cases.some((c) => c.isPlaceholder);

  return (
    <section className="section-padding bg-[#091424] overflow-hidden relative border-t border-white/5 text-white">
      <div className="container-max relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="section-label">
              {t("beforeAfter.sectionLabel", "Real Results")}
            </span>
            {hasPlaceholders && clinicConfig.showDemoBadge && (
              <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                {t("beforeAfter.sampleBadge", "Sample Clinical Gallery")}
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            {t("beforeAfter.heading", "Smile Transformations")}
          </h2>
          <p className="text-platinum/80 text-base sm:text-lg">
            {t(
              "beforeAfter.subheading",
              "Drag the slider horizontally to view the before and after results of our dental treatments."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SliderCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
