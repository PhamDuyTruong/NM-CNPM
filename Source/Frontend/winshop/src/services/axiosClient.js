import axios from "axios";
import qs from "query-string";
import { Redirect } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // const userInfo = localStorage.getItem("user");
    // if (userInfo) {
    //   const { accessToken } = JSON.parse(userInfo);
    //config.headers.token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNiOTU0OWI4NmI0N2IwZWFkMzFiMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDIwMzM0NiwiZXhwIjoxNjcwMjg5NzQ2fQ.1qY7j4KX_1sPksZ_n6S_torRILt8OwT82bQgjsj20l4`;
    // }
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