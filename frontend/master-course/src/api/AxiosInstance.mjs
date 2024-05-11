import axios from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";



const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 3000,
    withCredentials: true,
  });

  return instance;
};

export default AxiosInstance;
