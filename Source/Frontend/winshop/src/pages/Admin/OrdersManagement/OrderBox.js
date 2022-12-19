import React from 'react';
import "./OrderBox.css";
import { Link, useHistory } from "react-router-dom";

import DeliveringIcon from "@material-ui/icons/LocalShipping";
import ShippedIcon from "@material-ui/icons/CheckCircle";
import StoreIcon from '@material-ui/icons/Store';
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import IdOrderIcon from "@material-ui/icons/LibraryBooks";
import UserIcon from "@material-ui/icons/AccountCircle";
import CartIcon from "@material-ui/icons/ShoppingCart";


function OrderBox(props) {
    const history = useHistory();
    const handleToDetail = (e) => {
      history.push(`/admin/orders/${props.id}`);
    };
  return (
    <>
    <div
      onClick={handleToDetail}
      className="orderBox-container"
      style={{
        background:
          props.status === "Shipped"
            ? "linear-gradient(90deg, rgba(88,147,89,1) 0%, rgba(58,175,60,1) 100%)"
            : props.status === "Delivering"
            ? "linear-gradient(90deg, rgba(218,193,89,1) 0%, rgba(241,202,41,1) 100%)"
            : "linear-gradient(90deg, rgba(130,192,228,1) 0%, rgba(56,182,255,1) 100%)",
      }}
    >
      <div className="orderBox-top">
        <div className="orderBox-status">
          {props.status == "Processing" ? (
            <StoreIcon style={{ color: "#38b6ff" }} />
          ) : props.status == "Delivering" ? (
            <DeliveringIcon style={{ color: "#f1ca29" }} />
          ) : (
            <ShippedIcon style={{ color: "#3aaf3c" }} />
          )}
          <span className="orderBox-status-title">{props.status}</span>
        </div>
        <div className="ordrBox-time">
          <span>26/12/2002</span>
        </div>
      </div>
      <div className="orderBox-center">
        <div className="orderBox-center-id orderBox-content-container">
          <IdOrderIcon></IdOrderIcon>
          <span className="orderBox-center-title">ID:</span>
          <span className="orderBox-center-value">{props.id}</span>
        </div>
        <div className="orderBox-center-user orderBox-content-container">
          <UserIcon></UserIcon>
          <span className="orderBox-center-title">User:</span>
          <span className="orderBox-center-value">{props.id}</span>
        </div>
        <div className="orderBox-center-numsProduct orderBox-content-container">
          <CartIcon></CartIcon>
          <span className="orderBox-center-title">Number of items:</span>
          <span className="orderBox-center-value">
            {props.nums_Of_Product}
          </span>
        </div>
      </div>
      <div className="orderBox-bottom">
        <div className="orderBox-price">
          {/* <span className="orderBox-price-title">Total: </span> */}
          <span className="orderBox-price-value">{props.price}</span>
          <MoneyIcon style={{ color: "green", margin: "auto" }}></MoneyIcon>
        </div>
      </div>
    </div>
  </>
  )
}

export default OrderBox