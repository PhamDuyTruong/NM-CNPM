import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT} from '../constants/AuthContstant';

const registerState = {
    registerUser: [],
    isLoading: false,
    error: null
};

const loginState = {
    userLogin: [],
    isLoading: false,
    error: null 
};

const initialState = {
    success: null,
}

export function registerReducer(state = registerState, action){
    switch(action.type){
        case REGISTER_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case REGISTER_SUCCESS: {
            return {...state, isLoading: false, registerUser: action.payload}
        }
        case REGISTER_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
};

export function loginReducer(state = loginState, action){
    switch(action.type){
        case LOGIN_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case LOGIN_SUCCESS: {
            return {...state, isLoading: false, userLogin: action.payload}
        }
        case LOGIN_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
};

 export function logoutReducer(state = initialState, action){
    switch(action.type){
        case LOG_OUT:
            return {...state, success: "Log out successfully"}
        default:
            return state;
    }
 }