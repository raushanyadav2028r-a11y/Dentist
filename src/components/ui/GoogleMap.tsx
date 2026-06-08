"use client";

import { useState, useCallback } from "react";
import { MapPin, Navigation, Loader2, AlertCircle, ChevronDown } from "lucide-react";

export const CLINIC_ADDRESS = "422 Serenity Avenue, Suite 900, New Delhi, 110001, India";
export const CLINIC_QUERY = "Celestia+Smiles+Dental+Clinic+New+Delhi";
export const CLINIC_NAME = "Celestia Smiles";
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC_ADDRESS)}`;

const DARK_STYLE_PARAMS = [
  "style=feature:all|element:geometry|color:0x0d1b2a",
  "style=feature:all|element:labels.text.fill|color:0xf8fafc",
  "style=feature:all|element:labels.text.stroke|color:0x0b1220",
  "style=feature:water|element:geometry|color:0x0b1a2e",
  "style=feature:road|element:geometry|color:0x1a2d4a",
  "style=feature:road|element:labels.text.fill|color:0x94a3b8",
  "style=feature:road.arterial|element:geometry|color:0x1e3a5a",
  "style=feature:road.highway|element:geometry|color:0x1e3a5a",
  "style=feature:poi|element:geometry|color:0x0d1b2a",
  "style=feature:poi|element:labels.text.fill|color:0x64748b",
  "style=feature:transit|element:geometry|color:0x0d1b2a",
  "style=feature:administrative|element:geometry|color:0x0d1b2a",
  "style=feature:administrative|element:labels.text.fill|color:0x94a3b8",
].join("&");

interface GoogleMapProps {
  query?: string;
  height?: string;
  className?: string;
  showInfoCard?: boolean;
  clinicName?: string;
  zoom?: number;
  alwaysVisible?: boolean;
}

export default function GoogleMap({
  query = CLINIC_QUERY,
  height = "h-[300px] md:h-[400px]",
  className = "",
  showInfoCard = true,
  clinicName = CLINIC_NAME,
  zoom = 15,
  alwaysVisible = false,
}: GoogleMapProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=${zoom}&${DARK_STYLE_PARAMS}`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6771!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1`;

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => { setError(true); setLoaded(true); }, []);

  const mapContent = (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden shadow-lg group ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy gap-3 z-10 rounded-2xl">
          <Loader2 size={28} className="text-sky-blue animate-spin" />
          <span className="text-xs text-white/50 font-medium">Loading map...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy gap-3 z-10 rounded-2xl">
          <AlertCircle size={28} className="text-amber-400" />
          <span className="text-sm text-white/70 font-medium">Map unavailable</span>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark text-xs px-4 py-2"
          >
            Open in Google Maps
          </a>
        </div>
      )}

      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, filter: error ? "none" : undefined }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${clinicName} Location`}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${loaded && !error ? "opacity-100" : "opacity-0 absolute"}`}
      />

      <div className="absolute inset-0 pointer-events-none z-[1] rounded-2xl ring-1 ring-white/5" />

      {showInfoCard && !error && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent pointer-events-none">
          <div className="pointer-events-auto">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/90 backdrop-blur-sm text-white text-xs font-bold hover:bg-primary transition-all shadow-lg"
            >
              <Navigation size={14} />
              Get Directions
            </a>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-navy/95 z-[2] rounded-2xl flex flex-col items-center justify-center gap-3 p-6">
          <AlertCircle size={32} className="text-amber-400" />
          <p className="text-white/70 text-sm text-center max-w-xs">
            Could not load the map. Click below to open it in Google Maps.
          </p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-5 py-2.5"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );

  if (alwaysVisible) {
    return mapContent;
  }

  return (
    <>
      <div className="hidden md:block">{mapContent}</div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-surface-card border border-border text-navy text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            View Clinic Location
          </span>
          <ChevronDown size={16} className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && <div className="mt-3">{mapContent}</div>}
      </div>
    </>
  );
}
