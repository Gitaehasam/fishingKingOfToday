import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
// import { OpenVidu } from 'openvidu-browser';
import back from '../../assets/images/backSymbol.svg';

function CreateRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleThumbNailChange = (e) => {
    setThumbnail(e.target.files[0])
  }
  
  return (
    <>
      <div className="roomList-header" onClick={() => navigate('/roomList')}>
        <img src={back} alt="" />
        <span>라이브 대기방</span>
      </div>

      <div>
        <span>제목</span>
        <input 
          type="text" 
          maxLength={15} 
          value={title} 
          onChange={handleTitleChange} 
          placeholder='라이브 제목을 적어주세요.'
        />
      </div>

      <div>
        <span>특별한 사진 한 장으로 라이브를 표현해주세요.</span>
        <input 
          type="file" 
          value={thumbnail}
          onChange={handleThumbNailChange}
        />
      </div>

      <NavLink to={"/roomList/create"} className="nav-item createLive-btn">
        <span>라이브 켜기</span>
      </NavLink>
    </>
  );
}

export default CreateRoom;
