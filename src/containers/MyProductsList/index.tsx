import React, { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Alert, Empty, Spin } from 'antd';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { useInjectSaga } from '../../app/AppWrapper';
import productsListSaga from '../../store/products/saga/productsListSaga';
import { getProductsList } from '../../store/products/selectors';
import ProductCard from '../../ui/ProductCard';
import sm from './styles.module.scss';
import ProductsPagination from '../ProductsPaginaition';
import ProductCardsList from '../../ui/ProductCardsList';
import ROUTE_PATHS from '../../app/constants';
import { productActions } from '../../store/products/actions';

const MyProductsList = () => {
  const sagaOpts = useMemo(
    () => ({
      onlyEditable: true
    }),
    []
  );

  const history = useHistory();

  useInjectSaga('productsList', productsListSaga, sagaOpts);

  const { data, error, loading } = useSelector(getProductsList, shallowEqual);

  const { openEditProductModal } = bindActionCreators(
    productActions,
    useDispatch()
  );

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
                variant="editable"
                onEditClick={prod => openEditProductModal(prod.id)}
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

export default MyProductsList;
