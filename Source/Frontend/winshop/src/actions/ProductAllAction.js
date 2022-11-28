import {GET_PRODUCTS_ALL_FAILURE, GET_PRODUCTS_ALL_SUCCESS, GET_PRODUCTS_ALL_REQUEST, SHOP_PRODUCTS_VIEW, FILTER_PRODUCT_SORT} from '../constants/ProductAllConstant';
import productApi from '../services/productApi';

export function getProductAll(brand="", price= "", ratings="", options=""){
    return async (dispatch) =>{
       dispatch({type: GET_PRODUCTS_ALL_REQUEST})
       try{
            const {data} = await productApi.getProductAll(brand, price, ratings, options);
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

export function filterProductBySort(str){
    return (dispatch) => {
        dispatch({type: FILTER_PRODUCT_SORT, payload: str})
    }
}

export function getProductView(str){
    return (dispatch) => {
        dispatch({type: SHOP_PRODUCTS_VIEW, payload: str})
    }
}