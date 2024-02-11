import React, { useEffect } from "react";
import Header from "../components/Header";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "@assets/styles/MyPage.scss";
import { useNavigate } from "react-router-dom";
import profile from "@assets/images/default_profile.jpg";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const MyPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const moveEdit = () => {
    navigate("edit");
  };

  // useEffect(() => {
  //   localStorage.setItem(
  //     "jwt",
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMjgxMDc5MDMwIiwic3ViIjoiIiwiaWF0IjoxNzA3NTU3Njg5LCJleHAiOjE3MTAxNDk2ODl9.zK9t1h9Qxu0o9X-W6NUoREchnkd1-hN_420l-EcvIY0"
  //   );
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({ imageUrl: null, nickname: "독특한누치" })
  //   );
  // }, []);

  if (!user) {
    navigate("/", { replace: true });
  }

  return (
    <div className="mypage">
      <Header centerText={"My 낚시"} align="center" />
      <SettingsOutlinedIcon onClick={moveEdit} className="edit" />
      <div className="wrapper">
        <img className="profile" src={user?.imageUrl || profile} alt="" />
        <div className="user-nick">{user?.nickname}</div>
      </div>
      <div className="user-content">
        <button>
          나의 물고기
          <ArrowForwardIosOutlinedIcon />
        </button>
        <button>
          나의 장소
          <ArrowForwardIosOutlinedIcon />
        </button>
        <button className="later">
          <div className="title">나는야 청소 요정</div>
          <div className="none">오픈 예정</div>
        </button>
      </div>
    </div>
  );
};

export default MyPage;
