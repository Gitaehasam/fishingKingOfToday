import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import fishKing from "../assets/images/fish_king.png"
import Header from "../components/Header";
import "@/assets/styles/chatbot/ChatBot.scss"
import ChatBotChattingForm from "../components/chatBot/ChatBotChattingForm";
import ChatBotChattingList from "../components/chatBot/ChatBotChattingList";
import postSendChat from "../api/chatbot";

function ChatBot () {
  const navigate = useNavigate()
  const [chattingList, setChattingList] = useState([])
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [loadingState, setLoadingState] = useState(false)
  const recommendList = [
    '낚시 기초 지식',
    '낚시 라이브를 보고싶어',
    '물고기 종류 알아보기',
    '낚시터 추천',
    '원투 낚시',
    '캐스팅이 뭐야?',
  ]

  const sendChat = async (chat) => {
    setChattingList(prevList => [...prevList, {user: 'user', chat: chat, imgURL: null, move:null}]);
    setChattingList(prevList => [...prevList, {user: 'bot', chat: 'loading', imgURL: null, move:null}]);
    setLoadingState(true)
    
    await postSendChat(chat).then((res) => {
      setLoadingState(false)
      setChattingList(prevList => {
        let newList = [...prevList]
        newList[newList.length - 1] = {user: 'bot', chat: res.text, imgURL: res.imageUrl, move: res.move};
        return newList
      })
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
          <div className="chatbot-startChat blue-bd">
            <p><span>{userInfo.nickname}</span> 님, 안녕하세요.</p>
            <p>낚시왕입니다.</p>
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
    <ChatBotChattingList chattingList={chattingList}/>
    </div>

    <ChatBotChattingForm onChat={sendChat} loadingState={loadingState} setLoadingState={setLoadingState}/>
    </>
  )
}

export default ChatBot