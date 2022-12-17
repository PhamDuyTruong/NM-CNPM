import {CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, ORDER_STATUS_FAILURE, ORDER_STATUS_SUCCESS, ORDER_STATUS_REQUEST, ORDER_PAY_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,
    MY_ORDER_FAILURE, MY_ORDER_SUCCESS,MY_ORDER_REQUEST

} from '../constants/OrderConstant';
import axios from '../services/axios';
import axiosClient from '../services/axiosClient';

export const createOrder = (order) => {
    return async(dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST})
        try {
            const data = {
                shippingInfo: order.shippingInfo,
                cart: order.cart,
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice
            };
            const userInfo = JSON.parse(localStorage.getItem("user"));
            const method = "post";
            let url = `/order`;
            const headers = {
                "Content-Type": "application/json",
            }
            if(userInfo){
                const {accessToken} = userInfo
                headers.token = `Bearer ${accessToken}`
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: CREATE_ORDER_SUCCESS, payload: response.data})
            })
        } catch (error) {
            dispatch({type: CREATE_ORDER_FAILURE, payload: error})
        }
    }
};


export const updateStatusOrder = (order, status) => {
    return async(dispatch) => {
        dispatch({type: ORDER_STATUS_REQUEST})
        try {
            const data = {
                status: status
            }
            const method = "put";
            let url = `/order/status/${order._id}`;
            const userInfo = JSON.parse(localStorage.getItem("user"))
            const headers = {
                "Content-Type": "application/json",
            }
            if(userInfo){
                const {accessToken} = userInfo
                headers.token = `Bearer ${accessToken}`
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: ORDER_STATUS_SUCCESS, payload: response.data})
            })
        } catch (error) {
            dispatch({type: ORDER_STATUS_FAILURE, payload: error})
        }
    }
};

export const payOrder = (order, paymentInfo) => {
    return async(dispatch) => {
        dispatch({type: ORDER_PAY_REQUEST});
        try {
            const data = {
                id: order._id,
                status: paymentInfo.status,
                update_time: paymentInfo.update_time,
                email_address: paymentInfo.email_address
            }
            const method = "put";
            let url = `/order/pay/${order._id}`;
            const userInfo = JSON.parse(localStorage.getItem("user"));
            const headers = {
                "Content-Type": "application/json",
            }

            if(userInfo){
                const {accessToken} = userInfo
                headers.token = `Bearer ${accessToken}`
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: ORDER_PAY_SUCCESS, payload: response.data})
            })
        } catch (error) {
            dispatch({type: ORDER_PAY_FAILURE, payload: error})
        }
    }
};

export const getMyOrder = () => {
    return async(dispatch) => {
        dispatch({type: MY_ORDER_REQUEST});
        try {
            let url = "/api/order/cart/me"
            const {data} = await axiosClient.get(url);
            dispatch({type: MY_ORDER_SUCCESS, payload: data})
        } catch (error) {
                dispatch({type: MY_ORDER_FAILURE, payload: error})
        }
    }
}

