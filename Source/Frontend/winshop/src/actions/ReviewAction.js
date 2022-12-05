import {CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS} from '../constants/ReviewConstant';
import reviewApi from '../services/reviewApi';


export function createReviewProduct(review, productId){
    return async (dispatch) => {
        dispatch({type: CREATE_REVIEW_REQUEST})
        try {
            const {data} = await reviewApi.createReview(review, productId);
            dispatch({type: CREATE_REVIEW_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: CREATE_REVIEW_FAILURE, payload: error})
        }
    }
}