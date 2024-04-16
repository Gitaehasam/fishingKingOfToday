import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import profile from "@assets/images/default_profile.webp";
import "@assets/styles/myPage/MyPage.scss";

const MyPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const moveEdit = () => {
    navigate("edit");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <div className="mypage">
      <Header centerText={"My 낚시"} align="center" />
      <SettingsOutlinedIcon onClick={moveEdit} className="edit" />
      <div className="wrapper">
        <img className="profile" src={user?.imageUrl || profile} alt="" />
        <div className="user-nick">{user?.nickname}</div>
      </div>
      <div className="user-content">
        <button className="blue-bd" onClick={() => navigate("fish")}>
          <div>나의 물고기</div>
          <ArrowForwardIosOutlinedIcon />
        </button>
        <button className="blue-bd" onClick={() => navigate("location")}>
          <div>나의 장소</div>
          <ArrowForwardIosOutlinedIcon />
        </button>
        <button className="later">
          <div className="title">나는야 청소 요정</div>
          <div className="open-none bg-blue">오픈 예정</div>
        </button>
      </div>
    </div>
  );
};

export default MyPage;
