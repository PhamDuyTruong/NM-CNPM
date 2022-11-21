import React from 'react';
import "./LastestProduct.scss";
import HandleImage from '../../../../utils/HandleImage'

function LastestProducts(props) {
    const {img, name, desc, price} = props
    return (
      <div className='home-product'>
          <div className='home-product__wrapper'>
              <img 
                 className='home-product__img'
                 src={HandleImage(img)}
                 alt="Home product"
                 height={240}
              />
              <button className='btn'>
                  <span>Best deal</span>
              </button>
          </div>
          <div className='home-product__content'>
              <h3 className='home-product__name'>{name.length > 20 ? name.substring(0, 20) + "..." : name}</h3>
              <p className='home-product__description'>{desc.length > 50 ? desc.substring(0, 50) + "..." : desc}</p>
              <div className='home-product__price'>${price}</div>
          </div>
      </div>
    )
}

export default LastestProducts