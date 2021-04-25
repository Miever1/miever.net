import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Logo from './Logo';

storiesOf(`Logo`, module).add(`Basic`, () => {
  const label = `Sizes`;
  const options = {
    100: `100px`,
    200: `200px`,
    300: `300px`,
  };
  const defaultValue = `300px`;

  const value = select(label, options, defaultValue);
  return (
    <>
      <Logo width={value}></Logo>
    </>
  );
});
