import React, {useState, useEffect, useRef} from "react";
import group from "../../assets/images/Room/Group.svg"
import sort from "../../assets/images/Room/Sort.svg"
import "../../assets/styles/Room/RoomList/RoomFilterModal.scss"

function RoomFilterModal ({state, sortBy}) {
  const roomFilterModal = useRef()
  
  useEffect(() => {
    roomFilterModal.current.showModal()
  })

  const closeRoomFilterModal = (e) => {
    const target = e.target
    const rect = target.getBoundingClientRect()
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      roomFilterModal.current.close()
      state(!state)
    }
  }

  const sortByNumber = () => {
    roomFilterModal.current.close()
    sortBy(1)
    state(!state)
  }

  const sortByLatest = () => {
    roomFilterModal.current.close()
    sortBy(0)
    state(!state)
  }

  return (
    <>
    <dialog ref={roomFilterModal} onClick={closeRoomFilterModal} className="room-filter-modal">
      <header className="room-filter-header">
        <span>정렬</span>
      </header>

      <div className="room-filter-body">
        <div onClick={sortByNumber}>
          <img src={group} alt="" />
          <span>참여인원순</span>
        </div>

        <div onClick={sortByLatest}>
          <img src={sort} alt="" /> 
          <span>최신순</span>
        </div>
      </div>
    </dialog>
    </>
  )
}

export default RoomFilterModal