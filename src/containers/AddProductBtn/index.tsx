import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { productActions } from '../../store/products/actions';

type AddProductBtn = ButtonProps;

const AddProductBtn: React.FC<AddProductBtn> = props => {
  const { openAddProductModal } = bindActionCreators(
    productActions,
    useDispatch()
  );

  return (
    <Button type="primary" icon="plus" {...props} onClick={openAddProductModal}>
      Add product
    </Button>
  );
};

export default AddProductBtn;
