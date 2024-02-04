import React, {useEffect, useRef} from "react";
import "../../assets/styles/Room/RoomList/LiveLeaveModal.scss"

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
      <dialog ref={leaveModal} onClick={closeLeaveModal} className="leave-modal">
      <header className="leave-modal-header">
        <h3>라이브를 종료하시겠어요?</h3>
      </header>

      <div className="leave-modal-body">
        <div onClick={closeModalClick}>취소</div>
        <div onClick={leaveLive}>나가기</div>
      </div>

      </dialog>
    </>
  )
}

export default LeaveModal