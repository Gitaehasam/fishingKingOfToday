import axios from "axios";

// const BASE_URL = "https://i10c203.p.ssafy.io/api";
// const BASE_URL = "https://likelasttime.shop/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("jwt");

const axiosApi = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}`,
  });

  const token = localStorage.getItem("jwt");

  instance.defaults.headers.common["Authorization"] = token;
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";
  instance.defaults.headers.delete["Content-Type"] = "application/json";

  return instance;
};

const axiosFileApi = () => {
  const instanceFile = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return instanceFile;
};

export { axiosApi, axiosFileApi };
