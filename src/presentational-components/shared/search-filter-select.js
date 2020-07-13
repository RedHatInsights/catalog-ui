import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InternalSelect } from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';
import asyncFormValidator from '../../utilities/async-form-validator';

const SearchFilterSelect = ({ onChange, input, ...props }) => {
  const [stateValue, setValue] = useState(undefined);
  return (
    <div
      key="search-filter-select"
      id="search-filter-select"
      className="search-filter-select"
    >
      <InternalSelect
        isDisabled={!props.options || props.options.length === 0}
        isSearchable
        isClearable
        name="filter-select"
        onChange={(value) => {
          onChange(value || stateValue);
          setValue(value || stateValue);
        }}
        input={input}
        value={stateValue}
        {...props}
      />
    </div>
  );
};

SearchFilterSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  input: PropTypes.string,
  loadOptions: PropTypes.func.isRequired
};

export default SearchFilterSelect;
