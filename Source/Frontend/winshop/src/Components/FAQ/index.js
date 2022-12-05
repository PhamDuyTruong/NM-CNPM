import React from 'react';
import list from "./dataList";

import Accordian from './Accordian';
import BgImage from './BgImage';

const FAQ = () => {
    const displayData = list.map((faqData, index) => <Accordian title={faqData.question} key={index}>
    {faqData.answer}
</Accordian>)

  return (
    <>
    <BgImage>
        FAQ
    </BgImage>
    <div className="container my-5 py-4">
        {displayData}
    </div>
</>
  )
}

export default FAQ