import React, { useEffect, useState, useRef } from "react";
import "../../assets/styles/board/BoardFormItem.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import { useParams } from "react-router-dom";
import { Alarm } from "@mui/icons-material";
import { getSearchFish, createBoardPost, modifyBoardPut } from "../../api/board";
import axios from "axios";
import BoardCreateMap from "./BoardCreateMap";

//type은 글쓰기인지(create) 수정하기(modify) 인지, categoryId는 물고기인지(1), 장소인지(2)

const BoardFormItem = ({ type, categoryId, boardData }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("jwt");
  const pageId = useParams().id;

  // 사용자가 불러온 파일 정보를 넣는 값
  const [file, setFile] = useState("");
  // 사용자가 불러온 파일의 URL
  const [previewURL, setPreviewURL] = useState("");
  // fileRef는 불러오기 하는 file input울 숨기고 내가 원하는 버튼을 눌렀을 때 file input 클릭버튼을 발생
  const fileRef = useRef();
  // hashtag input입력값
  const [hashtext, setHashText] = useState("");
  // 해시태그 저장
  const [hashtag, setHashTag] = useState([]);

  // 게시글 내용
  const [content, setContent] = useState("");

  // 자동완성
  const [keyword, setKeyword] = useState([]);

  // 낚시터 정보
  const [fishSpot, setFishSpot] = useState({});

  // 자동완성에서 선택한 물고기의 ID
  const [fishBookId, setFishBookId] = useState("");

  // 업로드 된 이미지URL
  const [imageUrl, setImageUrl] = useState("");

  //useEffect를 통해 previewURL변동시 preview에 URL을 가진 img태그 저장
  useEffect(() => {
    if (boardData) {
      setContent(boardData.content);
      setHashTag(boardData.hashtags);
      setFile("0");
      setPreviewURL(boardData.boardImageUrl);
      console.log(content);
      console.log(hashtag);
      console.log(file);
      console.log(previewURL);
    }
  }, [boardData]);

  const handleFileOnChange = (event) => {
    console.log("2w");
    //파일 불러오기
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };

    if (file) reader.readAsDataURL(file);
    createPresignedURL(file);
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
        setImageUrl(res.data.imageNames[0]);
      })
      .catch((error) => console.log(error));
  };

  const handleFileButtonClick = (e) => {
    console.log("cleick");
    e.preventDefault();
    fileRef.current.click();
  };

  const handleSumbitButtonClick = async (type) => {
    {
      type === "create" &&
        (await createBoardPost({
          categoryId: categoryId,
          content: content,
          fishBookId: fishBookId,
          hashTags: hashtag,
          fishingSpotId: fishSpot.spotId,
          imageUrl: imageUrl,
          latitude: fishSpot.latitude,
          longitude: fishSpot.longitude,
        }).then((res) => {
          console.log(res);
        }));
    }

    {
      type === "modify" &&
        (await modifyBoardPut(
          {
            categoryId: categoryId,
            content: content,
            fishBookId: fishBookId,
            hashTags: hashtag,
            fishingSpotId: fishSpot.spotId,
            imageUrl: previewURL,
            latitude: fishSpot.latitude,
            longitude: fishSpot.longitude,
          },
          pageId
        ).then((res) => {
          console.log(res);
        }));
    }
  };

  const searchFish = async (e) => {
    await getSearchFish(e.trim()).then((res) => {
      setKeyword(res);
    });
  };

  const searchHash = () => {};

  const handleResultClick = (resultId) => {
    setFishBookId(resultId);
  };

  const activeEnter = (e, categoryId) => {
    // e.target.value = "";
    if (e.key === "Enter" && categoryId == 1) {
      // const updatedArray = [hashtext];
      // setHashTag(updatedArray);
      // console.log(hashtag);
      // setHashText("");
      // setKeyword([]);
    } else if (e.key === "Enter" && categoryId == 2) {
      if (hashtag.length == 5) {
        alert("5개까지 등록가능합니다.");
        setHashText("");
        setKeyword([]);
        return;
      }
      const updatedArray = [...hashtag, hashtext];
      setHashTag(updatedArray);
    }
  };

  const deleteHash = (hash) => {
    console.log(hash);
    const updatedArray = hashtag.filter((item) => item !== hash);
    setHashTag(updatedArray);
  };

  return (
    <>
      <div className="post-area">
        <div className="post-item">
          <div className="post-sub">
            {categoryId == 1 && <div>잡은 물고기를 등록해 주세요</div>}
            {categoryId == 2 && <div>리뷰를 작성해 주세요.</div>}
          </div>
          <div className="post-image-upload">
            {previewURL && <img className="img_preview" src={previewURL}></img>}

            <input ref={fileRef} hidden={true} id="file" type="file" onChange={handleFileOnChange} />
            <div className={`shadow ${file ? "reupload-btn blue-bd" : "upload-btn bg-blue"}`} onClick={handleFileButtonClick}>
              {!file && <AddOutlinedIcon />}
              {file && "이미지 다시 선택하기"}
            </div>
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">장소</div>
          <div className="position">
            <BoardCreateMap fishSpot={fishSpot} setFishSpot={setFishSpot} />
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">
            {categoryId == 1 && <div>물고기종류</div>}
            {categoryId == 2 && <div>해시태그</div>}
          </div>
          <div className="hashtag-add">
            <div className="hashtag-icon shadow bg-blue">
              <TagOutlinedIcon />
            </div>
            {categoryId == 1 && (
              <input
                className="hashtag-search"
                type="text"
                value={hashtext}
                onKeyUp={(e) => searchFish(e.target.value)}
                onChange={(e) => setHashText(e.target.value)}
                onKeyDown={(e) => activeEnter(e, categoryId)}
                placeholder="물고기이름"
              />
            )}
            {categoryId == 2 && (
              <input
                className="hashtag-search"
                type="text"
                value={hashtext}
                onKeyUp={(e) => searchHash(e.target.value)}
                onChange={(e) => setHashText(e.target.value)}
                onKeyDown={(e) => activeEnter(e, categoryId)}
                placeholder="최대 5개까지 입력할 수 있어요"
              />
            )}
          </div>
          <ul className={`auto-area ${keyword && keyword.length != 0 ? "" : "none"}`}>
            {keyword && keyword.length != 0 && (
              <>
                {keyword.map((result) => (
                  <li key={result.id} className="blue-bd" onClick={(e) => handleResultClick(result.id)}>
                    {result.name}
                  </li>
                ))}
              </>
            )}
          </ul>
          <ul className="hashtag-add-area">
            {hashtag && (
              <>
                {hashtag.map((text, index) => (
                  <li key={index} className="blue-bd" onClick={(e) => deleteHash(text)}>
                    {text}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div className="post-item">
          <div className="post-sub">하고싶은 말</div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="post-add-btn bg-blue" onClick={(e) => handleSumbitButtonClick(type)}>
          {type === "create" && <div>등록하기</div>}
          {type === "modify" && <div>수정하기</div>}
        </div>
      </div>
    </>
  );
};

export default BoardFormItem;
