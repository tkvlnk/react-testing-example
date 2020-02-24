import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { reduxForm } from 'redux-form';
import ProductForm, { ProductFormData } from './index';
import AppWrapper, { store } from '../../app/AppWrapper';
import { buildProductDto } from '../../__mocks__/product';
import productOriginsResponse from '../../__mocks__/products-origins.respose.json';
import { ProductsOrigin, ProductsOriginData } from '../../store/products';
import { productActions } from '../../store/products/actions';

const EditorModalForm = reduxForm<ProductFormData>({
  form: 'unitTestForm'
})(ProductForm);

describe('<ProductForm />', () => {
  let productDtoMock: ProductFormData;

  beforeEach(() => {
    productDtoMock = buildProductDto();
    store.dispatch(
      productActions.originsFetchSuccess(
        // @ts-ignore
        productOriginsResponse.items as ProductsOriginData[]
      )
    );
  });

  it('calls on submit if values are valid', () => {
    const handleSubmitMock = jest.fn();

    const rr = render(<EditorModalForm onSubmit={handleSubmitMock} />, {
      wrapper: AppWrapper
    });

    const formEl = rr.getByTestId('product-form');

    expect(formEl).not.toBeNull();

    const nameFieldEl = rr.getByTestId('product-form-name-field');
    const priceFieldEl = rr.getByTestId('product-form-price-field');
    const originFieldEl = rr.getByTestId('product-form-origin-field');

    expect(nameFieldEl).not.toBeNull();
    expect(priceFieldEl).not.toBeNull();
    expect(originFieldEl).not.toBeNull();

    fireEvent.submit(formEl);

    expect(handleSubmitMock).toBeCalledTimes(0);

    fireEvent.change(nameFieldEl, {
      target: {
        value: productDtoMock.name
      }
    });

    fireEvent.change(priceFieldEl, {
      target: {
        value: productDtoMock.price
      }
    });

    fireEvent.click(originFieldEl);

    const originOptionEl = rr.getByText(
      originToDisplayName(productDtoMock.origin)
    );

    fireEvent.click(originOptionEl);

    fireEvent.submit(formEl);

    expect(handleSubmitMock).toBeCalledTimes(1);
    expect(handleSubmitMock).toBeCalledWith(
      productDtoMock,
      expect.any(Function),
      expect.any(Object)
    );
  });
});

function originToDisplayName(origin: ProductsOrigin): string {
  // @ts-ignore
  return productOriginsResponse.items.find(({ value }) => value === origin)
    ?.displayName;
}
