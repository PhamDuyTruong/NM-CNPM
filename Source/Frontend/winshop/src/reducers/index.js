import { combineReducers } from "redux";
import productsReducer from "./ProductReducer";
import  productCategoryReducer from './ProductCategoryReducer';
import productAllReducer from "./ProductAllReducer";
import detailProductReducer from "./DetailProductReducer";
import reviewReducer from "./ReviewReducer";
import cartReducer from "./CartReducer";
import  addSidebarReducer from './SidebarReducer'
import {myOrderList, orderReducer} from './OrderReducer'
import {getUserProfile, updateProfile} from "./UserProfileReducer";
import { loginReducer, logoutReducer, registerReducer } from "./AuthReducer";


const rootReducer = combineReducers({
   getProducts: productsReducer,
   getProductsByCategory: productCategoryReducer,
   getProductList: productAllReducer,
   getDetailProduct: detailProductReducer,
   getReviewProduct:  reviewReducer,
   cart: cartReducer,
   order: orderReducer,
   sidebar: addSidebarReducer,
   userProfile: getUserProfile,
   register: registerReducer,
   login: loginReducer,
   logout: logoutReducer,
   updateProfile: updateProfile,
   myOrder: myOrderList
});


export default rootReducer;