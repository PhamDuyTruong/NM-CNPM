import React, {useEffect, useRef, useState} from 'react';
import "./styles.scss";
import "./Feature.css";
import {useSelector} from 'react-redux'
import gsap from "gsap";
import AOS from "aos";
import {FeatureData} from '../../../../utils/fakeData';
import "../../../../assets/styles/_typography.scss";

import Apple from '../../../../assets/images/apple-watch.png';
import Jacket from '../../../../assets/images/Jacket.png';
import Book from '../../../../assets/images/harry.png';


function HomeFeature() {
    let containerRef = useRef(null);
    let cardOneRef = useRef(null);
    let cardTwoRef = useRef(null);
    let cardThreeRef = useRef(null);
    const [image, setImage] = useState(Apple);
    const [circleColor, setCircleColor] = useState("#47B5FF");

    const {darkTheme} = useSelector((state) => state.sidebar);
    const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
    let isTheme = darkTheme;
    if(!darkTheme){
        isTheme = ThemeInLocal
    }
    let leftCards = [cardOneRef, cardTwoRef, cardThreeRef];
    useEffect(() =>{
        const cardsLine = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef,
                start: "40% bottom",
            }  
        });
        cardsLine
      .from(leftCards[0], { y: 20, opacity: 0, duration: 0.6 }, 0.2)
      .from(leftCards[1], { y: 40, opacity: 0, duration: 0.6 }, 0.6)
      .from(leftCards[2], { y: 20, opacity: 0, duration: 0.6 }, 1);

      AOS.init({
        // Global settings:
        disable: false, 
        startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
        initClassName: "aos-init", 
        animatedClassName: "aos-animate", 
        useClassNames: false, 
        disableMutationObserver: false,
        debounceDelay: 50, 
        throttleDelay: 99, 
  
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, 
        delay: 0, 
        duration: 300, 
        easing: "ease",
        once: false, 
        mirror: false,
        anchorPlacement: "top-bottom", 
      });
    }, []);

    const handleImgSlide = (url) => {
        setImage(url);
    }

    const handleCircleColor = (color) => {
        setCircleColor(color);
    }

  return (
    <section ref={(el) => containerRef = el} className="home-ingredients">
        <div className='home-ingredients__thumb' style={{backgroundImage: `${isTheme  ? "linear-gradient(90deg, #7DE5ED 50%, #1A120B 50%)" : "linear-gradient(90deg, #7DE5ED 50%, #fff 50%)"}`}}>
            <div className='home-ingredients__card-left'>
                {FeatureData.map(({title, content, order}, index) =>(
                    <div ref={(el) => leftCards[index] = el}  className="home-ingredients__card-wrapper" key={`${title}-${index}`}>
                        <div className='home-ingredients__card'>
                            <h3 className="home-ingredients__card-title">{title}</h3>
                            <p className="home-ingredients__card-content">{content}</p>
                            <span>{order}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='home-ingredients__card-right'>
                <div className="circle" style={{ backgroundColor: circleColor }}></div>
                <div className='content'>
                    <div className="imgBox">
                        <img src={image} className="starbucks" id="starbucks" alt="" />
                    </div>
                </div>
              
            </div>
            <ul className='thumb' id="thumbImg">
                <li>
                <img
                    src={Apple}
                    onMouseOver={() => {
                        handleImgSlide(Apple);
                        handleCircleColor("#47B5FF");
                    }}
                    alt="hinh anh"
                />
                </li>
                <li>
                <img
                    src={Jacket}
                    onMouseOver={() => {
                        handleImgSlide(Jacket);
                        handleCircleColor("#F0FF42");
                    }}
                    alt="hinh anh"
                />
                </li>
                <li>
                <img
                    src={Book}
                    onMouseOver={() => {
                        handleImgSlide(Book);
                        handleCircleColor("#8D9EFF");
                    }}
                    alt="hinh anh"
                />
                </li>
            </ul>
        </div>
       
    </section>
  )
}

export default HomeFeature