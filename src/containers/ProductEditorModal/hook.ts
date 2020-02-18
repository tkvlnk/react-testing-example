import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { isPristine, isSubmitting, isValid, reset, submit } from 'redux-form';
import { useCallback, useMemo } from 'react';
import { AppState } from '../../store/configureStore';
import { getProductById } from '../../store/products/selectors';
import { productActions } from '../../store/products/actions';
import { useRunSaga } from '../../app/AppWrapper';
import productEditorSaga from '../../store/products/saga/productEditorSaga';
import { productToFormData } from '../ProductForm';

export default function useProductEditorModal(formId: string) {
  const { isOpen, productId } = useSelector(
    (state: AppState) => state.products.editorModal,
    shallowEqual
  );

  const product = useSelector(
    productId ? getProductById(productId) : () => null
  );

  const {
    resetForm,
    submitForm,
    isFormSubmitting,
    isFormPristine,
    isFormValid
  } = useForm(formId);

  const dispatch = useDispatch();

  const closeProductModal = useCallback(
    () => dispatch(productActions.closeProductModal()),
    []
  );

  const handleModalClose = useCallback(() => {
    if (isFormSubmitting) {
      return;
    }

    closeProductModal();
  }, [isFormSubmitting]);

  const handleSubmit = useRunSaga(productEditorSaga);

  return {
    isCreating: !productId,
    initialValues: product ? productToFormData(product) : {},
    resetForm,
    submitForm,
    isFormSubmitting,
    isFormPristine,
    isFormValid,
    handleSubmit,
    handleModalClose,
    isOpen
  };
}

function useForm(form: string) {
  const dispatch = useDispatch();

  const { resetForm, submitForm } = useMemo(
    () => ({
      resetForm: () => dispatch(reset(form)),
      submitForm: () => dispatch(submit(form))
    }),
    [dispatch, form]
  );

  const isFormSubmitting = useSelector(isSubmitting(form));

  const isFormPristine = useSelector(isPristine(form));

  const isFormValid = useSelector(isValid(form));

  return {
    resetForm,
    submitForm,
    isFormSubmitting,
    isFormPristine,
    isFormValid
  };
}
