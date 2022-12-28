import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap'
import { Container } from "@material-ui/core";
import {useSelector} from 'react-redux'
import HandleImage from '../../../../utils/HandleImage';
import {WorkData} from '../../../../utils/fakeData'
import Grid from "@material-ui/core/Grid";
import "../../../../assets/styles/_typography.scss";

import "./styles.scss"

function HomeWork() {
    let containerRef = useRef(null);
    let captionRef = useRef(null);
    let headingRef = useRef(null);
    let stepOneRef = useRef(null);
    let stepTwoRef = useRef(null);
    let stepThreeRef = useRef(null);
    let stepFourRef = useRef(null);

    const {darkTheme} = useSelector((state) => state.sidebar);
    const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
    let isTheme = darkTheme;
    if(!darkTheme){
        isTheme = ThemeInLocal
    }
    let stepRef = [stepOneRef, stepTwoRef, stepThreeRef, stepFourRef];

    useEffect(() =>{
        const line = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef,
                start: "20% bottom"
            }
        });

        line.from(captionRef, {
            x: 20,
            opacity: 0,
            duration: 0.7,
          })
            .from(headingRef, { x: -20, opacity: 0, duration: 0.8 }, "-=0.2")
            .from(stepRef[0], { y: 20, opacity: 0, duration: 0.8 }, "-=0.2")
            .from(stepRef[1], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
            .from(stepRef[2], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
            .from(stepRef[3], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
    }, []);

  return (
    <section ref={(el) => containerRef = el} className="home-work">
        <Container>
            <div ref={(el) => captionRef = el} className="primary-yellow-text">
                Shop Now
            </div>
            <h2 ref={(el) => headingRef = el} className="primary-heading-text" style={{color: `${isTheme ? "#fff" : ""}`}}>
                How it works
            </h2>

            <div className='home-work__steps'>
                <Grid container spacing={3}>    
                    {WorkData.map(({img, step, content, arrow}, index) =>(
                        <Grid item key={index} xs={12} sm={6} lg={3}>
                            <div ref={(el) => stepRef[index] = el} className="home-work__step">
                                <div className='home-work__thumb'>
                                    <div className='home-work__thumb-wrapper'>
                                        <img  className='home-work__img' src={HandleImage(img)} alt="image step" width={200} height={200}>
                                        </img>
                                        <span>Step 0{step}</span>
                                        <div
                                         style={{ backgroundImage: `url(${arrow})` }}
                                         className="home-work__thumb-arrow"
                                        ></div>
                                    </div>
                                </div>
                                <div className="home-work__content" style={{color: `${isTheme ? "#fff" : ""}`}}>{content}</div>
                            </div>
                           
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    </section>
  )
}

export default HomeWork