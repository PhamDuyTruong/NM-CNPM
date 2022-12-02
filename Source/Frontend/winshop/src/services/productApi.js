import axiosClient from './axiosClient';

const productApi = {
    getProducts: () => {
        return axiosClient.get("/api/product/");
    },
    getProductsByCategory: (categoryId) => {
        const params = {
            maDanhMuc: categoryId
        };
        return axiosClient.get("/api/product?category="+params.maDanhMuc)
    },
    getDetailProduct: (productId) => {
        return axiosClient.get("/api/product/" + productId)
    },
    getProductAll: (brand, price, ratings, options) => {
        let url = "";
        if(brand === "" && price === "" && ratings=== ""){
           url = "/api/product/";
        }
        if(brand && price && ratings){
            url = 'api/product?brand='+brand+'&price='+price+'&ratings='+ratings;
        }
        if(brand && price && options){
            url = '/api/product?brand='+brand+'&price[' + options + ']=' +price;
        }
        if(brand && ratings){
            url = '/api/product?brand='+brand+'&ratings='+ratings;
        }
        if(price && ratings){
            url='/api/product?price='+price+'&ratings='+ratings;
        }
        if(brand){
            url = '/api/product?brand=' + brand;
        }
        if(ratings){
            url = '/api/product?ratings=' + ratings;
        }
        if(price && options){
            url = `/api/product?price[${options}]=${price}`;
        }
       
        return axiosClient.get(url);
    },
    searchProduct: (keyword) => {
        let url;
        if(keyword){
            url = "/api/product?keyword=" + keyword
        }
        return axiosClient.get(url);
    }
};


export default productApi;