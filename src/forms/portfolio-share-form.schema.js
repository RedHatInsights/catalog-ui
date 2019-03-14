import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

/**
 * Creates a data-driven-form schema for sharing/un-sharing portfolio
 */
export const createPortfolioShareSchema = (rbacGroups, permissionVerbs) => ({
  fields: [{
    label: 'Invite Group',
    name: 'new_group',
    component: componentTypes.SELECT,
    options: rbacGroups
  },
    {
    label: '',
    name: 'permissions',
    component: componentTypes.SELECT,
    options: permissionVerbs
  }]
});
