import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS} from '../constants/CartConstant';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    shippingAdress: {},
    paymentMethod: "",
}

function cartReducer(state=initialState, action){
    switch(action.type){
        case ADD_CART_ITEM: {   
            const item = action.payload;
            const existsItem = state.cartItems.find((x) => x.product === item.product);
            if(existsItem){
                const  newCart = state.cartItems.map((x) => x.product === existsItem.product ? item : x);
                localStorage.setItem("cart", JSON.stringify(newCart));
                return {...state, cartItems: newCart}
                
            }else{
                const newCart =  [...state.cartItems, item];
                localStorage.setItem("cart", JSON.stringify(newCart));
                return {...state, cartItems: newCart}
            }
          
        }
        case REMOVE_CART_ITEM: {
            const newCart = state.cartItems.filter(x => x.product !== action.payload);
            localStorage.setItem("cart", JSON.stringify(newCart));
            return {...state, cartItems: newCart}
        }
        case SAVE_SHIPPING_ADDRESS: {
            const newShip = action.payload;
            localStorage.setItem("ship", JSON.stringify(newShip))
            return {...state, shippingAdress: newShip}
        }
        case SAVE_PAYMENT_METHOD: {
            const newPayment = action.payload;
            localStorage.setItem("payment", JSON.stringify(newPayment))
            return {...state, paymentMethod: newPayment}
        }
        default: 
           return state
        
    }
};

export default cartReducer;