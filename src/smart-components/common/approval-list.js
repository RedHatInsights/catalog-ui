import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ContentList from '../../presentational-components/shared/content-list';
import { createRows } from './approval-table-helpers.js';
import ContentGaleryEmptyState from '../../presentational-components/shared/content-gallery-empty-state';
import { SearchIcon } from '@patternfly/react-icons';

const columns = ['Name', 'Description', 'Last Updated'];

const ApprovalWorkflows = ({ workflows, isLoading, removeWorkflow }) => {
  const actionResolver = () => [
    {
      title: 'Delete',
      onClick: (value) => {
        removeWorkflow(value.id);
      }
    }
  ];

  const renderList = () => {
    const approvalRows = workflows ? createRows(workflows) : [];

    return (
      <Fragment>
        <ContentList
          data={approvalRows}
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
      </Fragment>
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
