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

function RoomList() {
  const navigate = useNavigate();

  const [liveRoomList, setLiveRoomList] = useState([]);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSortBy, setIsSortBy] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const isHost = false;
  
  const baseURL = import.meta.env.VITE_BASE_URL
  const OPENVIDU_SERVER_URL = "https://i10c203.p.ssafy.io"
  const OPENVIDU_SERVER_SECRET = "wearegitaehasam"

  const handleChangeModal = () => {
    setIsFilterModal(!isFilterModal);
  };

  useEffect(() => {
    axios
      .get(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", {
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false)
  
        axios.get(baseURL + "/lives")
          .then((res2) => {
            const sessionsInfo = res2.data;
            let liveRoomList = res.data.content.map(room => {
              const sessionInfo = sessionsInfo.find(info => info.sessionId === room.sessionId);
              return { ...room, title: sessionInfo.title, thumbnail: sessionInfo.thumbnail, nickname: sessionInfo.nickname };
            });

            if (isSortBy !== 0) {
              liveRoomList.sort((a, b) => b.connections.numberOfElements - a.connections.numberOfElements);
            } else {
              liveRoomList.sort((a, b) => b.createdAt - a.createdAt);
            }
            setLiveRoomList(liveRoomList);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSortBy]);
  
  const enterLive = (roomInfo) => {
    axios
      .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + roomInfo.sessionId + "/connection", { role: 'SUBSCRIBER' }, {
        headers: {
          Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/live/${roomInfo.sessionId}`, { state: { token: res.data.token, role: isHost } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="roomList-header" onClick={() => navigate("/")}>
            <img src={back} alt="" />
            <span>낚시 라이브</span>
          </div>
  
          {liveRoomList.content && liveRoomList.content.length > 0 ? (
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
  
          {liveRoomList.content &&
          liveRoomList.content.map((room, idx) => (
            <div key={idx} className="roomList-info" onClick={() => enterLive(room)}>
              <img src={room.thumbnailURL ? room.thumbnailURL : defaultImg} alt="room thumbnail" className="thumbnail"/>
              <div className="roomList-info-header">
                <p>{room.title}</p>
                <div className="roomList-info-body">
                  <span>{room.title}</span>
                  <p><img className="subscriber" src={group} alt="group" /> {room.connections.numberOfElements}</p>
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
