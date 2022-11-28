import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./ProductList.scss";
import {getProductAll, getProductView} from '../../../actions/ProductAllAction';
import ShopEmpty from './ShopEmpty';
import ProductCard from '../../../Components/ProductCard'

function ProductList() {
    const dispatch = useDispatch();
    const {shopProducts} = useSelector((state) => state.getProductList);

    useEffect(() => {
        dispatch(getProductAll());
    }, []);

  return (
    <>
        {shopProducts.length <= 0 && <ShopEmpty />}
        <div
           className={
           // shopProductsView === 'list'
             //? 'shop-products display-flex'
              'shop-products'
          }
        >
            {shopProducts && shopProducts.map((item) => (
                <ProductCard  key={item.id} {...item}/>
            ))}
        </div>
    </>
  )
}

export default ProductList