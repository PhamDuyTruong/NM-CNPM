import {GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS} from '../constants/ProductCategoryConstant';
import productApi from '../services/productApi';

export function getProductByCategory(category){
    return async(dispatch) => {
        dispatch({type: GET_CATEGORY_REQUEST});
        try{
            const {data} = await productApi.getProductsByCategory(category);
            dispatch({type: GET_CATEGORY_SUCCESS, payload: data});
        }catch(error){
            dispatch({
                type: GET_CATEGORY_FAILURE,
                error: error
            })
        }
    }
}
