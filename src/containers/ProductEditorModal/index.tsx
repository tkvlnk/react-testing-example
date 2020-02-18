import React from 'react';
import { Button, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { reduxForm } from 'redux-form';
import ProductForm, { ProductFormData } from '../ProductForm';
import useProductEditorModal from './hook';

type ProductEditorModalProps = ModalProps;

export const PRODUCT_EDITOR_MODAL_FORM_ID = 'productEditorModalForm';

const EditorModalForm = reduxForm<ProductFormData>({
  form: PRODUCT_EDITOR_MODAL_FORM_ID
})(ProductForm);

const ProductEditorModal: React.FC<ProductEditorModalProps> = props => {
  const {
    isCreating,
    isOpen,
    handleModalClose,
    initialValues,
    handleSubmit,
    resetForm,
    submitForm,
    isFormSubmitting,
    isFormPristine,
    isFormValid
  } = useProductEditorModal(PRODUCT_EDITOR_MODAL_FORM_ID);

  return (
    <Modal
      {...props}
      destroyOnClose
      title={isCreating ? 'Add product' : 'Edit product'}
      visible={isOpen}
      onCancel={handleModalClose}
      footer={[
        isCreating ? (
          <Button
            key="back"
            onClick={handleModalClose}
            disabled={isFormSubmitting}
          >
            Cancel
          </Button>
        ) : (
          <Button
            key="back"
            onClick={resetForm}
            disabled={isFormSubmitting || isFormPristine}
          >
            Reset
          </Button>
        ),
        <Button
          key="submit"
          type="primary"
          loading={isFormSubmitting}
          onClick={submitForm}
          disabled={isFormPristine || !isFormValid}
        >
          Submit
        </Button>
      ]}
    >
      <EditorModalForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default ProductEditorModal;
