import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { InternalSelect } from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';
import isEqual from 'lodash/isEqual';

const SearchFilterSelect = ({ onChange, loadOptions, ...props }) => {
  const [stateValue, setValue] = useState(undefined);
  return (
    <div key="search-filter-select" id="search-filter-select" className="search-filter-select">
      <InternalSelect
        isDisabled={!props.options || props.options.length === 0}
        isSearchable
        isClearable
        name="filter-select"
        loadOptions
        onChange={(value) => {
          onChange(value || stateValue);
          setValue(value || stateValue);
        }}
        input={}
        value={stateValue}
        {...props}
      />
    </div>
  );
};

SearchFilterSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default memo(SearchFilterSelect, (prevProps, nextProps) =>
  isEqual(prevProps.options, nextProps.options)
);
