import React from 'react';
import Footer from '../../Components/Footer';
import Products from './components/Products';
import HomeBanner from './components/HomeBanner';
import HomeFeature from './components/HomeFeature';
import HomeReview from './components/HomeReview';
import HomeSale from './components/HomeSale';
import HomeWork from './components/HomeWork';
import HomeLastest from './components/HomeLastest';


function Home() {
  return (
    <>
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
        <Footer />
    </>
  )
}

export default Home