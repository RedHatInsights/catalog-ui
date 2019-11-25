import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Button, Modal } from '@patternfly/react-core';
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
    pathname: closeUrl,
    search
  };
  const [ currentWorkflows, setCurrentWorkflows ] = useState();
  const [ initialWorkflows, setInitialWorkflows ] = useState();

  useEffect(() => {
    dispatch(listWorkflowsForObject({ objectType, appName: APP_NAME, objectId: id || objectId }, meta))
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
    listWorkflowsForObjectlistWorkflowsForObject(
        { objectType, appName: APP_NAME[objectType], objectId: id || objectId },
        meta
    )
    .then((data) => { setInitialWorkflows(data  ? data.data : {}); setFetching(false); })
    .catch(() => setCurrentWorkflows([]));
  }, []);

  const onSubmit = (values) => {
    history.push(pushParam);
    const toUnlinkWorkflows = currentWorkflows - initialWorkflows;
    const toLinkWorkflows = initialWorkflows - currentWorkflows;

    if (toUnlinkWorkflows) {
      toUnlinkWorkflows.map(wf => dispatch(unlinkWorkflow(approvalWorkflow.id, approvalWorkflow.name, {
        object_type: objectType,
        app_name: APP_NAME[objectType],
        object_id: id || objectId
      })));
    }

    if (toLinkWorkflows) {
      toLinkWorkflows.map(wf => dispatch(linkWorkflow(wf.id, { object_type: objectType, app_name: APP_NAME, object_id: id || objectId })));
    }
  };

    return dispatch(linkWorkflow(values.workflow, {
      object_type: objectType,
      app_name: APP_NAME[objectType],
      object_id: id || objectId
    }));
  };

const onAddWorkflow = values => {
  return setCurrentWorkflows([ ...currentWorkflows, values.workflow ]);
};

const removeWorkflow = values => {
  return setCurrentWorkflows([ ...currentWorkflows, values.workflow ]);
};

  return (
    <Modal
      title={`Set approval workflow for ${objectName(id)}`}
      isOpen
      onClose={() => history.push(pushParam)}
      isSmall
    >
      {!isFetching ? (
        <FormRenderer
            initialValues={{ workflow: data && data[0] ? data[0].id : undefined }}
          onSubmit={ onAddWorkflow }
          onCancel={ () => history.push(pushParam) }
          schema={ editApprovalWorkflowSchema(loadWorkflowOptions) }
          formContainer="modal"
          buttonsLabels={ { submitLabel: 'Add workflow' } }
        /> : <WorkflowLoader/> }
      <ApprovalList workflows={ currentWorkflows }
        setWorkflows ={ setCurrentWorkflows }
        removeWorkflow = { removeWorkflow }
      />
      <Button>
        Submit
      </Button>
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
