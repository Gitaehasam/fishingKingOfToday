import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import back from '../../assets/images/backSymbol.svg';
import axios from 'axios';

function CreateRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [attachment, setAttachment] = useState(); 
  const baseURL = "http://43.201.20.14:8080/gitaehasam"

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleThumbNailChange = (e) => {
    const {
      target: {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();  
    
    reader.onload = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
    createPresignedURL(e.target.files[0]);
  }

  // 로그인 하면 될거임~
  const createPresignedURL = (file) => {
    axios.post(baseURL + "/images/presigned", {filename: file.name})
      .then((res) => {
        console.log(res.data)
        const presignedUrl = res.data;
        uploadImageToS3(presignedUrl, file);
      })
      .catch((error) => console.error(error));
  }

  const uploadImageToS3 = (url, file) => {
    axios.put(url, 
      {
        file:File
      },
      {
        headers: 
        {
          'Content-Type': file?.type,
        }
      },
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  return (
    <>
      <div className="roomList-header" onClick={() => navigate('/media/roomList')}>
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
          onChange={handleThumbNailChange}
        />
        { attachment && <img src={ attachment }/> }
      </div>

      <NavLink to={"/live"} className="nav-item createLive-btn">
        <span>라이브 켜기</span>
      </NavLink>
    </>
  );
}

export default CreateRoom;