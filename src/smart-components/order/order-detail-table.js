import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MessagesIcon } from '@patternfly/react-icons';
import StepLabel from './step-label';

const orderFailedStates = state => [ 'Failed', 'Denied' ].includes(state);

const OrderDetailTable = ({ requests, orderState }) => (
  <Fragment>
    <table className="requests-table">
      <thead>
        <tr>
          <th>
            Steps
          </th>
          <th>
            Performed by
          </th>
          <th>
            Date &amp; time
          </th>
          <th>
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        { requests.map(({ reason, requester, updated_at, state, isFinished }, index) => (
          <tr key={ index } className={ `${isFinished ? 'finished' : ''} ${orderFailedStates(orderState) ? 'failed' : ''}` }>
            <td><StepLabel index={ index } text={ reason } /></td>
            <td>{ requester }</td>
            <td>{ updated_at }</td>
            <td>{ state }</td>
          </tr>
        )) }
        <tr>
          <td>
            <Link id={ `order-item-${requests[0].orderItemId}-progress-messages-link` } to={ `/orders/${requests[0].orderItemId}/messages` }>
              <MessagesIcon /> Show progress messages
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </Fragment>
);

OrderDetailTable.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({
    reason: PropTypes.string,
    requester: PropTypes.string,
    updated_at: PropTypes.string,
    state: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ])
  })).isRequired,
  orderState: PropTypes.string
};

export default withRouter(OrderDetailTable);
