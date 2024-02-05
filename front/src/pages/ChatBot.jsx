import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import fishKing from "../assets/images/fish_king.png"
import Header from "../components/Header";
import ChatBotChattingForm from "../components/chatBot/ChatBotChattingForm";
import ChatBotChattingList from "../components/chatBot/ChatBotChattingList";
import axios from "axios";

function ChatBot () {
  const [stompClient, setStompClient] = useState(null)
  const navigate = useNavigate()

  // useEffect(() => {
  //   connect()
  //   return () => disconnect()
  // }, [])

  const sendChat = (chat) => {
    axios.post("", {chat}, {
      headers:{
        Authorization: `Token {token}`,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div>
        <div className="chatbot-toolbar" onClick={() => navigate("/")}>
          <Header centerText={'낚시왕'}></Header>
        </div>
      <hr />
        <div>
          <ChatBotChattingList />
          <ChatBotChattingForm onChat={sendChat}/>
        </div>
      </div>
    </>
  )
}

export default ChatBot


// import React, { useState, useEffect } from 'react'
// import SockJS from 'sockjs-client'
// import { over } from 'stompjs'

// function ChatBot() {
//   const [stompClient, setStompClient] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [msg, setMsg] = useState('')

//   useEffect(() => {
//     connect()
//     return () => disconnect()
//   }, [])

//   const connect = () => {
//     const socket = new SockJS('/ws')
//     const client = over(socket)
//     client.connect({}, frame => {
//       console.log('Connected: ' + frame)
//       client.subscribe('/topic/public', message => {
//         showMessage("받은 메시지: " + message.body)
//       })
//     })
//     setStompClient(client)
//   }

//   const disconnect = () => {
//     if (stompClient !== null) {
//       stompClient.disconnect()
//     }
//     console.log("Disconnected")
//   }

//   const sendMessage = () => {
//     let message = msg
//     showMessage("보낸 메시지: " + message)
//     stompClient.send("/app/sendMessage", {}, JSON.stringify(message))
//     setMsg('')
//   }

//   const showMessage = (message) => {
//     setMessages(messages => [...messages, message])
//   }

//   return (
//     <div>
//       <button onClick={connect} disabled={stompClient}>연결</button>
//       <button onClick={disconnect} disabled={!stompClient}>해제</button>
//       <input type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder="내용을 입력하세요...." />
//       <button onClick={sendMessage} disabled={!stompClient}>보내기</button>
//       <table>
//         <thead>
//           <tr>
//             <th>메세지</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((msg, index) => (
//             <tr key={index}>
//               <td>{msg}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ChatBot
