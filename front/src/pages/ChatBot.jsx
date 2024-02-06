import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import fishKing from "../assets/images/fish_king.png"
import Header from "../components/Header";
import "@assets/styles/chatbot/ChatBot.scss"
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
  const [user, setUser] = useState('')
  const [recommendList, setRecommendList] = useState([
    '봉돌',
    '합사',
    '캐스팅',
    '미끼',
    '물고기 잘 잡히는 곳'
  ])

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

  const userRole = (user) => {
    setUser(user)
  }

  const handleClickRecChat = (e) => {
    sendChat(e.target.textContent);

    const newRecommendList = recommendList.filter((recChat) => {
      return recChat !== e.target.textContent;
    });
    setRecommendList(newRecommendList);
  };


  return (
    <>
      <div className="chatbot-Demo">
        <div onClick={() => navigate("/")}>
          <Header />
        </div>

        <div className="chatbot-header">
          <img src={fishKing} className="chatbot-fishking"/>
          <span>낚시왕</span>
        </div>

        <div>
          <div className="chat-list-container">
            <div className="chatbot-startChat">
              <p><span>따뜻한 갈치</span>님, 안녕하세요.</p>
              <p>저는 낚시왕입니다.</p>
              <p>어떤 사항이 궁금하신가요?</p>
            </div>

            <div>
              자주 묻는 질문
              {recommendList.map((recChat, idx) => (
                <div key={idx} onClick={handleClickRecChat}>{recChat}</div>
                ))}
            </div>
            <ChatBotChattingList chattingList={chattingList}/>
          </div>

          <ChatBotChattingForm onChat={sendChat} />
        </div>
      </div>
    </>
  )
}

export default ChatBot