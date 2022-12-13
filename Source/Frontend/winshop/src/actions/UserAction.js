import {GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST} from '../constants/UserConstant';
import userApi  from '../services/userApi';

export const getProfile = () => {
    return async(dispatch) => {
        dispatch({type: GET_PROFILE_REQUEST});
        try {
            const {data} = await userApi.getProfile();
            dispatch({type: GET_PROFILE_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: GET_PROFILE_FAILURE, payload: error})
        }
    }
}