import {GET_CATEGORY_FAILURE, GET_CATEGORY_SUCCESS, GET_CATEGORY_REQUEST} from '../constants/ProductCategoryConstant';

const initialState = {
    productByCategory: [],
    isLoading: false,
    error: null
};

function productCategoryReducer(state=initialState, action){
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {...state, isLoading:true, error:null}
        case GET_CATEGORY_SUCCESS: 
            return {...state, isLoading: false, productByCategory: action.payload}
        case GET_CATEGORY_FAILURE: 
            return {...state, isLoading:false, error: null}
        default:
            return state;
    }
};

export default productCategoryReducer;