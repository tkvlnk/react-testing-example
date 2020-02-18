// eslint-disable-next-line import/prefer-default-export
import pathMaker from '../../utils/pathMaker';

export enum Endpoint {
  CreateProduct = 'CREATE_PRODUCT',
  UpdateProduct = 'UPDATE_PRODUCT',
  FetchProductsList = 'FETCH_PRODUCTS_LIST',
  FetchProductDetails = 'FETCH_PRODUCT_DETAILS',
  FetchProductsOrigins = 'FETCH_PRODUCTS_ORIGINS'
}

export const ENDPOINT_PATHS = {
  PRODUCTS: {
    _: pathMaker('/products'),
    BY_ID: {
      _: pathMaker<{ productId: string }>('/products/:productId')
    }
  },
  PRODUCTS_ORIGINS: {
    _: pathMaker('/products-origins')
  }
};
