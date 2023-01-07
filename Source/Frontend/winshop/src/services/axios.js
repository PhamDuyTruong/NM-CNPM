import axios from "axios";
//https://winshop-server.onrender.com/
const instance = axios.create({
  baseURL: "https://winshop-server.onrender.com/api",
});

export default instance;