import React from 'react';
import Transition from './src/components/Transition';

export const wrapPageElement = ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>;
};
