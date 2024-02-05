import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import back from '../../assets/images/backSymbol.svg';
import axios from 'axios';
import "../../assets/styles/room/createLive/CreateLive.scss"
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import defaultImg from "../../assets/images/login_img.png";

function CreateRoom() {
  const navigate = useNavigate();
  const isHost = true;
  const baseURL = import.meta.env.VITE_BASE_URL

  const [title, setTitle] = useState('')
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null)
  const fileRef = useRef();

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  useEffect(() => {
    if (previewURL) {
      setPreview(<img className="room-create-upload-img" src={previewURL}></img>);
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

  // 로그인 하면 될거임~
  const createPresignedURL = (file) => {
    axios.post(baseURL + "/images/presigned", {filename: file.name})
      .then((res) => {
        console.log(res.data)
        setThumbnailURL(res.data.imageUrl)
        uploadImageToS3(res.data.preSignedUrl, file);
      })
    .catch((error) => console.error(error));
  }

  const uploadImageToS3 = (url, file) => {
    axios.put(url, 
      file,
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
  

  const createSession = (e) => {
    const roomId = Math.floor(Math.random() * 1000000);

    navigate(`/live/Gitaehasam${roomId}`, 
    { 
      state: { isHost: isHost, roomId:roomId, imageUrl:thumbnailURL ? thumbnailURL : null, name:title } 
    });
  }

  return (
    <>
      <div className="roomList-header" onClick={() => navigate('/media/roomList')}>
        <img src={back} alt="" />
        <span>라이브 생성</span>
      </div>

      <form className='room-create-form' onSubmit={createSession}>
        <div className='room-create-header'>
          <div className='room-create-thumbnail-title'>
            특별한 사진으로 라이브를 표현해보세요
          </div>
          <div className="room-create-thumbnail">{preview}
          {previewURL ? <div className="room-create-thumbnail-btn-bottom" onClick={handleFileButtonClick}><ChangeCircleOutlinedIcon /></div>
          :
            <div className="room-create-thumbnail-btn" onClick={handleFileButtonClick}><AddAPhotoOutlinedIcon /></div>
          }
          </div>
          <input 
            ref={fileRef}
            hidden={true}
            type="file"
            onChange={handleFileOnChange}
          />
        </div>

        <div className='room-create-header'>
          <div className='room-create-thumbnail-title'>제목</div>
          <input 
            className='room-create-title'
            type="text" 
            maxLength={15} 
            value={title} 
            onChange={handleTitleChange} 
            placeholder='라이브 제목을 적어주세요.'
            required
          />
        </div>

        <div className="room-create-btn">
          <button type="submit">라이브 켜기</button>
        </div>
      </form>

    </>
  );
}

export default CreateRoom;
