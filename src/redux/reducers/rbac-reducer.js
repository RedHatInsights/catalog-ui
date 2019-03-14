import { ASYNC_ACTIONS } from '../ActionTypes/rbac-action-types';

export const rbacInitialState = {
  isFetching: false,
  rbacGroups: []
};

const setLoadingState = state => ({ ...state, isFetching: true });
const setRbacGroups = (state, { payload }) => ({ ...state, isFetching: false, rbacGroups: payload });

export default {
  [ASYNC_ACTIONS.FETCH_GROUPS_PENDING]: setLoadingState,
  [ASYNC_ACTIONS.FETCH_GROUPS_FULFILLED]: setRbacGroups
};
