import axiosClient from './axiosClient';

const reviewApi = {
    createReview: (reviews, productId) => {
        return axiosClient.post(`/api/product/${productId}/review`, reviews)
    }
};

export default reviewApi;