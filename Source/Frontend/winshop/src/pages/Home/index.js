import React from 'react';
import Footer from '../../Components/Footer';
import HomeBanner from './components/HomeBanner';
import HomeFeature from './components/HomeFeature';
import HomeReview from './components/HomeReview';
import HomeSale from './components/HomeSale';
import HomeWork from './components/HomeWork';


function Home() {
  return (
    <>
        <HomeBanner />
        <HomeWork />
        <HomeFeature />
        {/* Products */}
        {/* Lastest Product */}
        <HomeSale />
        <HomeReview />
        <Footer />
    </>
  )
}

export default Home