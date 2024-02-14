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
    await api.delete(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

async function modifyBoardPost(id) {
  try {
    await api.put(`${url}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

async function createPresinedURL(file) {}

async function sendBoardReply(id, reply) {
  try {
    await api.post(`${url}/${id}/comments`, { content: reply });
  } catch (error) {
    console.log(error);
  }
}

async function deleteBoardReply(id, replyId) {
  try {
    await api.delete(`${url}/${id}/comments/${replyId}`);
  } catch (error) {
    console.log(error);
  }
}

async function putPostLike(boardId) {
  try {
    await api.put(`${url}/${boardId}/likes`);
  } catch (error) {
    console.log(error);
  }
}

async function deletePostLike(boardId) {
  try {
    await api.delete(`${url}/${boardId}/likes`);
  } catch (error) {
    console.log(error);
  }
}

async function getSearchFish(word) {
  try {
    console.log("dd");
    const { data } = await api.get(`${url}/search/fishBook?searchWord=${word}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// async function getSearchHash(word){
//   try {
//     await api.get(`${url}/search/fishBook?searchWord=${word}`);
//   } catch (error) {
//     console.log(error);
//   }
// }

export {
  getBoardList,
  getBoardDetail,
  deleteBoardPost,
  modifyBoardPost,
  sendBoardReply,
  deleteBoardReply,
  putPostLike,
  deletePostLike,
  getSearchFish,
};
