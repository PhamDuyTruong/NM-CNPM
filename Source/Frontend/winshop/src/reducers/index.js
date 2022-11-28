import { combineReducers } from "redux";
import productsReducer from "./ProductReducer";
import  productCategoryReducer from './ProductCategoryReducer';
import productAllReducer from "./ProductAllReducer";


const rootReducer = combineReducers({
   getProducts: productsReducer,
   getProductsByCategory: productCategoryReducer,
   getProductList: productAllReducer
});


export default rootReducer;