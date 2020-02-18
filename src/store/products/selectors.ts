import { createSelector } from 'reselect';
import { Product, ProductListParams, ProductsOriginData } from './index';

export const getProductById: (
  characterId: Product['id']
) => AppSelector<Product | null> = characterId => state =>
  state.products.byId[characterId] ?? null;

export const getManyProductsById: (
  characterId: Product['id'][]
) => AppSelector<Product[]> = characterIds =>
  createSelector(
    state => state.products.byId,
    byId => Object.values(byId).filter(({ id }) => characterIds.includes(id))
  );

export const getProductsListParams: AppSelector<ProductListParams> = state =>
  state.products.list.params;

export const getProductsList: AppSelector<LoadedDataState<
  Product[]
>> = createSelector(
  [
    state => state.products.byId,
    state => state.products.list.resultIds,
    state => state.products.list.loading,
    state => state.products.list.error
  ],
  (byId, ids, loading, error) => ({
    data: ids.map(id => byId[id] as Product).filter(Boolean),
    loading,
    error
  })
);

export const getProductsDetails: (
  productId: Product['id']
) => AppSelector<LoadedDataState<Product | null>> = productId =>
  createSelector(
    [
      getProductById(productId),
      state => state.products.details.loading,
      state => state.products.details.error
    ],
    (product, loading, error) => ({
      data: product,
      loading,
      error
    })
  );

export const getProductsOrigins: AppSelector<LoadedDataState<
  ProductsOriginData[]
>> = createSelector(
  [
    state => state.products.origins.list,
    state => state.products.origins.loading,
    state => state.products.origins.error
  ],
  (data, loading, error) => ({
    data,
    loading,
    error
  })
);
