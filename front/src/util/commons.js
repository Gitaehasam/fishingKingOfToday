import axios from "axios";
const BASE_URL = "https://likelasttime.shop/api";

const axiosApi = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  instance.defaults.headers.common["Authorization"] = "";
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
