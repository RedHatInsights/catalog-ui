import { ASYNC_ACTIONS } from '../ActionTypes/rbac-action-types';
import { getRbacGroups } from '../../Helpers/rbac/rbac-helper';

export const fetchRbacGroups = () => ({
  type: ASYNC_ACTIONS.FETCH_GROUPS,
  payload: getRbacGroups.then(({ data }) => [
    ...data.map(({ id, name }) => ({ value: id, label: name }))
  ])
});
