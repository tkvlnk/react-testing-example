import React from 'react';
import { useRouteMatch } from 'react-router';
import ProductDetails from '../../containers/ProductDetails';
import sm from './styles.module.scss';
import NavMenu from '../../containers/NavMenu';

const ProductPage = () => {
  const {
    params: { productId }
  } = useRouteMatch<{ productId: string }>();

  return (
    <div>
      <div>
        <NavMenu />
      </div>

      <div className={sm.Content}>
        <ProductDetails productId={productId} />
      </div>
    </div>
  );
};

export default ProductPage;
