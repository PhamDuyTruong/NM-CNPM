import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/CartConstant';
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