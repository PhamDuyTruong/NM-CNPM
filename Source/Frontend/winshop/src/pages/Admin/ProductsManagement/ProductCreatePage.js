import React, {useState} from "react";
import axios from "../../../services/axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const ProductCreatePage = () => {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  let urlImage = "";
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

    let file = e.target[6].files[0];
    const formData = new FormData();
      // const filename = "avatar";
      // data.append("name", filename);
      formData.append("product", file);
      try {
        let url = `/product/admin/upload-image`;
      
        const headers = {
          "Content-Type": "multipart/form-data",
      };

       const {data} = await axios.post(url, formData, headers);
       urlImage = "https://winshop-server.onrender.com/" + data.image
      } catch (err) {
        console.log(err)
      }

    const data = {
      name: e.target[0].value,
      description: e.target[1].value,
      category: e.target[2].value,
      brand: e.target[3].value,
      price: e.target[4].value,
      countInStock: e.target[5].value,
      image: urlImage,
      user: userInfo._id,
    };
    console.log(data)
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
      <h1 style={{textAlign: "center"}}>Create product</h1>
      <form className="Admin-ProductDetailForm" onSubmit={handleSubmit}>
        <span>Name: </span>
        <textarea className="ProductDetail-input-name" required></textarea>
        <span>Description: </span>
        <textarea className="ProductDetail-input-description" required></textarea>
        <span>Category: </span>
        <input className="ProductDetail-input-category" placeholder="Input category" required></input>
        <span>Brand: </span>
        <input className="ProductDetail-input-name-brand" placeholder="input genre" required></input>
        <span>Price:</span>
        <input type="number" className="ProductDetail-input-price" placeholder="Input price" required></input>
        <span>Numbers of remain: </span>
        <input type="number" className="ProductDetail-input-reamin" placeholder="Input remain" required></input>
        <span>Image: </span>
        <input type="file" className="ProductDetail-input-image" placeholder="Input image URL (jpg, jpeg, png)" required></input>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProductCreatePage;