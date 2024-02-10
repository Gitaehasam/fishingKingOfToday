import React, { useEffect, useState, useRef } from "react";
import "../../assets/styles/board/BoardFormItem.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import { Alarm } from "@mui/icons-material";

//type은 글쓰기인지(create) 수정하기(modify) 인지, categoryId는 물고기인지(1), 장소인지(2)

const BoardFormItem = ({ type, categoryId }) => {
  // 사용자가 불러온 파일 정보를 넣는 값
  const [file, setFile] = useState("");
  // 사용자가 불러온 파일의 URL
  const [previewURL, setPreviewURL] = useState("");
  // img태그가 들어갈 곳
  const [preview, setPreview] = useState(null);
  // fileRef는 불러오기 하는 file input울 숨기고 내가 원하는 버튼을 눌렀을 때 file input 클릭버튼을 발생
  const fileRef = useRef();
  // hashtag input입력값
  const [hashtext, setHashText] = useState("");
  // 해시태그 저장
  const [hashtag, setHashTag] = useState([]);

  //useEffect를 통해 previewURL변동시 preview에 URL을 가진 img태그 저장
  useEffect(() => {
    if (file !== "")
      //처음 파일 등록하지 않았을 때를 방지
      setPreview(<img className="img_preview" src={previewURL}></img>);
    return () => {};
  }, [previewURL]);

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
  };

  const handleFileButtonClick = (e) => {
    console.log("cleick");
    console.log(preview);
    e.preventDefault();
    fileRef.current.click();
  };

  const searchHash = () => {
    console.log("s");
  };

  const activeEnter = (e, categoryId) => {
    // e.target.value = "";
    if (e.key === "Enter" && categoryId == 1) {
      const updatedArray = [hashtext];
      setHashTag(updatedArray);
      console.log(hashtag);
    } else if (e.key === "Enter" && categoryId == 2) {
      if (hashtag.length == 5) {
        alert("5개까지 등록가능합니다.");
        setHashText("");
        return;
      }
      const updatedArray = [...hashtag, hashtext];
      setHashTag(updatedArray);
      setHashText("");
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
            {preview}
            <input
              ref={fileRef}
              hidden={true}
              id="file"
              type="file"
              onChange={handleFileOnChange}
            />
            <div
              className={`shadow ${
                file ? "reupload-btn blue-bd" : "upload-btn bg-blue"
              }`}
              onClick={handleFileButtonClick}
            >
              {!file && <AddOutlinedIcon />}
              {file && "이미지 다시 선택하기"}
            </div>
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">장소</div>
          <div className="position">
            <div></div>
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
                onKeyUp={() => searchHash(categoryId)}
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
                onKeyUp={() => searchHash(categoryId)}
                onChange={(e) => setHashText(e.target.value)}
                onKeyDown={(e) => activeEnter(e, categoryId)}
                placeholder="최대 5개까지 입력할 수 있어요"
              />
            )}
          </div>
          <ul className="hashtag-add-area">
            {hashtag.map((text, index) => (
              <li
                key={index}
                className="blue-bd"
                onClick={(e) => deleteHash(text)}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="post-item">
          <div className="post-sub">하고싶은 말</div>
          <textarea></textarea>
        </div>
        <div className="post-add-btn bg-blue">
          {type === "create" && <div>등록하기</div>}
          {type === "modify" && <div>수정하기</div>}
        </div>
      </div>
    </>
  );
};

export default BoardFormItem;
