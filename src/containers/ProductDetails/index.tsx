import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Alert, Empty, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { useInjectSaga } from '../../app/AppWrapper';
import productDetailsSaga from '../../store/products/saga/productDetailsSaga';
import { getProductsDetails } from '../../store/products/selectors';
import ProductCard from '../../ui/ProductCard';
import { productActions } from '../../store/products/actions';

export interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = props => {
  const { productId } = props;

  useInjectSaga('productDetails', productDetailsSaga, productId);

  const { data, loading, error } = useSelector(
    getProductsDetails(productId),
    shallowEqual
  );

  const { openEditProductModal } = bindActionCreators(
    productActions,
    useDispatch()
  );

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Spin spinning={loading}>
      {data ? (
        <ProductCard
          product={data}
          variant={data.isEditable ? 'editable' : 'search'}
          details
          onEditClick={() => openEditProductModal(productId)}
        />
      ) : (
        <Empty />
      )}
    </Spin>
  );
};

export default ProductDetails;
