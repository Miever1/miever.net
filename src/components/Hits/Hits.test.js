import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithTheme } from '../../../utils/jest-utils';
import Hits from './Hits';
// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

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
// todo
test(`should render a hits header tags`, () => {
  // const { container } = renderWithTheme(
  //   <Hits hits={exampleItems} highlightedIndex={1} getMenuProps={() => {}} getItemProps={() => {}}></Hits>
  // );
  expect(true).toBeTrue;
});
