import { componentTypes } from '@data-driven-forms/react-form-renderer';
import asyncFormValidator from '../utilities/async-form-validator';

const editWorkflowSchema = (loadWorkflows, initialData) => {
  console.log('initialData: ', initialData);
  return {
    fields: [
      {
        component: componentTypes.SELECT,
        name: 'workflow',
        label: 'Approval workflow',
        loadOptions: asyncFormValidator(loadWorkflows) && initialData,
        isSearchable: true,
        isClearable: true
      }
    ]
  };
};

export default editWorkflowSchema;
