import React from 'react';
import HomeBanner from './components/HomeBanner';
import HomeFeature from './components/HomeFeature';
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
    </>
  )
}

export default Home