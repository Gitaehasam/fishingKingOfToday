import React, { useCallback, useEffect, useRef, useState } from "react";
import Profile from "../../../../assets/images/room/profileImg.jpg"
import './ChatComponent.css';

const ChattingList = (props) => {
  const scrollRef = useRef()
  const boxRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
      const clientHeight = boxRef.current.clientHeight; // 요소의 높이(메세지 박스 창의 높이)
      const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

      // 스크롤이 맨 아래에 있을때
      setScrollState(scrollTop + clientHeight >= scrollHeight - 100 ? true : false);
    }, 100);
  };

  const scroll = useCallback(() => {
    scrollEvent()
  }, [])

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [props.messageList])

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll)
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (boxRef.current) {
        boxRef.current.removeEventListener("scroll", scroll)
      }
    }
  }, [scroll])
  
  const styleChat = { display: props.chatDisplay };

  return (
    <div className="chatContainer" ref={boxRef}>
      <div>
        {props.messageList.map((msg, i) => (
          <div key={i}>
            <div className="chat-box">
              <img src={Profile} alt="" className="user-img"/>
              <div className="msg-detail">
                <div className="msg-info">
                  <p>{msg.split(":")[0]}</p>
                </div>

                <div className="msg-content">
                  <span className="triangle" />
                  <p className="text">{msg.split(":")[1]}</p>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
    </div>
  )
}

export default ChattingList;
