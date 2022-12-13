import React, {useState} from 'react';
import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import useTotalPrice from '../../utils/customPrice';
import {useHistory} from 'react-router-dom'

function PaypalCheckoutButton(props) {
  const {orderList, setIsPaid} = props;
  const [error, setError] = useState(null);
  const history = useHistory();
  const { totalPrice, discount } = useTotalPrice();

  const handleApprove = (orderId) => {

    setIsPaid(true)
  }
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
       onClick={(data, actions) => {
        const hasAlreadyBoughtProduct = false;

        if (hasAlreadyBoughtProduct) {
          setError(
            "You already bought this Product. Go to your account to view your list of products."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              address: orderList.shippingAddress.address,
              amount: {
                value: totalPrice
              }
            }
          ]
        });
      }}

      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderID);
      }}
      onCancel={() => {
         history.push("/cart")
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}

    />
    </PayPalScriptProvider>
    
  )
}

export default PaypalCheckoutButton