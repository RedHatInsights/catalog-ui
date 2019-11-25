import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defaultSettings } from '../../helpers/shared/pagination';
import { listWorkflowsForObject } from '../../helpers/approval/approval-helper';
import ContentList from '../../presentational-components/shared/content-list';
import { SearchIcon } from '@patternfly/react-icons/dist/js/index';
import ContentGalleryEmptyState from '../../presentational-components/shared/content-gallery-empty-state';

const columns = [
  { title: 'Role name', orderBy: 'name' },
  { title: 'Description' }
];

const ApprovalList = ({ currentWorkflows, isLoading, pagination, removeWorkflow }) => {
  const [ filterValue, setFilterValue ] = useState('');

  useEffect(() => {
    listWorkflowsForObject({});
  }, []);

  const createRows = (data, expanded, checkedRows = []) => {
    return data ? data.reduce((acc,  { uuid, name, description }) => ([
      ...acc, {
        uuid,
        cells: [ name, description ],
        selected: Boolean(checkedRows && checkedRows.find(row => row.uuid === uuid))
      }
    ]), []) : [];
  };

  const actionResolver = (workflow) => {
    return [{ title: 'Unlink approval workflow',
      onClick: () => removeWorkflow(workflow.id) }];
  };

  return <ContentList title={ 'Approval workflows' }
    data={ currentWorkflows ? createRows(currentWorkflows) : [] }
    columns={ columns }
    isLoading={ isLoading }
    isCompact={ true }
    actionResolver = { actionResolver }
    renderEmptyState={ () => (
      <ContentGalleryEmptyState
        title="No Workflows"
        Icon={ SearchIcon }
        description={ 'No workflows' }
      />
    ) }
    borders = { false }
    filterValue={ filterValue }
    setFilterValue={ ({ name }) => setFilterValue(name) }
    pagination={ pagination }
  />;

};

ApprovalList.propTypes = {
  workflows: PropTypes.array,
  isLoading: PropTypes.bool,
  removeWorkflow: PropTypes.func.isRequired,
  currentWorkflows: PropTypes.array,
  pagination: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    count: PropTypes.number
  })
};

ApprovalList.defaultProps = {
  workflows: [],
  pagination: defaultSettings
};

export default ApprovalList;
