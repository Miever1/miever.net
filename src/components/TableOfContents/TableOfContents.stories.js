import React from 'react';
import { storiesOf } from '@storybook/react';
import TableOfContents from './TableOfContents';

const items = [
  {
    url: `#exciting-stuff`,
    title: `Exciting Stuff`,
  },
  {
    url: `#what-i-have-learned-in-a-nutshell`,
    title: `What I have learned in a nutshell`,
  },
  {
    url: `#some-improvement-ideas`,
    title: `Some improvement ideas`,
  },
];
storiesOf(`TableOfContents`, module).add(`Basic`, () => {
  return <TableOfContents items={items} />;
});
