import React from 'react';
import "./CheckoutProgress.scss";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

function CheckoutProgress(props) {
    const {isCheckoutSuccess, isPayment, isPurchased} = props;
  return (
    <div className="checkout-progress">
    <div className="checkout-progress__node active">
      <div className="checkout-progress__icon">
        <PeopleAltIcon />
      </div>
      <span className="checkout-progress__description">Login</span>
    </div>
    <span className="checkout-progress__line"></span>
    <div className="checkout-progress__node">
      <div className="checkout-progress__icon">
        <ListAltIcon />
      </div>
      <span className="checkout-progress__description">Shipping</span>
    </div>
    <span
      className={
        isPayment
          ? "checkout-progress__line active"
          : "checkout-progress__line"
      }
    ></span>
      <div className="checkout-progress__node">
      <div className={isPayment ? "checkout-progress__icon active" : "checkout-progress__icon"}>
        <ListAltIcon />
      </div>
      <span className="checkout-progress__description">Payment</span>
    </div>
    <span
      className={
        isPurchased
          ? "checkout-progress__line active"
          : "checkout-progress__line"
      }
    ></span>
    <div className="checkout-progress__node">
      <div
        className={
          isPurchased
          ? "checkout-progress__icon active"
           : "checkout-progress__icon"
        }
      >
        <ThumbUpIcon />
      </div>
      <span className="checkout-progress__description">Success!</span>
    </div>
  </div>
  )
}

export default CheckoutProgress