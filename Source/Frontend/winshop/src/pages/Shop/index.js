import React from 'react';
import "./styles.scss";
import {useSelector} from 'react-redux'
import HandleImage from '../../utils/HandleImage';
import saleOff from '../../assets/images/saleOff.png'
import { Container } from '@material-ui/core';
import ShopFilter from './ShopFilter/ShopFilter';
import ShopProduct from './ShopProduct';

function Shop() {

  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }

  return (
    <section className='shop'  style={{background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff": ""}`}}>
       <section className='banner'>
          <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
       </section>
        <Container>
            <div className='shop__container'>
                <ShopFilter />
                <ShopProduct />
            </div>
        </Container>
    </section>
  )
}

export default Shop