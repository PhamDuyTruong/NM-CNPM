import {CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, ORDER_STATUS_FAILURE, ORDER_STATUS_SUCCESS, ORDER_STATUS_REQUEST, ORDER_PAY_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,
    MY_ORDER_REQUEST, MY_ORDER_FAILURE, MY_ORDER_SUCCESS

} from '../constants/OrderConstant';

const initialState = {
    orderList: [],
    isLoading: false,
    error: null
};

export function orderReducer(state =initialState, action){
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
        case ORDER_STATUS_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case ORDER_STATUS_SUCCESS: {
            return {...state, isLoading: false, orderList: action.payload}
        }
        case ORDER_STATUS_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        case ORDER_PAY_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case ORDER_PAY_SUCCESS: {
            return {...state, isLoading: false, orderList: action.payload}
        }
        case ORDER_PAY_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
};

const myOrderState = {
    myOrder: [],
    isLoading: false,
    error: null
}

export function myOrderList(state = myOrderState, action){
    switch(action.type){
        case MY_ORDER_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case MY_ORDER_SUCCESS: {
            return {...state, isLoading: false, myOrder: action.payload}
        }
        case MY_ORDER_FAILURE: {
            return {...state, isLoading: true, error: action.payload}
        }
        default: {
            return state
        }
    }
}