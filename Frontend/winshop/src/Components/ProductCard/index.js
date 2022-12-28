import React from 'react';
import "./styles.scss";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {addToCart} from '../../actions/CartAction'

function ProductCard(props) {
    const dispatch = useDispatch();
    const {name, brand, price, image, ratings, _id} = props;
    const history = useHistory();

    const handleToDetail = (id) => {
        history.push(`/shop/${id}`);
    };


    const handleAddToCart = (id, qnt) => {
        dispatch(addToCart(id, qnt))
    }

  return (
    <div  className="shop-product">
        <div onClick={() => handleToDetail(_id)}  className='shop-product__img-wrapper'>
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
        <div onClick={() => handleAddToCart(_id, 1)}  className='shop-product__btn'>
            <ShoppingCartOutlinedIcon />
        </div>
    </div>
    <div className='shop-product__label'>Favourite</div>
</div>
  )
}

export default ProductCard