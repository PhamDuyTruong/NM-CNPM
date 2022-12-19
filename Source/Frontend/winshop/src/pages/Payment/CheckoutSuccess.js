import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import "./CheckoutSuccess.scss";
import saleOff from '../../assets/images/saleOff.png';
import HandleImage from '../../utils/HandleImage';
import CheckoutAside from '../Checkout/components/CheckoutAside';
import {updateStatusOrder} from '../../actions/OrderAction';
import {useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
function CheckoutSuccess() {
  const {orderList} = useSelector((state) => state.order);
  const [isPaid, setIsPaid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }
  const shippingAddress = JSON.parse(localStorage.getItem("ship"));
  const paymentMethod = JSON.parse(localStorage.getItem("payment"));
  const userInfo = JSON.parse(localStorage.getItem("user"))

  const handleStatus = () => {
        dispatch(updateStatusOrder(orderList, "Shipped"))
  };

  const handleCod = () => {
    dispatch(updateStatusOrder(orderList, "Delivering"))
    Swal.fire(
      "Cart is being shipped! Thank you !!!",
      "Return back to shop page!",
      "Success"
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/shop";
      }
    });
  }

  return (
    <>
    <section className='banner'>
         <img src={HandleImage(saleOff)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="150"/>
   </section>
   <div className='checkout-content' style={{overflowX: "hidden",  background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff": ""}`}}>
         <div className='checkout-content__left'>
              {userInfo ? (
                  <>
              <h2>Shipping address</h2>
            <p style={{fontSize: "1.3rem"}}>Address: {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.pinCode}, {shippingAddress.country}</p>
            {orderList.isDelevered ? (<p  style={{fontSize: "1.3rem"}}>
                Deliveried on: {(new Date(Date.now())).toLocaleDateString('en-US')}
            </p>) : (<p  style={{fontSize: "1.3rem"}}>
               Deliveried on: Not Deliveried
            </p>)}
            <h2>Payment method</h2>
            <p  style={{fontSize: "1.3rem"}}>Method: {paymentMethod}</p>
            {isPaid ? (<p  style={{fontSize: "1.3rem"}}>
                Paid on: {new Date(orderList.paidAt).toLocaleDateString('en-US')}
            </p>) : (<p  style={{fontSize: "1.3rem"}}>
               Paid on: Not Paid
            </p>)}
            <h2>Checkout</h2>
            {paymentMethod === "COD" ? (<button className='primary-btn red' onClick={handleCod}>
                Buy
            </button>) : (<PaypalCheckoutButton 
                orderList = {orderList}
                setIsPaid = {setIsPaid}
            />)}
            {isPaid ? (<button className='primary-btn red' onClick={handleStatus}>Mark As Delivered</button>) : (<></>)}
            {isPaid ? (
            <h2 className='checkout-success__title'>
                Your purchase was successfull !!!
           </h2>
         ): (<>
         </>)}
            </>
              ): (
                <h2 style={{marginTop: "15px"}}>You must be login to payment !!!</h2>
              )}
         </div>
         <div className='checkout-content__right' style={{ paddingTop: "60px"}}>
               <CheckoutAside />
         </div>
   </div>
   </>
  )
}

export default CheckoutSuccess