import React, {useState} from 'react';
import CheckoutAside from './components/CheckoutAside';
import CheckoutProgress from './components/CheckoutProgress';
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';
import {useSelector} from 'react-redux'
import "./styles.scss"
import CheckoutShipping from './components/CheckoutShipping';
import CheckoutPayment from './components/CheckoutPayment';

function Checkout() {
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const {darkTheme} = useSelector((state) => state.sidebar);
    const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
    let isTheme = darkTheme;
    if(!darkTheme){
        isTheme = ThemeInLocal
    }
    const userInfo = JSON.parse(localStorage.getItem("user"))
  return (
    <>
     <section className='banner'>
          <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
    </section>
    <div className='checkout-content' style={{overflowX: "hidden", background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff": ""}`}}>

          <div className='checkout-content__left'>
                  {userInfo ? <>
                  <CheckoutProgress isCheckoutSuccess={isCheckoutSuccess} isPayment={isPayment} isPurchased={isPurchased}/>
                <CheckoutShipping  setIsCheckoutSuccess={setIsCheckoutSuccess} setIsPurchased={setIsPurchased} setIsPayment={setIsPayment}/>
                {isPayment ? <CheckoutPayment  setIsCheckoutSuccess={setIsCheckoutSuccess} setIsPurchased={setIsPurchased}/>: (<div style={{fontSize: "1.7rem", fontWeight: "500"}}>No Payment !!!</div>)}
                  </> : (
                       <h2 style={{marginTop: "15px"}}>You must be login to checkout !!!</h2>  
                  )}
               
          </div>
          <div className='checkout-content__right' style={{ paddingTop: "60px"}}>
                <CheckoutAside />
          </div>
    </div>
    </>
  )
}

export default Checkout