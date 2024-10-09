import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const MapChart = () => {
  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  const markers = [
    { markerOffset: -20, name: "Yangzhou", country: "China", coordinates: [119.4229, 32.3932] },
    { markerOffset: -20, name: "Putian", country: "China", coordinates: [119.0095, 25.4332] },
    { markerOffset: -20, name: "Yiwu", country: "China", coordinates: [120.0758, 29.3062] },
    { markerOffset: -20, name: "Suzhou", country: "China", coordinates: [120.5853, 31.2989] },
    { markerOffset: -20, name: "Hong Kong", country: "China", coordinates: [114.1694, 22.3193] },
    { markerOffset: -20, name: "Harbin", country: "China", coordinates: [126.6424, 45.7564] },
    { markerOffset: -20, name: "Yili", country: "China", coordinates: [81.3015, 43.9626] },
    { markerOffset: -20, name: "Shenyang", country: "China", coordinates: [123.4291, 41.7968] },
    { markerOffset: -20, name: "Ningbo", country: "China", coordinates: [121.5503, 29.8683] },
    { markerOffset: -20, name: "Guangzhou", country: "China", coordinates: [113.2644, 23.1291] },
    { markerOffset: -20, name: "Bortala", country: "China", coordinates: [82.0745, 44.9054] },
    { markerOffset: -20, name: "Zhenjiang", country: "China", coordinates: [119.4529, 32.1982] },
    { markerOffset: -20, name: "Hangzhou", country: "China", coordinates: [120.1551, 30.2741] },
    { markerOffset: -20, name: "Beijing", country: "China", coordinates: [116.4074, 39.9042] },
    { markerOffset: -20, name: "Urumqi", country: "China", coordinates: [87.6168, 43.8255] },
    { markerOffset: -20, name: "Sanya", country: "China", coordinates: [109.5117, 18.2528] },
    { markerOffset: -20, name: "Wanning", country: "China", coordinates: [110.3906, 18.8882] },
    { markerOffset: -20, name: "Qionghai", country: "China", coordinates: [110.5989, 19.2454] },
    { markerOffset: -20, name: "Wenchang", country: "China", coordinates: [110.7531, 19.6112] },
    { markerOffset: -20, name: "Haikou", country: "China", coordinates: [110.1999, 20.0444] },
    { markerOffset: -20, name: "Zhoushan", country: "China", coordinates: [122.2026, 30.0369] },
    { markerOffset: -20, name: "Shanghai", country: "China", coordinates: [121.4737, 31.2304] },
    { markerOffset: -20, name: "Xi'an", country: "China", coordinates: [108.9402, 34.3416] },
    { markerOffset: -20, name: "Nanjing", country: "China", coordinates: [118.7969, 32.0603] },
    { markerOffset: -20, name: "Singapore", country: "Singapore", coordinates: [103.851959, 1.290270] },
    { markerOffset: -20, name: "Riga", country: "Latvia", coordinates: [24.1052, 56.9496] },
    { markerOffset: -20, name: "Porto", country: "Portugal", coordinates: [-8.611, 41.14961] },
    { markerOffset: -20, name: "Hawaii", country: "USA", coordinates: [-155.6659, 21.3069] }, // 夏威夷
    { markerOffset: -20, name: "Bali Island", country: "Indonesia", coordinates: [115.1889, -8.4095] },
    { markerOffset: -20, name: "Madrid", country: "Spain", coordinates: [-3.7038, 40.4168] } // 马德里
  ];

  const themeColor = "#12aa9c";
  const visitedCountries = ["China", "Singapore", "United States of America", "Portugal", "Indonesia", "Spain"]; 

  const [hoveredMarker, setHoveredMarker] = useState(null);
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
                  stroke="#ffffff" 
                  onMouseEnter={() => setHoveredCountry(geo.properties.name)} 
                  onMouseLeave={() => setHoveredCountry(null)} 
                  style={{
                    default: { fill: isVisited ? themeColor : "#D6D6DA" },
                    hover: { fill: themeColor, outline: "#FFFFFF" }, 
                    pressed: { fill: themeColor, outline: "#FFFFFF" }, 
                  }}
                />
              );
            })
          }
        </Geographies>
        {markers.map(({ name, country, coordinates, markerOffset }) => (
            <Marker 
              key={name} 
              // @ts-ignore
              coordinates={coordinates}
              // @ts-ignore
              onMouseEnter={() => setHoveredMarker(name)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              <circle r={4} fill={themeColor} stroke="#fff" strokeWidth={1} />
              {hoveredMarker === name && (
                <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "system-ui", fill: "#000", fontSize: '14px', fontWeight: 800, zIndex: 330000 }}
                >
                    {name}
                </text>
              )}
            </Marker>
        ))}
      </ComposableMap>
      {hoveredMarker && (
        <div
          style={{
            position: "absolute",
            bottom: "5vh",  
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
          {(() => {
            const foundMarker = markers.find((marker) => marker.name === hoveredMarker);
            return foundMarker ? `${hoveredMarker} - ${foundMarker.country}` : hoveredMarker;
          })()}
        </div>
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
          {hoveredCountry}
        </div>
      )}
    </div>
  );
};

export default MapChart;