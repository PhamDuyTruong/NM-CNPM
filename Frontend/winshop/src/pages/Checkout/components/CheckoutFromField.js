import React from 'react';
import "./CheckoutFromField.scss"

function CheckoutFromField(props) {
    const { label, name, errors, register } = props;
  return (
    <div className="checkout-form-field">
    <div className="checkout-form-field__wrapper">
      <input
        className="checkout-form-field__input"
        placeholder=""
        type="text"
        id={name}
        name={name}
        {...register(name)}
      />
      <span className="checkout-form-field__label">{label}</span>
    </div>
    <span className="checkout-form-field__error">
      {errors[name]?.message}
    </span>
  </div>
  )
}

export default CheckoutFromField