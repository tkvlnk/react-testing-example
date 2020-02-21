import React, { useCallback } from 'react';
import { InjectedFormProps, WrappedFieldProps, Field } from 'redux-form';
import { Form, Input, Spin } from 'antd';
import {
  composeValidators,
  hasLengthBetween,
  isNumeric,
  isRequired
} from 'revalidate';
import { Product, ProductsOrigin } from '../../store/products';
import OriginsMenu from '../OriginsMenu';
import { createProduct } from '../../store/network/services/products';

export interface ProductFormData {
  name: string;
  price: string;
  origin: ProductsOrigin;
}

export type ProductFormProps = InjectedFormProps<ProductFormData>;

const ProductForm: React.FC<ProductFormProps> = props => {
  const { handleSubmit, submitting } = props;

  return (
    <Spin spinning={submitting}>
      <Form onSubmit={handleSubmit} data-testid="product-form">
        <Field
          validate={useCallback(
            composeValidators(isRequired, hasLengthBetween(3, 20))('Name'),
            []
          )}
          name="name"
          component={useCallback(
            ({ input, meta }: WrappedFieldProps) => (
              <Form.Item
                required
                label="Name"
                validateStatus={meta.touched && meta.error ? 'error' : ''}
                help={(meta.touched && meta.error) ?? ''}
              >
                <Input
                  {...input}
                  disabled={meta.submitting}
                  data-testid="product-form-name-field"
                />
              </Form.Item>
            ),
            []
          )}
        />

        <Field
          name="price"
          validate={useCallback(
            composeValidators(isRequired, isNumeric)('Price'),
            []
          )}
          component={useCallback(
            ({ input, meta }: WrappedFieldProps) => (
              <Form.Item
                required
                label="Price"
                validateStatus={meta.touched && meta.error ? 'error' : ''}
                help={(meta.touched && meta.error) ?? ''}
              >
                <Input
                  {...input}
                  type="number"
                  disabled={meta.submitting}
                  data-testid="product-form-price-field"
                />
              </Form.Item>
            ),
            []
          )}
        />

        <Field
          name="origin"
          validate={useCallback(isRequired('Origin'), [])}
          component={useCallback(
            ({ input, meta }: WrappedFieldProps) => (
              <Form.Item
                required
                label="Origin"
                validateStatus={meta.touched && meta.error ? 'error' : ''}
                help={(meta.touched && meta.error) ?? ''}
              >
                <OriginsMenu
                  data-testid="product-form-origin-field"
                  value={input.value}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  disabled={meta.submitting}
                />
              </Form.Item>
            ),
            []
          )}
        />

        <input
          type="submit"
          style={{
            display: 'none'
          }}
        />
      </Form>
    </Spin>
  );
};

export default ProductForm;

export function formDataToProduct(
  formData: ProductFormData
): Parameters<typeof createProduct>[0] {
  return {
    ...formData,
    price: parseFloat(formData.price)
  };
}

export function productToFormData(product: Product): ProductFormData {
  return {
    ...product,
    price: product?.price.toString()
  };
}
