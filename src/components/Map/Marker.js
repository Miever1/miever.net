/* eslint-disable react/display-name */
import React from 'react';
import { motion } from 'framer-motion';
import { Marker as ReactSimpleMarker } from 'react-simple-maps';

const MotionMarker = motion(ReactSimpleMarker);

const circleTransition = {
  repeatDelay: 1,
  repeat: 'Infinity',
  repeatType: 'loop',
  type: 'tween',
  ease: [0, 0.55, 0.75, 1],
};

const firstCircle = {
  duration: 3,
  delay: 0.3,
  ...circleTransition,
};

const secondCircle = {
  duration: 3,
  delay: 0.9,
  ...circleTransition,
};

const thirdCircle = {
  duration: 3,
  delay: 1.5,
  ...circleTransition,
};

const styleThinHalo = {
  width: 20,
  height: 20,
  top: 0,
  left: 0,
  border: '1px solid var(--color-text)',
  overflow: 'visible',
  borderRadius: 100,
  position: 'absolute',
};

const circleVariant = {
  start: {
    scale: 0,
    opacity: 0,
  },
  end: {
    scale: 2,
    opacity: [1, 0.9, 0.5, 0.1, 0],
  },
};

const containerVariant = {
  start: { opacity: 0 },
  end: { opacity: 1 },
};

export const Marker = ({ coordinates, name, markerOffset }) => {
  return (
    <motion.g variants={containerVariant}>
      <MotionMarker coordinates={coordinates}>
        <foreignObject
          height="20"
          width="20"
          style={{
            overflow: 'visible',
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          <motion.div>
            <motion.div
              style={styleThinHalo}
              variants={circleVariant}
              initial={'start'}
              animate={'end'}
              transition={firstCircle}
            />
            <motion.div
              style={styleThinHalo}
              variants={circleVariant}
              initial={'start'}
              animate={'end'}
              transition={secondCircle}
            />
            <motion.div
              style={styleThinHalo}
              variants={circleVariant}
              initial={'start'}
              animate={'end'}
              transition={thirdCircle}
            />
          </motion.div>
        </foreignObject>
        <text textAnchor="middle" y={markerOffset} style={{ fontFamily: 'system-ui', fill: 'var(--color-text)' }}>
          {name}
        </text>
      </MotionMarker>
    </motion.g>
  );
};

export default Marker;
