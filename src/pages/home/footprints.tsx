import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Image } from "@chakra-ui/react";
import { designs, Card, Box } from "miever_ui";
import { useTranslation } from "react-i18next";

import { sortedMarkers } from "../../data/footprints-datas";

type HoveredMarker = {
  name: string;
  country: string;
  visitTime: string;
  photo: string;
  position?: { x: number; y: number };
} | null;

const MapChart = () => {
  let markers = sortedMarkers;
  const { BRAND_COLORS } = designs;
  const { t } = useTranslation();
  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  const themeColor = BRAND_COLORS.primary || "#000";
  const visitedCountries = ["China", "Singapore", "USA", "Indonesia", "Spain", "Latvia", "Portugal", "France", "United Kingdom", "Slovenia", "Netherlands"]; 

  const [hoveredMarker, setHoveredMarker] = useState<HoveredMarker>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [autoMarkerIndex, setAutoMarkerIndex] = useState(0);
  const [pauseAutoMarker, setPauseAutoMarker] = useState(false);
  const [autoMarker, setAutoMarker] = useState<HoveredMarker | null>(null);

  useEffect(() => {
      markers.forEach(marker => {
        const img = new window.Image();
        img.src = marker.photo;
      });
  }, []);

  useEffect(() => {
    if (pauseAutoMarker) return;
    const interval = setInterval(() => {
      const nextIndex = (autoMarkerIndex + 1) % markers.length;
      const marker = markers[nextIndex];

      // Obtain the screen position
      const el = document.querySelector(`[data-marker="${marker.name}"]`);
      const mapContainer = document.querySelector(".map-container")?.getBoundingClientRect();
      const markerRect = el?.getBoundingClientRect();

      const pos = markerRect && mapContainer
        ? {
            x: markerRect.left - mapContainer.left + 20,
            y: markerRect.top - mapContainer.top + 20,
          }
        : undefined;

      setAutoMarker({
        name: marker.name,
        country: marker.country,
        visitTime: marker.visitTime,
        photo: marker.photo,
        position: pos,
      });

      setAutoMarkerIndex(nextIndex);
    }, 10000);

  return () => clearInterval(interval);
}, [autoMarkerIndex, pauseAutoMarker]);


  return (
    <Box
      className="map-container"
      style={{ position: "relative", width: "100%" }}
      onMouseEnter={() => {
        setHoveredMarker(null);
        setHoveredCountry(null);
        setAutoMarker(null);
        setPauseAutoMarker(true);
      }}
      onMouseLeave={() => {
        setPauseAutoMarker(false);
      }}
    >
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies &&
            geographies.map((geo) => {
              const isVisited = visitedCountries.includes(geo.properties.name) ||geo.properties.name === "United States of America";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="var(--color-border-secondary)"
                  onMouseEnter={() =>
                    setHoveredCountry(t(`${geo.properties.name}`))
                  }
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    default: { fill: isVisited ? themeColor : "var(--color-bg-disabled)" },
                    hover: { fill: themeColor, outline: "#FFFFFF" }, 
                    pressed: { fill: themeColor, outline: "#FFFFFF" }, 
                  }}
                />
              );
            })
          }
        </Geographies>
        {markers.map(({ name, country, coordinates, visitTime, photo }) => {
          const isActiveMarker = hoveredMarker?.name === name || autoMarker?.name === name;
          return (
            <Marker
              key={name}
              coordinates={coordinates}
              data-marker={name}
              onMouseEnter={(e) => {
                const parentRect = e.currentTarget.closest(".map-container")?.getBoundingClientRect();
                setHoveredMarker({
                  name,
                  country,
                  visitTime,
                  photo,
                  position: parentRect
                    ? {
                        x: e.clientX - parentRect.left,
                        y: e.clientY - parentRect.top,
                      }
                    : undefined,
                });
                setAutoMarker(null);
              }}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              <circle 
                r={isActiveMarker ? 6 : 3}
                fill={isActiveMarker ? BRAND_COLORS["warning"] : themeColor}
                strokeWidth={1}
                stroke="#FFF"
              />
            </Marker>
          );
        })}
      </ComposableMap>

      {(hoveredMarker || autoMarker) && (
        <Card
          title={
            t(`cities.${(hoveredMarker || autoMarker)!.name}`) +
            " - " +
            t(`countries.${(hoveredMarker || autoMarker)!.country}`)
          }
          subTitle={(hoveredMarker || autoMarker)!.visitTime}
          style={{
            position: "absolute",
            top: (hoveredMarker || autoMarker)!.position?.y ?? 50,
            left: (hoveredMarker || autoMarker)!.position?.x ?? 50,
            width: "580px",
            zIndex: 10,
          }}
        >
          <Image
            src={(hoveredMarker || autoMarker)!.photo}
            alt={(hoveredMarker || autoMarker)!.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Card>
      )}

      {hoveredCountry && (
        <Box
          style={{
            position: "absolute",
            bottom: "12vh",
            left: "2vw",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "5px 10px",
            borderRadius: "5px",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            fontFamily: "system-ui",
            fontSize: "14px",
            color: "#333",
            zIndex: 10,
          }}
        >
          {typeof hoveredCountry === "string"
            ? `${t(`countries.${hoveredCountry}`, hoveredCountry)}`
            : hoveredCountry}
        </Box>
      )}
    </Box>
  );
};

export default MapChart;