import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Highlight } from 'react-instantsearch-dom';

import Divider from '../Divider';
import Heading from '../Heading';

const StyledHits = styled.ul`
  background-color: var(--color-background);
  position: absolute;
  list-style: none;
`;

const StyledHit = styled.li`
  background-color: var(--color-background);
  padding: 0.8rem;
  letter-spacing: 0.05px;
  font-size: 18px;
  color: ${(props) => (props.highlightedIndex === props.index ? `var(--color-primary)` : `var(--color-text)`)};
  a {
    color: ${(props) => (props.highlightedIndex === props.index ? `var(--color-primary)` : `var(--color-text)`)};
  }
`;

const Hits = ({ getMenuProps, hits, getItemProps, highlightedIndex }) => {
  return (
    <StyledHits {...getMenuProps()}>
      <Heading
        appearance={`H6`}
        css={`
          margin-left: 2rem;
          margin-top: 2rem;
        `}
      >
        Blogposts
      </Heading>
      <Divider
        style={{
          backgroundColor: `black`,
        }}
      ></Divider>
      {hits.length > 0 ? (
        hits.map((hit, index) => {
          return (
            <StyledHit
              index={index}
              highlightedIndex={highlightedIndex}
              key={hit.objectID}
              {...getItemProps({
                item: hit,
                key: hit.objectID,
                index,
                style: {
                  fontWeight: highlightedIndex === index ? `bold` : `normal`,
                },
              })}
            >
              <Link to={hit.path}>
                <Highlight hit={hit} attribute="title" tagName="mark" />
              </Link>
            </StyledHit>
          );
        })
      ) : (
        <StyledHit
          key={`nothing-found`}
          {...getItemProps({
            item: `nothing-found`,
            index: 1,
          })}
        >
          😢 Sorry no search results found
        </StyledHit>
      )}
    </StyledHits>
  );
};

Hits.propTypes = {
  hits: PropTypes.array,
  getMenuProps: PropTypes.func,
  getItemProps: PropTypes.func,
  highlightedIndex: PropTypes.number,
  selectedItem: PropTypes.object,
};
export default Hits;
