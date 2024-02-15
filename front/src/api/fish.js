import { axiosApi } from "../util/commons";

const api = axiosApi();

const url = "/api/fishbooks";

async function getFishList() {
  try {
    const { data } = await api.get(`${url}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getFishDetail(id) {
  try {
    console.log("dddd");
    const { data } = await api.get(`${url}/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { getFishList, getFishDetail };
