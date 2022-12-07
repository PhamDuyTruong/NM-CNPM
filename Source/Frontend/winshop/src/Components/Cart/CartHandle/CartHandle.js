import React, {useState} from 'react'
import "./styles.scss";
import {Link} from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import useTotalPrice from '../../../utils/customPrice'
import { Button } from '@material-ui/core';

function CartHandle() {
    const [isActive, setIsActive] = useState(false);
    const {totalPrice, discount} = useTotalPrice();
    const toggleDropUp = () =>{
        setIsActive(!isActive);
     };
  
  return (
    <div className='cart-handle'>
         <div onClick={toggleDropUp} className='cart-handle__dropup'></div>
       <div className={ isActive ? "cart-handle__detail active" : "cart-handle__detail"}>
          <h3 className="cart-handle__detail-title">Information</h3>
          <div className='cart-handle__row'>
             <span className='cart-handle__label'>Discount</span>
             <span className='cart-handle__content'>${discount}</span>
          </div>
          <div className='cart-handle__row'>
             <span className='cart-handle__label'>Shipping Cost</span>
             <span className='cart-handle__content'>Free</span>
          </div>
          <div className='cart-handle__row'>
             <span className='cart-handle__label'>Voucher</span>
             <span className='cart-handle__content'>None</span>
          </div>
       </div>
       <div className='cart-handle__total'>
            <span className='cart-handle__txt'>Total</span>
            <span className='cart-handle__price'>${totalPrice}</span>
       </div>
        <Button className='primary-btn cart-handle__btn'>
            <Link to="/shop">
                    <StoreMallDirectoryIcon />
                    <span>Buy more</span>
            </Link>
        </Button>
    </div>
  )
}

export default CartHandle