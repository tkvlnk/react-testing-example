import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ProductListParams } from '../../store/products';
import { productActions } from '../../store/products/actions';

export default function useFilterChange<F extends unknown[]>(
  transformToSearchParams: (...args: F) => Partial<ProductListParams>
) {
  const dispatch = useDispatch();

  return useCallback(
    (...args: F) =>
      dispatch(
        productActions.listParamsChanged(transformToSearchParams(...args))
      ),
    []
  );
}
