import { axiosApi } from "../util/commons";

const api = axiosApi()

async function postSendChat(chat) {
  const token = localStorage.getItem('jwt')

  try {
    api.defaults.headers["Authorization"] = token
    await api.post('/api/chatbot', chat)
  } catch (err) {
    console.log(err)
  }
}

export default postSendChat