import React, {useState, useEffect, useRef} from "react";

function LeaveModal ({state, leaveSession}) {
  const leaveModal = useRef()

  useEffect(() => {
    leaveModal.current.showModal()
  })

  const closeLeaveModal = (e) => {
    const target = e.target
    const rect = target.getBoundingClientRect()
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      leaveModal.current.close()
      state(!state)
    }
  }

  const closeModalClick = (e) => {
    leaveModal.current.close()
    state(!state)
  }

  const leaveLive = (e) => {
    state(!state)
    leaveSession()
  }

  return (
    <>
      <dialog ref={leaveModal} onClick={closeLeaveModal}>
      <header>
        <span>라이브를 나가시겠습니까?</span>
        <span>나가기를 선택하면 라이브 시청을 종료하게 됩니다.</span>
      </header>

      <div>
        <span onClick={closeModalClick}>취소</span>
        <span onClick={leaveLive}>나가기</span>
      </div>

      </dialog>
    </>
  )
}

export default LeaveModal