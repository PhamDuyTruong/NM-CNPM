import {GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_DETAIL_FAILURE, GET_PRODUCT_DETAIL_REQUEST} from '../constants/DetailProductConstant';

const initialState = {
    detailProduct: [],
    isLoading: false,
    error: null
}


function detailProductReducer(state=initialState, action){
    switch(action.type){
        case GET_PRODUCT_DETAIL_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_PRODUCT_DETAIL_SUCCESS: {
            return {...state, isLoading:false, detailProduct: action.payload}
        }
        case GET_PRODUCT_DETAIL_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        default:
            return state;
    }
};

export default detailProductReducer;