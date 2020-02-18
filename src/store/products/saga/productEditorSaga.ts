import { call, getContext, select, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import {
  formDataToProduct,
  ProductFormData
} from '../../../containers/ProductForm';
import ROUTE_PATHS from '../../../app/constants';
import { createProduct, updateProduct } from '../../network/services/products';
import { AppState } from '../../configureStore';
import { productActions } from '../actions';

export default function* productEditorSaga(formData: ProductFormData) {
  try {
    const productId = yield select(
      (state: AppState) => state.products.editorModal.productId
    );

    if (productId) {
      yield call(updateProduct, productId, formDataToProduct(formData));
    } else {
      const result = yield call(createProduct, formDataToProduct(formData));
      const history = yield getContext('history');

      yield history.push(
        ROUTE_PATHS.PRODUCTS.BY_ID._({ productId: result.id })
      );
    }

    yield put(productActions.closeProductModal());
  } catch (err) {
    if (
      err.message.startsWith('Duplicate key value violates unique constraint')
    ) {
      throw new SubmissionError({
        name: 'Product with this name already exists'
      });
    }
  }
}
