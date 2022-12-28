import {GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_FAILURE, GET_PRODUCT_DETAIL_SUCCESS} from '../constants/DetailProductConstant';
import productApi from '../services/productApi';


export function getProductDetail(productId){
    return async (dispatch) => {
        dispatch({type: GET_PRODUCT_DETAIL_REQUEST})
        try {
            const {data} = await productApi.getDetailProduct(productId);
            dispatch({type: GET_PRODUCT_DETAIL_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: GET_PRODUCT_DETAIL_FAILURE, error: error})
        }
    }
}
