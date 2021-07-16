import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import some from 'lodash/some';
import { AppPlaceholder } from '../../presentational-components/shared/loader-placeholders';
import {
  PORTFOLIOS_ROUTE,
  PORTFOLIO_ROUTE,
  ORDER_ROUTE
} from '../../constants/routes';
import CatalogRoute from '../../routing/catalog-route';
import DialogRoutes from '../../smart-components/dialog-routes';
const CommonApiError = lazy(() =>
  import(
    /* webpackChunkName: "error-page" */ '../../smart-components/error-pages/common-api-error'
  )
);

const Products = lazy(() =>
  import(
    /* webpackChunkName: "products" */ '../../smart-components/products/products'
  )
);
const Platforms = lazy(() =>
  import(
    /* webpackChunkName: "platforms" */ '../../smart-components/platform/platforms'
  )
);
const Platform = lazy(() =>
  import(
    /* webpackChunkName: "platform" */ '../../smart-components/platform/platform'
  )
);
const Portfolios = lazy(() =>
  import(
    /* webpackChunkName: "portfolios" */ '../../smart-components/portfolio/portfolios'
  )
);
const Portfolio = lazy(() =>
  import(
    /* webpackChunkName: "portfolio" */ '../../smart-components/portfolio/portfolio'
  )
);
const Orders = lazy(() =>
  import(/* webpackChunkName: "orders" */ '../../smart-components/order/orders')
);
const OrderDetail = lazy(() =>
  import(
    /* webpackChunkName: "order-detail" */ '../../smart-components/order/order-detail/order-detail'
  )
);
const OrderProcesses = lazy(() =>
  import(
    /* webpackChunkName: "order-processes" */ '../../smart-components/order-process/order-processes'
  )
);

export const catalogPaths = {
  products: '/products',
  platforms: '/platforms',
  order_processes: '/order-processes',
  platform: '/platform',
  portfolios: PORTFOLIOS_ROUTE,
  portfolio: PORTFOLIO_ROUTE,
  orders: '/orders',
  order: ORDER_ROUTE
};

const errorPaths = ['/400', '/401', '/403', '/404'];

export const Routes = () => {
  const { pathname } = useLocation();
  return (
    <Suspense fallback={<AppPlaceholder />}>
      <Switch>
        <CatalogRoute path={catalogPaths.products} component={Products} />
        <CatalogRoute path={catalogPaths.portfolios} component={Portfolios} />
        <CatalogRoute path={catalogPaths.portfolio} component={Portfolio} />
        <CatalogRoute
          permissions={['catalog:portfolios:create']}
          path={catalogPaths.platforms}
          component={Platforms}
        />
        <CatalogRoute
          permissions={['catalog:portfolios:create']}
          path={catalogPaths.platform}
          component={Platform}
        />
        <CatalogRoute path={catalogPaths.order_processes} component={OrderProcesses} />
        <CatalogRoute path={catalogPaths.order} component={OrderDetail} />
        <CatalogRoute path={catalogPaths.orders} component={Orders} />
        <Route path={errorPaths} component={CommonApiError} />
        <Route
          render={() =>
            some(catalogPaths, (p) => p === pathname) ? null : (
              <Redirect to={catalogPaths.portfolios} />
            )
          }
        />
      </Switch>
      {/*
       * We require the empty DIV around the dialog routes to avoid testing issues
       * It does not have any visual effect on the application
       * Emzyme simply cannot handle direct descendant of Suspense to be another Suspense
       */}
      <div>
        <DialogRoutes />
      </div>
    </Suspense>
  );
};
