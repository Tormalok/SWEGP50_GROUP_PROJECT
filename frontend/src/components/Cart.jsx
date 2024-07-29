import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './styles/style.css';

const Cart = () => {
  return (
    <div className='cart-container'>
      <ShoppingCartIcon />
      <span>Cart</span>
    </div>
  );
};

export default Cart;
