import createApiSaga from '../createApiSaga';
import { Product, ProductListParams, ProductsOrigin } from '../../products';
import { Endpoint, ENDPOINT_PATHS } from '../constants';

export const fetchProductsList = createApiSaga({
  endpoint: Endpoint.FetchProductsList,
  buildReqConfig: (params: ProductListParams) => ({
    method: 'get',
    url: ENDPOINT_PATHS.PRODUCTS._(),
    params
  }),
  addApiKey: true
});

export const fetchProductDetails = createApiSaga({
  endpoint: Endpoint.FetchProductDetails,
  buildReqConfig: (productId: Product['id']) => ({
    method: 'get',
    url: ENDPOINT_PATHS.PRODUCTS.BY_ID._({ productId })
  }),
  addApiKey: true
});

export const fetchProductsOrigins = createApiSaga({
  endpoint: Endpoint.FetchProductsOrigins,
  addApiKey: false,
  buildReqConfig: () => ({
    method: 'get',
    url: ENDPOINT_PATHS.PRODUCTS_ORIGINS._()
  })
});

export const createProduct = createApiSaga({
  endpoint: Endpoint.CreateProduct,
  addApiKey: true,
  buildReqConfig: (createProductDto: {
    name: string;
    price: number;
    origin: ProductsOrigin;
  }) => ({
    method: 'post',
    url: ENDPOINT_PATHS.PRODUCTS._(),
    data: {
      product: createProductDto
    }
  })
});

export const updateProduct = createApiSaga({
  endpoint: Endpoint.UpdateProduct,
  addApiKey: true,
  buildReqConfig: (
    productId: Product['id'],
    createProductDto: {
      name: string;
      price: number;
      origin: ProductsOrigin;
    }
  ) => ({
    method: 'patch',
    url: ENDPOINT_PATHS.PRODUCTS.BY_ID._({ productId }),
    data: {
      product: createProductDto
    }
  })
});
