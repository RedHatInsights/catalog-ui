
import promiseMiddleware from 'redux-promise-middleware';
import { ReducerRegistry, applyReducerHash } from '@red-hat-insights/insights-frontend-components';
import { notifications, notificationsMiddleware } from '@red-hat-insights/insights-frontend-components/components/Notifications';

import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import orderReducer, { orderInitialState } from '../redux/reducers/orderReducer';
import platformReducer, { platformInitialState } from '../redux/reducers/platformReducer';
import portfolioReducer, { portfoliosInitialState } from '../redux/reducers/portfolioReducer';
import approvalReducer, { approvalInitialState } from '../redux/reducers/approval-reducer';
import rbacReducer, { rbacInitialState } from '../redux/reducers/rbac-reducer';
import shareReducer, { shareInitialState } from '../redux/reducers/share-reducer';

const registry = new ReducerRegistry({}, [ thunk, promiseMiddleware(), notificationsMiddleware({
  errorTitleKey: [ 'errors', 'message' ],
  errorDescriptionKey: [ 'response.body.errors', 'errors', 'stack' ]
}), reduxLogger ]);

registry.register({
  orderReducer: applyReducerHash(orderReducer, orderInitialState),
  platformReducer: applyReducerHash(platformReducer, platformInitialState),
  portfolioReducer: applyReducerHash(portfolioReducer, portfoliosInitialState),
  approvalReducer: applyReducerHash(approvalReducer, approvalInitialState),
  rbacReducer: applyReducerHash(rbacReducer, rbacInitialState),
  shareReducer: applyReducerHash(shareReducer, shareInitialState),
  notifications
});

export default registry.getStore();
