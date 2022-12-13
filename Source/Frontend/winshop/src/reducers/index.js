import { combineReducers } from "redux";
import productsReducer from "./ProductReducer";
import  productCategoryReducer from './ProductCategoryReducer';
import productAllReducer from "./ProductAllReducer";
import detailProductReducer from "./DetailProductReducer";
import reviewReducer from "./ReviewReducer";
import cartReducer from "./CartReducer";
import  addSidebarReducer from './SidebarReducer'
import orderReducer from './OrderReducer'
import getUserProfile from "./UserProfileReducer";

const rootReducer = combineReducers({
   getProducts: productsReducer,
   getProductsByCategory: productCategoryReducer,
   getProductList: productAllReducer,
   getDetailProduct: detailProductReducer,
   getReviewProduct:  reviewReducer,
   cart: cartReducer,
   order: orderReducer,
   sidebar: addSidebarReducer,
   userProfile: getUserProfile
});


export default rootReducer;