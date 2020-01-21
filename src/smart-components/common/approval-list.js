import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentList from '../../presentational-components/shared/content-list';
import { createRows } from './approval-table-helpers.js';
import ContentGaleryEmptyState from '../../presentational-components/shared/content-gallery-empty-state';
import { SearchIcon } from '@patternfly/react-icons';

const columns = ['Name'];

const ApprovalWorkflows = ({ workflows, isLoading, removeWorkflow }) => {
  const [workflowRows, setWorkflowRows] = useState([]);

  const actionResolver = () => [
    {
      title: 'Delete',
      onClick: (_event, _rowId, value) => {
        removeWorkflow(value);
      }
    }
  ];

  useEffect(() => {
    setWorkflowRows(createRows(workflows));
  }, [workflows]);

  const renderList = () => {
    return (
      <ContentList
        data={workflowRows}
        isCompact={true}
        columns={columns}
        actionResolver={actionResolver}
        title=" Approval workflow"
        isLoading={isLoading}
        renderEmptyState={() => (
          <ContentGaleryEmptyState
            title="No workflows"
            Icon={SearchIcon}
            description={'No workflows found.'}
          />
        )}
      />
    );
  };

  return renderList();
};

ApprovalWorkflows.propTypes = {
  isLoading: PropTypes.bool
};

ApprovalWorkflows.defaultProps = {
  workflows: [],
  isLoading: false
};

export default ApprovalWorkflows;
