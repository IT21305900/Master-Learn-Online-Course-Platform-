import axios from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";



const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://nginx-proxy.azurecontainerapps.io",
    timeout: 3000,
    withCredentials: true,
  });

  return instance;
};

export default AxiosInstance;
