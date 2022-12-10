import React, {useState} from 'react';
import {useDispatch} from 'react-redux'

function CheckoutPayment(props) {
    const { setIsCheckoutSuccess } = props;
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const handleSubmit = (e) => {
        e.preventDefault();

    }
  return (
    <div>
    <h3 style={{fontSize: "2.3rem", fontWeight: "500", marginBottom: "20px"}}>Payment Method</h3>
    <form>
        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option selected>Select Payment</option>
            <option value="PayPal">PayPal or Credit Card</option>
            <option value="COD">Cash On Delivery</option>
        </select>
        <button type='submit' className='primary-btn red'>
            <span>Checkout</span>
        </button>
    </form>
    </div>
  )
}

export default CheckoutPayment