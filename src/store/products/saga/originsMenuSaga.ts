import { call, put, select } from 'redux-saga/effects';
import { getProductsOrigins } from '../selectors';
import { productActions } from '../actions';
import { fetchProductsOrigins } from '../../network/services/products';

export default function* originsMenuSaga() {
  const originsState = yield select(getProductsOrigins);

  if (originsState.data.length || originsState.loading) {
    return;
  }

  yield put(productActions.originsLoading(true));

  try {
    const loadedData = yield call(fetchProductsOrigins);
    yield put(productActions.originsFetchSuccess(loadedData.items));
  } catch (err) {
    yield put(productActions.originsFetchError(err?.message ?? err));
  } finally {
    yield put(productActions.originsLoading(false));
  }
}
