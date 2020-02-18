import { combineReducers } from 'redux';
import { PRODUCT_ACTION_TYPES } from './actions';
import { NETWORK_ACTION_TYPES } from '../network/actions';
import { Endpoint } from '../network/constants';

export type ProductsOrigin = 'europe' | 'usa' | 'africa' | 'asia';

export interface ProductsOriginData {
  value: ProductsOrigin;
  displayName: string;
}

export interface Product {
  id: string;
  name: string;
  origin: ProductsOrigin;
  price: number;
  isEditable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  origins: Product['origin'][];
  minPrice?: number;
  maxPrice?: number;
  editable?: boolean;
}

export interface Pagination {
  page: number;
  perPage: number;
  totalItems: number;
}

export interface Page<D> extends Pagination {
  items: D[];
}

export interface ProductsState {
  byId: {
    [key: string]: Product;
  };
  origins: {
    list: ProductsOriginData[];
    loading: boolean;
    error: string;
  };
  list: {
    params: ProductListParams;
    pagination: Pagination;
    resultIds: Product['id'][];
    error: string;
    loading: boolean;
  };
  details: {
    error: string;
    loading: boolean;
  };
  editorModal: {
    isOpen: boolean;
    productId: Product['id'] | null;
  };
}

const initialListSearchParams: ProductsState['list']['params'] = {
  origins: []
};

const initialListSearchPagination: ProductsState['list']['pagination'] = {
  page: 1,
  perPage: 50,
  totalItems: 0
};

const list = combineReducers<ProductsState['list'], AppActions>({
  loading: (state = false, action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.LIST_LOADING:
        return action.payload;
      default:
        return state;
    }
  },
  error: (state = '', action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.LIST_FETCH_ERROR:
        return action.payload;
      default:
        return state;
    }
  },
  resultIds: (state = [], action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.LIST_FETCH_SUCCESS:
        return action.payload.items.map(({ id }) => id);
      default:
        return state;
    }
  },
  params: (state = initialListSearchParams, action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.LIST_RESET_ALL_PARAMS: {
        return initialListSearchParams;
      }
      case PRODUCT_ACTION_TYPES.LIST_PARAMS_CHANGED: {
        const nextParams = {
          ...state,
          ...action.payload
        };

        if (!nextParams.origins?.length) {
          delete nextParams.origins;
        }

        return nextParams;
      }
      default:
        return state;
    }
  },
  pagination: (state = initialListSearchPagination, action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.LIST_RESET_ALL_PARAMS: {
        return initialListSearchPagination;
      }
      case PRODUCT_ACTION_TYPES.LIST_FETCH_SUCCESS: {
        const { items, ...rest } = action.payload;

        return {
          ...state,
          ...rest
        };
      }
      case PRODUCT_ACTION_TYPES.LIST_PAGE_CHANGED: {
        return {
          ...state,
          page: action.payload
        };
      }
      case PRODUCT_ACTION_TYPES.LIST_PER_PAGE_CHANGED: {
        return {
          ...state,
          perPage: action.payload
        };
      }
      case PRODUCT_ACTION_TYPES.LIST_PARAMS_CHANGED: {
        return {
          ...state,
          page: 1
        };
      }
      default:
        return state;
    }
  }
});

const details = combineReducers<ProductsState['details'], AppActions>({
  loading: (state = false, action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.DETAILS_LOADING:
        return action.payload;
      default:
        return state;
    }
  },
  error: (state = '', action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.DETAILS_FETCH_ERROR:
        return action.payload;
      default:
        return state;
    }
  }
});

const byId: AppReducer<ProductsState['byId']> = (state = {}, action) => {
  if (action.type !== NETWORK_ACTION_TYPES.API_CALL_SUCCESS) {
    return state;
  }

  switch (action.payload.endpoint) {
    case Endpoint.FetchProductsList: {
      const fetchedProducts: Product[] = action.payload.res.data.items;

      return fetchedProducts.reduce(
        (acc, product) => ({
          ...acc,
          [product.id]: {
            ...acc[product.id],
            ...product
          }
        }),
        state
      );
    }
    case Endpoint.UpdateProduct:
    case Endpoint.FetchProductDetails: {
      const fetchedProduct: Product = action.payload.res.data;

      return {
        ...state,
        [fetchedProduct.id]: {
          ...state[fetchedProduct.id],
          ...fetchedProduct
        }
      };
    }
    case Endpoint.CreateProduct: {
      const createdProduct: Product = action.payload.res.data;

      return {
        ...state,
        [createdProduct.id]: createdProduct
      };
    }
    default:
      return state;
  }
};

const origins = combineReducers<ProductsState['origins'], AppActions>({
  list: (state = [], action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.ORIGINS_FETCH_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.ORIGINS_LOADING:
        return action.payload;
      default:
        return state;
    }
  },
  error: (state = '', action) => {
    switch (action.type) {
      case PRODUCT_ACTION_TYPES.ORIGINS_FETCH_ERROR:
        return action.payload;
      default:
        return state;
    }
  }
});

const editorModal: AppReducer<ProductsState['editorModal']> = (
  state = {
    isOpen: false,
    productId: null
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.SET_EDITOR_MODAL: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

const products: AppReducer<ProductsState> = combineReducers({
  byId,
  list,
  details,
  origins,
  editorModal
});

export default products;
