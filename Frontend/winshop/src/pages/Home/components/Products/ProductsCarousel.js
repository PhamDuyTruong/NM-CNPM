import React, {useState} from 'react';
import ProductCard from './ProductCard';
import "./style.css";
import { Grid, useMediaQuery } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIos';

function ProductsCarousel({productList}) {
  const [current, setCurrent] = useState(0);
    let totalItems = 1;
  if (useMediaQuery("(min-width:800px)")) {
    totalItems = 2;
  }
  if (useMediaQuery("(min-width:1000px)")) {
    totalItems = 3;
  }
  if (useMediaQuery("(min-width:1204px)")) {
    totalItems = 4;
  }
  if (useMediaQuery("(min-width:1450px)")) {
    totalItems = 5;
  }
  if (useMediaQuery("(min-width:1632px)")) {
    totalItems = 6;
  };



  let productsLength = productList.length;
  if(productsLength <= totalItems){
    totalItems = productsLength;
  }

  let groupItems = productList.length / totalItems;

  let groupList = [];
  for (let i = 0; i <= groupItems; i++) {
    groupList.push(i);
  }

  const nextSlide = () => {
    setCurrent(current === groupList.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? groupList.length - 1 : current - 1);
  }

  if (!Array.isArray(productList) || productsLength <= 0) {
    return null;
  }

  const ProductItems = ({index, productList}) => {
    let itemStart = index * totalItems;
    let itemEnd = itemStart + totalItems;
    if(itemEnd > productsLength){
        itemEnd = productsLength;
        itemStart = productsLength - totalItems;
    }
    let items = [];
    for(let i = itemStart; i < itemEnd;i++){
        const product = productList[i];
        const productItem = (
            <Grid item key={i}>
                <ProductCard product={product}/>
            </Grid>
        );
        items.push(productItem);
    }

    return (
          <Grid container justifyContent="center" spacing={2}>
            {items}
          </Grid>
    )
  }


  return (
    <div  style={{ color: "#494949" }}>
        <section className='slider'>
           <ArrowBackIosNewIcon  className="left-arrow" onClick={prevSlide}/>
           <ArrowForwardIosIcon className="right-arrow" onClick={nextSlide}/>
            {groupList.map((product, index) => (
              index === current && (<ProductItems key={index} index={index} productList={productList}/>)
             ))}
        </section>
    </div>
  )
}

export default ProductsCarousel