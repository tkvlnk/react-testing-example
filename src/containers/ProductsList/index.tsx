import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Alert, Empty, Spin } from 'antd';
import { useHistory } from 'react-router';
import { useInjectSaga } from '../../app/AppWrapper';
import productsListSaga from '../../store/products/saga/productsListSaga';
import { getProductsList } from '../../store/products/selectors';
import ProductCard from '../../ui/ProductCard';
import sm from './styles.module.scss';
import ProductsPagination from '../ProductsPaginaition';
import ProductCardsList from '../../ui/ProductCardsList';
import ROUTE_PATHS from '../../app/constants';

const ProductsList = () => {
  useInjectSaga('productsList', productsListSaga);
  const history = useHistory();

  const { data, error, loading } = useSelector(getProductsList, shallowEqual);

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <Spin size="large" spinning={loading}>
        {data.length ? (
          <ProductCardsList
            list={data}
            renderItem={product => (
              <ProductCard
                product={product}
                variant="search"
                onLinkClick={prod =>
                  history.push(
                    ROUTE_PATHS.PRODUCTS.BY_ID._({ productId: prod.id })
                  )
                }
              />
            )}
          />
        ) : (
          <Empty />
        )}
      </Spin>

      <div className={sm.Pagination}>
        <ProductsPagination />
      </div>
    </div>
  );
};

export default ProductsList;
