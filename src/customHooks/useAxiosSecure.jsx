import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export default function useAxiosSecure() {
  return axiosSecure;
}
