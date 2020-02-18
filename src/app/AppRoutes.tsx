import React from 'react';
import { Route, Switch } from 'react-router';
import ROUTE_PATHS from './constants';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import MyProductsPage from '../pages/MyProductsPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route component={ProductPage} path={ROUTE_PATHS.PRODUCTS.BY_ID._()} />
      <Route component={MyProductsPage} path={ROUTE_PATHS.MY_PRODUCTS._()} />
      <Route component={HomePage} path={ROUTE_PATHS._()} />
    </Switch>
  );
};

export default AppRoutes;
