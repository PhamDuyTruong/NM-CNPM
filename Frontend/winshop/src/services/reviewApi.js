import axiosClient from './axiosClient';
import axios from './axios'

const reviewApi = {
    createReview: (reviews, productId) => {
        return axiosClient.post(`/api/product/${productId}/review`, reviews)
    }
};

export default reviewApi;