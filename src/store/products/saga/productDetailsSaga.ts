import { call, select, put } from 'redux-saga/effects';
import { getProductById } from '../selectors';
import { Product } from '../index';
import { productActions } from '../actions';
import { fetchProductDetails } from '../../network/services/products';

export default function* productDetailsSaga(productId: Product['id']) {
  if (yield select(getProductById(productId))) {
    return;
  }

  yield put(productActions.detailsLoading(true));

  try {
    const data = yield call(fetchProductDetails, productId);
    yield put(productActions.detailsFetchSuccess(data));
  } catch (err) {
    yield put(productActions.detailsFetchError(err?.message ?? err));
  } finally {
    yield put(productActions.detailsLoading(false));
  }
}
