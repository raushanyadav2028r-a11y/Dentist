"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Case {
  id: number;
  label: string;
  treatment: string;
  beforeSrc: string;
  afterSrc: string;
}

const cases: Case[] = [
  {
    id: 1,
    label: "Laser Whitening",
    treatment: "Single Session Transformation",
    beforeSrc: "/transformations/teeth_whitening_before.webp",
    afterSrc: "/transformations/teeth_whitening_after.webp",
  },
  {
    id: 2,
    label: "Porcelain Veneers",
    treatment: "12 Upper Veneers + Contour",
    beforeSrc: "/transformations/veneers_before.webp",
    afterSrc: "/transformations/veneers_after.webp",
  },
  {
    id: 3,
    label: "Smile Makeover",
    treatment: "Full Arch Aesthetic Restoration",
    beforeSrc: "/transformations/smile_makeover_before.webp",
    afterSrc: "/transformations/smile_makeover_after.webp",
  },
  {
    id: 4,
    label: "Dental Implants",
    treatment: "Missing Tooth Restored",
    beforeSrc: "/transformations/implants_before.webp",
    afterSrc: "/transformations/implants_after.webp",
  },
  {
    id: 5,
    label: "Invisalign",
    treatment: "Crooked Teeth to Aligned",
    beforeSrc: "/transformations/invisalign_before.webp",
    afterSrc: "/transformations/invisalign_after.webp",
  },
];

// Generate sizes attribute for responsive images
const imageSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

function SliderCard({ c }: { c: Case }) {
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

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updateSlider(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchStart = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setSliderPos((pos) => Math.max(pos - 5, 0));
    if (e.key === "ArrowRight") setSliderPos((pos) => Math.min(pos + 5, 100));
  };

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-dark-card border border-white/10"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`${c.label} before and after comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
      >
        {/* After image (full) */}
        <div className="absolute inset-0">
          <Image src={c.afterSrc} alt="After treatment" fill sizes={imageSizes} className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          <span className="absolute top-4 right-4 bg-navy-light/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
            AFTER
          </span>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0" style={{ width: `${10000 / clippedWidth}%` }}>
            <Image src={c.beforeSrc} alt="Before treatment" fill sizes={imageSizes} className="object-cover grayscale" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
            BEFORE
          </span>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-sky-blue shadow-[0_0_10px_rgba(167,218,220,0.55)]"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary shadow-[0_12px_24px_rgba(14,107,112,0.35)] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l-6-6 6-6M15 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-display font-semibold text-white text-xl mb-1">{c.label}</div>
        <div className="text-sm text-platinum">{c.treatment}</div>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section data-theme="dark" className="section-padding bg-navy overflow-hidden relative border-y border-white/5">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-20">
          <span className="section-label mb-4 inline-block">The Art of the Reveal</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            Witness True Transformation.
          </h2>
          <p className="text-platinum max-w-lg mx-auto text-lg">
            Swipe to reveal the remarkable difference of our bespoke smile architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <SliderCard c={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
