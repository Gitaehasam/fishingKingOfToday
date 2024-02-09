import { axiosApi } from "../util/commons";

const api = axiosApi()

async function postSendChat(chat) {
  // const token = localStorage.getItem('jwt')

  try {
    api.defaults.headers["Authorization"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMzIxMTU0MTUzIiwic3ViIjoiIiwiaWF0IjoxNzA3NDc3NjQ5LCJleHAiOjE3MTAwNjk2NDl9.dKbZBVArBhh9Yqre0LFdi9rKmPYrdzz4DsDiCVolA28"
    await api.post('/api/chatbot', {inputText:chat})
  } catch (err) {
    console.log(err)
  }
}

export default postSendChat