import {CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST} from '../constants/OrderConstant';

const initialState = {
    orderList: [],
    isLoading: false,
    error: null
};

function orderReducer(state =initialState, action){
    switch(action.type){
        case CREATE_ORDER_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case CREATE_ORDER_SUCCESS: {
            return {...state, isLoading: false, orderList: action.payload}
        }
        case CREATE_ORDER_FAILURE: {
            return {
                ...state, isLoading: false, error: action.payload
            }
        }
        
        default:
            return state
    }
};


export default orderReducer;