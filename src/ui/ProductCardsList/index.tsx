import React from 'react';
import { Product } from '../../store/products';
import sm from './styles.module.scss';

interface ProductCardsListProps {
  list: Product[];
  renderItem: (item: ProductCardsListProps['list'][number]) => React.ReactNode;
}

const ProductCardsList: React.FC<ProductCardsListProps> = props => {
  const { list, renderItem } = props;

  return (
    <div className={sm.List}>
      {list.map(product => (
        <div key={product.id} className={sm.ListItem}>
          {renderItem(product)}
        </div>
      ))}
    </div>
  );
};

export default ProductCardsList;
