import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading, { APPEARANCES } from './Heading';

storiesOf(`Heading`, module).add(`Basic`, () => (
  <>
    <Heading appearance={APPEARANCES.H1}> Heading H1 </Heading>
    <Heading appearance={APPEARANCES.H2}> Heading H2 </Heading>
    <Heading appearance={APPEARANCES.H3}> Heading H3 </Heading>
    <Heading appearance={APPEARANCES.H4}> Heading H4 </Heading>
    <Heading appearance={APPEARANCES.H5}> Heading H4 </Heading>
    <Heading appearance={APPEARANCES.H6}> Heading H4 </Heading>
  </>
));
