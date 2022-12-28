import axiosClient from './axiosClient';

const authApi = {
    loginUser: (value) => {
        return axiosClient.post("/api/auth/login", value);
    },
    registerUser: (value) => {
        return axiosClient.post("/api/auth/register", value)
    }
};

export default authApi;