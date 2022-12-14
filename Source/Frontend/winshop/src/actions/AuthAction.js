import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOG_OUT} from '../constants/AuthContstant';
import authApi from '../services/authApi';
import Swal from "sweetalert2";


export const registerUser  = (value) => {
    return async(dispatch) => {
        dispatch({type: REGISTER_REQUEST});
        try {
            const {data} = await authApi.registerUser(value);
            dispatch({type: REGISTER_SUCCESS, payload: data});
            Swal.fire(
                "Sign up successfully!",
                "Return back to signin page!",
                "Success"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/sign-in";
                }
              });
        } catch (error) {
            dispatch({type: REGISTER_FAILURE, payload: error})
        }
    }
};

export const loginUser = (value) => {
    return async(dispatch) => {
        dispatch({type: LOGIN_REQUEST});
        try {
            const {data} = await authApi.loginUser(value);
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({type: LOGIN_SUCCESS, payload: data});
            Swal.fire(
                "Sign in successfully !!!",
                "Wish you have a good experience at Winshop",
                "Success"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/";
                }
              });
        } catch (error) {
            dispatch({type: LOGIN_FAILURE, payload: error})
        }
    }
};

export const logout = () => {
   return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({type: LOG_OUT})
    Swal.fire(
        "Log out successfully!",
        "Success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
   }
}