import axios from "axios";
import qs from "query-string";
import { Redirect } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    // const userInfo = localStorage.getItem("user");
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      const { accessToken } = userInfo;
      config.headers.token = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý kết quả trả về từ server
    return response;
  },
  // Xử lý nếu kết quả trả về bị lỗi
  (error) => {
    if (error.status === 401) {
      // Xử lý log out: clear Storage, đẩy người dùng vào trang login
      localStorage.clear();
      <Redirect to="/" />;
    }
    return Promise.reject(error);
  }
);
export default axiosClient;