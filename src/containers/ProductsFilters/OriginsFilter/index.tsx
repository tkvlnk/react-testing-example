import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/configureStore';
import OriginsMenu from '../../OriginsMenu';
import useFilterChange from '../useFilterChange';
import { ProductsOrigin } from '../../../store/products';

const OriginsFilter = () => {
  const value = useSelector(
    (state: AppState) => state.products.list.params.origins
  );

  const handleChange = useFilterChange((origins: ProductsOrigin[]) => ({
    origins
  }));

  return (
    <OriginsMenu<ProductsOrigin[]>
      style={{
        width: '100%'
      }}
      mode="multiple"
      value={value}
      onChange={handleChange}
    />
  );
};

export default OriginsFilter;
