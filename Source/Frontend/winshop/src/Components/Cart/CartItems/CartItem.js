import React, {useEffect} from 'react';
import "./CartItem.scss";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import HandleImage from '../../../utils/HandleImage';

function CartItem({productCart, handleRemoveCart}) {
    const {product, image,  name, price, qnt, countInStock} = productCart;
    
  return (
    <div id={product} className='cart-item'>
    <div className='cart-item__img'>
        <img src={HandleImage(image)} alt="Cart"/>
    </div>
    <div className='cart-item__content'>
        <div className='cart-item__name'>{name}</div>
        <div className='cart-item__price'>${price}</div>
        <div className='cart-item__count'>In Stock: {countInStock}</div>
        <div className='cart-item__handle'>
            <span className='cart-item__qnt'>Number: {qnt}</span>
        </div>
    </div>
    <Button className='cart-item__rm' onClick={handleRemoveCart}>
        <DeleteOutlineIcon />
    </Button>
</div>
  )
}

export default CartItem