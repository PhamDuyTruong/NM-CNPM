import React, {useState, useEffect} from 'react';
import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import useTotalPrice from '../../utils/customPrice';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../actions/UserAction';
import {payOrder} from '../../actions/OrderAction'

function PaypalCheckoutButton(props) {
  const {orderList, setIsPaid} = props;
  console.log(orderList)
  const [error, setError] = useState(null);
  const {profile, isLoading} = useSelector((state) => state.userProfile);
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalPrice } = useTotalPrice();

  useEffect(() => {
    dispatch(getProfile())
  }, [getProfile])

  const handleApprove = (orderId) => {
    const paymentInfo = {
      status: orderList.orderStatus,
      update_time: new Date(Date.now()).toLocaleDateString('en-US'),
      email_address: profile.email
    };
    dispatch(payOrder(orderList, paymentInfo))
    setIsPaid(true)
    localStorage.removeItem("cart");
    localStorage.removeItem("payment")
  };

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
              description: "Thank you for buying our product",
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
         history.push("/")
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