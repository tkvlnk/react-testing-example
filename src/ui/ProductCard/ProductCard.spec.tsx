import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from './index';
import { buildProduct } from '../../__mocks__/product';
import { Product } from '../../store/products';

describe('<ProductCard />', () => {
  let productMock: Product;

  beforeEach(() => {
    productMock = buildProduct();
  });

  it('card has products name', () => {
    const renderResult = render(<ProductCard product={productMock} />);

    const prodNameEl = renderResult.getByText(productMock.name);

    expect(prodNameEl).not.toBeNull();

    const editableIconEl = renderResult.queryByTestId('product-card-edit-icon');

    expect(editableIconEl).toBeNull();
  });

  it('card has edit icon if editable variant prop provided', () => {
    const renderResult = render(
      <ProductCard product={productMock} variant="editable" />
    );

    const editableIconEl = renderResult.getByTestId('product-card-edit-icon');

    expect(editableIconEl).not.toBeNull();
  });

  it('prop onShoppingCartClick is called with product after click by corresponding icon', () => {
    const mockHandler = jest.fn();

    const renderResult = render(
      <ProductCard
        product={productMock}
        variant="search"
        onShoppingCartClick={mockHandler}
      />
    );

    const cartEl = renderResult.getByTestId('product-card-shopping-cart-icon');

    expect(cartEl).not.toBeNull();

    expect(mockHandler).toBeCalledTimes(0);

    fireEvent.click(cartEl);

    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toBeCalledWith(productMock);
  });
});
