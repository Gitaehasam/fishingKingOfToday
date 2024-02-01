import React, { useEffect, useState, useRef } from "react";
import "../../assets/styles/board/BoardFormItem.scss";

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

  //useEffect를 통해 previewURL변동시 preview에 URL을 가진 img태그 저장
  useEffect(() => {
    if (file !== "")
      // 처음 파일 등록하지 않았을때를 방지
      setPreview(<img className="img_preview" src={previewURL}></img>);
    return () => {};
  }, [previewURL]);

  const handleFileOnChange = (e) => {
    //파일 불러오기
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  return (
    <>
      <div className="post-area">
        <div className="post-item">
          <div className="post-sub">
            {categoryId == 1 && <div>잡은 물고기를 등록해 주세요</div>}
            {categoryId == 2 && <div>리뷰를 작성해 주세요.</div>}
          </div>
          <div className="post-image-upload">{preview}</div>
          <div className="upload-btn shadow" onClick={handleFileButtonClick}>
            <input
              ref={fileRef}
              hidden={true}
              id="file"
              type="file"
              onChange={handleFileOnChange}
            />
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">시간/장소</div>
          <div className="position">
            <div>시간</div>
            <div>장소</div>
            <div></div>
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">
            {categoryId == 1 && <div>물고기종류</div>}
            {categoryId == 2 && <div>해시태그</div>}
          </div>
        </div>
        <div className="post-item">
          <div className="post-sub">하고싶은 말</div>
          <textarea></textarea>
        </div>
      </div>
    </>
  );
};

export default BoardFormItem;
