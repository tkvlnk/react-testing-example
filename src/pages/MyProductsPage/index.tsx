import React from 'react';
import { BackTop } from 'antd';
import NavMenu from '../../containers/NavMenu';
import sm from './styles.module.scss';
import MyProductsList from '../../containers/MyProductsList';

const MyProductsPage = () => {
  return (
    <div>
      <div>
        <NavMenu />
      </div>

      <div className={sm.Content}>
        <MyProductsList />
      </div>

      <BackTop />
    </div>
  );
};

export default MyProductsPage;
