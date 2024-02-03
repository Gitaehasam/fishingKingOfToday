import React, { useState, useRef, useEffect } from 'react';
import './ChatComponent.css';

// 채팅 기능을 구현하는 컴포넌트
function ChatComponent(props) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const chatScroll = useRef();

  useEffect(() => {
    console.log(props)
    if (props.user && props.user.getStreamManager() && props.user.getStreamManager().stream && props.user.getStreamManager().stream.session) {
      props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data);
        let messageListCopy = [...messageList];
        messageListCopy.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById('userImg-' + (messageListCopy.length - 1));
        }, 50);
        setMessageList(messageListCopy);
        scrollToBottom();
      });
    }
  }, [props.user]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const handlePressKey = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  // 채팅 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  const styleChat = { display: props.chatDisplay };

  const sendMessage = () => {
    console.log(message);
    console.log(props)
    if (props.user && message) {
      let messageCopy = message.replace(/ +(?= )/g, '');
      if (messageCopy !== '' && messageCopy !== ' ') {
        const data = { message: messageCopy, nickname: props.user.getNickname(), streamId: props.user.getStreamManager().stream.streamId };
        props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
    setMessage('');
  }

  return (
    <div id="chatContainer">
      <div id="chatComponent" style={styleChat}>
        <div className="message-wrap" ref={chatScroll}>
          {messageList.map((data, i) => (
              <div
              key={i}
              id="remoteUsers"
              className={
                "message" +
                (data.connectionId !== props.user.getConnectionId()
                  ? " left"
                  : " right")
              }
            >
            <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
            <div className="msg-detail">
              <div className="msg-info">
                  <p> {data.nickname}</p>
              </div>
              <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{data.message}</p>
              </div>
            </div>
            </div>
          ))}
        </div>

        <div id="messageInput">
          <input
            placeholder="댓글 달기"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
          />
          <div title="Send message">
            <div size="small" id="sendButton" onClick={sendMessage}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
