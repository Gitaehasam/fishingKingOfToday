import React, {useState, useEffect, useCallback, useRef} from "react";
import "@/assets/styles/chatbot/ChatBotList.scss";
import ChatBotLoading from "./ChatBotLoading";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function ChatBotChattingList (props) {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const boxRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [scrollState, setScrollState] = useState(true);
  const chattingList = props.chattingList;

  const scrollEvent = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const scrollTop = boxRef.current.scrollTop;
      const clientHeight = boxRef.current.clientHeight;
      const scrollHeight = boxRef.current.scrollHeight;

      setScrollState(scrollTop + clientHeight >= scrollHeight - 100 ? true : false);
    }, 100);
  };

  const scroll = useCallback(() => {
    scrollEvent()
  }, []);

  useEffect(() => {
    setLoading(true);
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
    setLoading(false);
  }, [chattingList, scrollState]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (boxRef.current) {
        boxRef.current.removeEventListener("scroll", scroll);
      }
    }
  }, [scroll]);

  console.log(chattingList)

  return (
    <>
      <div ref={boxRef} className="message-box">
      {chattingList.map((chat, idx) => (
        <div key={idx} className={chat.user === 'bot' ? 'message-bot' : 'message-user'}>
          {chat.chat === 'loading' ? <ChatBotLoading/> : <div>{chat.chat}</div>}
          {chat.user === 'bot' && chat.imgURL && <img src={chat.imgURL} alt="" />}
          {chat.user === 'bot' && chat.move && <div onClick={() => navigate(`/${chat.move}`)}> <span>{chat.move} 이동하기</span></div>}
        </div>
      ))}
        <div ref={scrollRef}></div>
        {loading && <Loading />}
      </div>
    </>
  )
}

export default ChatBotChattingList