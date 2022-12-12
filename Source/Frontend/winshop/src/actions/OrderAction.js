import {CREATE_ORDER_FAILURE, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, ORDER_STATUS_FAILURE, ORDER_STATUS_SUCCESS, ORDER_STATUS_REQUEST} from '../constants/OrderConstant';
import axios from '../services/axios';

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
            }
            const method = "post";
            let url = `/order`;
            const headers = {
                "Content-Type": "application/json",
                token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNiOTU0OWI4NmI0N2IwZWFkMzFiMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDg0NjM5MSwiZXhwIjoxNjcwOTMyNzkxfQ.NxpMAvvNYW9zuDH8N8ipGhuxmM5QUWRdpfyixmIXlxs`,
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
            const headers = {
                "Content-Type": "application/json",
                token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNiOTU0OWI4NmI0N2IwZWFkMzFiMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDg0NjM5MSwiZXhwIjoxNjcwOTMyNzkxfQ.NxpMAvvNYW9zuDH8N8ipGhuxmM5QUWRdpfyixmIXlxs`,
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: ORDER_STATUS_SUCCESS, payload: response.data})
            })
        } catch (error) {
            dispatch({type: ORDER_STATUS_FAILURE, payload: error})
        }
    }
  
}