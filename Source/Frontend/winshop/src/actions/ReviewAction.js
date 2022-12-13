import {CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS} from '../constants/ReviewConstant';
import reviewApi from '../services/reviewApi';
import axios from '../services/axios';

export function createReviewProduct(review, productId){
    return async (dispatch) => {
        dispatch({type: CREATE_REVIEW_REQUEST})
        try {
            const data = {
                rating: Number(review.rating),
                comment: review.comment
            }
            const userInfo = JSON.parse(localStorage.getItem("user"));
            const method = "post";
            let url = `/product/${productId}/review`;
            const headers = {
                "Content-Type": "application/json",
            };
            if(userInfo){
                const {accessToken} = userInfo
                headers.token = `Bearer ${accessToken}`
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: CREATE_REVIEW_SUCCESS, payload: response.data})
            })
            
        } catch (error) {
            dispatch({type: CREATE_REVIEW_FAILURE, payload: error})
        }
    }
}