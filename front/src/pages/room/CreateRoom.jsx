import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/images/backSymbol.svg";
import axios from "axios";
import "../../assets/styles/room/createLive/CreateLive.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Header from "../../components/Header";

function CreateRoom() {
  const navigate = useNavigate();
  const isHost = true;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt");

  const [title, setTitle] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const fileRef = useRef();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  useEffect(() => {
    if (previewURL) {
      setPreview(
        <img className="room-create-upload-img" src={previewURL}></img>
      );
    }
  }, [previewURL]);

  const handleFileOnChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      createPresignedURL(file);
    }
  };

  const createPresignedURL = (file) => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("type", "LIVEROOM");

    axios
      .post(baseURL + "/api/images", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setThumbnailURL(res.data.imageNames[0]);
      })
      .catch((error) => console.log(error));
  };

  const createSession = (e) => {
    const roomId = Math.floor(Math.random() * 1000000);

    navigate(`/live/Gitaehasam${roomId}`, {
      state: {
        isHost: isHost,
        roomId: roomId,
        imageUrl: thumbnailURL ? thumbnailURL : null,
        name: title,
        nickname: userInfo.nickname,
        userImg: userInfo.imageUrl,
      },
    });
  };

  return (
    // <div className="create-room">

    //   <form className="room-create-form" onSubmit={createSession}>
    //     <div className="create-room-wrapper">
    //       <div className="room-create-header">
    //         <div className="room-create-thumbnail-title">
    //           특별한 사진으로 라이브를 표현해보세요
    <>
      <Header centerText={"라이브 생성"} />

      <form className="room-create-form">
        <div className="create-room-wrapper">
          <div className="room-create-header">
            <div className="room-create-thumbnail-title">
              특별한 사진으로 라이브를 표현해보세요
            </div>

            <div className="room-create-thumbnail">
              {preview}
              <div
                className={`shadow ${
                  previewURL ? "reupload-btn blue-bd" : "upload-btn bg-blue"
                }`}
                onClick={handleFileButtonClick}
              >
                {!previewURL && <AddOutlinedIcon />}
                {previewURL && "이미지 다시 선택하기"}
              </div>
            </div>
            <input
              ref={fileRef}
              hidden={true}
              type="file"
              onChange={handleFileOnChange}
            />
          </div>

          <div className="room-create-header">
            <div className="room-create-thumbnail-title">제목</div>
            <input
              className="room-create-title"
              type="text"
              maxLength={15}
              value={title}
              onChange={handleTitleChange}
              placeholder="라이브 제목을 적어주세요."
              required
            />
          </div>
          <div className="room-create-btn bg-blue" onClick={createSession}>
            <button type="submit">라이브 켜기</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateRoom;
