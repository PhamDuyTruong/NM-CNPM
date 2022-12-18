import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./ProductList.scss";
import {getProductAll, getProductView} from '../../../actions/ProductAllAction';
import ShopEmpty from './ShopEmpty';
import ProductCard from '../../../Components/ProductCard';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProductList() {
    const [noOfEle, setNoOfEle] = useState(9);

    const dispatch = useDispatch();
    const {shopProducts, isLoading} = useSelector((state) => state.getProductList);
    const dataSlice = shopProducts.slice(0, noOfEle);
    useEffect(() => {
        dispatch(getProductAll());
    }, []);

    const handleLoadMore = () => {
      setNoOfEle(noOfEle + noOfEle)
    }
    if (isLoading) {
      return (
        <div className='spinner'>
          <CircularProgress thickness={5} style={{ color: "#E84C51"}} />
        </div>
      );
    }
  return (
    <>
        {shopProducts.length <= 0 && <ShopEmpty />}
        <div
           className={
              'shop-products'
          }
        >
            {shopProducts && dataSlice.map((item) => (
                <ProductCard  key={item._id} {...item}/>
            ))}
          
        </div>
        <button className='btn btn-primary d-block w-100' onClick={() => handleLoadMore()}>
              View more
        </button>
    </>
  )
}

export default ProductList