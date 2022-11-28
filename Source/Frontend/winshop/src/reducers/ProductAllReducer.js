import { getProductAll } from '../actions/ProductAllAction';
import {GET_PRODUCTS_ALL_FAILURE, GET_PRODUCTS_ALL_SUCCESS, GET_PRODUCTS_ALL_REQUEST, SHOP_PRODUCTS_VIEW} from '../constants/ProductAllConstant';

const initialState = {
    shopProducts: [],
    shopProductsView: localStorage.getItem(SHOP_PRODUCTS_VIEW) ?? "",
    isLoading: false,
    error: null
}

function productAllReducer(state=initialState, action){
    switch(action.type){
        case GET_PRODUCTS_ALL_REQUEST:
            return {...state, isLoading: true}
        case GET_PRODUCTS_ALL_SUCCESS:
            return {...state, isLoading: false, shopProducts: action.payload}
        case GET_PRODUCTS_ALL_FAILURE:
            return {...state, isLoading: false, error: action.error}
        case SHOP_PRODUCTS_VIEW:
            localStorage.setItem(SHOP_PRODUCTS_VIEW, action.payload);
            return {...state, shopProductsView: action.payload}
        default:
            return state;
    }
};

export default productAllReducer;