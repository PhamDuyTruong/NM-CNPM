import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import "./CheckoutSuccess.scss";
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';
import CheckoutAside from '../Checkout/components/CheckoutAside'
function CheckoutSuccess() {
  const {orderList} = useSelector((state) => state.order);
  const [isPaid, setIsPaid] = useState(false);
  const shippingAddress = JSON.parse(localStorage.getItem("ship"));
  const paymentMethod = JSON.parse(localStorage.getItem("payment"));
  return (
    <>
    <section className='banner'>
         <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
   </section>
   <div className='checkout-content' style={{overflowX: "hidden"}}>
         <div className='checkout-content__left'>
            <h2>Shipping address</h2>
            <p style={{fontSize: "1.3rem"}}>Address: {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.pinCode}, {shippingAddress.country}</p>
            {orderList.isDelevered ? (<p  style={{fontSize: "1.3rem"}}>
                Deliveried on: {Date.now()}
            </p>) : (<p  style={{fontSize: "1.3rem"}}>
               Deliveried on: Not Deliveried
            </p>)}
            <h2>Payment method</h2>
            <p  style={{fontSize: "1.3rem"}}>Method: {paymentMethod}</p>
            {isPaid ? (<p  style={{fontSize: "1.3rem"}}>
                Paid on: {orderList.paidAt}
            </p>) : (<p  style={{fontSize: "1.3rem"}}>
               Paid on: Not Paid
            </p>)}
         </div>
         <div className='checkout-content__right' style={{ paddingTop: "60px"}}>
               <CheckoutAside />
         </div>
   </div>
   </>
  )
}

export default CheckoutSuccess