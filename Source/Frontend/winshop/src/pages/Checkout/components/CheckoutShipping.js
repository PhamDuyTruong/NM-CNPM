import React, {useEffect, useState} from 'react';
import "./CheckoutShipping.scss";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckoutFromField from './CheckoutFromField';
import CheckoutLoading from './CheckoutLoading';
import {useSelector, useDispatch} from 'react-redux'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {saveShippingAddress} from '../../../actions/CartAction'

const schema = yup.object().shape({
    address: yup
      .string()
      .required("Please enter your address"),
    city: yup
      .string()
      .required("Please enter your city"),
    country: yup
      .string()
      .required("A country is required"),
    pinCode: yup.string().required("A pin code is required"),
    phoneNo: yup
      .string()
      .required("A phone number is required")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Phone number is not valid"),
  });
  

function CheckoutShipping(props) {
    const { setIsCheckoutSuccess, setIsPurchased, setIsPayment } = props;
    const [isLoading, setIsLoading] = useState(false);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
      });
 

      useEffect(() => {
        cartItems.length <= 0 ?? setIsCheckoutSuccess(false);
      }, [cartItems])

      const returnToShop = () => {
        history.push("/shop");
      }

      const onSubmit = (value) => {
         const shipping = {
            address: value.address,
            city: value.city,
            country: value.country,
            pinCode: value.pinCode,
            phoneNo: value.phoneNo
         }
         dispatch(saveShippingAddress(shipping));
         setIsCheckoutSuccess(true);
         setIsPayment(true);
    }

  return (
    <>
    <form  className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="checkout-form__title">Shipping address</h2>
      <div className="checkout-form__fields">
        <div className="checkout-form__row">
          <CheckoutFromField
            label="Address"
            errors={errors}
            register={register}
            name="address"
          />
          <CheckoutFromField
            label="City"
            errors={errors}
            register={register}
            name="city"
          />
        </div>
        <CheckoutFromField
          label='pin code'
          errors={errors}
          register={register}
          name='pinCode'
        />
        <div className="checkout-form__row">
        <CheckoutFromField
          label='Country'
          errors={errors}
          register={register}
          name='country'
        />
        <CheckoutFromField
            label='Phone'
            errors={errors}
            register={register}
            name='phoneNo'
          />
        </div>
      </div>
      <div className="checkout-form__bottom">
          <div onClick={returnToShop} className='checkout-form__return'>
             <ChevronLeftIcon />
            <span>Return to shop</span>
         </div>
         <button type="submit" className='primary-btn red'>
             <span>Continue</span>
         </button>
      </div>
    </form>
    {isLoading && <CheckoutLoading />}
  </>
  )
}

export default CheckoutShipping