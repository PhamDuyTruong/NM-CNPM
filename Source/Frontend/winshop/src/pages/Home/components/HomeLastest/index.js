import React, {useRef, useEffect} from 'react';
import "./styles.scss";
import {useDispatch, useSelector} from 'react-redux';
import gsap from "gsap";
import { Container } from "@material-ui/core";
import {getProducts} from '../../../../actions/ProductAction';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import LastestProducts from './LastestProducts';
import "swiper/components/pagination/pagination.scss";

import "../../../../assets/styles/_typography.scss";


SwiperCore.use([Autoplay, Pagination])

function HomeLastest() {
    const {products, isLoading} = useSelector((state) => state.getProducts);
    console.log(products);
    let containerRef = useRef(null);
    let captionRef = useRef(null);
    let headingRef = useRef(null);
    let cardRef = useRef(null);
    const dispatch = useDispatch();
  
    useEffect(() =>{
        //   const line = gsap.timeline({
        //       scrollTrigger: {
        //           trigger: containerRef,
        //           start: "60% bottom"
        //       }
        //   });
        //   line.from(captionRef, { x: 20, opacity: 0, duration: 0.8 }, "-=0.2")
        //   .from(headingRef, { x: -20, opacity: 0, duration: 0.8 }, "-=0.2")
        //   .from(cardRef, { y: 20, opacity: 0, duration: 0.8 }, "-=0.2");

    },[]);

    useEffect(() => {
        dispatch(getProducts());
    }, [getProducts])

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }



  return (
    <section ref={(el) => containerRef = el} className="home-products">
        <Container>
            <h2 ref={(el) => headingRef = el} className="primary-heading-text" style={{fontSize: "2.5rem"}}>
               Lastest Products
            </h2>
            <div ref={(el) => cardRef = el} className="home-products__container">
            <Swiper
                   loop
                   speed={800}
                   pagination={{clickable: true}}
                   autoplay={{
                     delay: 5000,
                     disableOnInteraction: false
                   }}
                   breakpoints={{
                    0: {
                      slidesPerView: 1,
                      pagination: false,
                    },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                      pagination: false,
                    },
                    960: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                      slidesPerGroup: 4,
                      speed: 1500,
                    },
                  }}
                >
                        {products.map(({image, name, description, price}, index) =>(
                        <SwiperSlide key={index}>
                                <LastestProducts
                                   img={image}
                                   name={name}
                                   desc={description}
                                   price={price}
                                >
                                </LastestProducts>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    </section>
  )
}

export default HomeLastest