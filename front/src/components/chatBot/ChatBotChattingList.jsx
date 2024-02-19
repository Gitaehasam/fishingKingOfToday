import React, { useState, useEffect, useCallback, useRef } from "react";
import "@assets/styles/chatbot/ChatBotList.scss";
import ChatBotLoading from "./ChatBotLoading";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function ChatBotChattingList(props) {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const boxRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [scrollState, setScrollState] = useState(true);
  const chattingList = props.chattingList;

  const naviUrl = [
    { tutorial: "튜토리얼" },
    { "fish/map": "지도" },
    { fishbook: "도감" },
    { "media/roomList": "라이브방송" },
    { "media/board": "게시판" },
  ];

  const scrollEvent = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const scrollTop = boxRef.current.scrollTop;
      const clientHeight = boxRef.current.clientHeight;
      const scrollHeight = boxRef.current.scrollHeight;

      setScrollState(
        scrollTop + clientHeight >= scrollHeight - 100 ? true : false
      );
    }, 100);
  };

  const scroll = useCallback(() => {
    scrollEvent();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
    };
  }, [scroll]);

  return (
    <>
      <div ref={boxRef} className="message-box">
        {chattingList.map((chat, idx) => (
          <div
            key={idx}
            className={
              chat.user === "bot" ? "message-bot blue-bd" : "message-user"
            }
          >
            {chat.user === "bot" && chat.imgURL && (
              <div className="message-bot-content">
                <img className="message-bot-img" src={chat.imgURL} alt="" />
              </div>
            )}
            {chat.chat === "loading" ? (
              <ChatBotLoading />
            ) : (
              <div className="message-content">{chat.chat}</div>
            )}
            {chat.user === "bot" && chat.move && (
              <div
                onClick={() => navigate(`/${chat.move}`)}
                className="message-bot-move"
              >
                <span>{naviUrl.find((obj) => obj[chat.move])[chat.move]}</span>{" "}
                이동하기
              </div>
            )}
          </div>
        ))}
        <div ref={scrollRef}></div>
        {loading && <Loading />}
      </div>
    </>
  );
}

export default ChatBotChattingList;
