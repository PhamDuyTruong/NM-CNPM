import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_SHIPPING_ADDRESS} from '../constants/CartConstant';

const initialState = {
    cartItems: [],
    shippingAdress: {}
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
        default: 
           return state
        
    }
};

export default cartReducer;