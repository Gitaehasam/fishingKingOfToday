import React, {useState, useEffect, useCallback, useRef} from "react";
import SendIcon from "@mui/icons-material/Send";
import you from "@assets/images/공유.jpg";

function ChatBotChattingForm (props) {
  const [chat, setChat] = useState('')

  const handleChangeChat = (e) => {
    setChat(e.target.value)
  }

  const handlePressKey = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== '') {
      e.preventDefault();
      sendChat(e);
    }
  }

  const sendChat = (e) => {
    e.preventDefault()
    props.onChat(chat)
    setChat('')
  }

  return (
    <>
      <div>
        <div className="reply-add">
          <div className="reply-line bg-blue"></div>
          <img src={you} alt="" />
          <div className="reply-add-area">
            <input
              className="chatbot-input"
              value={chat}
              type="text" 
              placeholder="메세지 보내기..." 
              onChange={handleChangeChat}
              onKeyPress={handlePressKey}
            />

            {chat.trim() !== '' && <div className="send-reply bg-blue" onClick={sendChat}>
              <SendIcon />
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBotChattingForm