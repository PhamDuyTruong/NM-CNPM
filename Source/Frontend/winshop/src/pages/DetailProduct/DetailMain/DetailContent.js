import React from 'react';
import "./DetailContent.scss"
import { Button } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";

function DetailContent(props) {
  const {
    product,
    dataOptions,
    handleFuncs,
    selectedRadio,
    price,
    qnt,
  } = props;
  const { name, size, color, description, ratings } = product ? product : "";
  const { handleOptionChange, handleIncreaseQnt, handleDecreaseQnt } = handleFuncs;

  return (
    <div>
        
    </div>
  )
}

export default DetailContent