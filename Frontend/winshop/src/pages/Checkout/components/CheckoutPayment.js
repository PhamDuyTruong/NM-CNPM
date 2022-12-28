import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {savePaymentMethod} from '../../../actions/CartAction';
import {createOrder} from '../../../actions/OrderAction';
import useTotalPrice from '../../../utils/customPrice';
import {useHistory} from 'react-router-dom'
function CheckoutPayment(props) {
    const { setIsCheckoutSuccess, setIsPurchased } = props;
    const {cartItems, shippingAdress} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("Paypal");
    console.log(paymentMethod)
    const { totalPrice, discount } = useTotalPrice();
    const history = useHistory();
    // const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        setIsPurchased(true);
    };

    const handleToPay = () => {
        dispatch(savePaymentMethod(paymentMethod));
        const orderData = {
            shippingInfo: shippingAdress || JSON.parse(localStorage.getItem("ship")),
            cart: cartItems,
            paymentMethod: paymentMethod,
            itemsPrice: discount,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: totalPrice
        };
        //console.log(orderData)
        dispatch(createOrder(orderData))
        history.push("/pay");
    }


  return (
    <div>
    <h3 style={{fontSize: "2.3rem", fontWeight: "500", marginBottom: "20px"}}>Payment Method</h3>
    <form onSubmit={handleSubmit}>
        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option selected>Select Payment</option>
            <option value="PayPal">PayPal or Credit Card</option>
            <option value="COD">Cash On Delivery</option>
        </select>
        <button type='submit' className='primary-btn red' onClick={handleToPay}>
            <span>Order</span>
        </button>
    </form>
    </div>
  )
}

export default CheckoutPayment