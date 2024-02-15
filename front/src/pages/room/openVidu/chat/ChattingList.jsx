import React, { useCallback, useEffect, useRef, useState } from "react";
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
      const scrollTop = boxRef.current.scrollTop;
      const clientHeight = boxRef.current.clientHeight;
      const scrollHeight = boxRef.current.scrollHeight;

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
  

  return (
    <div className="chatContainer" ref={boxRef}>
      <div>
      {props.messageList.map((msg, i) => (
        <div key={i}>
          <div className="chat-box">
            <img src={msg.split("|")[1]} alt="" className="user-img"/>
            <div className="msg-detail">
              <div className="msg-info">
                <p>{msg.split("|")[0]}</p>
              </div>

              <div className="msg-content">
                <span className="triangle" />
                <p className="text">{msg.split("|")[2]}</p>
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
