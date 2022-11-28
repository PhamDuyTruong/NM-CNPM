import React from 'react';
import "./styles.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function ProductCard(props) {
    const {name, brand, price, image, ratings} = props
  return (
    <div  className="shop-product">
        <div  className='shop-product__img-wrapper'>
        <LazyLoadImage  
           effect='blur'
           src={image}
           className="shop-product__img"
           alt={name}
           width="100%"
           height="100%"
        >
        </LazyLoadImage>
        <div className='shop-product__rate'>
            <StarIcon />
            <span>{ratings}</span>
        </div>
        </div>

    <div  className='shop-product__content'>
        <div className='shop-product__name'>{name}</div>
        <p className='shop-product__description'>{brand}</p>
        <div className='shop-product__row'>
            <div className='shop-product__price'>$ {price}</div>
        </div>
    </div>

    <div className='shop-product__btns'>
        <div  className='shop-product__btn'>
            <FavoriteBorderIcon />
        </div>
        <div  className='shop-product__btn'>
            <ShoppingCartOutlinedIcon />
        </div>
    </div>
    <div className='shop-product__label'>Favourite</div>
</div>
  )
}

export default ProductCard