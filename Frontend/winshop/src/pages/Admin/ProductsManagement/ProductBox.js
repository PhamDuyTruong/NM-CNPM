import React from "react";
import "./ProductBox.css";
import StarIcon from "@material-ui/icons/Star";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductBox = (props) => {
  const mode = useSelector((state) => state.AdminDarkMode);
  return (
    <>
      <div
        className="ProductBox-container"
        style={{
          backgroundColor: mode == "light" ? "white" : "inherit",
          color: mode == "light" ? "" : "white",
        }}
      >
        <div className="ProductBox-img-container">
          <img src={props.img}></img>
          <Link
            to={"/admin/products/" + props.id}
            className="ProductBox-editIcon"
          >
            <EditIcon></EditIcon>
          </Link>
        </div>
        <div className="ProductBox-info">
          <div className="ProductBox-first">
            <span className="ProductBox-price">${props.price}</span>
          </div>
          <div className="ProductBox-second">
            <span className="ProductBox-name">{props.name}</span>
          </div>
          <div className="ProductBox-third">
            <div className="ProductBox-rating">
              <StarIcon></StarIcon>
              <span>{props.rating}</span>
            </div>
            <span className="ProductBox-remain">{props.remain} remain</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
