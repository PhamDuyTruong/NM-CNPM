import axiosClient from './axiosClient';

const userApi = {
    getProfile: () => {
        return axiosClient.get("/api/user/me/profile/")
    }
};

export default userApi;