import React, {useState} from 'react';
import CheckoutAside from './components/CheckoutAside';
import CheckoutProgress from './components/CheckoutProgress';
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';
import "./styles.scss"
import CheckoutShipping from './components/CheckoutShipping';
import CheckoutPayment from './components/CheckoutPayment';

function Checkout() {
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [isPayment, setIsPayment] = useState(false);

  return (
    <>
     <section className='banner'>
          <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
    </section>
    <div className='checkout-content' style={{overflowX: "hidden"}}>
          <div className='checkout-content__left'>
                <CheckoutProgress isCheckoutSuccess={isCheckoutSuccess} isPayment={isPayment}/>
                <CheckoutShipping  setIsCheckoutSuccess={setIsCheckoutSuccess} setIsPurchased={setIsPurchased} setIsPayment={setIsPayment}/>
                {isPayment ? <CheckoutPayment  setIsCheckoutSuccess={setIsCheckoutSuccess} setIsPurchased={setIsPurchased}/>: (<div style={{fontSize: "1.7rem", fontWeight: "500"}}>No Payment !!!</div>)}
          </div>
          <div className='checkout-content__right' style={{ paddingTop: "60px"}}>
                <CheckoutAside />
          </div>
    </div>
    </>
  )
}

export default Checkout