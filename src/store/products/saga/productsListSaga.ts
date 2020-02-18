import {
  delay,
  takeLatest,
  select,
  put,
  call,
  getContext
} from 'redux-saga/effects';
import { stringify, parse } from 'qs';
import { PRODUCT_ACTION_TYPES, productActions } from '../actions';
import { fetchProductsList } from '../../network/services/products';
import { getProductsListParams } from '../selectors';
import { AppState } from '../../configureStore';

interface ListSagaOptions {
  onlyEditable?: boolean;
}

export default function* productsListSaga(options: ListSagaOptions = {}) {
  yield takeLatest(
    [
      PRODUCT_ACTION_TYPES.LIST_PARAMS_CHANGED,
      PRODUCT_ACTION_TYPES.LIST_PER_PAGE_CHANGED,
      PRODUCT_ACTION_TYPES.LIST_PAGE_CHANGED
    ],
    characterSearchSaga,
    options
  );

  const history = yield getContext('history');

  const searchParamsFromUrl = parse(history.location.search.substr(1));

  yield put(productActions.listResetAllParams());
  yield put(productActions.listParamsChanged(searchParamsFromUrl));
}

function* characterSearchSaga(options: ListSagaOptions, action: AppActions) {
  const searchParams = yield select(getProductsListParams);
  const { totalItems, ...paginationParams } = yield select(
    (state: AppState) => state.products.list.pagination
  );

  const searchInUrl = stringify(
    {
      ...searchParams,
      ...paginationParams,
      page: paginationParams.page === 1 ? null : paginationParams.page,
      perPage: paginationParams.perPage === 50 ? null : paginationParams.perPage
    },
    {
      arrayFormat: 'repeat',
      skipNulls: true
    }
  );

  const history = yield getContext('history');

  history.push({
    search: searchInUrl
  });

  yield put(productActions.listLoading(true));

  if (action.type === PRODUCT_ACTION_TYPES.LIST_PARAMS_CHANGED) {
    yield delay(1000);
  }

  try {
    const reqParams = {
      ...searchParams,
      ...paginationParams
    };

    if (options.onlyEditable) {
      reqParams.editable = true;
    }

    const data = yield call(fetchProductsList, reqParams);

    yield put(productActions.listFetchSuccess(data));
  } catch (err) {
    yield put(productActions.listFetchError(err?.message ?? err));
  } finally {
    yield put(productActions.listLoading(false));
  }
}
