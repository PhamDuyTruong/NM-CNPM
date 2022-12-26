import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT,
FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST} from '../constants/AuthContstant';

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
};

const forgotState = {
    loading: false,
    message: "",
    error: null
}

const resetState = {
    loading: false,
    resetData: "",
    error: null
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
 };

 export function forgotReducer(state = forgotState, action){
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST: {
            return {...state, loading: true, error: null}
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {...state, message: action.payload, loading: false}
        }
        case FORGOT_PASSWORD_FAILURE: {
            return {...state, loading: false, error: action.payload}
        }
        default: 
         return state
    }
 };

 export function resetReducer(state = resetState, action){
    switch(action.type){
        case RESET_PASSWORD_REQUEST: {
            return {...state, loading: true, error: null}
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, loading: false, resetData: action.payload}
        }
        case RESET_PASSWORD_FAILURE: {
            return {...state, loading: false, error: action.payload}
        }
        default: 
        return state;
    }
 }