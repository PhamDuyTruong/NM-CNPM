import {REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOG_OUT,
FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST} from '../constants/AuthContstant';
import authApi from '../services/authApi';
import axios from '../services/axios'
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
};

export const forgetPassword = (email) => {
  return async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
       const {data} = await authApi.forgotPassword(email);
       dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
      dispatch({type: FORGOT_PASSWORD_FAILURE, payload: error})
    }
  }
};

export const resetPassword = (token, passwords) => {
  return async(dispatch) => {
    dispatch({type: RESET_PASSWORD_REQUEST});
    try {
      const data = {
        password: passwords.password,
        confirmPassword: passwords.confirmPassword,
    }
    const method = "put";
    let url = `/auth/password/reset/${token}`;
    const headers = {
        "Content-Type": "application/json",
    };
    
    await axios({ url, method, data, headers }).then((response) => {
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: "Success"})
    })
    } catch (error) {
      dispatch({type: RESET_PASSWORD_FAILURE, payload: error})
    }
   
  }
 
}