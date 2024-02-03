import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BoardFormItem from "./BoardFormItem";
import you from "../../assets/images/공유.jpg";
import "../../assets/styles/board/BoardDetail.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";

const BoardDetail = () => {
  const { id } = useParams();

  const [boardData, setBoardData] = useState({
    nickName: "강민정0173",
    socialId: "1234",
    profileImageUrl: you,
    boardId: 9,
    boardImageUrl:
      "https://www.thesprucepets.com/thmb/cQPbLr_MPjBgKpiWVbSbtgmxH4k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/low-maintenance-freshwater-fish-4770223-hero-ffb66c229c194e2db4916e88bbd17a15.jpg",
    fishName: null,
    hashtags: ["#여수", "#뷰 맛집"],
    content: "장소 게시글 베타 너무 예뻐용요요용 집가고 싶어요 담주까지 이거 끝날까여",
    createdAt: "2024-01-26T21:47:49",
    commentCnt: 0,
    comments: [
      {
        id: 4,
        profileImageUrl: you,
        nickName: "강민정0173",
        content: "안녕",
        createdAt: "2024-01-28T03:33:53",
      },
      {
        id: 5,
        profileImageUrl: you,
        nickName: "귀여운도다리",
        content: "너무이뻐염",
        createdAt: "2024-01-28T03:33:53",
      },
    ],
    likeCnt: 20,
    longitude: 128.29192,
    latitude: 37.522514,
  });

  const changeDate = (date) => {
    const start = date + "";
    const day = start.substring(0, 10);
    const time = start.substring(11, 16);
    console.log(day);
    return day + " " + time;
  };

  return (
    <>
      <div className="board-detail-area">
        <div className="board-detail-item">
          <div className="board-title">
            <img className="board-detail-profile" src={boardData.profileImageUrl} alt="프로필" />
            <div className="board-nickname">{boardData.nickName}</div>
            <div className="like-area">
              <FavoriteBorderIcon />
              <div>{boardData.likeCnt}</div>
            </div>
          </div>
          <img className="board-content-img" src={boardData.boardImageUrl} alt="" />
          <div className="board-text">{boardData.content}</div>
          <div className="board-hashtag-area">
            {boardData.hashtags.map((tag, index) => (
              <div className="blue-bd" key={index}>
                <div>{tag}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="line bg-blue"></div>
        <div className="board-detail-item">
          <div className="board-place">Place Info</div>
          {/* 지도들어갈태그 */}
          <div className="board-map"></div>
        </div>
        <div className="line bg-blue"></div>
        <div className="reply-area">
          <div className="reply-title">
            <div>댓글</div>
            <div className="blue-fc">{boardData.comments.length}</div>
          </div>
          <div className="reply-line bg-blue"></div>
          <div className="reply-list">
            {boardData.comments.map((comment, index) => (
              <div className="reply" key={index}>
                <img src={comment.profileImageUrl} alt="" />
                <div>{comment.nickName}</div>
                <div>{changeDate(comment.createdAt)}</div>
                <div>{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="reply-add">
        <div className="reply-line bg-blue"></div>
        <img src={you} alt="" />
        <div className="reply-add-area">
          <input type="text" placeholder="댓글작성하기" />
          <div className="send-reply bg-blue">
            <SendIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
