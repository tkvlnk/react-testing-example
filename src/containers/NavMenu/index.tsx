import React from 'react';
import { Menu } from 'antd';
import { Link, Route, useLocation } from 'react-router-dom';
import ROUTE_PATHS from '../../app/constants';
import AddProductBtn from '../AddProductBtn';
import sm from './styles.module.scss';

const NavMenu = () => {
  const { pathname } = useLocation();

  return (
    <Menu selectedKeys={[pathname]} mode="horizontal">
      <Menu.Item key={ROUTE_PATHS._()}>
        <Link to={ROUTE_PATHS._()}>Search Products</Link>
      </Menu.Item>
      <Menu.Item key={ROUTE_PATHS.MY_PRODUCTS._()}>
        <Link to={ROUTE_PATHS.MY_PRODUCTS._()}>My Products</Link>
      </Menu.Item>

      <Route path={ROUTE_PATHS.MY_PRODUCTS._()}>
        <span className={sm.AddProduct}>
          <AddProductBtn />
        </span>
      </Route>
    </Menu>
  );
};

export default NavMenu;
