import {GET_PRODUCTS_ALL_FAILURE, GET_PRODUCTS_ALL_SUCCESS, GET_PRODUCTS_ALL_REQUEST, FILTER_PRODUCT_SORT, SEARCH_PRODUCT} from '../constants/ProductAllConstant';

const initialState = {
    shopProducts: [],
    searchProducts: [],
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
        case FILTER_PRODUCT_SORT:
            switch(action.payload){
                case "price_lth":
                    return {...state, shopProducts: state.shopProducts.sort((a, b) => a.price - b.price)};
                case "price_htl":
                     return {...state, shopProducts: state.shopProducts.sort((a,b) => b.price - a.price)};
                case "rate_lth":
                    return {...state, shopProducts: state.shopProducts.sort((a, b) => a.ratings - b.ratings)};
                case "rate_htl":
                   return {...state, shopProducts: state.shopProducts.sort((a, b) => b.ratings - a.ratings)};
                default: 
                    return state;
            }
        case SEARCH_PRODUCT:
            return {...state, shopProducts: [], searchProducts: action.payload, isLoading: false, error: null}
        default:
            return state;
    }
};      

export default productAllReducer;