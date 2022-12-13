import {GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST} from '../constants/UserConstant';

const initialState = {
    profile: [],
    isLoading: false,
    error: null
}

function getUserProfile(state = initialState, action){
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

export default getUserProfile;