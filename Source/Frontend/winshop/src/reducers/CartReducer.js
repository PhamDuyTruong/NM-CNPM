import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/CartConstant';

const initialState = {
    cartItems: []
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
        default: 
           return state
        
    }
};

export default cartReducer;