import React, { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { designs, Box, Modal } from "miever_ui";
import { useTranslation } from "react-i18next";

import { sortedMarkers } from "../../data/footprints-datas";

const MapChart = () => {
  const markers = sortedMarkers;
  const { BRAND_COLORS } = designs;
  const { t } = useTranslation();
  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  // Cohesive palette: brand cyan for visited, brand teal for the active spot.
  const themeColor = BRAND_COLORS.primary || "#0CC0DF";
  const activeColor = BRAND_COLORS.secondary || "#12AA9C";
  const visitedCountries = [
    "China",
    "Singapore",
    "USA",
    "Indonesia",
    "Spain",
    "Latvia",
    "Portugal",
    "France",
    "United Kingdom",
    "Slovenia",
    "Netherlands",
    "Germany",
    "Finland",
    "Sweden",
    "Estonia"
  ];

  // Map a marker's `country` value to the geo dataset's `properties.name`
  // (mostly identical; only a couple differ).
  const geoNameForCountry = (country: string): string =>
    country === "USA" ? "United States of America" : country;

  // Single source of truth: the index of the active city. Drives both the map
  // marker highlight and the selected thumbnail. Auto-advances until the user
  // interacts, then stays put.
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Preload photos once.
  useEffect(() => {
    markers.forEach((marker) => {
      const img = new window.Image();
      img.src = marker.photo;
    });
  }, [markers]);

  // Auto-rotate through cities (paused on interaction).
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % markers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, markers.length]);

  // Keep the active thumbnail centred *within the strip* by adjusting the
  // strip's own horizontal scroll. (scrollIntoView would also scroll the whole
  // page vertically, which yanked the viewport to the map on load.)
  useEffect(() => {
    const strip = stripRef.current;
    const el = itemRefs.current[activeIndex];
    if (!strip || !el) return;
    const target = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex]);

  const select = (index: number) => {
    setPaused(true);
    setActiveIndex(index);
  };

  const activeMarker = markers[activeIndex];
  const activeGeoName = geoNameForCountry(activeMarker.country);

  return (
    <Box className="footprints">
      <Box
        className="footprints-map"
        onMouseLeave={() => setHoveredCountry(null)}
      >
        <ComposableMap
          width={800}
          height={380}
          projectionConfig={{ scale: 150, center: [10, 28] }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies &&
              geographies.map((geo) => {
                const isVisited =
                  visitedCountries.includes(geo.properties.name) ||
                  geo.properties.name === "United States of America";
                const isActiveCountry = geo.properties.name === activeGeoName;
                const fill = isActiveCountry
                  ? activeColor
                  : isVisited
                    ? themeColor
                    : "var(--color-bg-disabled)";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="var(--color-border-secondary)"
                    onMouseEnter={() => setHoveredCountry(t(`${geo.properties.name}`))}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: { fill, outline: "none", transition: "fill 0.3s ease" },
                      hover: { fill: isActiveCountry ? activeColor : themeColor, outline: "none" },
                      pressed: { fill: themeColor, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates }, index) => {
            const isActive = index === activeIndex;
            return (
              <Marker
                key={name}
                coordinates={coordinates}
                onClick={() => select(index)}
                style={{ default: { cursor: "pointer" } }}
              >
                {isActive && (
                  <circle r={10} fill={activeColor} opacity={0.3} className="footprints-pulse" />
                )}
                <circle
                  r={isActive ? 5 : 3}
                  fill={isActive ? activeColor : themeColor}
                  strokeWidth={1}
                  stroke="var(--color-bg-primary)"
                  style={{ cursor: "pointer", transition: "r 0.2s ease" }}
                />
              </Marker>
            );
          })}
        </ComposableMap>

        {hoveredCountry && (
          <Box className="footprints-country-tip">
            {typeof hoveredCountry === "string"
              ? `${t(`countries.${hoveredCountry}`, hoveredCountry)}`
              : hoveredCountry}
          </Box>
        )}
      </Box>

      {/* Bottom thumbnail strip — scrollable on every device. */}
      <div className="footprints-strip" ref={stripRef}>
        {markers.map((marker, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={marker.name}
              type="button"
              ref={(el) => (itemRefs.current[index] = el)}
              className={`footprints-thumb${isActive ? " active" : ""}`}
              onClick={() => {
                select(index);
                setLightboxOpen(true);
              }}
              aria-label={`${t(`cities.${marker.name}`)} — ${marker.visitTime}`}
            >
              <span
                className="footprints-thumb-img"
                style={{ backgroundImage: `url(${marker.photo})` }}
              />
              <span className="footprints-thumb-meta">
                <span className="footprints-thumb-city">{t(`cities.${marker.name}`)}</span>
                <span className="footprints-thumb-date">{marker.visitTime}</span>
              </span>
            </button>
          );
        })}
      </div>

      <Modal
        open={lightboxOpen}
        title={`${t(`cities.${activeMarker.name}`)} · ${activeMarker.visitTime}`}
        footer={null}
        width={760}
        onClose={() => setLightboxOpen(false)}
      >
        <img
          className="footprints-lightbox-img"
          src={activeMarker.photo}
          alt={t(`cities.${activeMarker.name}`)}
        />
      </Modal>
    </Box>
  );
};

export default MapChart;
