import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import './ChatComponent.css';

const ChattingForm = (props) => {
  const [message, setMessage] = useState("")

  const sendMessage = (event) => {
    event.preventDefault()
    if (message.trim() !== "") {
      props.onMessage(`${props.myUserName}|${props.myUserImg}|` + message.trim(), props.currentSession)
    }
    setMessage('')
  }
  
  const inputChangeHandler = (event) => {
    setMessage(event.target.value)
  }

  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  }

  return (
    <>
      <div id="messageInput">
        <input
          placeholder="댓글 달기"
          id="chatInput"
          value={message}
          onChange={inputChangeHandler}
          onKeyPress={handlePressKey}
          onpaste="return false;"
        />
        {message.trim() !== '' && <div className="send-reply" onClick={sendMessage}>
          <SendIcon />
        </div>}
      </div>
    </>
  )
}

export default ChattingForm;
