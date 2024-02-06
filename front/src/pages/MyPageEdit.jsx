import Header from "../components/Header";
import "@assets/styles/MyPageEdit.scss";

const MyPageEdit = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mypage-edit">
      <Header centerText="My 정보수정" align="center" />
      <div className="complete">완료</div>
      <div className="profile">
        <img src={user.imageUrl} alt="" className="profile-img" />
      </div>
      <div className="user-info">
        <div className="info-title">닉네임</div>
        <input className="info-nick" type="text" />
      </div>
      <div className="user-change">
        <button className="logout">로그아웃</button>
        <button className="resign">회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPageEdit;
