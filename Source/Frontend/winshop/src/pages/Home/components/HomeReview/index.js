import React, {useEffect, useRef, useState} from 'react';
import "./styles.scss";
import gsap from "gsap";
import { Container } from "@material-ui/core";
import {useSelector} from 'react-redux'
import HandleImage from '../../../../utils/HandleImage';
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import {ReviewData} from '../../../../utils/fakeData';

SwiperCore.use([Autoplay, Pagination]);

function HomeReview() {
    const {darkTheme} = useSelector((state) => state.sidebar);
  
    let containerRef = useRef(null);
    useEffect(() =>{
        const line = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef,
                start: "center bottom"
            }
        });

        line.from(containerRef, { y: -20, opacity: 0, duration: 0.8 });
    }, []);

    const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
    let isTheme = darkTheme;
    if(!darkTheme){
      isTheme = ThemeInLocal
    }
    

  return (
    <section className='home-reviews'>
            <Container ref={(el) =>containerRef = el}>
            <Swiper
               speed={500}
               spaceBetween={20}
               loop
               grabCursor={true}
               pagination={{clickable: true}}
               autoplay={{
                delay: 8000,
                disableOnInteraction: false
               }}
            >   
                {ReviewData.map(({img, name, role, comment}, index)=>(
                    <SwiperSlide key={index}>
                        <div className='home-reviews__content'  style={{color: `${isTheme ? "#fff": ""}`}}>
                            <div className='home-reviews__img-wrapper'>
                                <img 
                                   src={HandleImage(img)}
                                   alt="image"
                                   className='home-reviews__img'
                                />
                            </div>
                            <div className="home-reviews__name" style={{color: `${isTheme ? "#fff": ""}`}}>{name}</div>
                            <div className="home-reviews__role"  style={{color: `${isTheme ? "#fff": ""}`}}>{role}</div>
                            <p className="home-reviews__comment">{comment}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>

    </section>
  )
}

export default HomeReview