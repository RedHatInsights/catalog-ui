import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@patternfly/react-icons';
import { ToolbarItem, TextInput } from '@patternfly/react-core';

const FilterToolbarItem = ({ searchValue, onFilterChange, placeholder, id }) => (
  <ToolbarItem>
    <div className="toolbar-filter-input-group">
      <TextInput
        placeholder={ placeholder }
        value={ searchValue }
        type="text"
        onChange={ onFilterChange }
        aria-label="Find product button"
        id={ id }
      />
      <SearchIcon />
    </div>
  </ToolbarItem>
);

FilterToolbarItem.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchValue: PropTypes.string,
  id: PropTypes.string
};

FilterToolbarItem.defaultProps = {
  searchValue: ''
};

export default FilterToolbarItem;
