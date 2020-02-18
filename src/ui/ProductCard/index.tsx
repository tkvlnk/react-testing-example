import React from 'react';
import { Card, Descriptions, Icon } from 'antd';
import { DateTime } from 'luxon';
import { Product } from '../../store/products';

type ClickHandler = (product: Product) => void;

interface ProductCardProps {
  product: Product;
  variant?: 'search' | 'editable';
  details?: boolean;
  onLinkClick?: ClickHandler;
  onEditClick?: ClickHandler;
  onShoppingCartClick?: ClickHandler;
  onDeleteClick?: ClickHandler;
}

const ProductCard: React.FC<ProductCardProps> = props => {
  const {
    details = false,
    product,
    variant,
    onLinkClick = () => null,
    onEditClick = () => null,
    onShoppingCartClick = () => null,
    onDeleteClick = () => null
  } = props;

  const actions = [];

  if (variant === 'search') {
    actions.push(
      <Icon onClick={() => onShoppingCartClick(product)} type="shopping-cart" />
    );
  }

  if (variant === 'editable') {
    actions.push(
      <Icon onClick={() => onEditClick(product)} type="edit" />,
      <Icon onClick={() => onDeleteClick(product)} type="delete" />
    );
  }

  if (!details) {
    actions.push(<Icon onClick={() => onLinkClick(product)} type="link" />);
  }

  return (
    <Card title={product.name} actions={actions}>
      <Descriptions>
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Origin">{product.origin}</Descriptions.Item>
        {details && (
          <>
            <Descriptions.Item label="Created">
              {DateTime.fromISO(product.createdAt).toFormat(
                'dd.MM.yyyy HH:mm',
                {
                  localeMatcher: 'en'
                }
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Updated">
              {DateTime.fromISO(product.updatedAt).toFormat(
                'dd.MM.yyyy HH:mm',
                {
                  localeMatcher: 'en'
                }
              )}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Card>
  );
};

export default ProductCard;
