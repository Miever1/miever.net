import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { designs, Card } from "miever_ui";
import { useTranslation } from "react-i18next";

import { markers } from "../../data/footprints-datas";

type HoveredMarker = {
  name: string;
  visitTime: string;
  photo: string;
  position: { x: number; y: number };
} | null;

const MapChart = () => {
  const { BRAND_COLORS } = designs;
  const { t } = useTranslation();
  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  const themeColor = BRAND_COLORS.primary || "#000";
  const visitedCountries = ["China", "Singapore", "USA", "Indonesia", "Spain", "Latvia", "Portugal", "France", "United Kingdom"]; 

  const [hoveredMarker, setHoveredMarker] = useState<HoveredMarker>(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies && geographies.map((geo) => {
              const isVisited = visitedCountries.includes(geo.properties.name) || geo.properties.name === "United States of America";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="var(--color-border-secondary)" 
                  onMouseEnter={() => setHoveredCountry(t(`${geo.properties.name}`) || geo.properties.name)} 
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
        {markers.map(({ name, country, coordinates, visitTime, photo }) => (
          <Marker 
            key={name} 
            coordinates={coordinates}
            onMouseEnter={(e) => {
              const parentRect = e.currentTarget.closest("div")!.getBoundingClientRect();
              setHoveredMarker({
                name: `${t(`cities.${name}`)} - ${t(`countries.${country}`)}`,
                visitTime,
                photo,
                position: {
                  x: e.clientX - parentRect.left,
                  y: e.clientY - parentRect.top,
                },
              });
            }}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            <circle r={4} fill={themeColor} stroke="#fff" strokeWidth={1} />
          </Marker>
        ))}
      </ComposableMap>
      {hoveredMarker && (
        <Card
          title={t(hoveredMarker.name)}
          subTitle={hoveredMarker.visitTime}
          style={{
            position: "absolute",
            top: hoveredMarker.position.y + 32,
            left: hoveredMarker.position.x - 200,
            width: "580px",
            zIndex: 10,
          }}
        >
          <img
            src={hoveredMarker.photo}
            alt={hoveredMarker.name}
            style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
          />
        </Card>
      )}
      {hoveredCountry && (
        <div
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
        </div>
      )}
    </div>
  );
};

export default MapChart;