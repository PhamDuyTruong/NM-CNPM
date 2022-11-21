import {GET_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS, GET_PRODUCT_REQUEST} from '../constants/ProductConstant';

const initialState = {
    products: [],
    isLoading: false,
    error: null
};

function productsReducer(state=initialState, action){
    switch(action.type){
        case GET_PRODUCT_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_PRODUCT_SUCCESS: {
            return {...state, isLoading:false, products: action.payload}
        }
        case GET_PRODUCT_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        default:
            return state;
    }
};

export default productsReducer;