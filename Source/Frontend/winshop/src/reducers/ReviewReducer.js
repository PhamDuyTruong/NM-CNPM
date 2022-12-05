import {CREATE_REVIEW_REQUEST, CREATE_REVIEW_FAILURE, CREATE_REVIEW_SUCCESS} from '../constants/ReviewConstant';

const initialState = {
    reviewData: [],
    isLoadingReview: false,
    error: null
};

function reviewReducer(state=initialState, action){
    switch(action.type){
        case CREATE_REVIEW_REQUEST:{
            return {...state, isLoadingReview: true, error: null}
        }
        case CREATE_REVIEW_SUCCESS: {
            return {...state, isLoadingReview: false, reviewData: action.payload}
        }
        case CREATE_REVIEW_FAILURE: {
            return {...state, isLoadingReview: false, error: action.payload}
        }
        default:
            return state;
    }
};

export default reviewReducer;