import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reduxForm } from 'redux-form';
import ProductForm, { ProductFormData } from './index';
import AppWrapper, { store } from '../../app/AppWrapper';
import { buildProductFormData } from '../../__mocks__/product';
import { productActions } from '../../store/products/actions';
import productOriginsRes from '../../__mocks__/product-origins.response.json';
import { ProductsOriginData } from '../../store/products';

const ConnectedForm = reduxForm<ProductFormData>({
  form: 'testForm'
})(ProductForm);

describe('<ProductForm />', () => {
  beforeAll(() => {
    store.dispatch(
      productActions.originsFetchSuccess(
        productOriginsRes.items as ProductsOriginData[]
      )
    );
  });

  it('fills and submits form', () => {
    const mockFormData = buildProductFormData();

    const handleSubmitMock = jest.fn();

    const { getByTestId, getByText, getByDisplayValue } = render(
      <div>
        <ConnectedForm onSubmit={handleSubmitMock} />
      </div>,
      {
        wrapper: AppWrapper
      }
    );

    const form = getByTestId('product-form');
    const nameField = getByTestId('product-form-field-name');
    const priceField = getByTestId('product-form-field-price');
    const originField = getByTestId('product-form-field-origin');

    expect(form).not.toBeNull();
    expect(nameField).not.toBeNull();
    expect(priceField).not.toBeNull();
    expect(originField).not.toBeNull();

    fireEvent.change(nameField, {
      target: {
        value: mockFormData.name
      }
    });

    fireEvent.change(priceField, {
      target: {
        value: mockFormData.price
      }
    });

    expect(getByDisplayValue(mockFormData.name)).not.toBeNull();
    expect(getByDisplayValue(mockFormData.price)).not.toBeNull();

    fireEvent.click(originField);

    const optionEl = getByText(
      productOriginsRes?.items?.find(
        ({ value }) => value === mockFormData.origin
      )?.displayName || 'non-existing-origin'
    );

    fireEvent.click(optionEl);

    fireEvent.submit(form);

    expect(handleSubmitMock).toBeCalledTimes(1);
    expect(handleSubmitMock).toBeCalledWith(
      mockFormData,
      expect.any(Function),
      expect.any(Object)
    );
  });
});
