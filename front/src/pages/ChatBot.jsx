import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import fishKing from "../assets/images/fish_king.png"
import Header from "../components/Header";
import "@/assets/styles/chatbot/ChatBot.scss"
import ChatBotChattingForm from "../components/chatBot/ChatBotChattingForm";
import ChatBotChattingList from "../components/chatBot/ChatBotChattingList";
import axios from "axios";

// [
// 	['캐스팅', [{value: '~~'}, {imgURL: null}, {move: 'myPage'}]],
// 	['미끼', [{value: '~~'}, {imgURL: null}, {move: 'myPage'}]],
// 	['봉돌', [{value: '~~'}, {imgURL: null}, {move: 'myPage'}]],
// 	['합사', [{value: '~~'}, {imgURL: null}, {move: 'myPage'}]],
// 	['물고기 잘 잡히는 곳', [{value: '~~'}, {imgURL: null}, {move: 'myPage'}]],
// ]

function ChatBot () {
  const navigate = useNavigate()
  const [chattingList, setChattingList] = useState([])
  const recommendList = [
    '봉돌 알아보기',
    '캐스팅은 어떻게 해요?',
    '금어기는 언제에요?',
  ]

  const sendChat = (chat) => {
    // axios.post("", {chat}, {
    //   headers:{
    //     Authorization: `Token {token}`,
    //     'Content-Type': 'application/json',
    //     }
    //   })
    //   .then((res) => {
      setChattingList([...chattingList, {user: 'user', chat: chat, imgURL: null, move:null}])
    //     setChattingList([...chattingList, {user: 'bot', chat: res.data, imgURL: imgURL, move:link}])
    //     console.log(res.data)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
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
        <div className="chatbot-img">
          <img src={fishKing} alt=""/>
        </div>

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
    <ChatBotChattingForm onChat={sendChat} />
    </>
  )
}

export default ChatBot