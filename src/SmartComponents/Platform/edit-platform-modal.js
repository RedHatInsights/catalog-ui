import React from 'react';
import PropTypes from 'prop-types';
import FormRenderer from '../Common/FormRenderer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '@patternfly/react-core';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { fetchSelectedPlatforms, updatePlatform, fetchPlatform } from '../../redux/Actions/PlatformActions';
import { pipe } from 'rxjs';

const EditPlatformModal = ({
  history: { goBack },
  addNotification,
  fetchPlatforms,
  platformId,
  initialValues,
  updatePlatform,
  fetchSelectedPlatform
}) => {
  const onSubmit = data => updatePlatform(data).then(fetchSelectedPlatform(platformId)).then(goBack);

  const onCancel = () => pipe(
    addNotification({
      variant: 'warning',
      title: 'Editing platform',
      description: 'Edit platform was cancelled by the user.'
    }),
    goBack()
  );

  const schema = {
    type: 'object',
    properties: {
      name: { title: 'Platform Name', type: 'string' },
      description: { title: 'Description', type: 'string' }
    },
    required: [ 'name', 'description' ]
  };

  return (
    <Modal
      title={ 'Edit platform' }
      isOpen
      onClose={ onCancel }
    >
      <FormRenderer
        schema={ schema }
        schemaType="mozilla"
        onSubmit={ onSubmit }
        onCancel={ onCancel }
        initialValues={ { ...initialValues } }
      />
    </Modal>
  );
};

EditPlatformModal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  addNotification: PropTypes.func.isRequired,
  fetchPlatforms: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  platformId: PropTypes.string,
  updatePlatform: PropTypes.func.isRequired,
  fetchSelectedPlatform: PropTypes.func.isRequired
};

const mapStateToProps = ({ portfolioReducer: { portfolios }}, { match: { params: { id }}}) => ({
  initialValues: id && portfolios.find(item => item.id === id),
  portfolioId: id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addNotification,
  updatePlatform,
  fetchPlatforms,
  fetchSelectedPlatform
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPlatformModal));