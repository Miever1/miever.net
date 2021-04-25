import React from 'react';
import { storiesOf } from '@storybook/react';
import Hits from './Hits';

const exampleItems = [
  {
    objectID: `1`,
    frontmatter: {
      title: ` Favorite Visual Studio Code extensions`,
    },
  },
  {
    objectID: `2`,
    frontmatter: {
      title: ` Favorite Visual Studio Code extensions`,
    },
  },
  {
    objectID: `3`,
    frontmatter: {
      title: ` Favorite Visual Studio Code extensions`,
    },
  },
];

storiesOf(`Hits`, module).add(`Basic`, () => (
  <Hits hits={exampleItems} getMenuProps={() => {}} getItemProps={() => {}} />
));
