import React, {useState} from 'react';
import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

function PaypalCheckoutButton(props) {
  const {orderList, setIsPaid} = props;
  const [error, setError] = useState(null);
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
    <PayPalButtons 
        style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill"
      }}
    
    />
    </PayPalScriptProvider>
    
  )
}

export default PaypalCheckoutButton