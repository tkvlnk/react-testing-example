import React from 'react';
import { Slider } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { SliderProps } from 'antd/lib/slider';
import { AppState } from '../../../store/configureStore';
import useFilterChange from '../useFilterChange';

const MIN_PRICE_FALLBACK = 0;
const MAX_PRICE_FALLBACK = 1200;

const PriceRangeFilter = () => {
  const {
    minPrice = MIN_PRICE_FALLBACK,
    maxPrice = MAX_PRICE_FALLBACK
  } = useSelector(
    ({
      products: {
        list: { params }
      }
    }: AppState) => ({
      minPrice: params.minPrice,
      maxPrice: params.maxPrice
    }),
    shallowEqual
  );

  const handleChange = useFilterChange(
    ([nextMinPrice, nextMaxPrice]: [number, number]) => ({
      minPrice: nextMinPrice,
      maxPrice: nextMaxPrice
    })
  ) as SliderProps['onChange'];

  return (
    <Slider
      range
      defaultValue={[MIN_PRICE_FALLBACK, MAX_PRICE_FALLBACK]}
      min={MIN_PRICE_FALLBACK}
      max={MAX_PRICE_FALLBACK}
      value={[minPrice, maxPrice]}
      onChange={handleChange}
    />
  );
};

export default PriceRangeFilter;
