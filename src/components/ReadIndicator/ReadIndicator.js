import React from 'react';
import { motion, useViewportScroll } from 'framer-motion';

const ReadIndicator = () => {
  const { scrollYProgress } = useViewportScroll();

  return <motion.path d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0" style={{ pathLength: scrollYProgress }} />;
};

export default ReadIndicator;
