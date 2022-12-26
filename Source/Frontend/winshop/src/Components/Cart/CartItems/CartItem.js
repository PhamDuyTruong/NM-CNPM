import React, {useEffect, useState} from 'react';
import "./CartItem.scss";
import { Button } from "@material-ui/core";
import {useDispatch} from 'react-redux'
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import HandleImage from '../../../utils/HandleImage';
import {addToCart} from '../../../actions/CartAction';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function CartItem({productCart, handleRemoveCart}) {
    const {product, image,  name, price, qnt, countInStock} = productCart;
    const [quantity, setQnt] = useState(qnt);
    const dispatch = useDispatch();
    const handleDecreaseQnt = () => {
        quantity > 1 && setQnt(quantity - 1);
       
      }
     const handleIncreaseQnt= () => {
        setQnt(quantity + 1);
      }

      useEffect(() => {
        dispatch(addToCart(product, quantity))
      }, [quantity]);
      
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
            <Button
            onClick={handleDecreaseQnt}
          >
            <RemoveIcon />
          </Button>
          <span className="cart-item__qnt">{quantity}</span>
          <Button
            onClick={handleIncreaseQnt}
          >
            <AddIcon />
          </Button>
        </div>
    </div>
    <Button className='cart-item__rm' onClick={handleRemoveCart}>
        <DeleteOutlineIcon />
    </Button>
</div>
  )
}

export default CartItem