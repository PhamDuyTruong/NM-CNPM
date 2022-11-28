import React, {useState} from 'react';
import ProductList from './ProductList';
import ShopHandle from './ShopHandle';
import "./styles.scss"

function ShopProduct() {
    const [isFlex, setIsFlex] = useState(false);
  return (
    <div className='shop-content'>
        <ShopHandle />
        <ProductList />
    </div>
  )
}

export default ShopProduct