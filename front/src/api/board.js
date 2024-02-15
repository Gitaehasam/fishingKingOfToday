import { axiosApi } from "../util/commons";

const api = axiosApi();

const url = "/api/boards";

async function getBoardList(type, fish, hash, sort) {
  try {
    console.log(type);
    const { data } = await api.get(`${url}?categoryId=${type}&fishBookId=${fish}&hashTagId=${hash}&sortType=${sort}`);
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

async function createBoardPost(file) {
  console.log(JSON.stringify(file));
  try {
    await api.post(`${url}`, JSON.stringify(file));
  } catch (error) {
    console.log(error);
  }
}

async function modifyBoardPut(file, pageId) {
  console.log("pageId : ", pageId);
  console.log(JSON.stringify(file));
  try {
    await api.put(`${url}/${pageId}`, JSON.stringify(file));
  } catch (error) {
    console.log(error);
  }
}

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
    if (word == "") return;
    if (word == " ") return;
    const { data } = await api.get(`${url}/search/fishBook?searchWord=${word}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getFilterFish() {
  try {
    const { data } = await api.get(`${url}/filters`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getFilterHash() {
  try {
    const { data } = await api.get(`${url}/hashtags`);
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
  getFilterFish,
  getFilterHash,
  createBoardPost,
  modifyBoardPut,
};
