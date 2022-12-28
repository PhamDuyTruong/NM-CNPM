import React from "react";
import axios from "../../../services/axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCreatePage = () => {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user"))
  const handleSubmit = async (e) => {
    e.preventDefault();

    //--------------
    const url = `/product/admin`;
    const method = "post";
    const headers = {
      "Content-Type": "application/json",
    };
    if(userInfo){
        const {accessToken} = userInfo
        headers.token = `Bearer ${accessToken}`
    }
    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      brand: e.target[3].value,
      price: e.target[4].value,
      countInStock: e.target[5].value,
      image: e.target[6].value,
      user: userInfo._id,
    };
    axios({ url, method, data, headers })
      .then((response) => {
        history.push("/admin/products");
      })
      .catch((e) => {
        Swal.fire(
            "Error when create product!!!",
            "Error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/admin/products/create/one";
            }
          });
      });
  };
  return (
    <div>
      <h1>Create product</h1>
      <form className="Admin-ProductDetailForm" onSubmit={handleSubmit}>
        <span>Name: </span>
        <textarea className="ProductDetail-input-name"></textarea>
        <span>Description: </span>
        <textarea className="ProductDetail-input-description"></textarea>
        <span>Category: </span>
        <input className="ProductDetail-input-category"></input>
        <span>Brand: </span>
        <input className="ProductDetail-input-name-brand"></input>
        <span>Price:</span>
        <input type="number" className="ProductDetail-input-price"></input>
        <span>Numbers of remain: </span>
        <input type="number" className="ProductDetail-input-reamin"></input>
        <span>Image: </span>
        <input className="ProductDetail-input-image"></input>
        <button type="submit">UPDATE</button>
      </form>
    </div>
  );
};

export default ProductCreatePage;