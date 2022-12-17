import React, {useEffect, useState, useRef} from 'react'
import DetailComment from './DetailComment';
import  {useSelector} from 'react-redux'
import "./styles.scss"

function DetailReview() {
    const {detailProduct, isLoading} = useSelector((state) => state.getDetailProduct);
    const [isActive, setIsActive] = useState(true);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [btnElement, setBtnElement] = useState(null);

    let firsBtntRef = useRef(null);
    let secondBtnRef = useRef(null);
    
    const handleSelect = (pos) =>{
        if(firsBtntRef && secondBtnRef){
            setOffsetLeft((pos === "first" ? firsBtntRef : secondBtnRef).offsetLeft);
            setOffsetWidth(
                (pos === "first" ? firsBtntRef : secondBtnRef).offsetWidth
            );
            setIsActive(pos === "first" ? true : false);
        }
    };

    useEffect(() =>{
        if(firsBtntRef){
            setOffsetLeft(firsBtntRef.offsetLeft);
            setOffsetWidth(firsBtntRef.offsetWidth);
            setIsActive(true);
            setBtnElement(firsBtntRef);
        };

        const handleResize = () =>{
            setOffsetLeft(btnElement && btnElement.offsetLeft);
            setOffsetWidth(btnElement && btnElement.offsetWidth);
            setIsActive(true);
        }

        window.addEventListener("resize", handleResize);

        return window.removeEventListener("resize", handleResize);
    }, [firsBtntRef, btnElement]);

  return (
    <div className='detail-tab'>
          <div className='detail-tab__btns'>
            <div
               ref={(el) => firsBtntRef = el}
               onClick={() => handleSelect("first")}
               className={isActive ? "detail-tab__btn active" : "detail-tab__btn"}
            >
                <span>About</span>
            </div>
            <div
               ref={(el) => secondBtnRef = el}
               onClick={() => handleSelect("second")}
               className={!isActive ? "detail-tab__btn active" : "detail-tab__btn"}
            >
                <span>Reviews</span>
                <span>({detailProduct.reviews ? detailProduct.reviews.length : 0})</span>
            </div>
            <div 
               style={{ left: offsetLeft, width: offsetWidth }}
               className="detail-tab__btn-background"
            ></div>
        </div>

        {isActive ? (
        <div className="detail-tab__content">
          <p className="detail-tab__content-description">
            Although among many online shops, Winshop is still confident that we can ensure to serve customers with the best possible services. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore magnam eum ratione debitis?
          </p>
        </div>
        ): (
            <DetailComment />
        )}
    </div>
  )
}

export default DetailReview