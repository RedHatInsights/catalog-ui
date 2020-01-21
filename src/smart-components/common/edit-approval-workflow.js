import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  ActionGroup,
  Button,
  Modal,
  Split,
  SplitItem,
  Stack,
  StackItem
} from '@patternfly/react-core';
import FormRenderer from '../common/form-renderer';
import editApprovalWorkflowSchema from '../../forms/edit-workflow_form.schema';
import {
  listWorkflowsForObject,
  linkWorkflow,
  unlinkWorkflow
} from '../../redux/actions/approval-actions';
import { APP_NAME } from '../../utilities/constants';
import { loadWorkflowOptions } from '../../helpers/approval/approval-helper';
import { WorkflowLoader } from '../../presentational-components/shared/loader-placeholders';
import ApprovalList from './approval-list';

const initialState = {
  isFetching: true
};

const approvalState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

const EditApprovalWorkflow = ({
  closeUrl,
  objectType,
  objectId,
  objectName = () => objectType
}) => {
  const [{ isFetching }, stateDispatch] = useReducer(
    approvalState,
    initialState
  );
  const { data, meta } = useSelector(
    ({ approvalReducer: { resolvedWorkflows } }) => resolvedWorkflows
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const pushParam = {
    pathname: closeUrl
  };

  const [currentWorkflows, setCurrentWorkflows] = useState([]);

  useEffect(() => {
    dispatch(
      listWorkflowsForObject(
        { objectType, appName: APP_NAME[objectType], objectId: id || objectId },
        meta
      )
    ).then((result) => {
      setCurrentWorkflows(result.value.data);
      stateDispatch({ type: 'setFetching', payload: false });
    });
  }, []);

  const onSubmit = () => {
    history.push(pushParam);
    const toUnlinkWorkflows = data.filter(
      (wf) => currentWorkflows.findIndex((w) => w.id === wf.id) < 0
    );
    const toLinkWorkflows = currentWorkflows.filter(
      (wf) => data.findIndex((w) => w.id === wf.id) < 0
    );

    if (toUnlinkWorkflows) {
      toUnlinkWorkflows.map((wf) =>
        dispatch(
          unlinkWorkflow(wf.id, wf.name, {
            object_type: objectType,
            app_name: APP_NAME[objectType],
            object_id: id || objectId
          })
        )
      );
    }

    if (toLinkWorkflows) {
      toLinkWorkflows.map((wf) =>
        dispatch(
          linkWorkflow(wf.id, {
            object_type: objectType,
            app_name: APP_NAME[objectType],
            object_id: id || objectId
          })
        )
      );
    }
  };

  const onCancel = () => {
    history.push(pushParam);
  };

  const onAddWorkflow = (value) => {
    console.log('Debug - addWorkflow - values: ', value.workflow);
    return setCurrentWorkflows([...currentWorkflows, value.workflow]);
  };

  const removeWorkflow = (value) => {
    return setCurrentWorkflows(
      currentWorkflows.filter((wf) => wf.id !== value.id)
    );
  };

  return (
    <Modal
      title={`Set approval workflow for ${objectName(id)}`}
      isOpen
      onClose={() => history.push(pushParam)}
      isSmall
    >
      <Stack gutter="lg">
        <StackItem>
          {!isFetching ? (
            <FormRenderer
              onSubmit={onAddWorkflow}
              formContainer="modal"
              schema={editApprovalWorkflowSchema(loadWorkflowOptions)}
              buttonsLabels={{ submitLabel: 'Add workflow' }}
            />
          ) : (
            <WorkflowLoader />
          )}
        </StackItem>
        <StackItem>
          {currentWorkflows.length > 0 && (
            <ApprovalList
              workflows={currentWorkflows}
              isLoading={isFetching}
              removeWorkflow={removeWorkflow}
            />
          )}
        </StackItem>
        <StackItem>
          <ActionGroup>
            <Split gutter="lg">
              <SplitItem>
                <Button
                  aria-label={'Save'}
                  id="edit-approval-submit"
                  variant="primary"
                  type="submit"
                  isDisabled={isFetching}
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </SplitItem>
              <SplitItem>
                <Button
                  aria-label="Cancel"
                  id="edit-approval-cancel"
                  variant="secondary"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </SplitItem>
            </Split>
          </ActionGroup>
        </StackItem>
      </Stack>
    </Modal>
  );
};

EditApprovalWorkflow.propTypes = {
  closeUrl: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,
  objectName: PropTypes.func,
  objectId: PropTypes.string
};

export default EditApprovalWorkflow;
