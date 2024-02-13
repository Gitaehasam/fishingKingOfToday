import Header from "../components/Header";
import "@assets/styles/MyPageEdit.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "@assets/images/default_profile.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const MyPageEdit = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [nick, setNick] = useState(user?.nickname);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [imgUrl, setImgUrl] = useState(user.imageUrl);
  const [preView, setPreView] = useState(user?.imageUrl);

  const handleLogOut = () => {
    axios
      .delete(`${baseURL}/api/log-out`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setNick(e.target.value);
  };

  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreView(reader.result);
      setImgUrl(file);
    };
  };

  const changeUserInfo = async () => {
    try {
      let res;

      if (user.imageUrl === imgUrl) {
        const formData = new FormData();
        formData.append("images", imgUrl);
        formData.append("type", "PROFILE");

        res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/images`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // console.log(res.data.imageNames[0]);
      // console.log(nick);
      // console.log(localStorage.getItem("jwt"));

      const res1 = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users`,
        { imageUrl: imgUrl, nickname: nick },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res1);
      // console.log(res.data.imageNames[0]);
      // setImgUrl(res.data.imageNames[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const userDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/users`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      });

      localStorage.removeItem("jwt");
      localStorage.removeItem("user");

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mypage-edit">
      <Header centerText="My 정보수정" align="center" />
      <div className="complete" onClick={changeUserInfo}>
        완료
      </div>
      <div className="profile">
        <label htmlFor="profile-img">
          <img src={preView || profile} alt="" className="profile-img" />
          <input
            type="file"
            accept="image/*"
            id="profile-img"
            onChange={handleChangeFile}
          />
          <div>
            <CameraAltIcon />
          </div>
        </label>
      </div>
      <div className="user-info">
        <div className="info-title">닉네임</div>
        <input
          className="info-nick"
          type="text"
          value={nick}
          onChange={handleChange}
        />
      </div>
      <div className="user-change">
        <button className="logout" onClick={handleLogOut}>
          로그아웃
        </button>
        <button className="resign" onClick={openDeleteModal}>
          회원탈퇴
        </button>
      </div>
      {openDelete && (
        <>
          <div
            className="filter-open"
            onClick={() => setOpenDelete(false)}
          ></div>
          <div className="filter-content">
            <h2>회원 탈퇴</h2>
            <div className="leave-content">
              <div>회원 탈퇴 시 계정 정보가 삭제되어 복구가 불가해요</div>
              <div>정말로 탈퇴하시겠어요?</div>
            </div>
            <div className="btn">
              <button className="cancel" onClick={() => setOpenDelete(false)}>
                더 써볼래요
              </button>
              <button className="leave" onClick={userDelete}>
                떠날래요
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPageEdit;
