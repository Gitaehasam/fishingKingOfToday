import React, {Component, useEffect, useState} from "react";
import axios from "axios"
import back from "../../assets/images/backSymbol.svg"
import filter from "../../assets/images/filter.png"
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/styles/Room/RoomList/RoomList.scss"
import Thumbnail_1 from "../../assets/images/Thumbnail_1.jfif"
import Thumbnail_2 from "../../assets/images/Thumbnail_2.jfif"
import Thumbnail_3 from "../../assets/images/Thumbnail_3.jfif"

function RoomList () {
  const [liveRoomList, setLiveRoomList] = useState([
    {
      id:1,
      imageUrl:Thumbnail_1,
      title:"오늘은 잡아봅니다.",
      constructor:"귀여운도다리",
      subscribers:7,
    },
    {
      id:2,
      imageUrl:Thumbnail_2,
      title:"목포 출조합니다.",
      constructor:"맛있는광어",
      subscribers:6,
    },
    {
      id:3,
      imageUrl:Thumbnail_3,
      title:"오늘은 장충동왕족발보쌈.",
      constructor:"멋쟁이오징어",
      subscribers:15,
    },
  ])
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("http://localhost:8000/gitaehasam/lives")
  //   .then((res) => {
  //     if (res.data && res.data.length > 0) {
  //       setLiveRoomList(res.data)
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [liveRoomList])

  return (
    <>
      <div>
        <div className="roomList-header" onClick={() => navigate("/")}>
          <img src={back} alt="" />
          <span>낚시 라이브</span>
        </div>

        <div>
          <span>전체 라이브</span>
        </div>

        <div>
          <img src={filter} alt="" />
        </div>

        <>
          {liveRoomList.map((room, idx) => (
            <div key={idx}>
              <img src={room.imageUrl} alt="" />
              {room.title},
              {room.constructor},
              {room.subscribers}명
            </div>
          ))}
        </>

        <NavLink to={"/roomList/create"} className="nav-item">
          <span>라이브 켜기</span>
        </NavLink>
      </div>
    </>
  )
}

export default RoomList