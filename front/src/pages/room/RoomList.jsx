import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/styles/room/roomList/RoomList.scss";
import RoomFilterModal from "../../components/room/RoomFilterModal";
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import Loading from "../../components/Loading";

import back from "../../assets/images/backSymbol.svg";
import filter from "../../assets/images/filter.png";
import group from "../../assets/images/room/Group.svg"
import defaultImg from "../../assets/images/login_img.png";
import CachedIcon from '@mui/icons-material/Cached';

function RoomList() {
  const navigate = useNavigate();

  const [liveRoomList, setLiveRoomList] = useState([]);
  const [openViduList, setOpenViduList] = useState([])
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSortBy, setIsSortBy] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const isHost = false;
  
  const baseURL = import.meta.env.VITE_BASE_URL
  const OPENVIDU_SERVER_URL = "https://i10c203.p.ssafy.io"
  const OPENVIDU_SERVER_SECRET = "wearegitaehasam"

  useEffect(() => {
    fetchRoomList();
  }, []);

  // useEffect(() => {
  //   let sortedList;
  //   if (isSortBy === 1) {
  //     sortedList = [...openViduList];
  //     sortedList.sort((a, b) => b.connections.numberOfElements - a.connections.numberOfElements);
  //   } else {
  //     sortedList = [...liveRoomList];
  //     sortedList.sort((a, b) => b.liveRoomId - a.liveRoomId);
  //   }
  //   setLiveRoomList(sortedList);
  // }, [isSortBy]);
  
  const handleChangeModal = () => {
    setIsFilterModal(!isFilterModal);
  };
  
  const fetchRoomList = () => {
    setIsLoading(true);
    axios
      .get(OPENVIDU_SERVER_URL + "/api/lives")
      .then((res) => {
        axios.get(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', {
          headers:{
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          }
        })
        .then((res2) => {
          
          setLiveRoomList(res.data);
          setOpenViduList(res2.data)
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const enterLive = (roomInfo) => {
    console.log("enterLive-liveRoomId: ", roomInfo.liveRoomId)
    console.log("enterLive-sessionId: ", roomInfo.sessionId)

    const roomId = roomInfo.liveRoomId
    const sessionId = roomInfo.sessionId

    navigate(`/live/${roomInfo.sessionId}`, { state: { isHost: isHost, roomId:roomId, subscriberSession: sessionId } });
  };

  console.log(liveRoomList)
  console.log(openViduList)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="room-list-container">
          <div className="roomList-header" onClick={() => navigate("/")}>
            <img src={back} alt="" />
            <span>낚시 라이브</span>
          </div>

          {/* 내가 불편해서 만듬 ㅠㅠ  새로고침 오래걸려유 ㅠ */}
          <CachedIcon className="room-list-reload-btn" onClick={fetchRoomList} />

          {liveRoomList.liveRooms && liveRoomList.liveRooms.length > 0 ? (
              <div onClick={handleChangeModal} className="roomList-filter">
                {isSortBy === 1 ? <span>참여인원순</span> : <span>최신순</span>}
                <img src={filter} alt="" />
                {isFilterModal && <RoomFilterModal state={setIsFilterModal} sortBy={setIsSortBy} />}
              </div>
            ) : (
              <div className="no-live">
                <CellTowerOutlinedIcon />
                <span>진행중인 라이브가 없습니다.</span>
              </div>
            )}

          {liveRoomList.liveRooms &&
          liveRoomList.liveRooms.map((room, idx) => (
            <div key={idx} className="roomList-info" onClick={() => enterLive(room)}>
              <img src={room.imageUrl ? room.imageUrl : defaultImg} alt="room thumbnail" className="thumbnail"/>
              <div className="roomList-info-header">
                <p>{room.name}</p>
                <div className="roomList-info-body">
                  <span>{room.nickName}</span>
                  {/* <p><img className="subscriber" src={group} alt="group" /> {room.connections.numberOfElements}</p> */}
                </div>
              </div>
            </div>
          ))}

          <NavLink to={"/media/roomList/create"} className="nav-item createLive-btn">
            <span>라이브 켜기</span>
          </NavLink>
        </div>
      )}
    </>
  );  
}

export default RoomList;
