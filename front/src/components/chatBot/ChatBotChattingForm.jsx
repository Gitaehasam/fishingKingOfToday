import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import default_img from "@assets/images/default_profile.webp";
import "@assets/styles/chatbot/ChatBot.scss";

function ChatBotChattingForm({ onChat, loadingState, setLoadingState }) {
  const [chat, setChat] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handlePressKey = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      sendChat(e);
    }
  };

  const sendChat = (e) => {
    e.preventDefault();
    onChat(chat);
    setChat("");
    setLoadingState(!loadingState);
  };

  useEffect(() => {
    if (loadingState) {
      setChat("답변을 준비중이에요");
    } else {
      setChat("");
    }
  }, [loadingState]);

  return (
    <>
      <div>
        <div className="reply-add">
          <div className="reply-line bg-blue"></div>
          <img src={userInfo.imageUrl || default_img} alt="" />
          <div className="reply-add-area">
            <input
              className="chatbot-input"
              value={chat}
              type="text"
              placeholder="메세지 보내기..."
              onChange={handleChangeChat}
              onKeyPress={handlePressKey}
              readOnly={loadingState}
            />

            {chat.trim() !== "" && (
              <div className="send-reply bg-blue" onClick={sendChat}>
                <SendIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBotChattingForm;
