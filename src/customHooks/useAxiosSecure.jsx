import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export default function useAxiosSecure() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  // request interceptor to add authorization header for every secure API
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logoutUser();
        navigate("/auth/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
}
