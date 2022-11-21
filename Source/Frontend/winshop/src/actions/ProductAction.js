import {GET_PRODUCT_SUCCESS, GET_PRODUCT_REQUEST, GET_PRODUCT_FAILURE} from '../constants/ProductConstant'
import productApi from '../services/productApi';

export function getProducts() {
    return async(dispatch) => {
        dispatch({type: GET_PRODUCT_REQUEST});
        try {
            const {data} = await productApi.getProducts();
            dispatch({type: GET_PRODUCT_SUCCESS, payload: data});
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_FAILURE,
                error: {error}
            })
        }
    }
}

