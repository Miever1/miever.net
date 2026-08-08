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
    "Estonia",
    "Morocco"
  ];

  // Map a marker's `country` value to the geo dataset's `properties.name`
  // (mostly identical; only a couple differ).
  const geoNameForCountry = (country: string): string =>
    country === "USA" ? "United States of America" : country;

  // The world-atlas dataset lists Taiwan as its own geometry; treat it as part
  // of China so it shares China's highlighting instead of standing alone.
  const normalizeGeoName = (name: string): string =>
    name === "Taiwan" ? "China" : name;

  // Single source of truth: the index of the active city. Drives both the map
  // marker highlight and the selected thumbnail. Auto-advances until the user
  // interacts, then stays put.
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
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
          height={440}
          projectionConfig={{ scale: 155, center: [10, 30] }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies &&
              geographies.map((geo) => {
                const geoName = normalizeGeoName(geo.properties.name);
                const isVisited =
                  visitedCountries.includes(geoName) ||
                  geoName === "United States of America";
                const isActiveCountry = geoName === activeGeoName;
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
                    onMouseEnter={() => setHoveredCountry(t(`${geoName}`))}
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
          {/* Dots first… */}
          {markers.map(({ name, coordinates }, index) => {
            const isActive = index === activeIndex;
            const isHovered = index === hoveredMarker;
            return (
              <Marker
                key={name}
                coordinates={coordinates}
                onClick={() => select(index)}
                onMouseEnter={() => setHoveredMarker(index)}
                onMouseLeave={() => setHoveredMarker((cur) => (cur === index ? null : cur))}
                style={{ default: { cursor: "pointer" } }}
              >
                {isActive && (
                  <circle r={10} fill={activeColor} opacity={0.3} className="footprints-pulse" />
                )}
                <circle
                  r={isHovered ? 6 : isActive ? 5 : 3}
                  fill={isActive ? activeColor : themeColor}
                  strokeWidth={1.5}
                  stroke="var(--color-bg-primary)"
                  style={{ cursor: "pointer", transition: "r 0.15s ease" }}
                />
              </Marker>
            );
          })}

          {/* …then the active/hovered city labels on a top layer, so no other
              dot can cover them. */}
          {Array.from(new Set([activeIndex, hoveredMarker].filter((i): i is number => i != null && i >= 0))).map((index) => {
            const { name, coordinates } = markers[index];
            const label = t(`cities.${name}`);
            // Estimate pill width: CJK glyphs are ~12px wide, Latin ~7px.
            const labelWidth =
              Array.from(label).reduce((w, ch) => w + (ch.charCodeAt(0) > 255 ? 12 : 7), 0) + 18;
            return (
              <Marker key={`label-${index}`} coordinates={coordinates} style={{ default: { pointerEvents: "none" } }}>
                <g className="footprints-marker-label" transform="translate(0,-7)">
                  <rect
                    x={-labelWidth / 2}
                    y={-19}
                    width={labelWidth}
                    height={19}
                    rx={6}
                    fill="var(--color-surface-elevated)"
                    stroke="var(--color-border-primary)"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-5.5}
                    style={{ fontSize: 11, fontWeight: 600, fill: "var(--color-text-primary)" }}
                  >
                    {label}
                  </text>
                </g>
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
