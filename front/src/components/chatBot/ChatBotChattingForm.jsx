import React, {useState, useEffect, useCallback, useRef} from "react";
import SendIcon from "@mui/icons-material/Send";

function ChatBotChattingForm (props) {
  const [chat, setChat] = useState('')

  const handleChangeChat = (e) => {
    setChat(e.target.value)
  }

  const sendChat = (e) => {
    e.preventDefault()
    props.onChat(chat)
    setChat('')
  }

  return (
    <>
      <div>
        <input
          placeholder="메세지 보내기..."
          id="chatBotInput"
          value={chat}
          onChange={handleChangeChat}
          type="text" />
          {chat.trim() !== '' && <SendIcon onClick={sendChat}/>}
      </div>
    </>
  )
}

export default ChatBotChattingForm