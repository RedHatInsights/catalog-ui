import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@patternfly/react-core';
import { TimeAgo } from '../../helpers/shared/helpers';
import OrderProcessTableContext from './order-process-table-context';

export const SelectBox = ({ id }) => {
  const { selectedOrderProcesses, setSelectedOrderProcesses } = useContext(
    OrderProcessTableContext
  );

  return (
    <Checkbox
      id={`select-${id}`}
      isChecked={selectedOrderProcesses.includes(id)}
      onChange={() => setSelectedOrderProcesses(id)}
    />
  );
};

SelectBox.propTypes = {
  id: PropTypes.string.isRequired
};

export const createRows = (data) =>
  data.map(({ id, name, description, created_at }) => ({
    id,
    'data-ouia-component-id': `test-${id}`,
    cells: [
      <div key={`${id}-checkbox`} ouiaId={`${id}-checkbox`}>
        <SelectBox id={id} />
      </div>,
      <div key={`${id}-${name}`} ouiaId={`${id}-${name}`}>
        {name}
      </div>,
      description,
      <React.Fragment key={id}>
        <TimeAgo date={created_at} />
      </React.Fragment>
    ]
  }));
