import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import CartItem from '../CartItems/CartItem';
import {removeFromCart} from '../../../actions/CartAction'
import "./styles.scss"
function CartItems() {
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemoveCart = (id) => {
        dispatch(removeFromCart(id))
    }
  return (
    <div className='cart-items'>
    {cartItems.map((item) =>(
      <CartItem 
         key={item.name}
         productCart={item}
         handleRemoveCart = {() => handleRemoveCart(item.product)}
      />
    ))}
    </div>
  )
}

export default CartItems