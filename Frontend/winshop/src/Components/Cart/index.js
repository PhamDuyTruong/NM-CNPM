import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./styles.scss";
import {getShowCart} from '../../actions/SidebarAction';
import CartHandle from './CartHandle/CartHandle';
import EmptyCartImg from '../../assets/images/empty-cart.png'
import CartItems from './CartItems';

function Cart() {
    const {isShowCart} = useSelector((state) => state.sidebar);
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const closeCart = () =>{
        const action = getShowCart(false);
        dispatch(action);
    };

  return (
    <div className={isShowCart ? 'cart active' : 'cart'}>
        <div onClick={closeCart} className='cart__overlay'></div>
        <div className='cart__container'>
            <div className='cart__heading'>
                <h2>Shopping Cart</h2>
                <div className={!isShowCart ? 'cart__close active' : 'cart__close'} onClick={closeCart}></div>
            </div>
            {cartItems.length <= 0 && (
                <>
                    <img src={EmptyCartImg} width={200} height={200} style={{margin: "0 auto"}}></img>
                </> 
            )}
            <CartItems />
            <CartHandle />
        </div>
    </div>
  )
}

export default Cart