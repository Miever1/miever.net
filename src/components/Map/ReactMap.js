import React from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import Marker from './Marker';
import GeoWorldMap from '../world-50m.json';
const placesIHaveVisited = [
  {
    name: 'North America',
    coordinates: [-100.1667, 48.1667],
    visitDate: new Date('December 17, 1995 03:24:00'),
  },
  { name: 'Germany', coordinates: [10.45412, 51.45412], visitDate: new Date() },
  { name: 'New Zealand', coordinates: [174.885971, -40.90055], visitDate: new Date() },
  { name: 'Oman', coordinates: [55.923255, 21.512583], visitDate: new Date() },
  { name: 'Switzerland', coordinates: [8.227512, 46.818188], visitDate: new Date() },
  { name: 'Australia', coordinates: [133.775136, -25.274398], visitDate: new Date() },
  { name: 'Russia', coordinates: [105.3188, 61.524], visitDate: new Date() },
];

const variants = {
  start: {
    transition: { staggerChildren: 1, delayChildren: 1 },
  },
  end: {
    transition: { staggerChildren: 1 },
  },
};

const ReactMap = () => {
  const item = {
    start: { opacity: 0 },
    end: { opacity: 1 },
  };
  return (
    <>
      <ComposableMap
        width={980}
        height={551}
        style={{
          width: `100%`,
          height: `auto`,
        }}
      >
        <Geographies geography={GeoWorldMap}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    stroke: `var(--color-text)`,
                    strokeWidth: 0.5,
                    outline: `none`,
                    fill: `var(--color-background)`,
                  },
                  hover: {
                    stroke: `var(--color-text)`,
                    strokeWidth: 0.5,
                    outline: `none`,
                    fill: `var(--color-background)`,
                  },
                  pressed: {
                    stroke: `var(--color-text)`,
                    strokeWidth: 0.5,
                    outline: `none`,
                    fill: `var(--color-background)`,
                  },
                }}
              />
            ))
          }
        </Geographies>
        <motion.g variants={variants} initial={'start'} animate={'end'}>
          {placesIHaveVisited.map(({ name, coordinates, markerOffset }) => (
            <Marker
              key={name}
              coordinates={coordinates}
              markerOffset={markerOffset}
              name={name}
              variants={item}
            ></Marker>
          ))}
        </motion.g>
      </ComposableMap>
    </>
  );
};

export default ReactMap;
