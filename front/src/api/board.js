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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyNDYyMTcxODExIiwic3ViIjoiIiwiaWF0IjoxNzA3NDY4Mzg4LCJleHAiOjE3MTAwNjAzODh9.0Q3FO80tYz39BTKhVNgTyVqExI7qhMxVrj9k0ezbRU8";
    await api.delete(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

async function modifyBoardPost(id) {
  try {
    api.defaults.headers["Authorization"] =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyNDYyMTcxODExIiwic3ViIjoiIiwiaWF0IjoxNzA3NDY4Mzg4LCJleHAiOjE3MTAwNjAzODh9.0Q3FO80tYz39BTKhVNgTyVqExI7qhMxVrj9k0ezbRU8";
    await api.put(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

async function createPresinedURL(file) {}

async function sendBoardReply(id, reply) {
  try {
    api.defaults.headers["Authorization"] =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyNDYyMTcxODExIiwic3ViIjoiIiwiaWF0IjoxNzA3NDY4Mzg4LCJleHAiOjE3MTAwNjAzODh9.0Q3FO80tYz39BTKhVNgTyVqExI7qhMxVrj9k0ezbRU8";
    await api.post(`${url}/${id}/comments`, { content: reply });
  } catch (error) {
    console.log(error);
  }
}

async function deleteBoardReply(id, replyId) {
  try {
    api.defaults.headers["Authorization"] =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyNDYyMTcxODExIiwic3ViIjoiIiwiaWF0IjoxNzA3NDY4Mzg4LCJleHAiOjE3MTAwNjAzODh9.0Q3FO80tYz39BTKhVNgTyVqExI7qhMxVrj9k0ezbRU8";
    await api.delete(`${url}/${id}/comments/${replyId}`);
  } catch (error) {
    console.log(error);
  }
}

export { getBoardList, getBoardDetail, deleteBoardPost, modifyBoardPost, sendBoardReply, deleteBoardReply };
