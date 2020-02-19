import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import AppWrapper, { store } from '../../app/AppWrapper';
import { productActions } from '../../store/products/actions';
import {
  buildProduct,
  getProductsOriginDisplayName
} from '../../__mocks__/product';
import { Product, ProductsOriginData } from '../../store/products';
import ProductEditorModal from './index';
import productOriginsRes from '../../__mocks__/product-origins.response.json';
import { networkActions } from '../../store/network/actions';
import { Endpoint } from '../../store/network/constants';
import httpClient from '../../store/network/httpClient';

const productOrigins = productOriginsRes.items as ProductsOriginData[];

const requestSpy = jest.spyOn(httpClient, 'request');

describe('<ProductEditorModal />', () => {
  let mockProduct: Product;

  beforeEach(() => {
    mockProduct = buildProduct();

    store.dispatch(productActions.originsFetchSuccess(productOrigins));
    store.dispatch(
      networkActions.apiCallSuccess({
        res: {
          data: mockProduct
        } as AxiosResponse,
        endpoint: Endpoint.FetchProductDetails
      })
    );
    store.dispatch(productActions.openEditProductModal(mockProduct.id));
  });

  it('should render modal with form prefilled with product data', () => {
    const { getByTestId, getByText, getByDisplayValue } = render(
      <ProductEditorModal />,
      {
        wrapper: AppWrapper
      }
    );

    const form = getByTestId('product-form');

    expect(form).not.toBeNull();

    const nameField = getByDisplayValue(mockProduct.name);

    expect(nameField).not.toBeNull();
    expect(getByDisplayValue(mockProduct.price.toString())).not.toBeNull();
    expect(
      getByText(
        getProductsOriginDisplayName(mockProduct.origin, productOrigins)
      )
    ).not.toBeNull();

    const editedName = `${mockProduct.name.substring(0, 10)}_EDITED!`;

    fireEvent.change(nameField, {
      target: {
        value: editedName
      }
    });

    fireEvent.submit(form);

    expect(requestSpy).toBeCalledTimes(1);

    expect(requestSpy.mock.calls[0][0]).toMatchObject({
      method: 'patch',
      url: `/products/${mockProduct.id}`,
      data: {
        product: {
          name: editedName,
          price: mockProduct.price,
          origin: mockProduct.origin
        }
      }
    });
  });
});
