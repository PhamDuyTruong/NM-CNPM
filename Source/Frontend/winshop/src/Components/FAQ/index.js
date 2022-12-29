import React from 'react';
import list from "./dataList";
import {useSelector} from 'react-redux'
import Accordian from './Accordian';
import BgImage from './BgImage';

const FAQ = () => {
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }
    const displayData = list.map((faqData, index) => <Accordian title={faqData.question} key={index}>
    {faqData.answer}
</Accordian>)

  return (
    <>
    <BgImage>
        FAQ
    </BgImage>
    <div className="container my-5 py-4" style={{background: `${isTheme ? "#1A120B" : ""}`}}>
        {displayData}
    </div>
</>
  )
}

export default FAQ