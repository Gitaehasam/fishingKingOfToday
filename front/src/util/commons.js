import axios from "axios";

const BASE_URL = "https://i10c203.p.ssafy.io/api";
// const BASE_URL = "https://likelasttime.shop/api";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosApi = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  instance.defaults.headers.common["Authorization"] =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMjgxMDc5MDMwIiwic3ViIjoiIiwiaWF0IjoxNzA3ODA2OTc1LCJleHAiOjE3MTAzOTg5NzV9.3BOOLQa5SH8Bc_XMurtaeQJOPkJZTKYcW4zSSDZxcDg";
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
