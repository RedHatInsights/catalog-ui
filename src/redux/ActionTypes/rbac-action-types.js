import { createAsyncActionTypes } from './action-types-helper';

const RBAC_PREFIX = '@@catalog/rbac/';

const asyncActionTypes = [ 'FETCH_GROUPS' ];

export const ASYNC_ACTIONS = {
  ...createAsyncActionTypes(asyncActionTypes, RBAC_PREFIX)
};

