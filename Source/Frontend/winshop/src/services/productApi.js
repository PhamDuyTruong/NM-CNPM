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
    getProductAll: (brand, price, ratings) => {
        let url = "";
        if(brand === "" && price === "" && ratings=== ""){
           url = "/api/product/";
        }
        if(brand && price && ratings){
            url = 'api/product?brand='+brand+'&price='+price+'&ratings='+ratings;
        }
        if(brand && price){
            url = '/api/product?brand='+brand+'&price='+price;
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
        if(price){
            url = '/api/product?price=' + price;
        }
        if(ratings){
            url = '/api/product?ratings=' + ratings;
        }
        return axiosClient.get(url);
    }
};


export default productApi;