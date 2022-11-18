import React from 'react';
import HomeBanner from './components/HomeBanner';
import HomeFeature from './components/HomeFeature';
import HomeWork from './components/HomeWork';


function Home() {
  return (
    <>
        <HomeBanner />
        <HomeWork />
        <HomeFeature />
    </>
  )
}

export default Home