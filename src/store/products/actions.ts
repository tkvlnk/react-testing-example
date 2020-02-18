import { Page, Product, ProductListParams, ProductsOriginData } from './index';

export const PRODUCT_ACTION_TYPES = {
  LIST_FETCH_SUCCESS: 'LIST_FETCH_SUCCESS',
  LIST_FETCH_ERROR: 'LIST_FETCH_ERROR',
  LIST_LOADING: 'LIST_LOADING',
  LIST_PARAMS_CHANGED: 'LIST_PARAMS_CHANGED',
  LIST_PAGE_CHANGED: 'LIST_PAGE_CHANGED',
  LIST_PER_PAGE_CHANGED: 'LIST_PER_PAGE_CHANGED',
  LIST_RESET_ALL_PARAMS: 'LIST_RESET_ALL_PARAMS',
  DETAILS_LOADING: 'DETAILS_LOADING',
  DETAILS_FETCH_SUCCESS: 'DETAILS_FETCH_SUCCESS',
  DETAILS_FETCH_ERROR: 'DETAILS_FETCH_ERROR',
  ORIGINS_LOADING: 'ORIGINS_LOADING',
  ORIGINS_FETCH_SUCCESS: 'ORIGINS_FETCH_SUCCESS',
  ORIGINS_FETCH_ERROR: 'ORIGINS_FETCH_ERROR',
  SET_EDITOR_MODAL: 'SET_EDITOR_MODAL_OPEN'
} as const;

export const productActions = {
  listFetchSuccess: (payload: Page<Product>) => ({
    type: PRODUCT_ACTION_TYPES.LIST_FETCH_SUCCESS,
    payload
  }),
  listFetchError: (payload: string) => ({
    type: PRODUCT_ACTION_TYPES.LIST_FETCH_ERROR,
    payload
  }),
  listLoading: (payload: boolean) => ({
    type: PRODUCT_ACTION_TYPES.LIST_LOADING,
    payload
  }),
  listParamsChanged: (payload: Partial<ProductListParams>) => ({
    type: PRODUCT_ACTION_TYPES.LIST_PARAMS_CHANGED,
    payload
  }),
  listPageChanged: (payload: number) => ({
    type: PRODUCT_ACTION_TYPES.LIST_PAGE_CHANGED,
    payload
  }),
  listPerPageChanged: (payload: number) => ({
    type: PRODUCT_ACTION_TYPES.LIST_PER_PAGE_CHANGED,
    payload
  }),
  listResetAllParams: () => ({
    type: PRODUCT_ACTION_TYPES.LIST_RESET_ALL_PARAMS
  }),
  detailsLoading: (payload: boolean) => ({
    type: PRODUCT_ACTION_TYPES.DETAILS_LOADING,
    payload
  }),
  detailsFetchSuccess: (payload: Product) => ({
    type: PRODUCT_ACTION_TYPES.DETAILS_FETCH_SUCCESS,
    payload
  }),
  detailsFetchError: (payload: string) => ({
    type: PRODUCT_ACTION_TYPES.DETAILS_FETCH_ERROR,
    payload
  }),
  originsLoading: (payload: boolean) => ({
    type: PRODUCT_ACTION_TYPES.ORIGINS_LOADING,
    payload
  }),
  originsFetchSuccess: (payload: ProductsOriginData[]) => ({
    type: PRODUCT_ACTION_TYPES.ORIGINS_FETCH_SUCCESS,
    payload
  }),
  originsFetchError: (payload: string) => ({
    type: PRODUCT_ACTION_TYPES.ORIGINS_FETCH_ERROR,
    payload
  }),
  openAddProductModal: () => ({
    type: PRODUCT_ACTION_TYPES.SET_EDITOR_MODAL,
    payload: {
      isOpen: true,
      productId: null
    }
  }),
  openEditProductModal: (productId: Product['id']) => ({
    type: PRODUCT_ACTION_TYPES.SET_EDITOR_MODAL,
    payload: {
      isOpen: true,
      productId
    }
  }),
  closeProductModal: () => ({
    type: PRODUCT_ACTION_TYPES.SET_EDITOR_MODAL,
    payload: {
      isOpen: false,
      productId: null
    }
  })
};
