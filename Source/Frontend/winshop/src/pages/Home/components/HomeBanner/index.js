import React, {useEffect, useState} from 'react';
import Banner from './Banner';
import {BannerData} from "../../../../utils/fakeData"
import "./styles.scss"

function HomeBanner() {
  const [slide, setSlide] = useState(0);

  useEffect(() =>{
      const timer = setTimeout(() =>{
         if(slide < BannerData.length - 1){
           setSlide(slide + 1);
         }else{
           setSlide(0);
         }
      }, 5000);
      return clearTimeout(timer);
  });

  const handleDot = (id) =>{
      setSlide(id);
  }

  return (
    <section className="home-banners">
      <div className='slides'  style={{ transform: `translateX(${-100 * slide}%)` }}>
        {BannerData.map((banner, index) =>(
            <Banner key={index} {...banner}/>
        ))}
      </div>
      <div className='dots'>
        {Array(BannerData.length).fill().map((_, index) =>{
            return (
                <span onClick={() =>handleDot(index)} key={index} className={slide === index ? "dot active" : "dot"}>
                </span>
            )
        })}
      </div>
    </section>
  )
}

export default HomeBanner