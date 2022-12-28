import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosClient from "../../../services/axiosClient";
import axios from "axios";
import "./ProductDetailPage.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";

const ProductDetailPage = () => {
  const history = useHistory();
  const [data_1, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("user"))
  let dataTemplate = {};
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosClient.get(`/api/product/${id}`);
      dataTemplate = { ...data };
      setData(dataTemplate);
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dataTemplate.name = e.target[0].value;
    dataTemplate.description = e.target[1].value;
    dataTemplate.category = e.target[2].value;
    dataTemplate.brand = e.target[3].value;
    dataTemplate.price = e.target[4].value;
    dataTemplate.countInStock = e.target[5].value;
    dataTemplate.image = e.target[6].value;

    //--------------
    const url = `/api/product/admin/${id}`;
    const method = "put";
    const headers = {
      "Content-Type": "application/json",
    };
    if(userInfo){
        const {accessToken} = userInfo
        headers.token = `Bearer ${accessToken}`
    }
    const data = {
      name: dataTemplate.name,
      description: dataTemplate.description,
      brand: dataTemplate.brand,
      image: dataTemplate.image,
      category: dataTemplate.category,
      price: dataTemplate.price,
      countInStock: dataTemplate.countInStock,
    };
    axios({ url, method, data, headers })
      .then((response) => {
        dispatch({ type: "RENDER" });
        history.push("/admin/products");
      })
      .catch((e) => {
        dispatch({ type: "RENDER" });
        history.push("/admin/products");
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const url = `/api/product/admin/${id}`;
    const method = "delete";
    const headers = {
        "Content-Type": "application/json",
    };
    if(userInfo){
        const {accessToken} = userInfo
        headers.token = `Bearer ${accessToken}`
    }
    axios({ url, method, headers }).then((res) => {
      history.push("/admin/products");
      dispatch({ type: "RENDER" });
    });
  };
  return (
    <>
      <div className="Admin-ProductsDetailPage">
        <img className="ProductsDetailPage-img" src={data_1.image}></img>
        <form className="Admin-ProductDetailForm" onSubmit={handleSubmit}>
          <span>Name: </span>
          <textarea
            defaultValue={data_1.name}
            className="ProductDetail-input-name"
          ></textarea>
          <span>Description: </span>
          <textarea
            className="ProductDetail-input-description"
            defaultValue={data_1.description}
          ></textarea>
          <span>Category: </span>
          <input
            defaultValue={data_1.category}
            className="ProductDetail-input-category"
          ></input>
          <span>Brand: </span>
          <input
            defaultValue={data_1.brand}
            className="ProductDetail-input-name-brand"
          ></input>
          <span>Price:</span>
          <input
            defaultValue={data_1.price}
            type="number"
            className="ProductDetail-input-price"
          ></input>
          <span>Numbers of remain: </span>
          <input
            type="number"
            defaultValue={data_1.countInStock}
            className="ProductDetail-input-reamin"
          ></input>
          <span>Image: </span>
          <input
            className="ProductDetail-input-image"
            defaultValue={data_1.image}
          ></input>
          <button type="submit">UPDATE</button>
        </form>
        <div onClick={handleDelete} className="Admin-ProductDetail-delete">
          <DeleteIcon></DeleteIcon>
          <span>Delete</span>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;