import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import back from "../../assets/images/backSymbol.svg";
import filter from "../../assets/images/filter.png";
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/styles/room/roomList/RoomList.scss";
import RoomFilterModal from "../../components/room/RoomFilterModal";

function RoomList() {
  const navigate = useNavigate();

  const [liveRoomList, setLiveRoomList] = useState([]);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSortBy, setIsSortBy] = useState(0);
  
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
        setLiveRoomList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        navigate(`/live/${roomInfo.sessionId}`, { token: res.data.token });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <>
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
          <span>진행되는 라이브가 없습니다.</span>
        )}

        {liveRoomList.content &&
          liveRoomList.content.map((room, idx) => (
            <div key={idx} className="roomList-info" onClick={() => enterLive(room)}>
              <p>{room.sessionId}</p>
            </div>
          ))}
      </div>

      <NavLink to={"/media/roomList/create"} className="nav-item createLive-btn">
        <span>라이브 켜기</span>
      </NavLink>
    </>
  );
}

export default RoomList;
