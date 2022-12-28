import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD} from '../constants/CartConstant';
import productApi from '../services/productApi'

export const addToCart = (productId, qnt) => {
   return async(dispatch) => {
      const {data} = await productApi.getDetailProduct(productId);
      const cart = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qnt
      }
      dispatch({type: ADD_CART_ITEM, payload: cart})
   }
}

export const removeFromCart = (id) => {
   return (dispatch) => {
      dispatch({type: REMOVE_CART_ITEM, payload: id})
   }
};

export const saveShippingAddress = (data) => {
     return (dispatch) => {
      dispatch({type: SAVE_SHIPPING_ADDRESS, payload: data})
     }
};

export const savePaymentMethod = (data) => {
   return (dispatch) => {
      dispatch({type: SAVE_PAYMENT_METHOD, payload: data})
   }
}