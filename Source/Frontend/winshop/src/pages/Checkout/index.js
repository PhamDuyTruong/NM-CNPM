import React, {useState} from 'react';
import CheckoutAside from './components/CheckoutAside';
import CheckoutProgress from './components/CheckoutProgress';
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';
import "./styles.scss"

function Checkout() {
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  return (
    <>
     <section className='banner'>
          <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
    </section>
    <div className='checkout-content'>
          <div className='checkout-content__left'>
                <CheckoutProgress isCheckoutSuccess={isCheckoutSuccess}/>
          </div>
          <div className='checkout-content__right' style={{ paddingTop: "60px"}}>
                <CheckoutAside />
          </div>
    </div>
    </>
  )
}

export default Checkout