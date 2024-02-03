import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import back from '../../assets/images/backSymbol.svg';
import axios from 'axios';

function CreateRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [attachment, setAttachment] = useState();
  const isHost = true;
  const baseURL = "http://43.201.20.14:8080/gitaehasam"

  // const s3URL = "https://trend-gaza-bucket.s3.ap-northeast-2.amazonaws.com/board/original/0e4ee7cf-9d0a-4cf8-8def-d59d0731b5b1.png?x-amz-acl=public-read&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240201T133210Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Expires=59&X-Amz-Credential=AKIA5MVYYSWKQW3APN76%2F20240201%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=9ac6dbe1b1cac2eb758210422db7c08e8dba84605672fecd7f88d4fe3765d359"

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
        uploadImageToS3(res.data, file);
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

      <form onSubmit={(event) => {
        event.preventDefault();
        navigate(`/live/${title}`, {
          state: {
            title : title,
            role: isHost,
          }
        });
      }}>
        <div>
          <span>제목</span>
          <input 
            type="text" 
            maxLength={15} 
            value={title} 
            onChange={handleTitleChange} 
            placeholder='라이브 제목을 적어주세요.'
            required
          />
        </div>

        <div>
          <span>특별한 사진 한 장으로 라이브를 표현해주세요.</span>
          <input 
            type="file"
            onChange={handleThumbNailChange}
            value={ attachment && <img src={ attachment }/> }
          />
        </div>

        <div className="nav-item createLive-btn">
          <button type="submit">라이브 켜기</button>
        </div>
      </form>

    </>
  );
}

export default CreateRoom;