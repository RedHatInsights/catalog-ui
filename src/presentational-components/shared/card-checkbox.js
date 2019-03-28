import React from 'react';
import propTypes from 'prop-types';
import { CheckSquareIcon, OutlinedSquareIcon } from '@patternfly/react-icons';

const CardCheckbox = ({ handleCheck, isChecked, id }) => {
  const Component = isChecked ? CheckSquareIcon : OutlinedSquareIcon;
  return (
    <div style={ { float: 'right' } }>
      <Component
        className={ `icon-checkbox ${isChecked ? 'selected' : ''}` }
        onClick={ handleCheck }
        aria-label="card checkbox"
        id={ id }
      />
    </div>
  );};

CardCheckbox.propTypes = {
  handleCheck: propTypes.func,
  isChecked: propTypes.bool,
  id: propTypes.string
};

export default CardCheckbox;
