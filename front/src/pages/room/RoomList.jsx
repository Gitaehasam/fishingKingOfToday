import React, {Component, useEffect, useState} from "react";
import axios from "axios"
import back from "../../assets/images/backSymbol.svg"
import filter from "../../assets/images/filter.png"
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/styles/Room/RoomList/RoomList.scss"
import Thumbnail_1 from "../../assets/images/Thumbnail_1.jfif"
import Thumbnail_2 from "../../assets/images/Thumbnail_2.jfif"
import Thumbnail_3 from "../../assets/images/Thumbnail_3.jfif"
import RoomFilterModal from "../../components/Room/RoomFilterModal";
import group from "../../assets/images/Room/Group.svg"

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
    {
      id:4,
      imageUrl:'',
      title:"오늘은 장충동왕족발보쌈.",
      constructor:"멋쟁이오징어",
      subscribers:13,
    },
    {
      id:5,
      imageUrl:'',
      title:"오늘은 장충동왕족발보쌈.",
      constructor:"멋쟁이오징어",
      subscribers:15,
    },
    {
      id:6,
      imageUrl:'',
      title:"오늘은 장충동왕족발보쌈.",
      constructor:"멋쟁이오징어",
      subscribers:15,
    },
  ])

  // const OPENVIDU_SERVER_URL = 'https://YOUR_OPENVIDU_SERVER';
  // const OPENVIDU_SERVER_SECRET = 'YOUR_OPENVIDU_SECRET';

  // useEffect(() => {
  //   axios.get(OPENVIDU_SERVER_URL + '/api/sessions', {
  //     headers: {
  //       Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //     },
  //   })
  //   .then((res) => {
  //     setLiveRoomList(res.data.content);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  const navigate = useNavigate();
  const [isFilterModal, setIsFilterModal] = useState(false)
  const [isSortBy, setIsSortBy] = useState(0)

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

  const handleChangeModal = () => {
    setIsFilterModal(!isFilterModal)
  }

  useEffect(() => {
    let sortedLiveRoomList

    if (isSortBy === 1) {
      sortedLiveRoomList = [...liveRoomList].sort((a, b) => b.subscribers - a.subscribers)
    } else {
      sortedLiveRoomList = [...liveRoomList].sort((a, b) => a.id - b.id)
    }
    setLiveRoomList(sortedLiveRoomList)
  }, [isSortBy])

  return (
    <>
      <div>
        <div className="roomList-header" onClick={() => navigate("/")}>
          <img src={back} alt="" />
          <span>낚시 라이브</span>
        </div>

        <div onClick={handleChangeModal} className="roomList-filter">
          {isSortBy === 1 ? <span>참여인원순</span> : <span>최신순</span>}
          <img src={filter} alt="" />
          {isFilterModal && <RoomFilterModal state={setIsFilterModal} sortBy={setIsSortBy}/>}
        </div>
        
        <>
          {liveRoomList.map((room, idx) => (
            <div key={idx} className="roomList-info">
              <img src={room.imageUrl} alt="" className="thumbnail" />
              <div>
                <p>{room.title}</p>
                <div>
                  <span>{room.constructor}</span>
                  <span><img src={group} alt="" /> {room.subscribers}</span>
                </div>
              </div>
            </div>
          ))}
        </>

        <NavLink to={"/roomList/create"} className="nav-item createLive-btn">
          <span>라이브 켜기</span>
        </NavLink>
      </div>
    </>
  )
}

export default RoomList