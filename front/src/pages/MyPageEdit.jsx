import Header from "../components/Header";
import "@assets/styles/MyPageEdit.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const MyPageEdit = () => {
  const baseURL = import.meta.env.VITE_BASE_URL
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate =useNavigate()
  
  const handleLogOut = () => {
    axios.delete(`${baseURL}/log-out`, {
      headers: {
        Authorization:localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res)
      localStorage.removeItem("jwt")
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="mypage-edit">
      <Header centerText="My 정보수정" align="center" />
      <div className="complete">완료</div>
      <div className="profile">
        {/* <img src={user.imageUrl} alt="" className="profile-img" /> */}
      </div>
      <div className="user-info">
        <div className="info-title">닉네임</div>
        <input className="info-nick" type="text" />
      </div>
      <div className="user-change">
        <button className="logout" onClick={handleLogOut}>로그아웃</button>
        <button className="resign">회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPageEdit;
