import React, {useEffect, useState} from 'react';
import "./OrderDetail.css";
import EditIcon from "@material-ui/icons/Edit";
import { useParams, useHistory, Link } from "react-router-dom";
import axiosClient from "../../../services/axiosClient";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";


function OrderDetail() {
    const history = useHistory();
    const { id } = useParams();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [orderData, setOrderData] = useState({
      shippingInfo: {},
      cart: [],
      user: {},
    });
    useEffect(() => {
      const fetchData = async () => {
        const { data } = await axiosClient.get(`/api/order/admin/${id}`);
        setOrderData(data);
      };
      fetchData();
    }, []);
    const handleDelete = async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      if(userInfo){
        const {accessToken} = userInfo
        headers.token = `Bearer ${accessToken}`
        }
      const url = `/api/order/admin/${id}`;
      const method = "delete";
      await axios({ url, method, headers }).then(() => {
        window.alert("deleted");
        history.push("/admin/orders");
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = `api/order/admin/${id}`;
      const method = "put";
      const headers = {
        "Content-Type": "application/json",
      };
      if(userInfo){
        const {accessToken} = userInfo
        headers.token = `Bearer ${accessToken}`
    }
      let data = {};
      data.orderStatus = e.target[0].value;
      await axios({ method, data, headers, url }).then((res) => console.log(res));
    };
  return (
    <>
    <div className="OrderDetailPage">
      <form onSubmit={handleSubmit}>
        <div className="OrderDetailPage-General">
          <h2>Order Information</h2>
          <div className="GeneralInfo-form">
            <span>Custommer ID:</span>
            <Link
              to={`/admin/user/${orderData.user._id}`}
              style={{ marginLeft: "5vh" }}
            >
              {orderData.user._id}
            </Link>
            <span>Status:</span>
            <select defaultValue={orderData.orderStatus}>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivering">Delivering</option>
            </select>
            <span>Total of price:</span>
            <input defaultValue={orderData.totalPrice} readOnly></input>
          </div>
        </div>
        <div className="OrderDetailPage-shippingInfo">
          <h2>Shipping Information</h2>
          <div className="ShippingInfo-form">
            <span>Country:</span>
            <input defaultValue={orderData.shippingInfo.country}></input>
            <span>City:</span>
            <input defaultValue={orderData.shippingInfo.city}></input>
            <span>Specific address:</span>
            <input
              style={{ width: "40vw", height: "40px" }}
              defaultValue={orderData.shippingInfo.address}
            ></input>
            <span>PIN code:</span>
            <input defaultValue={orderData.shippingInfo.pinCode}></input>
            <span>Phone numbers:</span>
            <input defaultValue={orderData.shippingInfo.phoneNo}></input>
          </div>
        </div>
        <div className="OrderDetailPage-Cart">
          <h2>Cart detail</h2>
          {orderData.cart.map((ele, index) => (
            <div key={index} className="CartDetail-Form">
              <div className="CartDetail-Form-img">
                <img src={ele.image} alt={ele.name}></img>
              </div>
              <div>
                <span className="CartDetail-Form-Lable">Name: </span>
                <span className="CartDetail-Form-Value">{ele.name}</span>
                <br></br>
                <span className="CartDetail-Form-Lable">Price: </span>
                <span className="CartDetail-Form-Value">{ele.price}</span>
                <br></br>
                <span className="CartDetail-Form-Lable">Quantity: </span>
                <span className="CartDetail-Form-Value">{ele.qnt}</span>
              </div>
              <Link
                style={{ textDecoration: "none" }}
                className="CartDetail-Edit"
                to={`/admin/products/${ele.product}`}
              >
                <EditIcon></EditIcon>
                <span>EDIT</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="OrderDetailPage-actionButton">
          <span></span>
          <div className="OrderDetailPage-submmit">
            <CheckCircleIcon></CheckCircleIcon>
            <button type="submit">SAVE</button>
          </div>
          <div className="OrderDetailPage-deleteButton">
            <DeleteIcon></DeleteIcon>
            <span onClick={handleDelete}>DELETE</span>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}

export default OrderDetail