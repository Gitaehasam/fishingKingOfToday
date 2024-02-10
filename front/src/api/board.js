import { axiosApi } from "../util/commons";

const api = axiosApi();

const url = "boards";

async function getBoardList(type) {
  try {
    console.log(type);
    const { data } = await api.get(`${url}?categoryId=${type}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getBoardDetail(id) {
  try {
    console.log(id);
    const { data } = await api.get(`${url}/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteBoardPost(id) {
  try {
    api.defaults.headers["Authorization"] =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyNDYyMTcxODExIiwic3ViIjoiIiwiaWF0IjoxNzA3MzU5NTQwLCJleHAiOjE3MDczNjMxNDB9.42KQ9rlOFsFgaUK2tCT6Zely-yBNkQBENzLQ8WarElU";
    await api.delete(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export { getBoardList, getBoardDetail, deleteBoardPost };
