import React, { useCallback } from 'react';
import { Pagination } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productActions } from '../../store/products/actions';
import { AppState } from '../../store/configureStore';

const ProductsPagination = () => {
  const dispatch = useDispatch();

  const { listPageChanged, listPerPageChanged } = bindActionCreators(
    productActions,
    dispatch
  );

  const { page, perPage, totalItems } = useSelector(
    (state: AppState) => state.products.list.pagination,
    shallowEqual
  );

  const handlePerPageChange = useCallback((_, changedPerPage) => {
    listPerPageChanged(changedPerPage);
    listPageChanged(1);
  }, []);

  if (!totalItems) {
    return null;
  }

  return (
    <Pagination
      pageSizeOptions={['10', '25', '50']}
      showSizeChanger
      total={totalItems}
      current={page}
      onChange={listPageChanged}
      onShowSizeChange={handlePerPageChange}
      pageSize={perPage}
    />
  );
};

export default ProductsPagination;
