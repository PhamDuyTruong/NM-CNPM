import React from 'react';
import "./ShopEmpty.scss";
import HandleImage from '../../../utils/HandleImage'
import EmptyShop from '../../../assets/images/empty-shop.svg';

function ShopEmpty() {
  return (
    <div className='shop-empty'>
        <img src={HandleImage(EmptyShop)} alt="Empty-shop-img"/>
        <h2 className='shop-empty__title'>
        There is no product you looking for
        </h2>
    </div>
  )
}

export default ShopEmpty