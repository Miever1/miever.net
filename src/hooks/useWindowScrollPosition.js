import React from 'react';
import { throttle } from './utils';

const useWindowScrollPosition = ({ throttleMs = 100 } = {}) => {
  const [scroll, setScroll] = React.useState({
    x: typeof window !== `undefined` && window.pageXOffset,
    y: typeof window !== `undefined` && window.pageYOffset,
  });

  const handle = throttle(() => {
    setScroll({
      x: window.pageXOffset,
      y: window.pageYOffset,
    });
  }, throttleMs);

  React.useEffect(() => {
    window.addEventListener(`scroll`, handle, { passive: true });

    return () => {
      window.removeEventListener(`scroll`, handle, { passive: true });
    };
  }, []);

  return scroll;
};

export { useWindowScrollPosition };
