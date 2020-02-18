import pathMaker from '../utils/pathMaker';

const ROUTE_PATHS = {
  _: pathMaker('/'),
  MY_PRODUCTS: {
    _: pathMaker('/my-products')
  },
  PRODUCTS: {
    BY_ID: {
      _: pathMaker<{ productId: string }>('/products/:productId')
    }
  }
};

export default ROUTE_PATHS;
