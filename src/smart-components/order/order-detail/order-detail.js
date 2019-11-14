import React, { useEffect, useState } from 'react';
import {
  Route,
  Link,
  Switch,
  useLocation,
  useRouteMatch
} from 'react-router-dom';
import { Stack, StackItem, Level, LevelItem, Split, SplitItem } from '@patternfly/react-core';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrderDetails } from '../../../redux/actions/order-actions';
import OrderDetailTitle from './order-detail-title';
import OrderToolbarActions from './order-toolbar-actions';
import OrderDetailInformation from './order-detail-information';
import OrderDetailMenu from './order-detail-menu';

const requiredParams = [ 'order-item', 'portfolio-item', 'platform' ];

const useQuery = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return [ requiredParams.reduce((acc, curr) => ({
    ...acc,
    [curr]: query.get(curr)
  }), {}), search, query ];
};

const OrderDetail = () => {
  const [ isFetching, setIsFetching ] = useState(true);
  const [ queryValues, search ] = useQuery();
  const orderDetailData = useSelector(({ orderReducer: { orderDetail }}) => orderDetail);
  const match = useRouteMatch('/orders/:id');
  const dispatch = useDispatch();
  useEffect(() => {
    setIsFetching(true);
    dispatch(fetchOrderDetails({
      order: match.params.id,
      ...queryValues
    })).then(() => setIsFetching(false));
  }, []);
  if (isFetching) {
    return (
      <div>Loading</div>
    );
  }

  const {
    order,
    portfolioItem,
    platform
  } = orderDetailData;

  return (
    <Stack className="orders bg-fill">
      <StackItem className="orders separator pf-u-p-xl pf-u-pt-md pf-u-pb-0">
        <Level>
          <LevelItem>
            <OrderDetailTitle portfolioItemName={ portfolioItem.name } orderId={ order.id } />
          </LevelItem>
          <LevelItem>
            <OrderToolbarActions state={ order.state } />
          </LevelItem>
        </Level>
        <Level>
          <OrderDetailInformation
            portfolioItemId={ portfolioItem.id }
            sourceType={ platform.source_type_id }
            state={ order.state }
            platformName={ platform.name }
            orderRequestDate={ order.order_request_sent_at }
            orderUpdateDate={ portfolioItem.updated_at }
            owner={ order.owner }
          />
        </Level>
      </StackItem>
      <StackItem className="pf-u-pt-xl">
        <Split gutter="md">
          <SplitItem>
            <OrderDetailMenu baseUrl={ match.url } search={ search } />
          </SplitItem>
          <SplitItem>
            <Switch>
              <Route path={ `${match.url}/approval` } render={ () => {
                return (
                  <div>
                    Approval
                  </div>
                );
              } } />
              <Route path={ `${match.url}/provision` } render={ () => {
                return (
                  <div>
                    provision
                  </div>
                );
              } } />
              <Route path={ `${match.url}/lifecycle` } render={ () => {
                return (
                  <div>
                    lifecycle
                  </div>
                );
              } } />
              <Route path={ `${match.url}` } render={ () => {
                return (
                  <div>
                    Order details
                  </div>
                );
              } } />
            </Switch>
          </SplitItem>
        </Split>
      </StackItem>
    </Stack>
  );
};

export default OrderDetail;