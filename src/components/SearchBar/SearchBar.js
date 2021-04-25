import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Downshift from 'downshift';
import { navigate } from 'gatsby';
import { FaSearch } from 'react-icons/fa';
import { connectAutoComplete, connectHits } from 'react-instantsearch-dom';

import Hits from '../Hits';

const ConnectedHits = connectHits(Hits);

const StyledSearchIcon = styled(FaSearch)`
  position: absolute;
  top: 14px;
  color: ${(props) => props.theme.primary};
  ${(props) => props.theme.small} {
    top: 26px;
  }
`;

const StyledForm = styled.form`
  margin-bottom: 0px;
  display: 'flex';
  flex: '0 0 auto';
  flex-direction: 'row';
  align-items: 'center';
  padding-left: '0.25rem';
  padding-right: '0.25rem';
  ${(props) => props.theme.small} {
    justify-content: 'flex-end';
    margin-right: 10;
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: 0;
  color: var(--color-text);
  appearance: 'none';
  width: 100%;
  font-size: 18px;
  padding: 4px 4px 4px 29px;

  &:focus,
  &:active {
    border-radius: 0.25rem;
    outline: 0;
  }
  &::placeholder {
    color: ${(props) => props.theme.primary};
  }
`;

const SearchBar = ({ isSearchStalled, refine, hits }) => {
  const [inputValue, setState] = React.useState({ inputValue: `` });

  return (
    <Downshift
      itemToString={(i) => (i ? i.title : i)}
      onChange={(item) => navigate(item.fields.slug)}
      defaultHighlightedIndex={0}
      initialInputValue=""
      inputValue={inputValue.inputValue}
    >
      {({ getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, highlightedIndex, selectedItem }) => (
        <div>
          <StyledForm noValidate action="" role="search">
            <label {...getLabelProps()}>
              <StyledSearchIcon />
            </label>
            <StyledInput
              placeholder="Search blog..."
              type="search"
              aria-label="Search"
              {...getInputProps({
                onChange(e) {
                  setState({ inputValue: e.target.value });
                  refine(e.target.value);
                },
              })}
            />
            {isOpen && (
              <div>
                <ConnectedHits
                  getMenuProps={getMenuProps}
                  hits={hits}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  selectedItem={selectedItem}
                />
              </div>
            )}
            {isSearchStalled ? `My search is stalled` : ``}
          </StyledForm>
        </div>
      )}
    </Downshift>
  );
};

SearchBar.displayName = `SearchBar`;

SearchBar.propTypes = {
  currentRefinement: PropTypes.string,
  isSearchStalled: PropTypes.bool,
  refine: PropTypes.func,
};

export default connectAutoComplete(SearchBar);
