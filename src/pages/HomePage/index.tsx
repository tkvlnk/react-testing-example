import React from 'react';
import { BackTop } from 'antd';
import ProductsFilters from '../../containers/ProductsFilters';
import ProductsList from '../../containers/ProductsList';
import sm from './styles.module.scss';
import NavMenu from '../../containers/NavMenu';

const HomePage = () => {
  return (
    <div>
      <div>
        <NavMenu />
      </div>

      <div className={sm.Filters}>
        <ProductsFilters />
      </div>

      <div className={sm.List}>
        <ProductsList />
      </div>

      <BackTop />
    </div>
  );
};

export default HomePage;
