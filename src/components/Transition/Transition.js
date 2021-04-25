import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const duration = 0.3;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: `beforeChildren`,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

const Layout = ({ children, location }) => (
  <AnimatePresence>
    <motion.main key={location.pathname} variants={variants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  </AnimatePresence>
);

export default Layout;
