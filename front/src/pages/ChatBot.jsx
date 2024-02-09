import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import fishKing from "../assets/images/fish_king.png"
import Header from "../components/Header";
import "@/assets/styles/chatbot/ChatBot.scss"
import ChatBotChattingForm from "../components/chatBot/ChatBotChattingForm";
import ChatBotChattingList from "../components/chatBot/ChatBotChattingList";
import { axiosApi } from "../util/commons";
import postSendChat from "../api/chatbot";
import axios from "axios";

function ChatBot () {
  const baseURL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const [chattingList, setChattingList] = useState([])
  const [loadingState, setLoadingState] = useState(false)
  const recommendList = [
    '봉돌 알아보기',
    '캐스팅은 어떻게 해요?',
    '금어기는 언제에요?',
  ]

  const sendChat = async (chat) => {
    setChattingList(prevList => [...prevList, {user: 'user', chat: chat, imgURL: null, move:null}]);
    setChattingList(prevList => [...prevList, {user: 'bot', chat: 'loading', imgURL: null, move:null}]);
    setLoadingState(true)
    
    // await postSendChat(chat).then((res) => {
    //   console.log(res.data)
    //   setLoadingState(false)
    //   setChattingList(prevList => {
    //     let newList = [...prevList]
    //     newList[newList.length - 1] = {user: 'bot', chat: res.data.text, imgURL: res.data.imageUrl, move: res.data.move};
    //   })
    // })

    // try {
    //   const {data} = await axiosApi.post('', chat)
    //   return data
    // } catch (err) {
    //   console.log(err)
    // }
    // setLoadingState(false)
    // setChattingList(prevList => {
    //   let newList = [...prevList]
    //   newList[newList.length - 1] = {user: 'bot', chat: data.value, imgURL: data.imgURL, move:data.move};
    // })

    ///////////////////////////
    
    await axios.post(`${baseURL}/api/chatbot`, {inputText:chat}, {
      headers:{
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMzIxMTU0MTUzIiwic3ViIjoiIiwiaWF0IjoxNzA3NDc3NjQ5LCJleHAiOjE3MTAwNjk2NDl9.dKbZBVArBhh9Yqre0LFdi9rKmPYrdzz4DsDiCVolA28",
        'Content-Type': 'application/json',
        }
      })
      .then((res) => {
      setLoadingState(false)
      setChattingList(prevList => {
        let newList = [...prevList];
        newList[newList.length - 1] = {user: 'bot', chat: res.data.text, imgURL: res.data.imageUrl, move:res.data.move};
        return newList;
      });
    })
    .catch((err) => {
      console.log(err)
    })
  }
  

  const handleClickRecChat = (e) => {
    sendChat(e.target.textContent);
  };

  return (
    <>
    <div className="chatbot-sticky">
      <Header onClick={() => navigate("/")}/>
      
      <div className="chatbot-header">
        <img src={fishKing} className="chatbot-fishking"/>
        <span>낚시왕</span>
      </div>
    </div>

    <div className="chatbot-body">
      <div className="chatbot-chat-container">

        <div className="chatbot-start-ment">
          <div className="chatbot-startChat">
            <p><span>따뜻한 갈치</span>님, 안녕하세요.</p>
            <p>낚시왕입니다.</p>
            <br />
            <p>어떤 사항이 궁금하신가요?</p>
          </div>
        </div>
      </div>

      <div className="chatbot-chat-container">
        <div className="chatbot-recommend-div">
          <div className="recomend-title"><span>자주 묻는 질문</span></div>
          <div className="recommend-ment">낚시왕 추천, 똑똑하게 낚시하자!</div>
          {recommendList.map((recChat, idx) => (
            <div className="chatbot-recommend" key={idx} onClick={handleClickRecChat}>{recChat}</div>
            ))}
        </div>
      </div>
    </div>

    <ChatBotChattingList chattingList={chattingList}/>
    <ChatBotChattingForm onChat={sendChat} loadingState={loadingState} setLoadingState={setLoadingState}/>
    </>
  )
}

export default ChatBot