import React, {useState} from 'react'
import "./styles.scss";
import {Link} from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import useTotalPrice from '../../../utils/customPrice'
import { Button } from '@material-ui/core';

function CartHandle() {
    const {totalPrice, discount} = useTotalPrice();
  
  return (
    <div className='cart-handle'>
      <h3 className="cart-handle__detail-title" style={{textAlign: "center"}}>Information</h3>
       <div className='cart-handle__row'>
             <span className='cart-handle__label' style={{color: "black"}}>Discount</span>
             <span className='cart-handle__content'>${discount}</span>
      </div>
      <div className='cart-handle__row'>
             <span className='cart-handle__label'>Shipping Cost</span>
             <span className='cart-handle__content'>Free</span>
      </div>
       <div className='cart-handle__total'>
            <span className='cart-handle__txt'>Total</span>
            <span className='cart-handle__price'>${totalPrice}</span>
       </div>
        <Button className='primary-btn red cart-handle__btn' style={{marginRight: "10px"}}>
            <Link to="/shop" style={{textDecoration: "none", color: "#FEFCF3"}}>
                <StoreMallDirectoryIcon />
                <span style={{color: "#FEFCF3"}}>Buy more</span>
            </Link>
        </Button>
        <Button className='primary-btn red cart-handle__btn cart-handle__btn--checkout'>
            <Link to="/checkout" style={{textDecoration: "none", color: "#FEFCF3"}}>
                  <ShoppingCartIcon />
                  <span>Checkout</span>
            </Link>
        </Button>
    </div>
  )
}

export default CartHandle