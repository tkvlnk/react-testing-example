import React from 'react';
import { Typography } from 'antd';
import OriginsFilter from './OriginsFilter';
import PriceRangeFilter from './PriceRangeFilter';
import sm from './styles.module.scss';

const ProductsFilters = () => {
  return (
    <div className={sm.Filters}>
      <div>
        <Typography.Text type="secondary">Origins</Typography.Text>
        <OriginsFilter />
      </div>

      <div>
        <Typography.Text type="secondary">Price range</Typography.Text>
        <PriceRangeFilter />
      </div>
    </div>
  );
};

export default ProductsFilters;
