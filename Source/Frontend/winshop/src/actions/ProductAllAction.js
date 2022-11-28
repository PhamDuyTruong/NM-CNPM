import {GET_PRODUCTS_ALL_FAILURE, GET_PRODUCTS_ALL_SUCCESS, GET_PRODUCTS_ALL_REQUEST, SHOP_PRODUCTS_VIEW} from '../constants/ProductAllConstant';
import productApi from '../services/productApi';

export function getProductAll(brand="", price="", ratings=""){
    return async (dispatch) =>{
       dispatch({type: GET_PRODUCTS_ALL_REQUEST})
       try{
            const {data} = await productApi.getProductAll(brand, price, ratings);
            dispatch({ type: GET_PRODUCTS_ALL_SUCCESS, payload: data});
       } catch(error){
         dispatch({
                 type: GET_PRODUCTS_ALL_FAILURE,
                 error: {error}
                  //payload: { error: error.response.data },
            });
       }
    }
};

export function getProductView(str){
    return async (dispatch) => {
        dispatch({type: SHOP_PRODUCTS_VIEW, payload: str})
    }
}