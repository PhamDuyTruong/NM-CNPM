import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap'
import { Container } from "@material-ui/core";
import HandleImage from '../../../../utils/HandleImage';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import "./Banner.scss";

function Banner(props) {
    const {title, description, strong, background} = props;
    let containerRef = useRef(null);
    let titleRef = useRef(null);
    let descRef = useRef(null);
    let btnRef = useRef(null);
    useEffect(() =>{
        const line = gsap.timeline({
         scrollTrigger:{
             trigger: containerRef,
             start: "-20% top",
         }
        });
        line.from(titleRef, { x: -20, opacity: 0, duration: 0.8 })
       .from(descRef, { x: 20, opacity: 0, duration: 0.7 }, "-=0.2")
       .from(btnRef, { y: 20, opacity: 0, duration: 0.8 }, "-=0.2"); 
   }, []);

  return (
    <div ref={(el) => (containerRef = el)} className="home-banner" style={{
        backgroundImage: `url(${HandleImage(background)})`,
      }}>
        <Container className='container-ui'>
            <div className='home-banner__container'>
                <div ref={(el) => (titleRef = el)} className="home-banner__title">
                    {title}
                </div>
                <div ref={(el) =>(descRef = el)} className="home-banner__description">
                    {description}
                    <strong>{strong}</strong>
                </div>
                <div ref={(el) => (btnRef = el)}>
                      <button className="primary-btn red">
                        <LocalMallOutlinedIcon className="home-banner__icon" />
                           Shop now
                       </button>
                 </div>
            </div>
        </Container>
    </div>
  )
}

export default Banner