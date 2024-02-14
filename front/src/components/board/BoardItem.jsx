import React, { useState, useEffect } from "react";
import "../../assets/styles/board/BoardItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import { putPostLike, deletePostLike } from "../../api/board";

const BoardItem = ({ data, category }) => {
  const navigate = useNavigate();

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

  const goDetailPage = (boardId) => {
    navigate(`/media/board/${boardId}`, { state: { categoryId: category } });
  };

  const [boardlike, setBoardLike] = useState();
  const [likecnt, setLikeCnt] = useState();

  const postDisLike = async (postId) => {
    await deletePostLike(postId).then((res) => {
      setBoardLike(false);
      setLikeCnt((prev) => prev - 1);
    });
  };

  const postLike = async (postId) => {
    await putPostLike(postId).then((res) => {
      setBoardLike(true);
      setLikeCnt((prev) => prev + 1);
    });
  };

  useEffect(() => {
    if (data.isLiked) {
      setBoardLike(true);
      setLikeCnt(data.likeCnt);
    } else {
      setBoardLike(false);
      setLikeCnt(data.likeCnt);
    }
  }, []);

  return (
    <li className="shadow board-contents">
      <div className="board-title-area">
        <img className="board-profile" src={data.profileImageUrl} alt="" />
        <div className="nick">{data.nickName}</div>
      </div>
      <img
        className="main-img"
        src={data.boardImageUrl}
        alt=""
        onClick={() => goDetailPage(data.boardId)}
      />
      <div className="content">
        <div className="post-text">{data.content}</div>
        <div className="hashtag-list">
          {data.fishName && (
            <div className="hashtag blue-fc blue-bd">#{data.fishName}</div>
          )}
          {data.hashtag && (
            <>
              {data.hashtags.map((hashtag, index) => (
                <div className="hashtag blue-fc blue-bd" key={index}>
                  #{hashtag}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="post-bottom">
          <div className="time">{elapsedTime(data.createdAt)}</div>
        </div>
        <div className="post-info">
          <div className="post-icon">
            <ChatBubbleOutlineIcon />
          </div>
          <div className="comment">{data.commentCnt}</div>
          {boardlike && (
            <div className="post-icon post-like">
              <FavoriteIcon onClick={() => postDisLike(data.boardId)} />
            </div>
          )}
          {!boardlike && (
            <div className="post-icon">
              <FavoriteBorderIcon onClick={() => postLike(data.boardId)} />
            </div>
          )}
          <div className="like">{likecnt}</div>
        </div>
      </div>
    </li>
  );
};

export default BoardItem;
