import React from 'react';
import "./CheckoutAside.scss"
import {useSelector} from 'react-redux';
import useTotalPrice from '../../../utils/customPrice'
import EmptyCart from '../../../assets/images/empty-cart.png';

function CheckoutAside() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const { totalPrice, discount } = useTotalPrice();
  return (
    <aside>
    {cartItems.length > 0 ? (
      <ul className="checkout-products">
        {cartItems.map(({ id, name, image, qnt, price }) => (
          <li key={id} className="checkout-product">
            <div className="checkout-product__img">
              <img src={image} alt="Checkout product" />
              <span className="checkout-product__qnt">{qnt}</span>
            </div>
            <div className="checkout-product__content">
              <h3 className="checkout-product__name">{name}</h3>
            </div>
            <span className="checkout-product__price">${price}</span>
          </li>
        ))}
      </ul>
    ) : (
      <>
           <img src={EmptyCart} width={200} height={200} style={{margin: "0 auto"}}></img>
      </>
    )}

    <div className="checkout-detail">
      <div className="checkout-detail__row">
        <span className="checkout-detail__label">Discount</span>
        <span className="checkout-detail__content">${discount}</span>
      </div>
      <div className="checkout-detail__row">
        <span className="checkout-detail__label">Shipping Cost</span>
        <span className="checkout-detail__content">Free</span>
      </div>
      <div className="checkout-detail__row">
        <span className="checkout-detail__label">Taxes (estimated)</span>
        <span className="checkout-detail__content">$0</span>
      </div>
    </div>

    <div className="checkout-total">
      <span className="checkout-total__label">Total</span>
      <span className="checkout-total__price">${totalPrice}</span>
    </div>
  </aside>
  )
}

export default CheckoutAside