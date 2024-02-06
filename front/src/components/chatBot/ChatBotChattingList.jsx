import React, {useState, useEffect, useCallback, useRef} from "react";
import "@/assets/styles/chatbot/ChatBotList.scss"
import Loading from "../../components/Loading";

function ChatBotChattingList (props) {
  const chattingList = props.chattingList
  const scrollRef = useRef()
  const boxRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
    setLoading(false);
  }, [chattingList, scrollState]);

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
    <>
      <div ref={boxRef} className="message-box">
        {chattingList.map((chat, idx) => (
          <div key={idx} className={`message ${chat.user}`}>
            <div>{chat.chat}</div>
          </div>
        ))}
        <div ref={scrollRef}></div>
        {loading && <Loading />}
      </div>
    </>
  )
}

export default ChatBotChattingList
