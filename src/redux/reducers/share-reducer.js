import {
  QUERY_PORTFOLIO
} from '../ActionTypes';

// Initial State
export const shareInitialState = {
  shareInfo: [],
  isLoading: true
};

const setShareInfo = (state, { payload }) => ({ ...state, shareInfo: payload, isLoading: false });

export default {
  [`${QUERY_PORTFOLIO}_FULFILLED`]: setShareInfo
};
