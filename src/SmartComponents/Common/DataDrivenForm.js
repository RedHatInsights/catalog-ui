import React from 'react';
import FormRender from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf4-component-mapper';
import PropTypes from 'prop-types';

const DataDrivenForm = ({
	componentMapper,
	...rest
}) => (
  <FormRender
    formFieldsMapper={{
    	...formFieldsMapper,
    	componentMapper,
    }}
    layoutMapper={layoutMapper}
    {...rest}
  />
);

DataDrivenForm.propTypes = {
    schema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func
}

export default DataDrivenForm;
