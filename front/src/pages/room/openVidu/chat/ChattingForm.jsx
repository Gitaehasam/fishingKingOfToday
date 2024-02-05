import React, { useState } from "react";
import './ChatComponent.css';

const ChattingForm = (props) => {
  const [message, setMessage] = useState("")

  // 메세지를 보내는 함수
  const sendMessage = (event) => {
    event.preventDefault()
    if (message.trim() !== "") {
      props.onMessage(`${props.myUserName}: ` + message.trim(), props.currentSession)
    }
    setMessage('')
  }

  // 입력 데이터 변경
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
      </div>
    </>
  )
}

export default ChattingForm;
