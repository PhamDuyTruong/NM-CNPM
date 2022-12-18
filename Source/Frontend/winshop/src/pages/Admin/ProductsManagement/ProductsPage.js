import React, { useEffect } from "react";
import ProductBox from "./ProductBox";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../services/axiosClient";
import "./ProductsPage.css";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.AdminProduct);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get("/api/product");
      console.log(data.data);
      dispatch({ type: "ADMIN_PRODUCT_UPDATE", payload: data.data });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="ProductsPage">
        {productsData.map((ele, index) => (
          <ProductBox
            brand={ele.brand}
            remain={ele.countInStock}
            desc={ele.description}
            img={ele.image}
            name={ele.name}
            price={ele.price}
            rating={ele.rating}
          ></ProductBox>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;