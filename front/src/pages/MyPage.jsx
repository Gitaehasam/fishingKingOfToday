import React, { useEffect } from "react";
import Header from "../components/Header";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "@assets/styles/MyPage.scss";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        imageUrl:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800",
        nickname: "참돔참돔",
      })
    );
  });

  const moveEdit = () => {
    navigate("edit");
  };

  return (
    <div className="mypage">
      <Header centerText={"My 낚시"} align="center" />
      <SettingsOutlinedIcon onClick={moveEdit} />
      <div>
        <img src={user.imageUrl} alt="" />
      </div>
    </div>
  );
};

export default MyPage;
