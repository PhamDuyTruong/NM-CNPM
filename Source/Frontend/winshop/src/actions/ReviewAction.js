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
            const method = "post";
            let url = `/product/${productId}/review`;
            const headers = {
                "Content-Type": "application/json",
                token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNiOTU0OWI4NmI0N2IwZWFkMzFiMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDIyNDU2NiwiZXhwIjoxNjcwMzEwOTY2fQ.6f5U9igxctCw8zdtjZvc5eUKix2hWYTUKSYoOjQ0CZM`,
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: CREATE_REVIEW_SUCCESS, payload: response.data})
            })
            
        } catch (error) {
            dispatch({type: CREATE_REVIEW_FAILURE, payload: error})
        }
    }
}