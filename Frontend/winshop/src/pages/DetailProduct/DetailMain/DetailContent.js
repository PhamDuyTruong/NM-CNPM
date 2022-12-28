import React from 'react';
import "./DetailContent.scss";
import Checkbox from '../../../Components/Checkbox';
import {useDispatch,  useSelector} from 'react-redux'
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
import {addToCart} from '../../../actions/CartAction'

function DetailContent(props) {
  const dispatch = useDispatch();
  const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }
  const {
    product,
    dataOptions,
    handleFuncs,
    selectedRadio,
    price,
    qnt,
  } = props;
  const { name, size, color, description, ratings, countInStock, _id } = product ? product : "";
  const { handleOptionChange, handleIncreaseQnt, handleDecreaseQnt } = handleFuncs;

  const onHandleOptionChange = (e, percent) => {
    handleOptionChange(e, percent);
  };
  const handleAddToCart = (id, qnt) => {
      dispatch(addToCart(id, qnt))
  }
  return (
    <>
    <div className="detail-content">
      <h2 className="detail-content__title">
        {name}
      </h2>
      <div className="detail-content__rate">
        <div className="detail-content__stars">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          {ratings === 5 ? <StarIcon /> : <StarBorderIcon />}
        </div>

        <div className="detail-content__reviews">
          <span className="detail-content__reviews-qnt">
            {/* {comments.length} */}
          </span>
          <span>Reviews</span>
        </div>
      </div>

      <div className="detail-content__price">
        <strong>${price}</strong>
      </div>

      <div className="detail-content__tags">
        <div className="detail-content__tag">
          <span className="detail-content__tag-label" style={{color: `${isTheme ? "#fff" : ""}`}}>Size:</span>
          <span className="detail-content__tag-detail category">
            {size}
          </span>
        </div>
        <div className="detail-content__tag">
          <span className="detail-content__tag-label"  style={{color: `${isTheme ? "#fff" : ""}`}}>Color: </span>
          <span className="detail-content__tag-detail">{color}</span>
        </div>
      </div>

      <p className="detail-content__description">{description}</p>

      <form className="detail-content__form">
        <div className="detail-content__form-title">Choose your options</div>
        {dataOptions.map((item) => (
          <Checkbox
            key={item.content}
            checked={selectedRadio === item.content}
            content={item.content}
            value={item.content}
            handleOptionChange={(e) =>
              onHandleOptionChange(e, item.percentOff)
            }
          ></Checkbox>
        ))}
      </form>

      <div className="detail-content__btns">
        <div className="detail-content__btn-handle">
          <Button
            onClick={handleDecreaseQnt}
            className="detail-content__btn-inc btn-circle"
            style={{color: `${isTheme ? "#fff" : ""}`}}
          >
            <RemoveIcon />
          </Button>
          <span className="detail-content__btn-qnt">{qnt}</span>
          <Button
            onClick={handleIncreaseQnt}
            className="detail-content__btn-dec btn-circle"
            style={{color: `${isTheme ? "#fff" : ""}`}}
          >
            <AddIcon />
          </Button>
        </div>

        <div
          onClick={() => handleAddToCart(_id, qnt)}
          className="detail-content__add"
        >
          <Button className='primary-btn red' disabled={countInStock === 0}>
            <AddShoppingCartOutlinedIcon />
            <span>Add to cart</span>
          </Button>
        </div>
        <Button
          // onClick={() => onHandleAddToFirestore("wishlist", product)}
          className="detail-content__btn-like btn-circle"
        >
          <FavoriteBorderIcon />
        </Button>
      </div>

      <div className="detail-content__commits">
        <div className="detail-content__commit">
          <LocalShippingOutlinedIcon />
          <span>Free global shipping on all orders</span>
        </div>
        <div className="detail-content__commit">
          <EventAvailableOutlinedIcon />
          <span>2 hours easy returns if you change your mind</span>
        </div>
        <div className="detail-content__commit">
          <LocalOfferOutlinedIcon />
          <span>Order before noon for same day dispatch</span>
        </div>
      </div>
    </div>

  </>
  )
}

export default DetailContent