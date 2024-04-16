import { axiosApi } from "../util/commons";

const api = axiosApi();

async function getTutorialInfo(idx) {
  const token = localStorage.getItem("jwt");

  try {
    api.defaults.headers["Authorization"] = token;
    const { data } = await api.get(`/tutorials/${idx}`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default getTutorialInfo;
