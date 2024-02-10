import React from "react";
import "../../assets/styles/board/BoardItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const BoardItem = ({ data }) => {
  const elapsedTime = (date) => {
    const start = new Date(date);
    const end = new Date();

    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return "방금 전";

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    return `${start.toLocaleDateString()}`;
  };

  return (
    <li className="shadow board-contents">
      <div className="board-title-area">
        <img className="board-profile" src={data.profileImageUrl} alt="" />
        <div className="nick">{data.nickName}</div>
      </div>
      <img className="main-img" src={data.boardImageUrl} alt="" />
      <div className="content">
        <div className="post-text">{data.content}</div>
        <div className="hashtag-list">
          {data.hashtags.map((hashtag, index) => (
            <div className="hashtag blue-fc" key={index}>
              {hashtag}
            </div>
          ))}
        </div>
        <div className="post-bottom">
          <div className="time">{elapsedTime(data.createdAt)}</div>
          <div className="post-info">
            <div className="post-icon">
              <ChatBubbleOutlineIcon />
            </div>
            <div className="comment">{data.commentCnt}</div>
            <div className="post-icon">
              <FavoriteBorderIcon />
            </div>
            <div className="like">{data.likeCnt}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BoardItem;
