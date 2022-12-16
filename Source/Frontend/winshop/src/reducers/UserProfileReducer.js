import {GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST,
    PROFILE_UPDATE_FAILURE,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS
} from '../constants/UserConstant';

const initialState = {
    profile: [],
    isLoading: false,
    error: null
}

export function getUserProfile(state = initialState, action){
    switch(action.type){
        case GET_PROFILE_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case GET_PROFILE_SUCCESS: {
            return {...state, isLoading: false, profile: action.payload}
        }
        case GET_PROFILE_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default: {
            return state
        }
    }
};
const profileState = {
    updateUser: [],
    isLoading: false,
    error: null
}

export function updateProfile(state = profileState, action){
    switch(action.type){
        case PROFILE_UPDATE_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case PROFILE_UPDATE_SUCCESS: {
            
            return {...state, isLoading: false, updateUser: action.payload}
        }
        case PROFILE_UPDATE_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default: {
            return state
        }
    }
}