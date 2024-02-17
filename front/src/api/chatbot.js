import { axiosApi } from "../util/commons";

const api = axiosApi();

async function postSendChat(chat) {
  try {
    const { data } = await api.post(`/chatbot`, { inputText: chat });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default postSendChat;
