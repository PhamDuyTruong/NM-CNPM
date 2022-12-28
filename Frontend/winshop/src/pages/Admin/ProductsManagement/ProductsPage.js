import React, { useEffect } from "react";
import ProductBox from "./ProductBox";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import AddIcon from "@material-ui/icons/Add";
import axiosClient from "../../../services/axiosClient";
import "./ProductsPage.css";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.AdminProduct);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get("/api/product");
      dispatch({ type: "ADMIN_PRODUCT_UPDATE", payload: data.data });
    };
    fetchData();
  }, []);
  return (
    <div className="ProductsPage-container">
          <Link
              to="/admin/products/create/one"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="ProductPage-addButton">
                <AddIcon></AddIcon>
                <span>Add product</span>
              </div>
            </Link>
      <div className="ProductsPage">
        {productsData.map((ele, index) => (
          <ProductBox
            key={index}
            id={ele._id}
            brand={ele.brand}
            remain={ele.countInStock}
            desc={ele.description}
            img={ele.image}
            name={ele.name}
            price={ele.price}
            rating={ele.ratings}
          ></ProductBox>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;