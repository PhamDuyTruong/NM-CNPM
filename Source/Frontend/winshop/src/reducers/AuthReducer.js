import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../constants/AuthContstant';

const registerState = {
    registerUser: [],
    isLoading: false,
    error: null
};

const loginState = {
    userInfo: [],
    isLoading: false,
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
            return {...state, isLoading: false, userInfo: action.payload}
        }
        case LOGIN_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
}