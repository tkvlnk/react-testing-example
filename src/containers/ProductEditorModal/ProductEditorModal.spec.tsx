import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { AxiosResponse } from 'axios';
import ProductEditorModal from './index';
import AppWrapper, { store } from '../../app/AppWrapper';
import { buildProduct } from '../../__mocks__/product';
import productOriginsResponse from '../../__mocks__/products-origins.respose.json';
import { Product, ProductsOriginData } from '../../store/products';
import { productActions } from '../../store/products/actions';
import { networkActions } from '../../store/network/actions';
import { Endpoint } from '../../store/network/constants';
import httpClient from '../../store/network/httpClient';

const requestSpy = jest.spyOn(httpClient, 'request');

describe('<ProductEditorModal />', () => {
  let productMock: Product;

  beforeEach(() => {
    productMock = buildProduct();
    store.dispatch(
      productActions.originsFetchSuccess(
        // @ts-ignore
        productOriginsResponse.items as ProductsOriginData[]
      )
    );
    store.dispatch(productActions.openEditProductModal(productMock.id));
    store.dispatch(
      networkActions.apiCallSuccess({
        endpoint: Endpoint.FetchProductDetails,
        res: {
          data: productMock
        } as AxiosResponse
      })
    );
  });

  it('calls on submit if values are valid', () => {
    const rr = render(<ProductEditorModal />, {
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

    fireEvent.change(nameFieldEl, {
      target: {
        value: 'EDITED!!'
      }
    });

    fireEvent.submit(formEl);

    expect(requestSpy).toBeCalledTimes(1);
    expect(requestSpy.mock.calls[0][0]).toMatchObject({
      method: 'patch',
      url: `/products/${productMock.id}`,
      data: {
        product: {
          name: 'EDITED!!',
          price: productMock.price,
          origin: productMock.origin
        }
      }
    });
  });
});
