import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "../../assets/styles/room/roomList/RoomList.scss";
import RoomFilterModal from "../../components/room/RoomFilterModal";
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import Loading from "../../components/Loading";

import back from "../../assets/images/backSymbol.svg";
import filter from "../../assets/images/filter.png";
import group from "../../assets/images/room/Group.svg";
import defaultImg from "../../assets/images/login_img.png";
import Header from "../../components/Header";
import CachedIcon from "@mui/icons-material/Cached";
import RefreshIcon from "@mui/icons-material/Refresh";

function RoomList() {
  const navigate = useNavigate();

  const [liveRoomList, setLiveRoomList] = useState([]);
  const [openViduList, setOpenViduList] = useState([]);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSortBy, setIsSortBy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isHost = false;

  const baseURL = import.meta.env.VITE_BASE_URL;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const OPENVIDU_SERVER_SECRET = "wearegitaehasam";

  useEffect(() => {
    fetchRoomList();
  }, []);


  const fetchRoomList = () => {
    setIsLoading(true);
    axios
      .get(baseURL + "/api/lives")
      .then((res) => {
        axios
          .get(baseURL + "/openvidu/api/sessions", {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          })
          .then((res2) => {
            setLiveRoomList(res.data);
            setOpenViduList(res2.data);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enterLive = (roomInfo) => {
    console.log("enterLive-liveRoomId: ", roomInfo.liveRoomId);
    console.log("enterLive-sessionId: ", roomInfo.sessionId);

    const roomId = roomInfo.liveRoomId;
    const sessionId = roomInfo.sessionId;

    navigate(`/live/${roomInfo.sessionId}`, {
      state: {
        isHost: isHost,
        roomId: roomId,
        subscriberSession: sessionId,
        nickname: userInfo.nickname,
        userImg: userInfo.imageUrl,
      },
    });
  };

  console.log(liveRoomList);
  console.log(openViduList);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header centerText={"낚시 라이브"} prevPath={"/media"} />

          {liveRoomList.liveRooms && liveRoomList.liveRooms.length > 0 ? (
            <div className="roomList-filter">
              <CachedIcon
                className="room-list-reload-btn"
                onClick={fetchRoomList}
              />
            </div>
          ) : (
            <div className="no-live">
              <CellTowerOutlinedIcon />
              <span>진행중인 라이브가 없습니다.</span>
            </div>
          )}

          {liveRoomList.liveRooms &&
            liveRoomList.liveRooms.map((room, idx) => (
              <div
                key={idx}
                className="roomList-info"
                onClick={() => enterLive(room)}
              >
                <img
                  src={room.imageUrl ? room.imageUrl : defaultImg}
                  alt="room thumbnail"
                  className="thumbnail"
                />
                <div className="roomList-info-header">
                  <p>{room.name}</p>
                  <div className="roomList-info-body">
                    <span>{room.nickName}</span>
                  </div>
                </div>
              </div>
            ))}

          <NavLink
            to={"/media/roomList/create"}
            className="nav-item createLive-btn"
          >
            <span>라이브 켜기</span>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default RoomList;
