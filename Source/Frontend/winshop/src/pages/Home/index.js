import React from 'react';
import Products from './components/Products';
import HomeBanner from './components/HomeBanner';
import HomeFeature from './components/HomeFeature';
import HomeReview from './components/HomeReview';
import HomeSale from './components/HomeSale';
import HomeWork from './components/HomeWork';
import HomeLastest from './components/HomeLastest';
import {useSelector} from 'react-redux'

function Home() {
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }
  return (
    <div style={{background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff !important": ""}`}}>
        <HomeBanner />
        <HomeWork />
        <HomeFeature />
        {/* Products */}
        <Products />
        {/* Lastest Product */}
        <HomeSale />
        <HomeLastest />
        <hr />
        <HomeReview />
    </div>
  )
}

export default Home