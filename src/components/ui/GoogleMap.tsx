"use client";

import { useState, useCallback, useRef } from "react";
import { MapPin, Navigation, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import clinicConfig from "@/config/clinic";

export const CLINIC_ADDRESS = clinicConfig.fullAddress;
export const CLINIC_QUERY = encodeURIComponent(`${clinicConfig.clinicName} ${clinicConfig.area} ${clinicConfig.city}`);
export const CLINIC_NAME = clinicConfig.clinicName;
export const DIRECTIONS_URL = clinicConfig.googleMapsLink;

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
  height = "h-[300px] md:h-[400px]",
  className = "",
  showInfoCard = true,
  clinicName = clinicConfig.clinicName,
  alwaysVisible = true,
}: GoogleMapProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(alwaysVisible);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const embedSrc = clinicConfig.googleMapsEmbedUrl ||
    `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568!2d73.8052!3d18.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzEyLjIiTiA3M8KwNDgnMTguNyJF!5e0!3m2!1sen!2sin!4v1700000000000`;

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  const loadMap = useCallback(() => {
    if (!shouldLoadMap) {
      setShouldLoadMap(true);
    }
  }, [shouldLoadMap]);

  const mapContent = (
    <div
      className={`relative w-full ${height} rounded-2xl overflow-hidden shadow-lg group ${className}`}
      ref={mapContainerRef}
    >
      {!shouldLoadMap && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-3 z-10 rounded-2xl cursor-pointer"
          onClick={loadMap}
        >
          <MapPin size={48} className="text-teal-400/50" />
          <span className="text-sm text-white/80 font-medium">Click to load interactive map</span>
          <span className="text-xs text-white/40">Tap to view exact clinic location</span>
        </div>
      )}

      {shouldLoadMap && !loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-3 z-10 rounded-2xl">
          <Loader2 size={28} className="text-teal-400 animate-spin" />
          <span className="text-xs text-white/60 font-medium">Loading Google Map...</span>
        </div>
      )}

      {shouldLoadMap && (
        <iframe
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${clinicName} Location Map`}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${
            loaded && !error ? "opacity-100" : "opacity-0 absolute"
          }`}
        />
      )}

      {showInfoCard && !error && shouldLoadMap && loaded && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none">
          <div className="pointer-events-auto flex items-center justify-between">
            <span className="text-xs text-white/90 font-medium hidden sm:inline-block">
              {clinicConfig.area}, {clinicConfig.city}
            </span>
            <a
              href={clinicConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md ml-auto"
            >
              <Navigation size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>
      )}

      {error && shouldLoadMap && (
        <div className="absolute inset-0 bg-slate-900/95 z-[2] rounded-2xl flex flex-col items-center justify-center gap-3 p-6 text-center">
          <AlertCircle size={32} className="text-amber-400" />
          <p className="text-white/80 text-sm max-w-xs">
            {clinicConfig.fullAddress}
          </p>
          <a
            href={clinicConfig.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-600 text-white text-xs font-bold shadow-md"
          >
            <Navigation size={14} />
            Directions in Google Maps
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
          className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-800 border border-white/10 text-white text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-teal-400" />
            View Clinic Map & Directions
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileOpen && <div className="mt-3">{mapContent}</div>}
      </div>
    </>
  );
}
