import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from './index';
import { buildProduct } from '../../__mocks__/product';
import { Product } from '../../store/products';

describe('<ProductCard />', () => {
  let mockProduct: Product;

  beforeEach(() => {
    mockProduct = buildProduct();
  });

  it('renders without errors', () => {
    const { queryAllByText, queryByTestId } = render(
      <div>
        <ProductCard product={mockProduct} />
      </div>
    );

    expect(queryAllByText(mockProduct.name)).not.toBeNull();
    expect(queryAllByText(mockProduct.price.toString())).not.toBeNull();
    expect(queryByTestId('product-card')).not.toBeNull();
  });

  it('has edit and delete in editable variant', () => {
    const { queryByTestId } = render(
      <div>
        <ProductCard product={mockProduct} variant="editable" />
      </div>
    );

    expect(queryByTestId('product-edit-icon')).not.toBeNull();
    expect(queryByTestId('product-delete-icon')).not.toBeNull();
  });

  it('has details link', () => {
    const handleLinkClickMock = jest.fn();

    const { getByTestId } = render(
      <div>
        <ProductCard product={mockProduct} onLinkClick={handleLinkClickMock} />
      </div>
    );

    const linkIcon = getByTestId('product-link-icon');

    expect(linkIcon).not.toBeNull();

    fireEvent.click(linkIcon);

    expect(handleLinkClickMock).toBeCalledTimes(1);
    expect(handleLinkClickMock).toBeCalledWith(mockProduct);
  });

  it('has details no link with details props', () => {
    const { queryByTestId } = render(
      <div>
        <ProductCard product={mockProduct} details />
      </div>
    );

    expect(queryByTestId('product-link-icon')).toBeNull();
  });
});
