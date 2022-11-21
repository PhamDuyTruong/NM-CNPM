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
    }
};


export default productApi;