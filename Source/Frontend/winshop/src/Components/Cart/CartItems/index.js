import React from 'react'
import {useSelector} from 'react-redux'
import CartItem from '../CartItems/CartItem';
import "./styles.scss"

function CartItems() {
    const {cartItems} = useSelector((state) => state.cart);
  return (
    <div className='cart-items'>
    {cartItems.map((product) =>(
      <CartItem 
         key={product.product}
         productCart={product}
      />
    ))}
    </div>
  )
}

export default CartItems