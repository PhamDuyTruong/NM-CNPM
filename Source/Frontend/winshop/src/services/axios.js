import axios from "axios";

const instance = axios.create({
  baseURL: "https://winshop-server.onrender.com/api",
});

export default instance;